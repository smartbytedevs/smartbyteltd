import { Resend } from "resend"
import { notificationTemplate } from "@/lib/email-templates"

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev"
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "smartbytedevs@gmail.com"

function sanitize(str) {
  if (typeof str !== "string") return ""
  return str.replace(/[<>]/g, "").trim().slice(0, 5000)
}

function validate(body) {
  const errors = {}
  if (!body.fullName || body.fullName.trim().length < 2) errors.fullName = "Please enter your full name"
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.email = "Please enter a valid email address"
  if (!body.projectType) errors.projectType = "Please select a project type"
  if (!body.budget) errors.budget = "Please select a budget range"
  if (!body.timeline) errors.timeline = "Please select a timeline"
  if (!body.description || body.description.trim().length < 10) errors.description = "Please describe your project (at least 10 characters)"
  if (!body.agreed) errors.agreed = "You must agree to be contacted"
  return errors
}

export async function POST(request) {
  try {
    if (!RESEND_API_KEY) {
      return Response.json({ error: "Server configuration error" }, { status: 500 })
    }

    const body = await request.json()

    const errors = validate(body)
    if (Object.keys(errors).length > 0) {
      return Response.json({ errors }, { status: 400 })
    }

    const fields = {
      fullName: sanitize(body.fullName),
      companyName: sanitize(body.companyName || ""),
      email: sanitize(body.email),
      phone: sanitize(body.phone || ""),
      projectType: sanitize(body.projectType),
      budget: sanitize(body.budget),
      timeline: sanitize(body.timeline),
      description: sanitize(body.description),
      agreed: !!body.agreed,
    }

    if (fields.description.length < 10) {
      return Response.json({ errors: { description: "Please describe your project (at least 10 characters)" } }, { status: 400 })
    }

    const resend = new Resend(RESEND_API_KEY)

    await resend.emails.send({
      from: `SmartByte <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: fields.email,
      subject: `New Project Inquiry — ${fields.fullName} (${fields.projectType})`,
      html: notificationTemplate(fields),
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error("Contact API error:", err)
    return Response.json({ error: err.message || "An unexpected error occurred" }, { status: 500 })
  }
}
