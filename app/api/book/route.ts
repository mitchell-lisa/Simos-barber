import { NextResponse } from "next/server";
import { business } from "@/lib/business";

/**
 * Booking requests.
 *
 * Nothing is stored. A request becomes one notification and is sent on.
 * Channels are tried in order and the first one configured wins:
 *
 *   1. Email via Resend — env: RESEND_API_KEY  (+ NOTIFY_EMAIL, NOTIFY_FROM)
 *   2. SMS via Twilio   — env: TWILIO_SID, TWILIO_TOKEN, TWILIO_FROM
 *   3. Nothing configured — the request is logged and the caller is still told
 *      it went through. This is the preview default.
 *
 * NOTIFY_EMAIL should be John's address once we have it. Until it is set,
 * requests fall back to `booking.fallbackEmail` so none are lost.
 */

export const runtime = "nodejs";

const str = (v: unknown, max = 400) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const esc = (s: string) =>
  s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot: bots fill every field they find.
  if (str(body.company)) return NextResponse.json({ ok: true });

  const name = str(body.name, 80);
  const phone = str(body.phone, 40);
  const barber = str(body.barber, 60);
  const service = str(body.service, 60);
  const dayLabel = str(body.dayLabel, 40);
  const timeLabel = str(body.timeLabel, 20);
  const notes = str(body.notes, 600);

  if (!name || !phone || !service || !dayLabel || !timeLabel) {
    return NextResponse.json(
      { error: "Please add your name, mobile number, service and a time." },
      { status: 422 },
    );
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { error: "That mobile number looks incomplete." },
      { status: 422 },
    );
  }

  const lines = [
    `${dayLabel} at ${timeLabel}`,
    `${service} with ${barber}`,
    `${name} — ${phone}`,
    notes ? `Notes: ${notes}` : "",
  ].filter(Boolean);

  const subject = `Booking — ${name}, ${dayLabel} ${timeLabel}`;
  const text = `New appointment request for ${business.name}\n\n${lines.join("\n")}\n`;

  // 1 — Email
  const { RESEND_API_KEY, NOTIFY_EMAIL, NOTIFY_FROM } = process.env;
  const to = NOTIFY_EMAIL || business.booking.notifyEmail || business.booking.fallbackEmail;

  if (RESEND_API_KEY && to) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: NOTIFY_FROM || "Simo's Booking <onboarding@resend.dev>",
          to: [to],
          subject,
          text,
          html:
            `<h2 style="font-family:system-ui;margin:0 0 16px">New appointment request</h2>` +
            `<table style="font-family:system-ui;font-size:15px;border-collapse:collapse">` +
            [
              ["When", `${dayLabel} at ${timeLabel}`],
              ["Service", service],
              ["Barber", barber],
              ["Name", name],
              ["Mobile", phone],
              ...(notes ? [["Notes", notes]] : []),
            ]
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:6px 18px 6px 0;color:#666">${k}</td>` +
                  `<td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`,
              )
              .join("") +
            `</table>`,
        }),
      });
      if (res.ok) return NextResponse.json({ ok: true, via: "email" });
      console.error("resend", res.status, await res.text());
    } catch (err) {
      console.error("resend", err);
    }
  }

  // 2 — SMS
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
          body: new URLSearchParams({
            To: process.env.NOTIFY_PHONE || business.phone.e164,
            From: TWILIO_FROM,
            Body: text,
          }),
        },
      );
      if (res.ok) return NextResponse.json({ ok: true, via: "sms" });
      console.error("twilio", res.status, await res.text());
    } catch (err) {
      console.error("twilio", err);
    }
  }

  // 3 — Preview: no channel wired yet.
  console.log(`[booking request — no delivery channel configured]\n${text}`);
  return NextResponse.json({ ok: true, via: "none" });
}
