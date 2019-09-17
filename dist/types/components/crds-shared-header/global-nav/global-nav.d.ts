export declare class GlobalNav {
    config: Object;
    env: string;
    giveNavIsShowing: boolean;
    href: string;
    mainNavIsShowing: boolean;
    navClickHandler: Function;
    profileNavIsShowing: boolean;
    giveData: JSON;
    profileData: JSON;
    authenticated: boolean;
    auth: any;
    initAuth(): void;
    authChangeCallback(): void;
    handleSignOut(): void;
    handleProfileClick(event: any): any;
    menuClasses(): string;
    profileClasses(): string;
    giveClasses(): string;
    render(): any;
}
