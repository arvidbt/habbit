CREATE TABLE `habbit_account` (
	`user_id` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`provider_account_id` text(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text(255),
	`scope` text(255),
	`id_token` text,
	`session_state` text(255),
	PRIMARY KEY(`provider`, `provider_account_id`),
	FOREIGN KEY (`user_id`) REFERENCES `habbit_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `habbit_habit_completions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`habit_id` integer,
	`completed_date` text NOT NULL,
	FOREIGN KEY (`habit_id`) REFERENCES `habbit_habit`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `habbit_habit` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`what` text(255) NOT NULL,
	`why` text(255) NOT NULL,
	`when` text(255) NOT NULL,
	`created_by` text(255) NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`created_by`) REFERENCES `habbit_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `habbit_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256),
	`created_by` text(255) NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`created_by`) REFERENCES `habbit_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `habbit_session` (
	`session_token` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `habbit_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `habbit_user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(255) NOT NULL,
	`email_verified` integer DEFAULT (unixepoch()),
	`image` text(255)
);
--> statement-breakpoint
CREATE TABLE `habbit_verification_token` (
	`identifier` text(255) NOT NULL,
	`token` text(255) NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE INDEX `account_user_id_idx` ON `habbit_account` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `habbit_habit_completions_habit_id_completed_date_unique` ON `habbit_habit_completions` (`habit_id`,`completed_date`);--> statement-breakpoint
CREATE INDEX `created_by_idx` ON `habbit_post` (`created_by`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `habbit_post` (`name`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `habbit_session` (`userId`);