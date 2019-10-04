import { HTMLStencilElement } from '../../stencil.core';
export declare class CrdsMediaCard {
    contentType: string;
    contentLayout: string;
    imageSrc: string;
    heading: string;
    meta: string;
    metaPosition: string;
    body: string;
    thumbnailSrc: string;
    url: string;
    element: HTMLStencilElement;
    isVisible: boolean;
    childProps: {};
    private propNames;
    private contentLayouts;
    private contentTypes;
    private metaPositions;
    private validateContentType;
    private validateContentLayout;
    private validateImage;
    private validateMeta;
    private validateMetaPosition;
    componentDidLoad(): void;
    componentWillLoad(): void;
    private runValidations;
    connectedCallback(): void;
    render(): any;
}
