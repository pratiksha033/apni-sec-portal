import { AppError } from "../core/AppError";

export class RequestValidator {
  validateRegister(data: any) {
    if (!data.name || !data.email || !data.password) {
      throw new AppError(400, "All fields are required");
    }
  }

  validateLogin(data: any) {
    if (!data.email || !data.password) {
      throw new AppError(400, "Email & password required");
    }
  }

  validateIssue(data: any) {
    if (!data.title || !data.description || !data.type) {
      throw new AppError(400, "Missing issue fields");
    }
  }
}
