export declare class CrdsImage {
    src: string;
    size: string;
    imgDidLoad: boolean;
    cachedImg: HTMLElement;
    private imgWrapper;
    private sizes;
    private validateSize;
    connectedCallback(): void;
    addObserver(): void;
    componentDidLoad(): void;
    render(): any;
}
