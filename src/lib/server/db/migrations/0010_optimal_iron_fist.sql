PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_portfolioItems` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(120) NOT NULL,
	`description` text,
	`type` text NOT NULL,
	`image` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_portfolioItems`("id", "title", "description", "type", "image", "created_at", "updated_at") SELECT "id", "title", "description", "type", "image", "created_at", "updated_at" FROM `portfolioItems`;--> statement-breakpoint
DROP TABLE `portfolioItems`;--> statement-breakpoint
ALTER TABLE `__new_portfolioItems` RENAME TO `portfolioItems`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `portfolioItems_title_unique` ON `portfolioItems` (`title`);