/**
 * Global Type Definitions for ApniSec Portal
 */

// 1. User Related Types
export interface User {
    id: string;
    email: string;
    name?: string | null;
    createdAt: Date | string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  // 2. Issue Related Types
  export type IssueType = 'Cloud Security' | 'Reteam Assessment' | 'VAPT';
  export type IssuePriority = 'Low' | 'Medium' | 'High' | 'Critical';
  export type IssueStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  
  export interface Issue {
    id: string;
    type: IssueType;
    title: string;
    description: string;
    priority: IssuePriority;
    status: IssueStatus;
    userId: string;
    createdAt: Date | string;
    updatedAt?: Date | string;
  }
  
  // 3. API Response Structure (Matching our ResponseFormatter)
  export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
  }
  
  // 4. Rate Limiter Result
  export interface RateLimitResult {
    allowed: boolean;
    headers: {
      'X-RateLimit-Limit': string;
      'X-RateLimit-Remaining': string;
      'X-RateLimit-Reset': string;
    };
  }
  
  // 5. Form Payloads
  export interface CreateIssuePayload {
    type: IssueType;
    title: string;
    description: string;
    priority?: IssuePriority;
  }