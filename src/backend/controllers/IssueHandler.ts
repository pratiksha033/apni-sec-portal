import { IssueService } from "../services/IssueService";
import { ApiResponse } from "../core/ApiResponse";
import { NextRequest } from "next/server";
import { authenticate } from "../middleware/AuthHandler";

export class IssueHandler {
  private issueService = new IssueService();

  async create(userId: string, body: any) {
    const issue = await this.issueService.create(userId, body);
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

  async update(id: string, data: any) {
    const updated = await this.issueService.update(id, data);
    return ApiResponse.success(updated);
  }

  async delete(id: string) {
    await this.issueService.delete(id);
    return ApiResponse.success({ message: "Deleted" });
  }
}
