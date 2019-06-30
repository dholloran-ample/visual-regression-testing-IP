import '../../../stencil.core';
export declare class SnailTrailLink {
    automationId: string;
    href: string;
    isActive: boolean;
    element: HTMLElement;
    componentWillLoad(): void;
    stripTrailingSlash(str: any): any;
    clicked(): void;
    render(): JSX.Element;
}
