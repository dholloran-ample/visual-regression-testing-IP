import '../../stencil.core';
export declare class SnailTrail {
    src: string;
    env: string;
    name: string;
    data: any;
    element: HTMLElement;
    componentWillLoad(): void;
    listItem(item: any): JSX.Element;
    list(section: any): any;
    navSections(): any;
    render(): JSX.Element;
}
