// Shared by the contact form (browser) and the /api/contact route (server),
// so both sides check a message with exactly the same rules.

export const CONTACT_TOPICS = [
  { id: "general", label: "A question" },
  { id: "memory", label: "Share a memory" },
  { id: "correction", label: "A correction" },
  { id: "collaborate", label: "Collaborate" },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["id"];
export type ContactField = "name" | "email" | "message";
export type ContactValues = Record<ContactField, string>;

export const CONTACT_LIMITS = { name: 80, email: 254, message: 2000, minMessage: 10 };

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

export function topicLabel(id: string) {
  return CONTACT_TOPICS.find((t) => t.id === id)?.label ?? CONTACT_TOPICS[0].label;
}

/** Returns a friendly message for the first problem with a field, or "" when it is fine. */
export function validateContactField(field: ContactField, value: string): string {
  const v = value.trim();
  if (field === "name") {
    if (!v) return "Please tell us your name.";
    if (v.length > CONTACT_LIMITS.name) return `Please keep your name under ${CONTACT_LIMITS.name} characters.`;
  }
  if (field === "email") {
    if (!v) return "Please add your email so we can reply.";
    if (v.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(v)) return "That email address doesn’t look quite right.";
  }
  if (field === "message") {
    if (v.length < CONTACT_LIMITS.minMessage) return "Please write a little more — at least a sentence.";
    if (v.length > CONTACT_LIMITS.message) return `Please keep your message under ${CONTACT_LIMITS.message} characters.`;
  }
  return "";
}

export function validateContact(values: ContactValues) {
  return {
    name: validateContactField("name", values.name),
    email: validateContactField("email", values.email),
    message: validateContactField("message", values.message),
  };
}
