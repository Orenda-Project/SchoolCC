import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertDataRequestSchema, insertRequestAssigneeSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Data Requests endpoints
  app.post("/api/requests", async (req, res) => {
    try {
      const body = insertDataRequestSchema.parse(req.body);
      const request = await storage.createDataRequest(body);
      res.json(request);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.get("/api/requests", async (req, res) => {
    try {
      const { userId, userRole, schoolId, clusterId, districtId } = req.query as any;
      const requests = await storage.getDataRequestsForUser(userId, userRole, schoolId, clusterId, districtId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch requests" });
    }
  });

  app.get("/api/requests/:id", async (req, res) => {
    try {
      const request = await storage.getDataRequest(req.params.id);
      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }
      const assignees = await storage.getRequestAssignees(req.params.id);
      res.json({ ...request, assignees });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch request" });
    }
  });

  app.patch("/api/requests/:id", async (req, res) => {
    try {
      const request = await storage.updateDataRequest(req.params.id, req.body);
      res.json(request);
    } catch (error) {
      res.status(500).json({ error: "Failed to update request" });
    }
  });

  app.delete("/api/requests/:id", async (req, res) => {
    try {
      await storage.deleteDataRequest(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete request" });
    }
  });

  // Request Assignees endpoints
  app.post("/api/requests/:id/assignees", async (req, res) => {
    try {
      const body = insertRequestAssigneeSchema.parse({
        ...req.body,
        requestId: req.params.id,
      });
      const assignee = await storage.createRequestAssignee(body);
      res.json(assignee);
    } catch (error) {
      res.status(400).json({ error: "Invalid assignee" });
    }
  });

  app.patch("/api/assignees/:id", async (req, res) => {
    try {
      const assignee = await storage.updateRequestAssignee(req.params.id, req.body);
      res.json(assignee);
    } catch (error) {
      res.status(500).json({ error: "Failed to update assignee" });
    }
  });

  return httpServer;
}
