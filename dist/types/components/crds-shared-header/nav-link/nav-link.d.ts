export declare class NavigationLink {
    /**
     * Print log messages?
     */
    private debug;
    private console;
    private config;
    href: string;
    automationId: string;
    handleSignOut: Function;
    componentWillLoad(): void;
    onClick(event: any): void;
    isSignOutLink(): boolean;
    render(): any;
}
