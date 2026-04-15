import { pgTable, varchar, text, uuid, timestamp, boolean } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 50 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 512 }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow().$onUpdate(() => new Date())
})