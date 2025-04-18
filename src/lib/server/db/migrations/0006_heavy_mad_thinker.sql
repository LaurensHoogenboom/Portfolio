CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text(120) NOT NULL,
	`password` text(120) NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);