import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generateId, timestamp } from "../utils/utils";
import type { UploadFileType, IUploadedDocument, IUploadedImage } from "$lib/types/uploads";

const uploads = sqliteTable("uploads", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => generateId()),
    title: text("title", { length: 120 }).notNull().unique(),
    description: text("description"),
    fileType: text("uploadFileType").$type<UploadFileType>().notNull(),
    document: text("document", { mode: "json" }).$type<IUploadedDocument>(),
    image: text("image", {mode: "json"}).$type<IUploadedImage>(),
    ...timestamp
});

type Upload = typeof uploads.$inferSelect;

type UploadWithMeta = Upload & {
    isUsed: boolean;
    url?: string
}

export { uploads, type Upload, type UploadWithMeta }