import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export class EmailService {
  async sendWelcomeEmail(email: string, name: string) {
    try {
      const res = await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: email,
        subject: "Welcome to ApniSec 🚀",
        html: `
          <h2>Welcome, ${name}!</h2>
          <p>Your account has been successfully created.</p>
          <p>Start reporting security issues on ApniSec.</p>
          <br/>
          <strong>Team ApniSec</strong>
        `,
      });
      console.log("Welcome email sent:", res);
    } catch (err) {
      console.error("Failed to send welcome email:", err);
    }
  }
  

  async sendIssueCreatedEmail(
    email: string,
    issue: {
      title: string;
      description: string;
      type: string;
    }
  ) {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: "New Issue Created",
      html: `
        <h2>Issue Created Successfully</h2>
        <p><strong>Type:</strong> ${issue.type}</p>
        <p><strong>Title:</strong> ${issue.title}</p>
        <p><strong>Description:</strong> ${issue.description}</p>
        <br/>
        <strong>ApniSec Security Portal</strong>
      `,
    });
  }
}
