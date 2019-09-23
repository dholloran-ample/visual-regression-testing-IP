export declare class MainMenu {
    mainNavIsShowing: boolean;
    data: JSON;
    promoData: string;
    activeSection: string;
    private simpleNav;
    constructor();
    navClasses(): string;
    handleBackClick(event: any): void;
    /**
    * Section handleSectionClick event handler
    * @param event Event
    * @param sectionName string
    */
    protected handleSectionClick(event: any, sectionName: any): void;
    /**
    * Renders all sections from payload
    */
    private maybeRenderSections;
    /**
     * Returns all subnav elements
     * @param data
     */
    private maybeRenderSubnavs;
    maybeRenderCtas(): any;
    render(): any;
}
