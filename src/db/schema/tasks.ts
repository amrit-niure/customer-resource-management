import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    text,
    boolean,
    integer
  } from "drizzle-orm/pg-core";
  import { 
    taskStatusEnum, 
    taskPriorityEnum, 
    taskTypeEnum 
  } from "./enums";
  import { users } from "./users";
  import { clients } from "./clients";
  import { appointments } from "./appointments";
  
  export const tasks = pgTable('tasks', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    
    // Assignee and Creator
    assignedToId: uuid('assigned_to_id').references(() => users.id),
    createdById: uuid('created_by_id').references(() => users.id).notNull(),
    
    // Optional client and appointment association
    clientId: uuid('client_id').references(() => clients.id),
    appointmentId: uuid('appointment_id').references(() => appointments.id),
    
    // Task Metadata
    status: taskStatusEnum('status').default('PENDING').notNull(),
    priority: taskPriorityEnum('priority').default('MEDIUM').notNull(),
    type: taskTypeEnum('type').notNull(),
    
    // Tracking and Deadlines
    dueDate: timestamp('due_date'),
    completedAt: timestamp('completed_at'),
    
    // Additional Tracking
    isUrgent: boolean('is_urgent').default(false).notNull(),
    estimatedWorkHours: integer('estimated_work_hours'),
    
    // Timestamps
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
  });