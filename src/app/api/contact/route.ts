import { NextRequest, NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/validation";

/**
 * Contact endpoint. Currently in-memory / log-only so the form works with zero configuration.
 * To wire up real persistence and email delivery, see /docs/BACKEND.md — swap the body of
 * `persist()` and `notify()` for your database and mail provider of choice.
 */

async function persist(payload: ContactPayload) {
  // TODO(backend): insert into `messages` table. See docs/BACKEND.md for the schema.
  console.log("[contact] new message", { ...payload, receivedAt: new Date().toISOString() });
}

async function notify(_payload: ContactPayload) {
  // TODO(backend): send an email/Slack notification once a provider is configured.
}

export async function POST(req: NextRequest) {
  let body: Partial<ContactPayload>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 }); }

  // Honeypot: bots fill hidden fields, humans don't.
  if (body.company) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const payload = body as ContactPayload;
  await persist(payload);
  await notify(payload);

  return NextResponse.json({ ok: true, message: "Message received." });
}
