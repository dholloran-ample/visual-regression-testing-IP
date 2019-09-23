export declare class SharedHeader {
    src: string;
    env: string;
    active: string;
    mainNavIsShowing: boolean;
    profileNavIsShowing: boolean;
    giveNavIsShowing: boolean;
    data: any;
    element: HTMLElement;
    /**
     * Fires before render...
     */
    componentWillLoad(): Promise<any>;
    componentDidLoad(): void;
    toggleMenu(event: any, navType: any): void;
    closeMenus(event: any): void;
    navCloseClasses(): string;
    handleScroll(event: any): void;
    /**
     * HTML
     */
    render(): any;
}
