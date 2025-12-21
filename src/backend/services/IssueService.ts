import { IssueRepository } from "../repositories/IssueRepository";

export class IssueService {
  private repo = new IssueRepository();

  create(userId: string, data: any) {
    return this.repo.create(userId, data);
  }

  list(userId: string, type?: string) {
    return this.repo.list(userId, type);
  }

  get(id: string) {
    return this.repo.get(id);
  }

  update(id: string, data: any) {
    return this.repo.update(id, data);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
