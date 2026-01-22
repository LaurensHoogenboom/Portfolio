export class SliderSwipe {
	private startX: number = 0;
	private startY: number = 0;
	private isDragging: boolean = false;
	private isHorizontalSwipe: boolean | null = null;
	private threshold: number;
	private scrollContainer: HTMLElement;
	private indexChangeCallback: (index: number) => void;

	public currentElementScroll: number = 0;
	public currentIndex: number = 0;
	public maxIndex: number;

	constructor(scrollContainer: HTMLElement, indexChangeCallback: (index: number) => void, maxIndex: number, threshold?: number) {
		this.scrollContainer = scrollContainer;
		this.indexChangeCallback = indexChangeCallback;
		this.maxIndex = maxIndex;
		this.threshold = threshold ?? 100;
	}

	public run = () => {
		this.scrollContainer.addEventListener('touchstart', this.touchStart, { passive: true });
		this.scrollContainer.addEventListener('touchmove', this.touchMove, { passive: false });
		this.scrollContainer.addEventListener('touchend', this.touchEnd, { passive: true });
	}

	public dispose = () => {
		this.scrollContainer.removeEventListener('touchstart', this.touchStart);
		this.scrollContainer.removeEventListener('touchmove', this.touchMove);
		this.scrollContainer.removeEventListener('touchend', this.touchEnd);
	}

	private touchStart = (e: TouchEvent) => {
		this.startX = e.touches[0].clientX;
		this.startY = e.touches[0].clientY;
		this.isDragging = true;
		this.isHorizontalSwipe = null;
	}

	private touchMove = (e: TouchEvent) => {
		if (!this.isDragging) return;

		const absDiffX = Math.abs(e.touches[0].clientX - this.startX);
		const absDiffY = Math.abs(e.touches[0].clientY - this.startY);

		if (this.isHorizontalSwipe === null) {
			if (absDiffX < 5 && absDiffY < 5) return;
			this.isHorizontalSwipe = absDiffX > absDiffY;
		}

		if (!this.isHorizontalSwipe) {
			this.isDragging = false;
			return;
		}

		if (e.cancelable) e.preventDefault();

		const diffMove = e.touches[0].clientX - this.startX;
		this.scrollContainer.scrollTo({ left: this.currentElementScroll - diffMove });
	}

	private touchEnd = (e: TouchEvent) => {
		if (!this.isDragging) return;

		this.isDragging = false;

		const endX = e.changedTouches[0].clientX;
		const diff = this.startX - endX;

		if (Math.abs(diff) > this.threshold) {
			switch (true) {
				case diff > 0 && this.currentIndex < this.maxIndex:
					this.setSelectedIndex(this.currentIndex + 1);
					break;
				case diff < 0 && this.currentIndex > 0:
					this.setSelectedIndex(this.currentIndex - 1);
					break;
				default:
					this.snapBack()
					break;
			}
		} else this.snapBack();
	}

	private setSelectedIndex = (index: number) => {
		this.currentIndex = index;
		this.indexChangeCallback(index);
	}

	private snapBack = () => {
		this.scrollContainer.scrollTo({
			left: this.currentElementScroll,
			behavior: 'smooth'
		});
	}
}