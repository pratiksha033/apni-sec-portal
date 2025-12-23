import { prisma } from "@/lib/db";
import { IssueType } from "@prisma/client";

export class IssueRepository {
  // Convert frontend string → Prisma enum
  private mapIssueType(type: string): IssueType {
    switch (type) {
      case "Cloud Security":
        return "CLOUD_SECURITY";
      case "Redteam Assessment":
        return "REDTEAM_ASSESSMENT";
      case "VAPT":
        return "VAPT";
      default:
        return "CLOUD_SECURITY";
    }
  }

  // CREATE
  async create(userId: string, data: any) {
    return prisma.issue.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        type: this.mapIssueType(data.type),
        priority: data.priority ?? "Medium",
        status: "Open",
      },
    });
  }

  // LIST
  async list(userId: string, type?: string) {
    const where: any = { userId };

    if (type) {
      where.type = this.mapIssueType(type);
    }

    return prisma.issue.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  // GET
  async get(id: string) {
    return prisma.issue.findUnique({
      where: { id },
    });
  }

  // UPDATE
  async update(id: string, data: any) {
    if (data.type) {
      data.type = this.mapIssueType(data.type);
    }

    return prisma.issue.update({
      where: { id },
      data,
    });
  }

  // DELETE
  async delete(id: string) {
    return prisma.issue.delete({
      where: { id },
    });
  }
}
