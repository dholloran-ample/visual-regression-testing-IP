export declare class MainMenu {
    isNavShowing: boolean;
    data: any;
    promoData: string;
    activeSection: string;
    handleBackClick(event: any): void;
    protected handleSectionClick(event: any, sectionName: any): void;
    maybeRenderSections(): any;
    renderSubNavOrCtas(): any;
    maybeRenderActiveSubNav(): any;
    getNavClass(): string;
    render(): any;
}
