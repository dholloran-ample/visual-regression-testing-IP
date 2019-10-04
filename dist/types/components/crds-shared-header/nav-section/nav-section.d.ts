export declare class NavigationSection {
    sectionName: string;
    isActive: boolean;
    handleClick: Function;
    /**
     * Print log messages?
     */
    private debug;
    private console;
    private config;
    componentWillLoad(): void;
    onClick(event: any): void;
    render(): any;
}
