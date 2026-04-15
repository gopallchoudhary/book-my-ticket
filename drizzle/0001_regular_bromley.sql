ALTER TABLE "users" RENAME COLUMN "isVerified" TO "refresh_token";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "createdAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email_verified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "updatedAt";