import { NextResponse } from "next/server";
import { business } from "@/lib/business";

/**
 * Booking requests.
 *
 * Nothing is stored. The request is turned into one notification and sent on.
 * Delivery is tried in order, and the first configured channel wins:
 *
 *   1. SMS via Twilio   — env: TWILIO_SID, TWILIO_TOKEN, TWILIO_FROM
 *   2. Email via Resend — env: RESEND_API_KEY, NOTIFY_EMAIL (+ optional NOTIFY_FROM)
 *   3. Nothing configured — the request is logged and the caller is told
 *      delivery is not live yet. This is the preview default.
 *
 * NOTIFY_PHONE overrides the number in lib/business.ts when set.
 */

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

const str = (v: unknown, max = 400) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot: bots fill every field they find.
  if (str(body.company)) return NextResponse.json({ ok: true });

  const name = str(body.name, 80);
  const phone = str(body.phone, 40);
  const service = str(body.service, 60);
  const day = str(body.day, 20);
  const time = str(body.time, 30);
  const notes = str(body.notes, 600);

  if (!name || !phone || !service) {
    return NextResponse.json(
      { error: "Please add your name, mobile number and what you need." },
      { status: 422 },
    );
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { error: "That mobile number looks incomplete." },
      { status: 422 },
    );
  }

  const to = process.env.NOTIFY_PHONE ?? business.booking.notifyPhone;
  const message = [
    `New booking request — ${business.name}`,
    `${name} · ${phone}`,
    `${service}`,
    day ? `Preferred: ${day}${time ? ` · ${time}` : ""}` : time ? `Preferred: ${time}` : "",
    notes ? `Notes: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // 1 — SMS
  const { TWILIO_SID, TWILIO_TOKEN, TWILIO_FROM } = process.env;
  if (TWILIO_SID && TWILIO_TOKEN && TWILIO_FROM) {
    try {
      const res = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ To: to, From: TWILIO_FROM, Body: message }),
        },
      );
      if (res.ok) return NextResponse.json({ ok: true, via: "sms" });
      console.error("twilio", res.status, await res.text());
    } catch (err) {
      console.error("twilio", err);
    }
  }

  // 2 — Email
  const { RESEND_API_KEY, NOTIFY_EMAIL, NOTIFY_FROM } = process.env;
  if (RESEND_API_KEY && NOTIFY_EMAIL) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: NOTIFY_FROM ?? "Simo's Booking <onboarding@resend.dev>",
          to: [NOTIFY_EMAIL],
          subject: `Booking request — ${name} · ${service}`,
          text: message,
          reply_to: NOTIFY_EMAIL,
        }),
      });
      if (res.ok) return NextResponse.json({ ok: true, via: "email" });
      console.error("resend", res.status, await res.text());
    } catch (err) {
      console.error("resend", err);
    }
  }

  // 3 — Preview: no channel wired yet.
  console.log("[booking request — no delivery channel configured]\n" + message);
  return NextResponse.json({ ok: true, via: "none" });
}
