CREATE TABLE `workspaces` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(120) NOT NULL,
	`navigationItems` text,
	`adminRequired` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `workspaces_title_unique` ON `workspaces` (`title`);