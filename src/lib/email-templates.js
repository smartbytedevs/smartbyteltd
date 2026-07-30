const brand = {
  name: "SmartByte",
  email: "hello@smartbyte.dev",
  website: "https://smartbyte.dev",
  logo: "S",
  accent: "#00C2A8",
}

export function notificationTemplate(fields) {
  const rows = [
    { label: "Name", value: fields.fullName },
    { label: "Company", value: fields.companyName || "—" },
    { label: "Email", value: fields.email },
    { label: "Phone", value: fields.phone || "—" },
    { label: "Project Type", value: fields.projectType },
    { label: "Budget", value: fields.budget },
    { label: "Timeline", value: fields.timeline },
    { label: "Message", value: fields.description },
    { label: "Submitted At", value: new Date().toLocaleString("en-US", { timeZone: "UTC", dateStyle: "full", timeStyle: "short" }) + " UTC" },
  ]

  const rowsHtml = rows
    .map(
      (r) => `
      <tr>
        <td style="padding: 8px 16px; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255,255,255,0.06); white-space: nowrap; vertical-align: top;">${r.label}</td>
        <td style="padding: 8px 16px; font-size: 14px; color: #E2E8F0; border-bottom: 1px solid rgba(255,255,255,0.06); word-break: break-word;">${r.value}</td>
      </tr>`
    )
    .join("")

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0B1020;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0B1020;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="background:linear-gradient(135deg,rgba(15,23,42,0.95),rgba(12,18,34,0.98));border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align:center;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <div style="display:inline-block;width:40px;height:40px;line-height:40px;border-radius:10px;background:linear-gradient(135deg,${brand.accent},#38BDF8);color:#0B1020;font-size:20px;font-weight:800;text-align:center;">${brand.logo}</div>
                    <span style="font-size:20px;font-weight:700;color:#F8FAFC;margin-left:8px;">Smart<span style="color:${brand.accent};">Byte</span></span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 0 8px;">
                    <h1 style="margin:0;font-size:22px;font-weight:700;color:#F8FAFC;text-align:center;">New Project Inquiry</h1>
                    <p style="margin:8px 0 0;font-size:14px;color:#64748B;text-align:center;">A potential client has submitted a project request.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 0 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);">
                      ${rowsHtml}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 0 0;text-align:center;">
                    <a href="mailto:${fields.email}" style="display:inline-block;padding:12px 32px;border-radius:999px;background:linear-gradient(135deg,${brand.accent},#38BDF8);color:#0B1020;font-size:14px;font-weight:600;text-decoration:none;">Reply to ${fields.fullName}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function autoReplyTemplate(name) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0B1020;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0B1020;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="background:linear-gradient(135deg,rgba(15,23,42,0.95),rgba(12,18,34,0.98));border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align:center;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <div style="display:inline-block;width:40px;height:40px;line-height:40px;border-radius:10px;background:linear-gradient(135deg,${brand.accent},#38BDF8);color:#0B1020;font-size:20px;font-weight:800;text-align:center;">${brand.logo}</div>
                    <span style="font-size:20px;font-weight:700;color:#F8FAFC;margin-left:8px;">Smart<span style="color:${brand.accent};">Byte</span></span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 0 8px;">
                    <h1 style="margin:0;font-size:22px;font-weight:700;color:#F8FAFC;text-align:center;">We've Received Your Project Inquiry</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <p style="margin:0;font-size:15px;color:#E2E8F0;line-height:1.6;">Hi ${name},</p>
                    <p style="margin:16px 0 0;font-size:15px;color:#E2E8F0;line-height:1.6;">Thank you for reaching out to SmartByte. We've received your project inquiry and our team will review it shortly.</p>
                    <p style="margin:16px 0 0;font-size:15px;color:#E2E8F0;line-height:1.6;">We typically respond within <strong style="color:${brand.accent};">24 hours</strong>. If your project is urgent, feel free to reply to this email.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(0,194,168,0.05);border:1px solid rgba(0,194,168,0.15);border-radius:12px;padding:20px;">
                      <tr>
                        <td style="text-align:center;padding:8px;">
                          <p style="margin:0;font-size:13px;color:#64748B;margin-bottom:12px;">While you wait, explore what we can build for you:</p>
                          <a href="${brand.website}/templates" style="display:inline-block;padding:10px 24px;border-radius:999px;background:linear-gradient(135deg,${brand.accent},#38BDF8);color:#0B1020;font-size:13px;font-weight:600;text-decoration:none;margin:4px;">Browse Templates</a>
                          <a href="${brand.website}/services" style="display:inline-block;padding:10px 24px;border-radius:999px;border:1px solid rgba(255,255,255,0.15);color:#E2E8F0;font-size:13px;font-weight:600;text-decoration:none;margin:4px;">Explore Services</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0 0;border-top:1px solid rgba(255,255,255,0.06);">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="text-align:center;padding:8px;">
                          <a href="${brand.website}" style="font-size:13px;color:${brand.accent};text-decoration:none;">${brand.website}</a>
                          <span style="color:#475569;margin:0 8px;">·</span>
                          <a href="mailto:${brand.email}" style="font-size:13px;color:${brand.accent};text-decoration:none;">${brand.email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align:center;padding:8px 0 0;">
                          <a href="https://facebook.com/smartbyte" style="display:inline-block;padding:6px 10px;font-size:12px;color:#64748B;text-decoration:none;">Facebook</a>
                          <a href="https://linkedin.com/company/smartbyte" style="display:inline-block;padding:6px 10px;font-size:12px;color:#64748B;text-decoration:none;">LinkedIn</a>
                          <a href="https://instagram.com/smartbyte" style="display:inline-block;padding:6px 10px;font-size:12px;color:#64748B;text-decoration:none;">Instagram</a>
                          <a href="https://github.com/smartbyte" style="display:inline-block;padding:6px 10px;font-size:12px;color:#64748B;text-decoration:none;">GitHub</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align:center;padding:16px 0 0;">
                          <p style="margin:0;font-size:11px;color:#475569;">&copy; ${new Date().getFullYear()} SmartByte. All rights reserved.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
