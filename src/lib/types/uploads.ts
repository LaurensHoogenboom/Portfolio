type UploadFileType = 'image' | 'document';

interface IUploadedDocument {
    url: string
}

interface IThumbnail {
    url: string,
    aspectRatio: number;
}

interface IUploadedImage {
    url: string,
    thumbnail: IThumbnail,
}

export type { UploadFileType, IUploadedDocument, IThumbnail, IUploadedImage };