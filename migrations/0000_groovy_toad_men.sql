CREATE TABLE "album_comments" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"album_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"user_name" text NOT NULL,
	"user_role" text NOT NULL,
	"comment" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "album_photos" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"album_id" varchar NOT NULL,
	"photo_url" text NOT NULL,
	"photo_file_name" text NOT NULL,
	"caption" text,
	"uploaded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "album_reactions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"album_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"user_name" text NOT NULL,
	"reaction_type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "announcements" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message" text NOT NULL,
	"created_by" varchar NOT NULL,
	"created_by_name" text NOT NULL,
	"created_by_role" text NOT NULL,
	"district_id" varchar,
	"is_active" boolean DEFAULT true NOT NULL,
	"priority" text DEFAULT 'medium' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "clusters" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"district_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "clusters_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "data_requests" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"created_by" varchar NOT NULL,
	"created_by_name" text NOT NULL,
	"created_by_role" text NOT NULL,
	"created_by_school_id" varchar,
	"created_by_cluster_id" varchar,
	"created_by_district_id" varchar,
	"priority" text DEFAULT 'medium' NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"is_archived" boolean DEFAULT false NOT NULL,
	"due_date" timestamp NOT NULL,
	"fields" json NOT NULL,
	"description_voice_url" text,
	"description_voice_file_name" text,
	"school_sheet_url" text,
	"aggregated_sheet_url" text,
	"sheet_generated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "districts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "districts_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "gps_tracking_points" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_id" varchar NOT NULL,
	"entity_type" text NOT NULL,
	"user_id" varchar NOT NULL,
	"latitude" text,
	"longitude" text,
	"accuracy" text,
	"altitude" text,
	"speed" text,
	"heading" text,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"synced" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "markazes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"tehsil_id" varchar NOT NULL,
	"district_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mentoring_visits" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"aeo_id" varchar NOT NULL,
	"aeo_name" text NOT NULL,
	"school_id" varchar,
	"school_name" text NOT NULL,
	"markaz" text,
	"tehsil" text,
	"visit_date" text NOT NULL,
	"arrival_time" text NOT NULL,
	"departure_time" text NOT NULL,
	"class_observed" text,
	"teacher_name" text,
	"subject" text,
	"indicators" json DEFAULT '[]'::json,
	"general_feedback" text,
	"strengths_observed" text,
	"areas_for_improvement" text,
	"action_items" text,
	"evidence" json DEFAULT '[]'::json,
	"voice_note_transcription" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"submitted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "monitoring_visits" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"aeo_id" varchar NOT NULL,
	"aeo_name" text NOT NULL,
	"school_id" varchar NOT NULL,
	"school_name" text NOT NULL,
	"markaz" text,
	"tehsil" text,
	"visit_date" text NOT NULL,
	"arrival_time" text NOT NULL,
	"departure_time" text NOT NULL,
	"teacher_total" integer DEFAULT 0 NOT NULL,
	"teacher_present" integer DEFAULT 0 NOT NULL,
	"teacher_percentage" integer DEFAULT 0 NOT NULL,
	"head_teacher_status" text DEFAULT 'yes' NOT NULL,
	"student_total" integer DEFAULT 0 NOT NULL,
	"student_present" integer DEFAULT 0 NOT NULL,
	"student_percentage" integer DEFAULT 0 NOT NULL,
	"furniture_total" integer DEFAULT 0 NOT NULL,
	"furniture_with" integer DEFAULT 0 NOT NULL,
	"furniture_without" integer DEFAULT 0 NOT NULL,
	"classroom_observation" text DEFAULT 'good' NOT NULL,
	"lnd_english_percent" integer DEFAULT 0 NOT NULL,
	"lnd_urdu_percent" integer DEFAULT 0 NOT NULL,
	"lnd_maths_percent" integer DEFAULT 0 NOT NULL,
	"nsb_allocation" bigint DEFAULT 0 NOT NULL,
	"nsb_expenditure" bigint DEFAULT 0 NOT NULL,
	"nsb_balance" bigint DEFAULT 0 NOT NULL,
	"nsb_utilization_percent" integer DEFAULT 0 NOT NULL,
	"toilet_student_total" integer DEFAULT 0 NOT NULL,
	"toilet_total" integer DEFAULT 0 NOT NULL,
	"toilet_required" integer DEFAULT 0 NOT NULL,
	"drinking_water" text DEFAULT 'available' NOT NULL,
	"hygiene_washrooms" text DEFAULT 'good' NOT NULL,
	"hygiene_building" text DEFAULT 'good' NOT NULL,
	"hygiene_classrooms" text DEFAULT 'good' NOT NULL,
	"retention_total" integer DEFAULT 0 NOT NULL,
	"retention_retained" integer DEFAULT 0 NOT NULL,
	"retention_dropped" integer DEFAULT 0 NOT NULL,
	"partial_facility_types" text,
	"partial_facility_reason" text,
	"data_health_variation" integer DEFAULT 0 NOT NULL,
	"general_remarks" text,
	"head_teacher_signature" boolean DEFAULT false NOT NULL,
	"aeo_signature" boolean DEFAULT false NOT NULL,
	"evidence" json DEFAULT '[]'::json,
	"voice_note_transcription" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"submitted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"type" text NOT NULL,
	"priority" text DEFAULT 'medium' NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"action_url" text,
	"related_id" varchar,
	"created_by" varchar,
	"created_by_name" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "office_visits" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"aeo_id" varchar NOT NULL,
	"aeo_name" text NOT NULL,
	"markaz" text,
	"tehsil" text,
	"visit_date" text NOT NULL,
	"arrival_time" text NOT NULL,
	"departure_time" text NOT NULL,
	"purpose" text,
	"activities_completed" json DEFAULT '{}'::json,
	"comments" text,
	"evidence" json DEFAULT '[]'::json,
	"status" text DEFAULT 'draft' NOT NULL,
	"submitted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "other_activities" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"aeo_id" varchar NOT NULL,
	"aeo_name" text NOT NULL,
	"activity_type" text NOT NULL,
	"activity_date" text NOT NULL,
	"start_time" text NOT NULL,
	"end_time" text NOT NULL,
	"description" text,
	"comments" text,
	"evidence" json DEFAULT '[]'::json,
	"status" text DEFAULT 'draft' NOT NULL,
	"submitted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "push_subscriptions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"endpoint" text NOT NULL,
	"p256dh" text NOT NULL,
	"auth" text NOT NULL,
	"feature_type" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "queries" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ticket_number" text NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"sender_id" varchar NOT NULL,
	"sender_name" text NOT NULL,
	"sender_role" text NOT NULL,
	"sender_school_id" varchar,
	"sender_school_name" text,
	"recipient_id" varchar NOT NULL,
	"recipient_name" text NOT NULL,
	"recipient_role" text NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"priority" text DEFAULT 'medium' NOT NULL,
	"category" text,
	"attachment_url" text,
	"attachment_file_name" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "queries_ticket_number_unique" UNIQUE("ticket_number")
);
--> statement-breakpoint
CREATE TABLE "query_responses" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"query_id" varchar NOT NULL,
	"sender_id" varchar NOT NULL,
	"sender_name" text NOT NULL,
	"sender_role" text NOT NULL,
	"message" text NOT NULL,
	"attachment_url" text,
	"attachment_file_name" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "request_assignees" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"user_name" text NOT NULL,
	"user_role" text NOT NULL,
	"school_id" varchar,
	"school_name" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"field_responses" json NOT NULL,
	"submitted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "school_albums" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"school_id" varchar NOT NULL,
	"school_name" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"created_by" varchar NOT NULL,
	"created_by_name" text NOT NULL,
	"created_by_role" text NOT NULL,
	"is_global_broadcast" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schools" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"emis_number" text NOT NULL,
	"cluster_id" varchar NOT NULL,
	"district_id" varchar NOT NULL,
	"tehsil_id" varchar,
	"markaz_id" varchar,
	"address" text,
	"total_students" integer DEFAULT 0,
	"present_students" integer DEFAULT 0,
	"absent_students" integer DEFAULT 0,
	"total_teachers" integer DEFAULT 0,
	"present_teachers" integer DEFAULT 0,
	"absent_teachers" integer DEFAULT 0,
	"total_toilets" integer DEFAULT 0,
	"working_toilets" integer DEFAULT 0,
	"broken_toilets" integer DEFAULT 0,
	"is_drinking_water_available" boolean DEFAULT false,
	"desks_new" integer DEFAULT 0,
	"desks_in_use" integer DEFAULT 0,
	"desks_broken" integer DEFAULT 0,
	"fans_new" integer DEFAULT 0,
	"fans_in_use" integer DEFAULT 0,
	"fans_broken" integer DEFAULT 0,
	"chairs_new" integer DEFAULT 0,
	"chairs_in_use" integer DEFAULT 0,
	"chairs_broken" integer DEFAULT 0,
	"blackboards_new" integer DEFAULT 0,
	"blackboards_in_use" integer DEFAULT 0,
	"blackboards_broken" integer DEFAULT 0,
	"computers_new" integer DEFAULT 0,
	"computers_in_use" integer DEFAULT 0,
	"computers_broken" integer DEFAULT 0,
	"data_last_updated" timestamp,
	"latitude" text,
	"longitude" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "schools_code_unique" UNIQUE("code"),
	CONSTRAINT "schools_emis_number_unique" UNIQUE("emis_number")
);
--> statement-breakpoint
CREATE TABLE "teacher_leaves" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teacher_id" varchar NOT NULL,
	"teacher_name" text NOT NULL,
	"school_id" varchar NOT NULL,
	"school_name" text NOT NULL,
	"leave_type" text NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"number_of_days" integer NOT NULL,
	"reason" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"evidence_url" text,
	"evidence_file_name" text,
	"approved_by" varchar,
	"approved_by_name" text,
	"approved_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tehsils" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"district_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"phone_number" text NOT NULL,
	"password" text NOT NULL,
	"role" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"school_id" varchar,
	"school_name" text,
	"cluster_id" varchar,
	"district_id" varchar,
	"tehsil_id" varchar,
	"tehsil_name" text,
	"markaz_id" varchar,
	"markaz_name" text,
	"gender" text,
	"father_name" text,
	"spouse_name" text,
	"email" text,
	"residential_address" text,
	"cnic" text,
	"date_of_birth" date,
	"date_of_joining" date,
	"qualification" text,
	"profile_picture" text,
	"assigned_schools" json DEFAULT '[]'::json,
	"markaz" text,
	"approver_role" text,
	"approver_id" varchar,
	"approved_at" timestamp,
	"profile_completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE "visit_logs" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"school_id" varchar NOT NULL,
	"school_name" text NOT NULL,
	"aeo_id" varchar NOT NULL,
	"aeo_name" text NOT NULL,
	"visit_start_time" timestamp NOT NULL,
	"visit_end_time" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "visit_sessions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"aeo_id" varchar NOT NULL,
	"aeo_name" text NOT NULL,
	"school_id" varchar,
	"school_name" text NOT NULL,
	"start_timestamp" timestamp DEFAULT now() NOT NULL,
	"start_latitude" text,
	"start_longitude" text,
	"start_location_source" text DEFAULT 'auto' NOT NULL,
	"end_timestamp" timestamp,
	"end_latitude" text,
	"end_longitude" text,
	"end_location_source" text,
	"status" text DEFAULT 'in_progress' NOT NULL,
	"notes" text,
	"monitoring_visit_id" varchar,
	"mentoring_visit_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "voice_recordings" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" varchar,
	"assignee_id" varchar,
	"field_id" varchar,
	"user_id" varchar NOT NULL,
	"user_name" text NOT NULL,
	"language" text DEFAULT 'en-US' NOT NULL,
	"transcription" text,
	"audio_data" text,
	"audio_mime_type" text DEFAULT 'audio/webm',
	"duration_seconds" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "album_comments" ADD CONSTRAINT "album_comments_album_id_school_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."school_albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "album_photos" ADD CONSTRAINT "album_photos_album_id_school_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."school_albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "album_reactions" ADD CONSTRAINT "album_reactions_album_id_school_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."school_albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "query_responses" ADD CONSTRAINT "query_responses_query_id_queries_id_fk" FOREIGN KEY ("query_id") REFERENCES "public"."queries"("id") ON DELETE cascade ON UPDATE no action;