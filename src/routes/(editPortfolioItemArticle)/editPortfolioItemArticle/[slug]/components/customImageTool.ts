import ImageTool from "@editorjs/image";

export class CustomImage extends ImageTool {
    removed() {
        try {
            const url = this._data.file.url;
            if (!url) return;

            const filename = url.split(/[\\/]/).pop();
            if (!filename) return;

            const title = filename.split('.')[0];

            fetch(`/deleteUpload/${title}`, {
                method: 'POST'
            });
        } catch (error) {
            console.log(error);
        }
    }
}