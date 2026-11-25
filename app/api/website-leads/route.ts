import { NextResponse, type NextRequest } from "next/server";

const FORM_KINDS = new Set(["contact", "access-equity", "heloc-access", "rent-vs-own", "open-house"]);
const EXCLUDED_FIELDS = new Set(["firstName", "lastName", "email", "phone", "_subject"]);

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Expected JSON" }, { status: 415 });
  }
  if (Number(request.headers.get("content-length") || 0) > 20000) {
    return NextResponse.json({ error: "Submission too large" }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
  const { formKind, fields } = payload as Record<string, unknown>;
  if (typeof formKind !== "string" || !FORM_KINDS.has(formKind) || !fields || typeof fields !== "object" || Array.isArray(fields)) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
  const values = fields as Record<string, unknown>;
  const entries = Object.entries(values);
  if (entries.length > 50 || entries.some(([key, value]) => key.length > 80 || typeof value !== "string" || value.length > 3000)) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }
  const stringEntries = entries as [string, string][];

  const firstName = String(values.firstName || "").trim();
  const lastName = String(values.lastName || "").trim();
  const email = String(values.email || "").trim();
  const phone = String(values.phone || "").trim();
  if (!firstName || !lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Name and valid email required" }, { status: 400 });
  }

  const crmUrl = process.env.CRM_URL;
  const token = process.env.WEBSITE_INTAKE_TOKEN;
  if (!crmUrl || !token) {
    return NextResponse.json({ error: "Lead delivery unavailable" }, { status: 503 });
  }
  const message = [`Form: ${formKind}`, ...stringEntries
    .filter(([key, value]) => !EXCLUDED_FIELDS.has(key) && value.trim())
    .map(([key, value]) => `${key}: ${value}`)].join("\n");
  if (message.length > 10000) {
    return NextResponse.json({ error: "Submission too large" }, { status: 413 });
  }

  try {
    const response = await fetch(`${crmUrl.replace(/\/$/, "")}/api/intake/website`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ full_name: `${firstName} ${lastName}`, email, phone, message }),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`CRM returned ${response.status}`);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("CRM lead delivery failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Lead delivery failed" }, { status: 502 });
  }
}
