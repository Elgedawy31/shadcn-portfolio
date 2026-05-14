export type ContactMessagePayload = {
  name: string
  email: string
  message: string
}

export type ContactSubmitResult =
  | { ok: true }
  | { ok: false; error: "not_configured" | "validation" }

/**
 * Replace this with `fetch("/api/contact", { method: "POST", ... })` or a form provider URL.
 * Returns `not_configured` until you wire a backend.
 */
export async function submitContactMessage(
  payload: ContactMessagePayload
): Promise<ContactSubmitResult> {
  const name = payload.name.trim()
  const email = payload.email.trim()
  const message = payload.message.trim()
  if (!name || !email || !message) {
    return { ok: false, error: "validation" }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "validation" }
  }

  // TODO: await fetch("/api/contact", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // })
  void payload

  return { ok: false, error: "not_configured" }
}
