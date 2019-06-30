import '../../../stencil.core';
export declare class ProfileMenu {
    config: any;
    currentUser: any;
    onSignOut: Function;
    profileNavIsShowing: boolean;
    data: JSON;
    envUrl(path: any): string;
    handleClick(event: any): void;
    renderSections: (payload: any) => JSX.Element;
    renderChild: (child: any, topLevel: any) => JSX.Element;
    renderChildHTML: (child: any, topLevel: any) => any;
    render(): JSX.Element;
}
