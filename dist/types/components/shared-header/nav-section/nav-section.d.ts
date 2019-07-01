export declare class NavigationSection {
    id: string;
    activeSection: any;
    isActive: boolean;
    onActivate: any;
    /**
     * Print log messages?
     */
    private debug;
    private console;
    private config;
    componentWillLoad(): void;
    render(): any;
}
