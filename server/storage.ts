import { db } from "./db";
import { users, dataRequests, requestAssignees } from "@shared/schema";
import type { InsertUser, User, InsertDataRequest, DataRequest, InsertRequestAssignee, RequestAssignee } from "@shared/schema";
import { eq, and, or, inArray } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(phoneNumber: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Data request operations
  createDataRequest(request: InsertDataRequest): Promise<DataRequest>;
  getDataRequest(id: string): Promise<DataRequest | undefined>;
  getDataRequestsForUser(userId: string, userRole: string, userSchoolId?: string, userClusterId?: string, userDistrictId?: string): Promise<DataRequest[]>;
  updateDataRequest(id: string, updates: Partial<DataRequest>): Promise<DataRequest>;
  deleteDataRequest(id: string): Promise<void>;
  
  // Request assignee operations
  createRequestAssignee(assignee: InsertRequestAssignee): Promise<RequestAssignee>;
  getRequestAssignees(requestId: string): Promise<RequestAssignee[]>;
  updateRequestAssignee(id: string, updates: Partial<RequestAssignee>): Promise<RequestAssignee>;
}

export class DBStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(phoneNumber: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.phoneNumber, phoneNumber)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async createDataRequest(request: InsertDataRequest): Promise<DataRequest> {
    const result = await db.insert(dataRequests).values(request).returning();
    return result[0];
  }

  async getDataRequest(id: string): Promise<DataRequest | undefined> {
    const result = await db.select().from(dataRequests).where(eq(dataRequests.id, id)).limit(1);
    return result[0];
  }

  async getDataRequestsForUser(userId: string, userRole: string, userSchoolId?: string, userClusterId?: string, userDistrictId?: string): Promise<DataRequest[]> {
    const allRequests = await db.select().from(dataRequests).where(eq(dataRequests.isArchived, false));
    
    return allRequests.filter((request: DataRequest) => {
      // Creator always sees their requests
      if (request.createdBy === userId) return true;
      
      // Hierarchy visibility: superiors see all requests in their jurisdiction
      const hierarchyLevels: Record<string, number> = {
        CEO: 5,
        DEO: 4,
        DDEO: 3,
        AEO: 3,
        HEAD_TEACHER: 2,
        TEACHER: 1,
      };
      
      const creatorHierarchy = hierarchyLevels[request.createdByRole] || 0;
      const userHierarchyLevel = hierarchyLevels[userRole] || 0;
      
      if (userHierarchyLevel > creatorHierarchy) {
        // User is higher in hierarchy - check jurisdiction match
        if (userRole === 'CEO') return true; // CEO sees everything
        if (userRole === 'DEO') {
          return userDistrictId === request.createdByDistrictId;
        }
        if (userRole === 'DDEO') {
          return userDistrictId === request.createdByDistrictId;
        }
        if (userRole === 'AEO') {
          return userClusterId === request.createdByClusterId;
        }
        if (userRole === 'HEAD_TEACHER') {
          return userSchoolId === request.createdBySchoolId;
        }
      }
      
      return false;
    });
  }

  async updateDataRequest(id: string, updates: Partial<DataRequest>): Promise<DataRequest> {
    const result = await db.update(dataRequests)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(dataRequests.id, id))
      .returning();
    return result[0];
  }

  async deleteDataRequest(id: string): Promise<void> {
    await db.delete(dataRequests).where(eq(dataRequests.id, id));
  }

  async createRequestAssignee(assignee: InsertRequestAssignee): Promise<RequestAssignee> {
    const result = await db.insert(requestAssignees).values(assignee).returning();
    return result[0];
  }

  async getRequestAssignees(requestId: string): Promise<RequestAssignee[]> {
    return await db.select().from(requestAssignees).where(eq(requestAssignees.requestId, requestId));
  }

  async updateRequestAssignee(id: string, updates: Partial<RequestAssignee>): Promise<RequestAssignee> {
    const result = await db.update(requestAssignees)
      .set(updates)
      .where(eq(requestAssignees.id, id))
      .returning();
    return result[0];
  }
}

export const storage = new DBStorage();
