import { CONTACT_TOPICS, topicLabel, validateContact } from "@/lib/contact";
import { CONTACT_EMAIL } from "@/lib/site-url";

/*
 * Sends contact-form messages to the archive's inbox through Resend (https://resend.com).
 *
 * Environment variables (set in Vercel, never in the browser):
 *   RESEND_API_KEY  required — a Resend API key with permission to send.
 *   CONTACT_FROM    optional — sender, on a domain verified in Resend.
 *                   Defaults to "Malistan Archive <website@malistan.org>".
 *   CONTACT_TO      optional — where messages go. Defaults to hello@malistan.org.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Malistan Archive <website@malistan.org>";

// Light abuse protection. Serverless instances are short-lived, so this is best effort.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 2500;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Stops a visitor's text from adding extra lines to email headers.
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ success: false, error: "forbidden" }, 403);

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 20_000) return json({ success: false, error: "too_large" }, 413);

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ success: false, error: "invalid" }, 400);
  }

  const text = (key: string) => (typeof data[key] === "string" ? (data[key] as string) : "");
  const values = { name: text("name"), email: text("email"), message: text("message") };
  const topicId = CONTACT_TOPICS.some((t) => t.id === data.topic) ? (data.topic as string) : "general";

  // Bots fill the hidden field or submit instantly. Pretend it worked and send nothing.
  const startedAt = Number(data.startedAt);
  if (text("botcheck") || (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS)) {
    return json({ success: true });
  }

  const errors = validateContact(values);
  if (errors.name || errors.email || errors.message) return json({ success: false, error: "invalid", fields: errors }, 422);

  const ip = (request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown").split(",")[0].trim();
  if (rateLimited(ip)) return json({ success: false, error: "rate_limited" }, 429);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json({ success: false, error: "not_configured" }, 503);

  const name = oneLine(values.name);
  const email = oneLine(values.email);
  const message = values.message.trim();
  const topic = topicLabel(topicId);
  const page = oneLine(text("page")).slice(0, 300);
  const sentAt = new Date().toUTCString();

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f6f3ec;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#18201b">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e6e1d6">
    <tr><td style="height:4px;background:linear-gradient(90deg,#2b6a4c,#b98a35)"></td></tr>
    <tr><td style="padding:28px 32px 8px">
      <p style="margin:0 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#2b6a4c;font-weight:700">New message · ${escapeHtml(topic)}</p>
      <h1 style="margin:0;font-size:22px;line-height:1.3">${escapeHtml(name)} wrote through malistan.org</h1>
    </td></tr>
    <tr><td style="padding:16px 32px">
      <div style="white-space:pre-wrap;font-size:15px;line-height:1.65;padding:18px 20px;background:#f6f3ec;border-radius:12px">${escapeHtml(message)}</div>
    </td></tr>
    <tr><td style="padding:4px 32px 28px;font-size:14px;line-height:1.7;color:#525c55">
      <strong style="color:#18201b">From:</strong> ${escapeHtml(name)} &lt;<a href="mailto:${escapeHtml(email)}" style="color:#2b6a4c">${escapeHtml(email)}</a>&gt;<br>
      <strong style="color:#18201b">Topic:</strong> ${escapeHtml(topic)}<br>
      ${page ? `<strong style="color:#18201b">Page:</strong> ${escapeHtml(page)}<br>` : ""}
      <strong style="color:#18201b">Sent:</strong> ${escapeHtml(sentAt)}<br>
      <span style="display:inline-block;margin-top:10px;color:#848c86">Press Reply to answer ${escapeHtml(name)} directly.</span>
    </td></tr>
  </table>
</body></html>`;

  const plain = `New message from malistan.org\n\nTopic: ${topic}\nFrom: ${name} <${email}>\n${page ? `Page: ${page}\n` : ""}Sent: ${sentAt}\n\n${message}\n\n— Press Reply to answer ${name} directly.`;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || DEFAULT_FROM,
        to: [process.env.CONTACT_TO || CONTACT_EMAIL],
        reply_to: email,
        subject: `[Malistan] ${topic} from ${name}`,
        html,
        text: plain,
        tags: [{ name: "source", value: "contact_form" }],
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Resend rejected the contact message", response.status, await response.text().catch(() => ""));
      return json({ success: false, error: "send_failed" }, 502);
    }
    return json({ success: true });
  } catch (error) {
    console.error("Could not reach Resend", error);
    return json({ success: false, error: "send_failed" }, 502);
  }
}
