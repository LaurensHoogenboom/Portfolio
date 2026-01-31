const uploadFileTypeStringMap = {
    image: 'image',
    document: 'document'
}

type UploadFileType = keyof typeof uploadFileTypeStringMap;

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

const isUploadFileType = (value: string): value is UploadFileType => {
    return value in uploadFileTypeStringMap;
}

export { type UploadFileType, type IUploadedDocument, type IThumbnail, type IUploadedImage, isUploadFileType };