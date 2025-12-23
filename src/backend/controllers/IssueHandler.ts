import { IssueService } from "../services/IssueService";
import { ApiResponse } from "../core/ApiResponse";
import { EmailService } from "../services/EmailService";

export class IssueHandler {
  private issueService = new IssueService();
  private emailService = new EmailService();

  async create(userId: string, body: any) {
    const issue = await this.issueService.create(userId, body);

    // ✅ SEND ISSUE CREATED EMAIL
    try {
      // get user email from DB
      const user = await this.issueService.getUser(userId);

      if (user?.email) {
        await this.emailService.sendIssueCreatedEmail(
          user.email,
          {
            title: issue.title,
            description: issue.description,
            type: issue.type,
          }
        );
      }
      
      

    } catch (err) {
      console.error("Failed to send issue email", err);
    }

    return ApiResponse.success(issue, 201);
  }

  async list(userId: string, type?: string) {
    const issues = await this.issueService.list(userId, type);
    return ApiResponse.success(issues);
  }

  async get(userId: string, id: string) {
    const issue = await this.issueService.get(id);

    if (!issue || issue.userId !== userId) {
      return ApiResponse.error("Unauthorized", 403);
    }

    return ApiResponse.success(issue);
  }

  async update(userId: string, id: string, data: any) {
    const issue = await this.issueService.get(id);

    if (!issue || issue.userId !== userId) {
      return ApiResponse.error("Unauthorized", 403);
    }

    const updated = await this.issueService.update(id, data);
    return ApiResponse.success(updated);
  }

  async delete(userId: string, id: string) {
    const issue = await this.issueService.get(id);

    if (!issue || issue.userId !== userId) {
      return ApiResponse.error("Unauthorized", 403);
    }

    await this.issueService.delete(id);
    return ApiResponse.success({ message: "Deleted" });
  }
}
