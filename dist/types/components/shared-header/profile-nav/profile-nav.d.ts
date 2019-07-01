export declare class ProfileMenu {
    config: any;
    currentUser: any;
    onSignOut: Function;
    profileNavIsShowing: boolean;
    data: JSON;
    envUrl(path: any): string;
    handleClick(event: any): void;
    renderSections: (payload: any) => any;
    renderChild: (child: any, topLevel: any) => any;
    renderChildHTML: (child: any, topLevel: any) => any;
    render(): any;
}
