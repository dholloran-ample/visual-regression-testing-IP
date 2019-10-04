export declare class GlobalNav {
    env: string;
    data: any;
    openNavName: string;
    isAuthenticated: boolean;
    topOffset: number;
    private element;
    auth: any;
    componentWillLoad(): void;
    componentDidLoad(): void;
    handleSignOut(): void;
    authChangeCallback(): void;
    redirectToRoot(): void;
    isNavOpen(): boolean;
    toggleNav(event: any, navName: any, navRequiresAuth?: boolean): void;
    closeNav(event: any): void;
    rootURL(): string;
    authProfileIcon(): string;
    render(): any;
}
