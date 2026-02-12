import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { db } from "./db";
import { sql } from "drizzle-orm";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    limit: '10mb',
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false, limit: '10mb' }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS role_id integer`);
    await db.execute(sql`
      UPDATE users SET role_id = CASE role
        WHEN 'AEO' THEN 601
        WHEN 'TEACHER' THEN 602
        WHEN 'HEAD_TEACHER' THEN 603
        WHEN 'DEO' THEN 604
        WHEN 'DDEO' THEN 605
        WHEN 'CEO' THEN 606
        WHEN 'TRAINING_MANAGER' THEN 607
        WHEN 'COACH' THEN 608
        ELSE NULL
      END
      WHERE role_id IS NULL
    `);
    await db.execute(sql`
      INSERT INTO roles (id, role, is_active) VALUES (608, 'COACH', true)
      ON CONFLICT (id) DO NOTHING
    `);
    log("Role IDs migration complete");
  } catch (e: any) {
    log("Role IDs migration skipped: " + (e?.message || e));
  }

  try {
    const fieldsCheck = await db.execute(sql`SELECT COUNT(*) as cnt FROM mentoring_fields`);
    const fieldsCount = Number((fieldsCheck.rows[0] as any)?.cnt || 0);
    if (fieldsCount === 0) {
      await db.execute(sql`
        INSERT INTO mentoring_fields (id, areas, is_active) VALUES
        (119, 'Student Engagement', true),
        (123, 'Instructional Strategies', true),
        (166, 'Assessment and Feedback', true),
        (329, 'Classroom Environment', true),
        (385, 'Lesson Planning', true)
        ON CONFLICT (id) DO NOTHING
      `);
      await db.execute(sql`
        INSERT INTO mentoring_options (id, options, is_active, meaning) VALUES
        (209, 'Profficient', true, 'Strong or Meets Standard'),
        (253, 'Emerging', true, 'Weak or Needs Improvement'),
        (487, 'Developing', true, 'Average or Partial')
        ON CONFLICT (id) DO NOTHING
      `);
      await db.execute(sql`
        INSERT INTO mentoring_indicators (id, indicators, is_active, area_id, area_name) VALUES
        (216, 'The lesson integrates interdisciplinary or real-world applications.', true, 385, 'Lesson Planning'),
        (222, 'Lesson plans include strategies for promoting analysis, evaluation, and synthesis.', true, 385, 'Lesson Planning'),
        (224, 'The teacher poses open-ended and thought-provoking questions.', true, 123, 'Instructional Strategies'),
        (229, 'The classroom fosters open discussions and critical thinking.', true, 329, 'Classroom Environment'),
        (239, 'Resources and space are organized to support collaboration and problem-solving.', true, 329, 'Classroom Environment'),
        (253, 'The teacher demonstrates problem-solving and creativity in real-time scenarios.', true, 123, 'Instructional Strategies'),
        (275, 'Assessment tasks require students to analyse, evaluate, or create based on the lesson content.', true, 166, 'Assessment and Feedback'),
        (280, 'Students engage in self-assessment or peer-assessment to evaluate reasoning and solutions.', true, 166, 'Assessment and Feedback'),
        (283, 'Students are actively encouraged to participate in complex tasks with clear expectations.', true, 329, 'Classroom Environment'),
        (285, 'The teacher provides feedback that guides students in refining reasoning or solutions.', true, 166, 'Assessment and Feedback'),
        (314, 'Students actively engage in discussions and debates on complex topics.', true, 119, 'Student Engagement'),
        (346, 'The teacher encourages students to explore multiple perspectives or create novel solutions.', true, 119, 'Student Engagement'),
        (409, 'Instruction actively involves students in analyzing, interpreting, and critiquing content.', true, 123, 'Instructional Strategies'),
        (413, 'Scaffolding is used effectively to help students explore complex ideas.', true, 123, 'Instructional Strategies'),
        (471, 'Lesson objectives explicitly link to critical thinking, problem-solving, or creative skills.', true, 385, 'Lesson Planning'),
        (494, 'Students collaborate on tasks requiring synthesis, evaluation, or innovative problem-solving.', true, 119, 'Student Engagement')
        ON CONFLICT (id) DO NOTHING
      `);
      await db.execute(sql`
        INSERT INTO mentoring_rationaleoptions (id, rationale_id, rationale, is_active, options_id, indicator_id, area_id) VALUES
        (1,240,'Discussions are teacher-dominated with minimal student input. Example: Students answer only factual questions without follow-up.',true,253,229,329),
        (2,315,'Resources and space are disorganized, limiting collaborative learning. Example: No designated group work areas or materials for problem-solving tasks.',true,253,239,329),
        (3,292,'Students are given basic tasks without clear expectations. Example: Instructions are vague, and students struggle to engage in complex activities.',true,253,283,329),
        (4,366,'Objectives are vague or focused on rote learning. Example: "Understand the topic" with no reference to critical thinking or problem-solving.',true,253,471,385),
        (5,267,'Strategies focus on recall and comprehension. Example: Activities ask for definitions but no analysis or synthesis.',true,253,222,385),
        (6,485,'Lessons are taught in isolation without real-world relevance. Example: Math concepts are taught with no application.',true,253,216,385),
        (7,497,'Questions are mostly close-ended, requiring one-word answers. Example: "What is the capital of France?"',true,253,224,123),
        (8,344,'Students passively receive information. Example: The teacher explains a text without student critique.',true,253,409,123),
        (9,310,'Simple tasks are demonstrated without explanation of the problem-solving process. Example: "This is the solution," without steps.',true,253,253,123),
        (10,219,'Minimal or no scaffolding is provided. Example: Students are asked to solve problems independently without guidance.',true,253,413,123),
        (11,406,'Collaboration is minimal or absent. Example: Students work individually without interaction.',true,253,494,119),
        (12,276,'Content is presented from a single perspective. Example: Students are taught one method without alternatives.',true,253,346,119),
        (13,256,'Discussions are teacher-led with limited student involvement. Example: The teacher talks, and students answer briefly.',true,253,314,119),
        (14,464,'Assessment is limited to teacher-led grading. Example: Students receive a grade without reflecting on their performance.',true,253,280,166),
        (15,437,'Feedback is generic and not actionable. Example: "Good job" or "Try again" without specifics.',true,253,285,166),
        (16,262,'Assessment tasks focus on recall and do not involve higher-order thinking. Example: Quizzes with factual questions only.',true,253,275,166),
        (17,258,'Some encouragement for discussions, but student participation is limited. Example: Students share ideas, but few questions are asked to probe deeper.',true,487,229,329),
        (18,454,'Some organization, but space/resources do not fully support collaboration. Example: Materials are present but not effectively used for group activities.',true,487,239,329),
        (19,385,'Some students engage in complex tasks, but expectations are not consistently clear. Example: Instructions lack clarity for all groups.',true,487,283,329),
        (20,394,'Objectives mention higher-order skills but lack detailed alignment with activities. Example: "Analyse the text" without clear support for the analysis.',true,487,471,385),
        (21,364,'Some activities promote analysis or synthesis but lack variety or depth. Example: Students analyse a passage but do not synthesize ideas.',true,487,222,385),
        (22,473,'Some connections to real-world or interdisciplinary themes, but not fully integrated. Example: Mentioning real-world examples without exploring them.',true,487,216,385),
        (23,440,'Some open-ended questions are asked, but they lack depth. Example: "Why is the capital important?" without encouraging further exploration.',true,487,224,123),
        (24,445,'Some analysis and critique are encouraged, but it is not consistent. Example: Students are asked to analyse but not interpret or critique.',true,487,409,123),
        (25,344,'Problem-solving is modeled, but the teacher does not explain strategies. Example: "Let me solve this quickly for you."',true,487,253,123),
        (26,431,'Some scaffolding is provided, but it is inconsistent. Example: The teacher provides hints but does not guide students through complex steps.',true,487,413,123),
        (27,411,'Some collaboration occurs, but tasks lack depth. Example: Students share ideas but do not work towards a synthesized solution.',true,487,494,119),
        (28,285,'Multiple perspectives are mentioned, but exploration is limited. Example: The teacher describes perspectives but does not encourage student evaluation.',true,487,346,119),
        (29,318,'Some discussions and debates occur, but only a few students participate. Example: A few students contribute to a debate while others stay silent.',true,487,314,119),
        (30,444,'Some self- or peer-assessment occurs, but it is inconsistent. Example: Students assess each other''s work but without clear criteria.',true,487,280,166),
        (31,382,'Feedback is specific but does not consistently guide improvement. Example: "You missed this part; try to include it."',true,487,285,166),
        (32,456,'Some tasks involve analysis or evaluation but lack depth. Example: "Write a short analysis" with limited criteria for success.',true,487,275,166),
        (33,213,'Open discussions are encouraged, with students freely sharing and debating ideas. Example: Students discuss multiple solutions to a problem collaboratively.',true,209,229,329),
        (34,397,'Resources and space are well-organized for collaborative tasks. Example: Tables are arranged for group work, and materials are easily accessible.',true,209,239,329),
        (35,407,'Students actively participate in complex, clearly defined tasks. Example: The teacher assigns roles for group problem-solving and explains expectations.',true,209,283,329),
        (36,216,'Objectives are explicit and linked to HOTS. Example: "Evaluate the author''s argument and create your counterpoint with supporting evidence."',true,209,471,385),
        (37,388,'Assessment tasks consistently require analysis, evaluation, or creation. Example: "Develop a project that evaluates and improves this system."',true,209,222,385),
        (38,429,'Lessons integrate real-world applications and interdisciplinary links. Example: Students use math to design a sustainable business model.',true,209,216,385),
        (39,476,'Open-ended, thought-provoking questions dominate the lesson. Example: "How would you redesign this city to make it more sustainable?"',true,209,224,123),
        (40,240,'Students actively analyse, interpret, and critique content. Example: Students critique a historical argument with supporting evidence.',true,209,409,123),
        (41,260,'Problem-solving and creativity are modeled with clear strategies. Example: The teacher brainstorms solutions and explains the reasoning behind choices.',true,209,253,123),
        (42,237,'Effective scaffolding supports student exploration. Example: The teacher provides step-by-step guidance and gradually reduces support as students improve.',true,209,413,123),
        (43,356,'Collaboration is structured and focused on synthesis and problem-solving. Example: Students work in teams to design a solution to a community problem.',true,209,494,119),
        (44,325,'Students actively explore and evaluate multiple perspectives. Example: Students debate solutions and propose creative alternatives to a problem.',true,209,346,119),
        (45,443,'Discussions and debates actively involve all students. Example: Students collaboratively debate and refine their arguments in a group setting.',true,209,314,119),
        (46,267,'Self- and peer-assessment are structured and purposeful. Example: Students use rubrics to assess their work and suggest improvements for peers.',true,209,280,166),
        (47,206,'Feedback is specific, actionable, and focused on improvement. Example: "Your argument is clear, but adding evidence will make it stronger."',true,209,285,166),
        (48,288,'Assessment tasks consistently require analysis, evaluation, or creation. Example: "Develop a project that evaluates and improves this system."',true,209,275,166)
        ON CONFLICT (id) DO NOTHING
      `);
      log("Mentoring reference data seeded successfully");
    }
  } catch (e: any) {
    log("Mentoring seed data note: " + (e?.message || e));
  }

  try {
    const colCheck = await db.execute(sql`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'mentoring_visits' AND column_name = 'aeo_id'
    `);
    if (colCheck.rows && colCheck.rows.length > 0) {
      await db.execute(sql`ALTER TABLE mentoring_visits ADD COLUMN IF NOT EXISTS user_id varchar`);
      await db.execute(sql`ALTER TABLE mentoring_visits ADD COLUMN IF NOT EXISTS role_id integer`);
      await db.execute(sql`UPDATE mentoring_visits SET user_id = aeo_id WHERE user_id IS NULL`);
      await db.execute(sql`
        UPDATE mentoring_visits mv SET role_id = u.role_id 
        FROM users u WHERE mv.user_id = u.id AND mv.role_id IS NULL
      `);
      await db.execute(sql`ALTER TABLE mentoring_visits ALTER COLUMN user_id SET NOT NULL`);
      await db.execute(sql`ALTER TABLE mentoring_visits DROP COLUMN IF EXISTS aeo_id`);
      await db.execute(sql`ALTER TABLE mentoring_visits DROP COLUMN IF EXISTS indicators`);
      log("Mentoring visits aeo_id -> user_id migration complete");
    }
  } catch (e: any) {
    log("Mentoring visits migration note: " + (e?.message || e));
  }

  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);

  // reusePort is not supported on Windows
  const listenOptions: any = {
    port,
    host: "0.0.0.0",
  };

  if (process.platform !== 'win32') {
    listenOptions.reusePort = true;
  }

  httpServer.listen(listenOptions, () => {
    log(`serving on port ${port}`);
  });
})();
