CREATE TABLE `uploads` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(120) NOT NULL,
	`description` text,
	`uploadFileType` text NOT NULL,
	`document` text,
	`image` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_portfolioItems` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(120) NOT NULL,
	`description` text,
	`type` text NOT NULL,
	`imageUploadId` text,
	`articleContent` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`imageUploadId`) REFERENCES `uploads`(`id`) ON UPDATE cascade ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_portfolioItems`("id", "title", "description", "type", "articleContent", "created_at", "updated_at") SELECT "id", "title", "description", "type", "articleContent", "created_at", "updated_at" FROM `portfolioItems`;--> statement-breakpoint
DROP TABLE `portfolioItems`;--> statement-breakpoint
ALTER TABLE `__new_portfolioItems` RENAME TO `portfolioItems`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `portfolioItems_title_unique` ON `portfolioItems` (`title`);