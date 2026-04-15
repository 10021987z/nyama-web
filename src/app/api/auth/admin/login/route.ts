import { NextRequest, NextResponse } from "next/server";

const DASHBOARD_URL =
  process.env.ADMIN_AUTH_UPSTREAM ||
  process.env.NEXT_PUBLIC_ADMIN_AUTH_URL ||
  "https://nyama-dashboard.vercel.app";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Corps de requête invalide." },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(`${DASHBOARD_URL}/api/v1/auth/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await upstream.text();
    const data = text ? safeJson(text) : null;

    if (!upstream.ok) {
      return NextResponse.json(
        data ?? { message: "Identifiants incorrects." },
        { status: upstream.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Impossible de contacter le service d'authentification.";
    return NextResponse.json({ message }, { status: 502 });
  }
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}
