import { sql } from "drizzle-orm";
import { pgTable, text, varchar, date, boolean, integer, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phoneNumber: text("phone_number").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(), // CEO, DEO, DDEO, AEO, HEAD_TEACHER, TEACHER
  schoolId: varchar("school_id"),
  schoolName: text("school_name"),
  clusterId: varchar("cluster_id"),
  districtId: varchar("district_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const dataRequests = pgTable("data_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  createdBy: varchar("created_by").notNull(),
  createdByName: text("created_by_name").notNull(),
  createdByRole: text("created_by_role").notNull(),
  createdBySchoolId: varchar("created_by_school_id"),
  createdByClusterId: varchar("created_by_cluster_id"),
  createdByDistrictId: varchar("created_by_district_id"),
  priority: text("priority").notNull().default("medium"), // low, medium, high
  status: text("status").notNull().default("active"), // draft, active, completed
  isArchived: boolean("is_archived").notNull().default(false),
  dueDate: timestamp("due_date").notNull(),
  fields: json("fields").notNull(), // JSON array of field definitions
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const requestAssignees = pgTable("request_assignees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  requestId: varchar("request_id").notNull(),
  userId: varchar("user_id").notNull(),
  userName: text("user_name").notNull(),
  userRole: text("user_role").notNull(),
  schoolId: varchar("school_id"),
  schoolName: text("school_name"),
  status: text("status").notNull().default("pending"), // pending, completed, overdue
  fieldResponses: json("field_responses").notNull(), // JSON array of responses
  submittedAt: timestamp("submitted_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertDataRequestSchema = createInsertSchema(dataRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRequestAssigneeSchema = createInsertSchema(requestAssignees).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDataRequest = z.infer<typeof insertDataRequestSchema>;
export type DataRequest = typeof dataRequests.$inferSelect;
export type InsertRequestAssignee = z.infer<typeof insertRequestAssigneeSchema>;
export type RequestAssignee = typeof requestAssignees.$inferSelect;
