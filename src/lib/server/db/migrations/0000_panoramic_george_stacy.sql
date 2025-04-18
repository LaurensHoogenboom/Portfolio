CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(255) NOT NULL,
	`slug` text(255) NOT NULL,
	`body` text,
	`tags` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
