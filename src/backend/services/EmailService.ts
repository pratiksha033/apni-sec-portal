import { Resend } from 'resend';
import { AppError } from '../core/AppError';

/**
 * SERVICE LAYER: EmailService
 * This class handles all email communications using Resend.
 * It provides a centralized place to manage HTML templates and delivery logic.
 */
export class EmailService {
  private resend: Resend;
  private readonly fromEmail: string = 'notifications@apnisec.com';

  constructor() {
    // Ensure you have RESEND_API_KEY in your .env file
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  /**
   * General internal helper to send emails with error handling.
   */
  private async send(to: string, subject: string, html: string) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: this.fromEmail,
        to,
        subject,
        html,
      });

      if (error) {
        console.error("Resend API Error:", error);
        // We don't necessarily throw here so the main transaction (like registration) can complete
      }

      return data;
    } catch (err) {
      console.error("Failed to send email:", err);
    }
  }

  /**
   * Send a welcome email when a user registers.
   */
  async sendWelcomeEmail(to: string, name: string) {
    const subject = "Welcome to ApniSec - Security Command Center";
    const html = `
      <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: auto;">
        <h1 style="color: #2563eb;">Welcome, ${name}!</h1>
        <p>Thank you for joining ApniSec. Your account has been successfully created.</p>
        <p>You can now start creating security assessments, VAPT reports, and monitoring your cloud infrastructure.</p>
        <div style="margin-top: 30px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Go to Dashboard
          </a>
        </div>
      </div>
    `;
    return this.send(to, subject, html);
  }

  /**
   * Send a notification when a new issue is created.
   */
  async sendIssueNotification(to: string, issue: any) {
    const subject = `[ApniSec] New Issue Reported: ${issue.title}`;
    const html = `
      <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px;">
        <h2 style="color: #ef4444;">New Security Vulnerability Identified</h2>
        <p>A new <strong>${issue.type}</strong> issue has been logged in the system.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p><strong>Title:</strong> ${issue.title}</p>
        <p><strong>Priority:</strong> ${issue.priority || 'Medium'}</p>
        <p><strong>Description:</strong> ${issue.description}</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #64748b;">Visit your dashboard to assign a team member or update the status.</p>
      </div>
    `;
    return this.send(to, subject, html);
  }

  /**
   * Send a profile update confirmation.
   */
  async sendProfileUpdateNotification(to: string) {
    const subject = "ApniSec - Profile Updated Successfully";
    const html = `
      <div style="font-family: sans-serif; color: #1e293b;">
        <p>This is a confirmation that your ApniSec profile details were recently updated.</p>
        <p>If you did not perform this action, please contact our security team immediately.</p>
      </div>
    `;
    return this.send(to, subject, html);
  }
}