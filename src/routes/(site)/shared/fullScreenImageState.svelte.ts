interface IFullScreenImageState {
    visible: boolean,
    imgUrl: string,
    caption: string,
    showCaption: boolean,
    CSSClass?: string
}

const fullScreenImageState = $state({ state: {
    visible: false,
    imgUrl: "",
    caption: "",
    showCaption: false,
    CSSClass: undefined
} as IFullScreenImageState });

const showFullScreenImage = (url: string, caption: string, showCaption?: boolean, CSSClass?: string) => {
    fullScreenImageState.state = {
        visible: true,
        imgUrl: url,
        caption: caption,
        showCaption: showCaption ?? false,
        CSSClass: CSSClass
    }
}

const hideFullScreenImage = () => {
    fullScreenImageState.state.visible = false;
}

export { showFullScreenImage, hideFullScreenImage, fullScreenImageState };