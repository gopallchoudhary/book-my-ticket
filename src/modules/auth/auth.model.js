import { pgTable, varchar, text, uuid, timestamp, boolean } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar("name", { length: 50 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    isVerified: boolean("isVerified").notNull().default(false),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow()
})