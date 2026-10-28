"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertCircle, ArrowRight, Lock, RotateCcw } from "lucide-react";
import {
  CONTACT_LIMITS as LIMITS,
  CONTACT_TOPICS as topics,
  topicLabel as labelFor,
  validateContactField as validate,
  type ContactField as Field,
  type ContactTopic as TopicId,
  type ContactValues as Values,
} from "@/lib/contact";
import { CONTACT_EMAIL } from "@/lib/site-url";
import { playSound } from "@/lib/sound/store";

/**
 * Messages go to /api/contact, which emails them to the archive inbox through Resend.
 * If the server has no Resend key yet, the form opens the visitor's email app instead.
 */
const ENDPOINT = "/api/contact";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";
type Problem = "send_failed" | "rate_limited";

function mailtoLink(values: Values, topic: string) {
  const subject = `[Malistan] ${topic} from ${values.name.trim() || "a visitor"}`;
  const body = `${values.message.trim()}\n\n— ${values.name.trim()}${values.email.trim() ? ` (${values.email.trim()})` : ""}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const uid = useId();
  const reduced = useReducedMotion();
  const form = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>({ name: "", email: "", message: "" });
  const [topic, setTopic] = useState<TopicId>("general");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentName, setSentName] = useState("");
  const [problem, setProblem] = useState<Problem>("send_failed");
  const startedAt = useRef(Date.now());

  const topicLabel = labelFor(topic);
  const id = (f: string) => `${uid}-${f}`;

  const update = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (touched[field]) setErrors((e) => ({ ...e, [field]: validate(field, value) }));
    if (status === "error") setStatus("idle");
  };

  const blur = (field: Field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validate(field, values[field]) }));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const next = {
      name: validate("name", values.name),
      email: validate("email", values.email),
      message: validate("message", values.message),
    };
    setErrors(next);
    setTouched({ name: true, email: true, message: true });
    const firstInvalid = (Object.keys(next) as Field[]).find((f) => next[f]);
    if (firstInvalid) {
      form.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // A hidden field people never see; bots that fill it in are quietly ignored.
    const trap = new FormData(event.currentTarget).get("botcheck");
    if (trap) {
      setStatus("sent");
      return;
    }

    const firstName = values.name.trim().split(/s+/)[0];
    const openMailApp = () => {
      const href = mailtoLink(values, topicLabel);
      setSentName(firstName);
      setStatus("mailto");
      // Update the screen first, then hand over to the email app with a link click,
      // which leaves this page running (assigning location.href can stall it).
      window.setTimeout(() => {
        const link = document.createElement("a");
        link.href = href;
        link.rel = "noopener";
        link.click();
      }, 60);
    };

    setStatus("sending");
    try {
      const signal = typeof AbortSignal !== "undefined" && "timeout" in AbortSignal ? AbortSignal.timeout(20000) : undefined;
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...values,
          topic,
          page: window.location.href,
          startedAt: startedAt.current,
          botcheck: "",
        }),
        signal,
      });
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; error?: string; fields?: Partial<Record<Field, string>> }
        | null;

      if (response.ok && result?.success) {
        setSentName(firstName);
        setStatus("sent");
        setValues({ name: "", email: "", message: "" });
        setTouched({});
        startedAt.current = Date.now();
        playSound("pop");
        return;
      }
      if (result?.error === "not_configured") return openMailApp();
      if (result?.error === "invalid" && result.fields) {
        setErrors(result.fields);
        setStatus("idle");
        return;
      }
      setProblem(result?.error === "rate_limited" ? "rate_limited" : "send_failed");
      setStatus("error");
    } catch {
      setProblem("send_failed");
      setStatus("error");
    }
  }

  const reset = () => {
    setStatus("idle");
    setErrors({});
    setTouched({});
  };

  const fade = reduced
    ? {}
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } };

  const remaining = LIMITS.message - values.message.length;
  const done = status === "sent" || status === "mailto";

  return (
    <div className="contact-form-card" data-spotlight>
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div key="done" className="contact-success" role="status" {...fade}>
            <svg className="contact-success__check" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="29" />
              <path d="M20 33.5l8 8 16-17" />
            </svg>
            <h2>{status === "sent" ? `Thank you${sentName ? `, ${sentName}` : ""}.` : "Almost there."}</h2>
            <p>
              {status === "sent" ? (
                <>Your message is on its way to <strong>{CONTACT_EMAIL}</strong>. We read every note personally and will reply to you by email.</>
              ) : (
                <>Your email app should now be open with your message ready. Just press send. If nothing opened, write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>
              )}
            </p>
            <button type="button" className="btn btn--secondary" onClick={reset}>
              <RotateCcw aria-hidden="true" /> Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" ref={form} className="contact-form" noValidate onSubmit={submit} aria-describedby={id("intro")} {...fade}>
            <div className="contact-form__head">
              <h2>Send a message</h2>
              <p id={id("intro")}>All fields are required. It takes about a minute.</p>
            </div>

            <fieldset className="topic-picker">
              <legend>What’s it about?</legend>
              <div className="topic-picker__options">
                {topics.map((t, i) => (
                  <label key={t.id} className="topic-pill" data-sound="tick" data-sound-step={i}>
                    <input
                      type="radio"
                      name="topic"
                      value={t.id}
                      checked={topic === t.id}
                      onChange={() => setTopic(t.id)}
                    />
                    <span>{t.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="field-row">
              <Field
                id={id("name")}
                label="Your name"
                error={touched.name ? errors.name : ""}
              >
                <input
                  id={id("name")}
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={LIMITS.name + 20}
                  placeholder="e.g. Zahra Ahmadi"
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  onBlur={() => blur("name")}
                  aria-invalid={Boolean(touched.name && errors.name)}
                  aria-describedby={touched.name && errors.name ? id("name-error") : undefined}
                />
              </Field>
              <Field
                id={id("email")}
                label="Email address"
                error={touched.email ? errors.email : ""}
              >
                <input
                  id={id("email")}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck={false}
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  onBlur={() => blur("email")}
                  aria-invalid={Boolean(touched.email && errors.email)}
                  aria-describedby={touched.email && errors.email ? id("email-error") : undefined}
                />
              </Field>
            </div>

            <Field
              id={id("message")}
              label="Message"
              error={touched.message ? errors.message : ""}
              aside={
                <span className={remaining < 0 ? "field__count is-over" : "field__count"} aria-live="polite">
                  {values.message.length > LIMITS.message * 0.8 ? `${remaining} left` : ""}
                </span>
              }
            >
              <textarea
                id={id("message")}
                name="message"
                rows={6}
                placeholder={
                  topic === "memory"
                    ? "Tell us about the photo, recording or story — roughly when and where it’s from, and who made it."
                    : topic === "correction"
                      ? "Which page, and what should it say? A source helps us check it quickly."
                      : "How can we help?"
                }
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                onBlur={() => blur("message")}
                aria-invalid={Boolean(touched.message && errors.message)}
                aria-describedby={touched.message && errors.message ? id("message-error") : undefined}
              />
            </Field>

            {/* Spam trap: hidden from people and screen readers. */}
            <input type="checkbox" name="botcheck" className="contact-trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <AnimatePresence>
              {status === "error" && (
                <motion.div className="form-alert" role="alert" {...fade}>
                  <AlertCircle aria-hidden="true" />
                  <p>
                    {problem === "rate_limited"
                      ? "You’ve sent several messages in a short time. Please wait a few minutes, or "
                      : "Your message couldn’t be sent just now. Please try again, or "}
                    <a href={mailtoLink(values, topicLabel)}>send it by email instead</a>.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="contact-form__foot">
              <button type="submit" className="btn btn--primary btn--lg contact-submit" aria-busy={status === "sending"} disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <span className="spinner" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  <>
                    Send message <ArrowRight aria-hidden="true" />
                  </>
                )}
              </button>
              <p className="contact-form__privacy">
                <Lock aria-hidden="true" /> Your details are only used to reply to you.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  aside,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={error ? "field has-error" : "field"}>
      <div className="field__top">
        <label htmlFor={id}>{label}</label>
        {aside}
      </div>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            className="field__error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
