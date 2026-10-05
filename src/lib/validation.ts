export interface ContactPayload { name: string; email: string; subject: string; message: string; company?: string }
export interface FieldErrors { name?: string; email?: string; subject?: string; message?: string }

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(d: Partial<ContactPayload>): FieldErrors {
  const e: FieldErrors = {};
  if (!d.name || d.name.trim().length < 2) e.name = "Enter your name.";
  if (!d.email || !emailRe.test(d.email)) e.email = "Enter a valid email.";
  if (!d.subject || d.subject.trim().length < 2) e.subject = "Add a subject.";
  if (!d.message || d.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  return e;
}
