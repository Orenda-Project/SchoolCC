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
      INSERT INTO roles (id, role, is_active) VALUES
        (601, 'AEO', true),
        (602, 'TEACHER', true),
        (603, 'HEAD_TEACHER', true),
        (604, 'DEO', true),
        (605, 'DDEO', true),
        (606, 'CEO', true),
        (607, 'TRAINING_MANAGER', true),
        (608, 'COACH', true)
      ON CONFLICT (id) DO NOTHING
    `);
    log("Role IDs migration complete");
  } catch (e: any) {
    log("Role IDs migration skipped: " + (e?.message || e));
  }

  try {
    const fieldsCheck = await db.execute(sql`SELECT COUNT(*) as cnt FROM mentoring_fields`);
    const fieldsCount = Number((fieldsCheck as any)[0]?.cnt || 0);
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
    if ((colCheck as any).length > 0) {
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

  try {
    const obsCheck = await db.execute(sql`SELECT COUNT(*) as cnt FROM mentoring_observations`);
    const obsCount = Number((obsCheck as any)[0]?.cnt || 0);
    if (obsCount === 0) {
      await db.execute(sql`
        INSERT INTO mentoring_observations (observation_id, area_id, indicator_id, options_id, rationale_id) VALUES
        ('d6d2f3a7-606c-4dec-b092-b7b827297c74',329,229,253,1),('d6d2f3a7-606c-4dec-b092-b7b827297c74',329,239,487,18),('d6d2f3a7-606c-4dec-b092-b7b827297c74',329,283,209,35),('d6d2f3a7-606c-4dec-b092-b7b827297c74',385,471,209,36),('d6d2f3a7-606c-4dec-b092-b7b827297c74',385,222,209,37),('d6d2f3a7-606c-4dec-b092-b7b827297c74',385,216,253,6),('d6d2f3a7-606c-4dec-b092-b7b827297c74',123,224,209,39),('d6d2f3a7-606c-4dec-b092-b7b827297c74',123,409,209,40),('d6d2f3a7-606c-4dec-b092-b7b827297c74',123,253,209,41),('d6d2f3a7-606c-4dec-b092-b7b827297c74',123,413,209,42),('d6d2f3a7-606c-4dec-b092-b7b827297c74',119,494,209,43),('d6d2f3a7-606c-4dec-b092-b7b827297c74',119,346,487,28),('d6d2f3a7-606c-4dec-b092-b7b827297c74',119,314,487,29),('d6d2f3a7-606c-4dec-b092-b7b827297c74',166,280,209,46),('d6d2f3a7-606c-4dec-b092-b7b827297c74',166,285,209,47),('d6d2f3a7-606c-4dec-b092-b7b827297c74',166,275,487,32),
        ('4c4f215c-a1a2-4974-9a2b-c8749f022471',329,229,487,17),('4c4f215c-a1a2-4974-9a2b-c8749f022471',329,239,487,18),('4c4f215c-a1a2-4974-9a2b-c8749f022471',329,283,487,19),('4c4f215c-a1a2-4974-9a2b-c8749f022471',385,471,487,20),('4c4f215c-a1a2-4974-9a2b-c8749f022471',385,222,209,37),('4c4f215c-a1a2-4974-9a2b-c8749f022471',385,216,209,38),('4c4f215c-a1a2-4974-9a2b-c8749f022471',123,224,487,23),('4c4f215c-a1a2-4974-9a2b-c8749f022471',123,409,487,24),('4c4f215c-a1a2-4974-9a2b-c8749f022471',123,253,487,25),('4c4f215c-a1a2-4974-9a2b-c8749f022471',123,413,487,26),('4c4f215c-a1a2-4974-9a2b-c8749f022471',119,494,487,27),('4c4f215c-a1a2-4974-9a2b-c8749f022471',119,346,487,28),('4c4f215c-a1a2-4974-9a2b-c8749f022471',119,314,487,29),('4c4f215c-a1a2-4974-9a2b-c8749f022471',166,280,209,46),('4c4f215c-a1a2-4974-9a2b-c8749f022471',166,285,487,31),('4c4f215c-a1a2-4974-9a2b-c8749f022471',166,275,487,32),
        ('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',329,229,487,17),('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',329,239,487,18),('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',329,283,253,3),('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',385,471,487,20),('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',385,222,253,5),('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',385,216,487,22),('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',123,224,253,7),('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',123,409,253,8),('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',123,253,253,9),('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',123,413,253,10),('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',119,494,253,11),('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',119,346,253,12),('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',119,314,253,13),('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',166,280,253,14),('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',166,285,253,15),('ac0c2bdf-b1df-48d6-96c1-113e88605ac6',166,275,253,16),
        ('5e1615ec-89be-4171-852e-ac90e1b5c889',329,229,487,17),('5e1615ec-89be-4171-852e-ac90e1b5c889',329,239,487,18),('5e1615ec-89be-4171-852e-ac90e1b5c889',329,283,253,3),('5e1615ec-89be-4171-852e-ac90e1b5c889',385,471,487,20),('5e1615ec-89be-4171-852e-ac90e1b5c889',385,222,253,5),('5e1615ec-89be-4171-852e-ac90e1b5c889',385,216,487,22),('5e1615ec-89be-4171-852e-ac90e1b5c889',123,224,253,7),('5e1615ec-89be-4171-852e-ac90e1b5c889',123,409,253,8),('5e1615ec-89be-4171-852e-ac90e1b5c889',123,253,253,9),('5e1615ec-89be-4171-852e-ac90e1b5c889',123,413,253,10),('5e1615ec-89be-4171-852e-ac90e1b5c889',119,494,253,11),('5e1615ec-89be-4171-852e-ac90e1b5c889',119,346,253,12),('5e1615ec-89be-4171-852e-ac90e1b5c889',119,314,253,13),('5e1615ec-89be-4171-852e-ac90e1b5c889',166,280,253,14),('5e1615ec-89be-4171-852e-ac90e1b5c889',166,285,253,15),('5e1615ec-89be-4171-852e-ac90e1b5c889',166,275,253,16),
        ('3bec509d-202e-4a02-846b-bce8035135b8',329,229,487,17),('3bec509d-202e-4a02-846b-bce8035135b8',329,239,487,18),('3bec509d-202e-4a02-846b-bce8035135b8',329,283,253,3),('3bec509d-202e-4a02-846b-bce8035135b8',385,471,487,20),('3bec509d-202e-4a02-846b-bce8035135b8',385,222,253,5),('3bec509d-202e-4a02-846b-bce8035135b8',385,216,487,22),('3bec509d-202e-4a02-846b-bce8035135b8',123,224,253,7),('3bec509d-202e-4a02-846b-bce8035135b8',123,409,253,8),('3bec509d-202e-4a02-846b-bce8035135b8',123,253,253,9),('3bec509d-202e-4a02-846b-bce8035135b8',123,413,253,10),('3bec509d-202e-4a02-846b-bce8035135b8',119,494,253,11),('3bec509d-202e-4a02-846b-bce8035135b8',119,346,253,12),('3bec509d-202e-4a02-846b-bce8035135b8',119,314,253,13),('3bec509d-202e-4a02-846b-bce8035135b8',166,280,253,14),('3bec509d-202e-4a02-846b-bce8035135b8',166,285,253,15),('3bec509d-202e-4a02-846b-bce8035135b8',166,275,253,16),
        ('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',329,229,487,17),('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',329,239,487,18),('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',329,283,487,19),('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',385,471,487,20),('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',385,222,487,21),('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',385,216,487,22),('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',123,224,487,23),('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',123,409,487,24),('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',123,253,487,25),('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',123,413,487,26),('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',119,494,487,27),('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',119,346,487,28),('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',119,314,487,29),('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',166,280,487,30),('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',166,285,487,31),('94c4898c-daec-4f1d-9f9f-e3f1c02777ac',166,275,487,32),
        ('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',329,229,487,17),('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',329,239,487,18),('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',329,283,487,19),('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',385,471,253,4),('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',385,222,253,5),('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',385,216,253,6),('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',123,224,487,23),('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',123,409,487,24),('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',123,253,253,9),('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',123,413,253,10),('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',119,494,487,27),('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',119,346,253,12),('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',119,314,253,13),('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',166,280,253,14),('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',166,285,253,15),('58cf4196-8d8d-4fd1-8f8b-a4e6476e31f1',166,275,253,16),
        ('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',329,229,253,1),('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',329,239,253,2),('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',329,283,253,3),('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',385,471,253,4),('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',385,222,253,5),('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',385,216,253,6),('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',123,224,253,7),('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',123,409,253,8),('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',123,253,253,9),('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',123,413,253,10),('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',119,494,253,11),('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',119,346,253,12),('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',119,314,253,13),('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',166,280,253,14),('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',166,285,253,15),('9b955d3c-670c-41b5-9b84-a8d8be7bb9ab',166,275,253,16),
        ('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',329,229,487,17),('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',329,239,487,18),('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',329,283,487,19),('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',385,471,487,20),('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',385,222,487,21),('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',385,216,253,6),('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',123,224,253,7),('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',123,409,253,8),('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',123,253,253,9),('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',123,413,253,10),('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',119,494,253,11),('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',119,346,253,12),('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',119,314,253,13),('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',166,280,253,14),('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',166,285,487,31),('9b23e2b3-87f3-4b70-a48a-6bd42dacacb8',166,275,253,16),
        ('b561ae81-8076-4d50-949a-b64016f345b5',329,229,487,17),('b561ae81-8076-4d50-949a-b64016f345b5',329,239,487,18),('b561ae81-8076-4d50-949a-b64016f345b5',329,283,253,3),('b561ae81-8076-4d50-949a-b64016f345b5',385,471,487,20),('b561ae81-8076-4d50-949a-b64016f345b5',385,222,253,5),('b561ae81-8076-4d50-949a-b64016f345b5',385,216,487,22),('b561ae81-8076-4d50-949a-b64016f345b5',123,224,253,7),('b561ae81-8076-4d50-949a-b64016f345b5',123,409,253,8),('b561ae81-8076-4d50-949a-b64016f345b5',123,253,253,9),('b561ae81-8076-4d50-949a-b64016f345b5',123,413,253,10),('b561ae81-8076-4d50-949a-b64016f345b5',119,494,253,11),('b561ae81-8076-4d50-949a-b64016f345b5',119,346,253,12),('b561ae81-8076-4d50-949a-b64016f345b5',119,314,253,13),('b561ae81-8076-4d50-949a-b64016f345b5',166,280,253,14),('b561ae81-8076-4d50-949a-b64016f345b5',166,285,253,15),('b561ae81-8076-4d50-949a-b64016f345b5',166,275,253,16),
        ('47306552-899b-48d7-bf6a-a1704ccaadb6',329,229,487,17),('47306552-899b-48d7-bf6a-a1704ccaadb6',329,239,487,18),('47306552-899b-48d7-bf6a-a1704ccaadb6',329,283,253,3),('47306552-899b-48d7-bf6a-a1704ccaadb6',385,471,487,20),('47306552-899b-48d7-bf6a-a1704ccaadb6',385,222,253,5),('47306552-899b-48d7-bf6a-a1704ccaadb6',385,216,487,22),('47306552-899b-48d7-bf6a-a1704ccaadb6',123,224,253,7),('47306552-899b-48d7-bf6a-a1704ccaadb6',123,409,253,8),('47306552-899b-48d7-bf6a-a1704ccaadb6',123,253,253,9),('47306552-899b-48d7-bf6a-a1704ccaadb6',123,413,253,10),('47306552-899b-48d7-bf6a-a1704ccaadb6',119,494,253,11),('47306552-899b-48d7-bf6a-a1704ccaadb6',119,346,253,12),('47306552-899b-48d7-bf6a-a1704ccaadb6',119,314,253,13),('47306552-899b-48d7-bf6a-a1704ccaadb6',166,280,253,14),('47306552-899b-48d7-bf6a-a1704ccaadb6',166,285,253,15),('47306552-899b-48d7-bf6a-a1704ccaadb6',166,275,253,16),
        ('63c23e89-0e44-4c89-a674-dedf8ed828c6',329,229,487,17),('63c23e89-0e44-4c89-a674-dedf8ed828c6',329,239,487,18),('63c23e89-0e44-4c89-a674-dedf8ed828c6',329,283,253,3),('63c23e89-0e44-4c89-a674-dedf8ed828c6',385,471,487,20),('63c23e89-0e44-4c89-a674-dedf8ed828c6',385,222,253,5),('63c23e89-0e44-4c89-a674-dedf8ed828c6',385,216,487,22),('63c23e89-0e44-4c89-a674-dedf8ed828c6',123,224,253,7),('63c23e89-0e44-4c89-a674-dedf8ed828c6',123,409,253,8),('63c23e89-0e44-4c89-a674-dedf8ed828c6',123,253,253,9),('63c23e89-0e44-4c89-a674-dedf8ed828c6',123,413,253,10),('63c23e89-0e44-4c89-a674-dedf8ed828c6',119,494,253,11),('63c23e89-0e44-4c89-a674-dedf8ed828c6',119,346,253,12),('63c23e89-0e44-4c89-a674-dedf8ed828c6',119,314,253,13),('63c23e89-0e44-4c89-a674-dedf8ed828c6',166,280,253,14),('63c23e89-0e44-4c89-a674-dedf8ed828c6',166,285,253,15),('63c23e89-0e44-4c89-a674-dedf8ed828c6',166,275,253,16),
        ('1a62dc80-763b-4458-a79f-be12864119ad',329,229,487,17),('1a62dc80-763b-4458-a79f-be12864119ad',329,239,487,18),('1a62dc80-763b-4458-a79f-be12864119ad',329,283,253,3),('1a62dc80-763b-4458-a79f-be12864119ad',385,471,487,20),('1a62dc80-763b-4458-a79f-be12864119ad',385,222,253,5),('1a62dc80-763b-4458-a79f-be12864119ad',385,216,487,22),('1a62dc80-763b-4458-a79f-be12864119ad',123,224,253,7),('1a62dc80-763b-4458-a79f-be12864119ad',123,409,253,8),('1a62dc80-763b-4458-a79f-be12864119ad',123,253,253,9),('1a62dc80-763b-4458-a79f-be12864119ad',123,413,253,10),('1a62dc80-763b-4458-a79f-be12864119ad',119,494,253,11),('1a62dc80-763b-4458-a79f-be12864119ad',119,346,253,12),('1a62dc80-763b-4458-a79f-be12864119ad',119,314,253,13),('1a62dc80-763b-4458-a79f-be12864119ad',166,280,253,14),('1a62dc80-763b-4458-a79f-be12864119ad',166,285,253,15),('1a62dc80-763b-4458-a79f-be12864119ad',166,275,253,16),
        ('89d78fee-a4b8-4057-9045-b9e3fd68baea',329,229,487,17),('89d78fee-a4b8-4057-9045-b9e3fd68baea',329,239,487,18),('89d78fee-a4b8-4057-9045-b9e3fd68baea',329,283,487,19),('89d78fee-a4b8-4057-9045-b9e3fd68baea',385,471,253,4),('89d78fee-a4b8-4057-9045-b9e3fd68baea',385,222,253,5),('89d78fee-a4b8-4057-9045-b9e3fd68baea',385,216,253,6),('89d78fee-a4b8-4057-9045-b9e3fd68baea',123,224,487,23),('89d78fee-a4b8-4057-9045-b9e3fd68baea',123,409,487,24),('89d78fee-a4b8-4057-9045-b9e3fd68baea',123,253,253,9),('89d78fee-a4b8-4057-9045-b9e3fd68baea',123,413,253,10),('89d78fee-a4b8-4057-9045-b9e3fd68baea',119,494,487,27),('89d78fee-a4b8-4057-9045-b9e3fd68baea',119,346,253,12),('89d78fee-a4b8-4057-9045-b9e3fd68baea',119,314,253,13),('89d78fee-a4b8-4057-9045-b9e3fd68baea',166,280,253,14),('89d78fee-a4b8-4057-9045-b9e3fd68baea',166,285,253,15),('89d78fee-a4b8-4057-9045-b9e3fd68baea',166,275,253,16),
        ('44dd21f6-805a-4cf3-b810-bae08290398a',329,229,487,17),('44dd21f6-805a-4cf3-b810-bae08290398a',329,239,487,18),('44dd21f6-805a-4cf3-b810-bae08290398a',329,283,487,19),('44dd21f6-805a-4cf3-b810-bae08290398a',385,471,253,4),('44dd21f6-805a-4cf3-b810-bae08290398a',385,222,253,5),('44dd21f6-805a-4cf3-b810-bae08290398a',385,216,253,6),('44dd21f6-805a-4cf3-b810-bae08290398a',123,224,487,23),('44dd21f6-805a-4cf3-b810-bae08290398a',123,409,487,24),('44dd21f6-805a-4cf3-b810-bae08290398a',123,253,253,9),('44dd21f6-805a-4cf3-b810-bae08290398a',123,413,253,10),('44dd21f6-805a-4cf3-b810-bae08290398a',119,494,487,27),('44dd21f6-805a-4cf3-b810-bae08290398a',119,346,253,12),('44dd21f6-805a-4cf3-b810-bae08290398a',119,314,253,13),('44dd21f6-805a-4cf3-b810-bae08290398a',166,280,253,14),('44dd21f6-805a-4cf3-b810-bae08290398a',166,285,253,15),('44dd21f6-805a-4cf3-b810-bae08290398a',166,275,253,16),
        ('895b6823-586e-446c-8cf0-85fdc907472c',329,229,253,1),('895b6823-586e-446c-8cf0-85fdc907472c',329,239,253,2),('895b6823-586e-446c-8cf0-85fdc907472c',329,283,253,3),('895b6823-586e-446c-8cf0-85fdc907472c',385,471,253,4),('895b6823-586e-446c-8cf0-85fdc907472c',385,222,253,5),('895b6823-586e-446c-8cf0-85fdc907472c',385,216,253,6),('895b6823-586e-446c-8cf0-85fdc907472c',123,224,253,7),('895b6823-586e-446c-8cf0-85fdc907472c',123,409,253,8),('895b6823-586e-446c-8cf0-85fdc907472c',123,253,253,9),('895b6823-586e-446c-8cf0-85fdc907472c',123,413,253,10),('895b6823-586e-446c-8cf0-85fdc907472c',119,494,253,11),('895b6823-586e-446c-8cf0-85fdc907472c',119,346,253,12),('895b6823-586e-446c-8cf0-85fdc907472c',119,314,253,13),('895b6823-586e-446c-8cf0-85fdc907472c',166,280,253,14),('895b6823-586e-446c-8cf0-85fdc907472c',166,285,253,15),('895b6823-586e-446c-8cf0-85fdc907472c',166,275,253,16),
        ('afb8a714-7d4b-4fea-878e-8506e45b4566',329,229,487,17),('afb8a714-7d4b-4fea-878e-8506e45b4566',329,239,487,18),('afb8a714-7d4b-4fea-878e-8506e45b4566',329,283,253,3),('afb8a714-7d4b-4fea-878e-8506e45b4566',385,471,487,20),('afb8a714-7d4b-4fea-878e-8506e45b4566',385,222,253,5),('afb8a714-7d4b-4fea-878e-8506e45b4566',385,216,487,22),('afb8a714-7d4b-4fea-878e-8506e45b4566',123,224,253,7),('afb8a714-7d4b-4fea-878e-8506e45b4566',123,409,253,8),('afb8a714-7d4b-4fea-878e-8506e45b4566',123,253,253,9),('afb8a714-7d4b-4fea-878e-8506e45b4566',123,413,253,10),('afb8a714-7d4b-4fea-878e-8506e45b4566',119,494,253,11),('afb8a714-7d4b-4fea-878e-8506e45b4566',119,346,253,12),('afb8a714-7d4b-4fea-878e-8506e45b4566',119,314,253,13),('afb8a714-7d4b-4fea-878e-8506e45b4566',166,280,253,14),('afb8a714-7d4b-4fea-878e-8506e45b4566',166,285,253,15),('afb8a714-7d4b-4fea-878e-8506e45b4566',166,275,253,16),
        ('41654e9e-5bf4-4f8b-85be-273c9c14185a',329,229,253,1),('41654e9e-5bf4-4f8b-85be-273c9c14185a',329,239,253,2),('41654e9e-5bf4-4f8b-85be-273c9c14185a',329,283,253,3),('41654e9e-5bf4-4f8b-85be-273c9c14185a',385,471,253,4),('41654e9e-5bf4-4f8b-85be-273c9c14185a',385,222,253,5),('41654e9e-5bf4-4f8b-85be-273c9c14185a',385,216,253,6),('41654e9e-5bf4-4f8b-85be-273c9c14185a',123,224,253,7),('41654e9e-5bf4-4f8b-85be-273c9c14185a',123,409,253,8),('41654e9e-5bf4-4f8b-85be-273c9c14185a',123,253,253,9),('41654e9e-5bf4-4f8b-85be-273c9c14185a',123,413,253,10),('41654e9e-5bf4-4f8b-85be-273c9c14185a',119,494,253,11),('41654e9e-5bf4-4f8b-85be-273c9c14185a',119,346,253,12),('41654e9e-5bf4-4f8b-85be-273c9c14185a',119,314,253,13),('41654e9e-5bf4-4f8b-85be-273c9c14185a',166,280,253,14),('41654e9e-5bf4-4f8b-85be-273c9c14185a',166,285,253,15),('41654e9e-5bf4-4f8b-85be-273c9c14185a',166,275,253,16),
        ('f7e37b44-24ce-4fcb-829c-efa8e0801c97',329,229,253,1),('f7e37b44-24ce-4fcb-829c-efa8e0801c97',329,239,253,2),('f7e37b44-24ce-4fcb-829c-efa8e0801c97',329,283,253,3),('f7e37b44-24ce-4fcb-829c-efa8e0801c97',385,471,253,4),('f7e37b44-24ce-4fcb-829c-efa8e0801c97',385,222,253,5),('f7e37b44-24ce-4fcb-829c-efa8e0801c97',385,216,253,6),('f7e37b44-24ce-4fcb-829c-efa8e0801c97',123,224,253,7),('f7e37b44-24ce-4fcb-829c-efa8e0801c97',123,409,253,8),('f7e37b44-24ce-4fcb-829c-efa8e0801c97',123,253,253,9),('f7e37b44-24ce-4fcb-829c-efa8e0801c97',123,413,253,10),('f7e37b44-24ce-4fcb-829c-efa8e0801c97',119,494,253,11),('f7e37b44-24ce-4fcb-829c-efa8e0801c97',119,346,253,12),('f7e37b44-24ce-4fcb-829c-efa8e0801c97',119,314,253,13),('f7e37b44-24ce-4fcb-829c-efa8e0801c97',166,280,253,14),('f7e37b44-24ce-4fcb-829c-efa8e0801c97',166,285,253,15),('f7e37b44-24ce-4fcb-829c-efa8e0801c97',166,275,253,16),
        ('47f34808-e7b8-45ca-a8ab-6655937d2841',329,229,253,1),('47f34808-e7b8-45ca-a8ab-6655937d2841',329,239,253,2),('47f34808-e7b8-45ca-a8ab-6655937d2841',329,283,253,3),('47f34808-e7b8-45ca-a8ab-6655937d2841',385,471,253,4),('47f34808-e7b8-45ca-a8ab-6655937d2841',385,222,253,5),('47f34808-e7b8-45ca-a8ab-6655937d2841',385,216,253,6),('47f34808-e7b8-45ca-a8ab-6655937d2841',123,224,253,7),('47f34808-e7b8-45ca-a8ab-6655937d2841',123,409,253,8),('47f34808-e7b8-45ca-a8ab-6655937d2841',123,253,253,9),('47f34808-e7b8-45ca-a8ab-6655937d2841',123,413,253,10),('47f34808-e7b8-45ca-a8ab-6655937d2841',119,494,253,11),('47f34808-e7b8-45ca-a8ab-6655937d2841',119,346,253,12),('47f34808-e7b8-45ca-a8ab-6655937d2841',119,314,253,13),('47f34808-e7b8-45ca-a8ab-6655937d2841',166,280,253,14),('47f34808-e7b8-45ca-a8ab-6655937d2841',166,285,253,15),('47f34808-e7b8-45ca-a8ab-6655937d2841',166,275,253,16),
        ('45352229-8263-42ee-87b8-16c0c5809309',329,229,253,1),('45352229-8263-42ee-87b8-16c0c5809309',329,239,253,2),('45352229-8263-42ee-87b8-16c0c5809309',329,283,253,3),('45352229-8263-42ee-87b8-16c0c5809309',385,471,253,4),('45352229-8263-42ee-87b8-16c0c5809309',385,222,253,5),('45352229-8263-42ee-87b8-16c0c5809309',385,216,253,6),('45352229-8263-42ee-87b8-16c0c5809309',123,224,253,7),('45352229-8263-42ee-87b8-16c0c5809309',123,409,253,8),('45352229-8263-42ee-87b8-16c0c5809309',123,253,253,9),('45352229-8263-42ee-87b8-16c0c5809309',123,413,253,10),('45352229-8263-42ee-87b8-16c0c5809309',119,494,253,11),('45352229-8263-42ee-87b8-16c0c5809309',119,346,253,12),('45352229-8263-42ee-87b8-16c0c5809309',119,314,253,13),('45352229-8263-42ee-87b8-16c0c5809309',166,280,253,14),('45352229-8263-42ee-87b8-16c0c5809309',166,285,253,15),('45352229-8263-42ee-87b8-16c0c5809309',166,275,253,16),
        ('667a671a-4049-4f2f-9bf1-f6b4fd090177',329,229,253,1),('667a671a-4049-4f2f-9bf1-f6b4fd090177',329,239,253,2),('667a671a-4049-4f2f-9bf1-f6b4fd090177',329,283,253,3),('667a671a-4049-4f2f-9bf1-f6b4fd090177',385,471,253,4),('667a671a-4049-4f2f-9bf1-f6b4fd090177',385,222,253,5),('667a671a-4049-4f2f-9bf1-f6b4fd090177',385,216,253,6),('667a671a-4049-4f2f-9bf1-f6b4fd090177',123,224,253,7),('667a671a-4049-4f2f-9bf1-f6b4fd090177',123,409,253,8),('667a671a-4049-4f2f-9bf1-f6b4fd090177',123,253,253,9),('667a671a-4049-4f2f-9bf1-f6b4fd090177',123,413,253,10),('667a671a-4049-4f2f-9bf1-f6b4fd090177',119,494,253,11),('667a671a-4049-4f2f-9bf1-f6b4fd090177',119,346,253,12),('667a671a-4049-4f2f-9bf1-f6b4fd090177',119,314,253,13),('667a671a-4049-4f2f-9bf1-f6b4fd090177',166,280,253,14),('667a671a-4049-4f2f-9bf1-f6b4fd090177',166,285,253,15),('667a671a-4049-4f2f-9bf1-f6b4fd090177',166,275,253,16),
        ('09636915-a07f-4d5c-906a-bacd8f22d5e8',329,229,487,17),('09636915-a07f-4d5c-906a-bacd8f22d5e8',329,239,487,18),('09636915-a07f-4d5c-906a-bacd8f22d5e8',329,283,253,3),('09636915-a07f-4d5c-906a-bacd8f22d5e8',385,471,487,20),('09636915-a07f-4d5c-906a-bacd8f22d5e8',385,222,253,5),('09636915-a07f-4d5c-906a-bacd8f22d5e8',385,216,487,22),('09636915-a07f-4d5c-906a-bacd8f22d5e8',123,224,253,7),('09636915-a07f-4d5c-906a-bacd8f22d5e8',123,409,253,8),('09636915-a07f-4d5c-906a-bacd8f22d5e8',123,253,253,9),('09636915-a07f-4d5c-906a-bacd8f22d5e8',123,413,253,10),('09636915-a07f-4d5c-906a-bacd8f22d5e8',119,494,253,11),('09636915-a07f-4d5c-906a-bacd8f22d5e8',119,346,253,12),('09636915-a07f-4d5c-906a-bacd8f22d5e8',119,314,253,13),('09636915-a07f-4d5c-906a-bacd8f22d5e8',166,280,253,14),('09636915-a07f-4d5c-906a-bacd8f22d5e8',166,285,253,15),('09636915-a07f-4d5c-906a-bacd8f22d5e8',166,275,253,16),
        ('650b4695-91ca-406f-a379-99dc793f6171',329,229,253,1),('650b4695-91ca-406f-a379-99dc793f6171',329,239,253,2),('650b4695-91ca-406f-a379-99dc793f6171',329,283,253,3),('650b4695-91ca-406f-a379-99dc793f6171',385,471,253,4),('650b4695-91ca-406f-a379-99dc793f6171',385,222,253,5),('650b4695-91ca-406f-a379-99dc793f6171',385,216,253,6),('650b4695-91ca-406f-a379-99dc793f6171',123,224,253,7),('650b4695-91ca-406f-a379-99dc793f6171',123,409,253,8),('650b4695-91ca-406f-a379-99dc793f6171',123,253,253,9),('650b4695-91ca-406f-a379-99dc793f6171',123,413,253,10),('650b4695-91ca-406f-a379-99dc793f6171',119,494,253,11),('650b4695-91ca-406f-a379-99dc793f6171',119,346,253,12),('650b4695-91ca-406f-a379-99dc793f6171',119,314,253,13),('650b4695-91ca-406f-a379-99dc793f6171',166,285,253,15),('650b4695-91ca-406f-a379-99dc793f6171',166,275,253,16),
        ('20d88fb5-fad5-4790-8371-1758645269e7',329,229,253,1),('20d88fb5-fad5-4790-8371-1758645269e7',329,239,253,2),('20d88fb5-fad5-4790-8371-1758645269e7',329,283,253,3),('20d88fb5-fad5-4790-8371-1758645269e7',385,471,253,4),('20d88fb5-fad5-4790-8371-1758645269e7',385,222,253,5),('20d88fb5-fad5-4790-8371-1758645269e7',385,216,253,6),('20d88fb5-fad5-4790-8371-1758645269e7',123,224,253,7),('20d88fb5-fad5-4790-8371-1758645269e7',123,409,253,8),('20d88fb5-fad5-4790-8371-1758645269e7',123,253,253,9),('20d88fb5-fad5-4790-8371-1758645269e7',123,413,253,10),('20d88fb5-fad5-4790-8371-1758645269e7',119,494,253,11),('20d88fb5-fad5-4790-8371-1758645269e7',119,314,253,13),('20d88fb5-fad5-4790-8371-1758645269e7',166,280,253,14),('20d88fb5-fad5-4790-8371-1758645269e7',166,285,253,15),('20d88fb5-fad5-4790-8371-1758645269e7',166,275,253,16),
        ('95b05540-dc18-4554-b0c1-c8f889bda301',329,229,253,1),('95b05540-dc18-4554-b0c1-c8f889bda301',329,239,253,2),('95b05540-dc18-4554-b0c1-c8f889bda301',329,283,253,3),('95b05540-dc18-4554-b0c1-c8f889bda301',385,471,253,4),('95b05540-dc18-4554-b0c1-c8f889bda301',385,222,253,5),('95b05540-dc18-4554-b0c1-c8f889bda301',385,216,253,6),('95b05540-dc18-4554-b0c1-c8f889bda301',123,224,253,7),('95b05540-dc18-4554-b0c1-c8f889bda301',123,409,253,8),('95b05540-dc18-4554-b0c1-c8f889bda301',123,253,253,9),('95b05540-dc18-4554-b0c1-c8f889bda301',123,413,253,10),('95b05540-dc18-4554-b0c1-c8f889bda301',119,494,253,11),('95b05540-dc18-4554-b0c1-c8f889bda301',119,314,253,13),('95b05540-dc18-4554-b0c1-c8f889bda301',166,280,253,14),('95b05540-dc18-4554-b0c1-c8f889bda301',166,285,253,15),('95b05540-dc18-4554-b0c1-c8f889bda301',166,275,253,16),
        ('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',329,229,253,1),('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',329,239,253,2),('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',329,283,209,35),('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',385,471,253,4),('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',385,222,487,21),('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',385,216,253,6),('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',123,224,487,23),('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',123,409,253,8),('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',123,253,487,25),('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',123,413,209,42),('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',119,494,487,27),('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',119,346,487,28),('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',119,314,253,13),('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',166,280,487,30),('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',166,285,209,47),('4c69de1d-4d7a-4f9d-9a98-cac7577ef9d7',166,275,253,16),
        ('98163b39-0cea-493d-8ee5-1852dd1c7f8d',329,229,209,33),('98163b39-0cea-493d-8ee5-1852dd1c7f8d',329,239,487,18),('98163b39-0cea-493d-8ee5-1852dd1c7f8d',329,283,209,35),('98163b39-0cea-493d-8ee5-1852dd1c7f8d',385,471,487,20),('98163b39-0cea-493d-8ee5-1852dd1c7f8d',385,222,253,5),('98163b39-0cea-493d-8ee5-1852dd1c7f8d',385,216,253,6),('98163b39-0cea-493d-8ee5-1852dd1c7f8d',123,224,487,23),('98163b39-0cea-493d-8ee5-1852dd1c7f8d',123,409,487,24),('98163b39-0cea-493d-8ee5-1852dd1c7f8d',123,253,253,9),('98163b39-0cea-493d-8ee5-1852dd1c7f8d',123,413,253,10),('98163b39-0cea-493d-8ee5-1852dd1c7f8d',119,494,253,11),('98163b39-0cea-493d-8ee5-1852dd1c7f8d',119,346,253,12),('98163b39-0cea-493d-8ee5-1852dd1c7f8d',119,314,253,13),('98163b39-0cea-493d-8ee5-1852dd1c7f8d',166,280,487,30),('98163b39-0cea-493d-8ee5-1852dd1c7f8d',166,285,209,47),('98163b39-0cea-493d-8ee5-1852dd1c7f8d',166,275,487,32)
        ON CONFLICT DO NOTHING
      `);
      log("Migrated 445 observation records from CSV backup for 28 mentoring visits");
    }
  } catch (e: any) {
    log("Observations migration note: " + (e?.message || e));
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
