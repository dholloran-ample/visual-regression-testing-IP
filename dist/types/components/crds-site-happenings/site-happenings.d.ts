import { HTMLStencilElement } from '../../stencil.core';
export declare class SiteHappenings {
    private analytics;
    private contentfulSites;
    private sites;
    private happenings;
    private apolloClient;
    private user;
    private contentBlockHandler;
    selectedSite: string;
    authToken: string;
    host: HTMLStencilElement;
    watchHandler(newValue: string, oldValue: string): void;
    /** Stencil Personalization Components Defaults **/
    private logError;
    getInViewDetails(): {};
    /** Stencil Lifecycle methods **/
    componentDidLoad(): void;
    componentWillLoad(): void;
    componentDidRender(): void;
    /** GraphQL I/O **/
    private getSites;
    private getUser;
    private getPromos;
    private setUserSite;
    /** Setters **/
    private resetUser;
    /**
     * Set sites after sorting and removing invalid/excluded sites
     * @param sites
     */
    private validateSites;
    /**
     * Sets user's site if new site is a non-empty string
     * @param siteName
     */
    private validateUserSite;
    /**
     * Sets selectdSite to given site name if name meets conditions or 'Churchwide'.
     * This method will trigger a re-render of the component.
     * @param siteName
     */
    private validateSelectedSite;
    /**
     * Sets happenings to a list of Contentful promos with audiences
     * @param promoList
     */
    private setHappenings;
    /**
     * Sets contentfulSites to unique contentful sites currently in happenings
     */
    private setContentfulSites;
    /** Event handlers/DOM modifiers **/
    /**
     * Update selected site based on selection in dropdown
     * @param event
     */
    private handleSiteSelection;
    /**
     * Override HTML's behavior of
     * sizing dropdowns to the largest
     * string in the list
     */
    private handleParentElementWidthBasedOnText;
    /**
     * Report data to analytics when happenings card clicked
     * @param event
     */
    private handleHappeningsClicked;
    /**
     * Receive user input from the select site
     * modal
     */
    private handleSetSiteInput;
    /**
     * Close the site select modal
     */
    private handleSetSiteModalClose;
    /**
     * Map 4 fake cards while processing data
     * from ctfl
     */
    private renderHappeningsSkeleton;
    /**
     * Display happenings cards filtered by dropdown
     */
    private renderHappenings;
    /**
     * Returns set site modal if conditions are met or empty string
     */
    private maybeRenderSetSiteModal;
    /**
     * User selects site
     */
    private renderSetSiteModal;
    /** Helpers **/
    private isUserSiteSet;
    /** Render **/
    render(): any;
}
