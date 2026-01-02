CREATE TABLE `portfolioItems` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(120) NOT NULL,
	`description` text NOT NULL,
	`type` text NOT NULL,
	`image` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `portfolioItems_title_unique` ON `portfolioItems` (`title`);--> statement-breakpoint
DROP TABLE `drawings`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text(120) NOT NULL,
	`password` text NOT NULL,
	`securityQuestion` text(250) NOT NULL,
	`securityQuestionAnswer` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "username", "password", "securityQuestion", "securityQuestionAnswer", "created_at", "updated_at") SELECT "id", "username", "password", "securityQuestion", "securityQuestionAnswer", "created_at", "updated_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);