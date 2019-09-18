export declare class NavigationLink {
    href: string;
    automationId: string;
    handleSignOut: Function;
    /**
     * Print log messages?
     */
    private debug;
    private console;
    private config;
    componentWillLoad(): void;
    onClick(event: any): void;
    isSignOutLink(): boolean;
    render(): any;
}
