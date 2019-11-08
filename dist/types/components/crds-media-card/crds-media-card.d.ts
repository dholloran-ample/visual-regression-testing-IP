import { HTMLStencilElement } from '../../stencil.core';
export declare class CrdsMediaCard {
    contentType: string;
    contentLayout: string;
    imageSrc: string;
    heading: string;
    category: string;
    meta: string;
    body: string;
    thumbnailSrc: string;
    url: string;
    mediaLabel: string;
    element: HTMLStencilElement;
    isVisible: boolean;
    childProps: {};
    private propNames;
    private contentLayouts;
    private contentTypes;
    private validateContentType;
    private validateContentLayout;
    private validateImage;
    componentDidLoad(): void;
    componentWillLoad(): void;
    private runValidations;
    connectedCallback(): void;
    render(): any;
}
