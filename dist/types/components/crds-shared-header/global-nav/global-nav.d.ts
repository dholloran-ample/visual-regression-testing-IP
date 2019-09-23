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
    offset: number;
    private element;
    auth: any;
    initAuth(): void;
    componentDidLoad(): void;
    authChangeCallback(): void;
    handleSignOut(): void;
    redirectToRoot(): void;
    handleProfileClick(event: any): any;
    menuClasses(): string;
    profileClasses(): string;
    giveClasses(): string;
    rootURL(): string;
    render(): any;
}
