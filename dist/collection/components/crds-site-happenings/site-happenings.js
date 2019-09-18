import { h } from '@stencil/core';
import marked from 'marked';
import { Utils } from '../../shared/utils';
import { CrdsApollo } from '../../shared/apollo';
import { GET_SITES, GET_USER, SET_SITE, GET_PROMOS } from './site-happenings.graphql';
import { ContentBlockHandler } from '../../shared/contentBlocks/contentBlocks';
export class SiteHappenings {
    constructor() {
        this.analytics = window['analytics'] || {};
        this.contentfulSites = [];
        this.sites = [];
        this.happenings = [];
        this.user = null;
    }
    watchHandler(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.apolloClient = CrdsApollo(newValue);
            this.getUser();
        }
    }
    /** Stencil Personalization Components Defaults **/
    // This lets unit tests capture and confirm errors rather than listening in on console.error
    logError(err) {
        console.error(err);
    }
    getInViewDetails() {
        return { selectedSite: this.selectedSite };
    }
    /** Stencil Lifecycle methods **/
    componentDidLoad() {
        Utils.trackInView(this.host, 'HappeningComponent', this.getInViewDetails.bind(this));
    }
    componentWillLoad() {
        this.apolloClient = CrdsApollo(this.authToken);
        this.contentBlockHandler = new ContentBlockHandler(this.apolloClient, 'site happenings');
        Promise.all([this.getSites(), this.getPromos(), this.contentBlockHandler.getCopy(), this.getUser()]).then(() => {
            this.validateSelectedSite((this.user && this.user.site) || 'Churchwide');
        });
    }
    componentDidRender() {
        this.handleParentElementWidthBasedOnText(this.host.shadowRoot.querySelector('.happenings-dropdown-select'), this.selectedSite);
    }
    /** GraphQL I/O **/
    getSites() {
        return this.apolloClient
            .query({ query: GET_SITES })
            .then(response => {
            this.validateSites(response.data.sites);
            return;
        })
            .catch(err => {
            this.logError(err);
        });
    }
    getUser() {
        if (!this.authToken)
            return Promise.resolve(this.resetUser());
        return this.apolloClient
            .query({ query: GET_USER })
            .then(response => {
            const user = response.data.user;
            const siteName = user.site && user.site.name;
            this.validateUserSite(siteName);
            this.validateSelectedSite(this.user.site);
            return;
        })
            .catch(err => {
            this.resetUser();
            this.logError(err);
        });
    }
    getPromos() {
        return this.apolloClient
            .query({ query: GET_PROMOS })
            .then(response => {
            const promoList = response.data.promos;
            this.setHappenings(promoList);
            this.setContentfulSites();
            this.renderHappenings();
            return;
        })
            .catch(err => this.logError(err));
    }
    setUserSite(siteId) {
        return this.apolloClient
            .mutate({
            variables: { siteId: siteId },
            mutation: SET_SITE
        })
            .catch(err => {
            this.logError(err);
        });
    }
    /** Setters **/
    resetUser() {
        this.user = null;
        this.validateSelectedSite('Churchwide');
    }
    /**
     * Set sites after sorting and removing invalid/excluded sites
     * @param sites
     */
    validateSites(sites) {
        const allowedSites = sites.filter(site => typeof site.name === 'string' && site.name !== 'Not site specific' && site.name !== 'Xroads Church');
        this.sites = allowedSites.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    }
    /**
     * Sets user's site if new site is a non-empty string
     * @param siteName
     */
    validateUserSite(siteName) {
        if (typeof siteName === 'string' && siteName !== '') {
            this.user = { site: siteName };
        }
    }
    /**
     * Sets selectdSite to given site name if name meets conditions or 'Churchwide'.
     * This method will trigger a re-render of the component.
     * @param siteName
     */
    validateSelectedSite(siteName) {
        if (siteName === 'Not site specific' ||
            siteName === 'I do not attend Crossroads' ||
            siteName === 'Anywhere' ||
            siteName === '') {
            siteName = 'Churchwide';
        }
        if (this.contentfulSites.includes(siteName))
            this.selectedSite = siteName;
    }
    /**
     * Sets happenings to a list of Contentful promos with audiences
     * @param promoList
     */
    setHappenings(promoList) {
        this.happenings = promoList.filter(promo => promo.targetAudience !== null);
    }
    /**
     * Sets contentfulSites to unique contentful sites currently in happenings
     */
    setContentfulSites() {
        const uniqueAudiences = new Set();
        this.happenings.forEach(promo => promo.targetAudience.forEach(audience => uniqueAudiences.add(audience)));
        this.contentfulSites = Array.from(uniqueAudiences).sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));
    }
    /** Event handlers/DOM modifiers **/
    /**
     * Update selected site based on selection in dropdown
     * @param event
     */
    handleSiteSelection(event) {
        this.validateSelectedSite(event.target.value);
        this.analytics.track('HappeningSiteFiltered', {
            site: this.selectedSite
        });
    }
    /**
     * Override HTML's behavior of
     * sizing dropdowns to the largest
     * string in the list
     */
    handleParentElementWidthBasedOnText(element, text) {
        let tmpSelect = document.createElement('select');
        let styles = window.getComputedStyle(element);
        tmpSelect.style.visibility = 'hidden';
        tmpSelect.style.margin = styles.margin;
        tmpSelect.style.padding = styles.padding;
        tmpSelect.style.fontSize = styles.fontSize;
        tmpSelect.style.fontFamily = styles.fontFamily;
        tmpSelect.style.webkitAppearance = 'none';
        let tmpOption = document.createElement('option');
        tmpOption.innerText = text;
        tmpSelect.appendChild(tmpOption);
        this.host.shadowRoot.appendChild(tmpSelect);
        element.parentNode.style.width = `${tmpSelect.offsetWidth + 12}px`;
        this.host.shadowRoot.removeChild(tmpSelect);
    }
    /**
     * Report data to analytics when happenings card clicked
     * @param event
     */
    handleHappeningsClicked(event) {
        let target = event.target;
        let params = {
            title: target.tagName === 'A' ? target.innerText.toLowerCase() : target.alt.toLowerCase(),
            url: target.tagName === 'A' ? target.href : target.parentNode.href,
            userSite: (this.user && this.user.site) || 'logged out',
            selectedSite: this.selectedSite
        };
        this.analytics.track('HappeningCardClicked', {
            params
        });
    }
    /**
     * Receive user input from the select site
     * modal
     */
    handleSetSiteInput(event) {
        //Set variables
        const siteName = event.target.options[event.target.selectedIndex].text;
        this.validateUserSite(siteName);
        this.validateSelectedSite(siteName);
        //Modify DOM
        this.handleSetSiteModalClose();
        //Store changes to DB
        const selectedSiteId = event.target.value;
        this.setUserSite(selectedSiteId);
        //Report to analytics
        this.analytics.track('HappeningSiteUpdated', {
            id: selectedSiteId,
            name: this.selectedSite
        });
    }
    /**
     * Close the site select modal
     */
    handleSetSiteModalClose() {
        this.host.shadowRoot.querySelector('.site-select-message').classList.add('hidden');
    }
    /**
     * Map 4 fake cards while processing data
     * from ctfl
     */
    renderHappeningsSkeleton() {
        let arr = [];
        if (window.innerWidth < 768) {
            arr.push(1, 2);
        }
        else if (window.innerWidth < 960) {
            arr.push(1, 2, 3);
        }
        else {
            arr.push(1, 2, 3, 4);
        }
        return arr.map(() => (h("div", { class: "skeleton skeleton-happenings" },
            h("div", { class: "image shimmer" }),
            h("div", { class: "content" },
                h("div", { class: "overlap" },
                    h("div", { class: "text title shimmer" }),
                    h("div", { class: "text title shimmer" })),
                h("div", { class: "text subtitle shimmer" }),
                h("div", { class: "text subtitle shimmer" }),
                h("div", { class: "text subtitle shimmer" }),
                h("div", { class: "text subtitle shimmer" })))));
    }
    /**
     * Display happenings cards filtered by dropdown
     */
    renderHappenings() {
        if (!this.selectedSite)
            return this.renderHappeningsSkeleton();
        return this.happenings
            .filter(happening => happening.targetAudience.find(ta => ta === this.selectedSite))
            .map((obj, index) => (h("div", { class: "card carousel-cell", key: index },
            h("a", { class: "relative", href: obj.qualifiedUrl, onClick: event => this.handleHappeningsClicked(event) },
                h("img", { alt: obj.title, class: "img-responsive", src: Utils.imgixify(obj.imageUrl) + `?auto=format&w=400&h=300&fit=crop` })),
            h("div", { class: "card-block" },
                h("h4", { class: "card-title card-title--overlap text-uppercase" },
                    h("a", { href: obj.qualifiedUrl, onClick: event => this.handleHappeningsClicked(event) }, obj.title)),
                h("div", { class: "card-text", innerHTML: marked(obj.description || '') })))));
    }
    /**
     * Returns set site modal if conditions are met or empty string
     */
    maybeRenderSetSiteModal() {
        if (this.user && !this.isUserSiteSet())
            return this.renderSetSiteModal();
        return '';
    }
    /**
     * User selects site
     */
    renderSetSiteModal() {
        return (h("div", { class: "site-select-message" },
            h("button", { type: "button", class: "close", "aria-label": "Close", onClick: () => this.handleSetSiteModalClose() },
                h("svg", { xmlns: "http://www.w3.org/2000/svg" },
                    h("line", { x1: "1", y1: "10", x2: "10", y2: "1", stroke: "#fff", strokeWidth: "2" }),
                    h("line", { x1: "1", y1: "1", x2: "10", y2: "10", stroke: "#fff", strokeWidth: "2" }))),
            h("div", { class: "text-center push-top w-100" },
                this.contentBlockHandler.getContentBlock('SiteHappeningsPrompt'),
                h("div", { class: "happenings-dropdown", "data-automation-id": "happenings-choose-site" },
                    h("select", { class: "dropdown w-100", onInput: event => this.handleSetSiteInput(event) },
                        h("option", { disabled: true, selected: true }, "Choose a site"),
                        this.sites.map(site => (h("option", { value: site.id, "data-name": site.name }, site.name)))),
                    h("svg", { class: "dropdown-caret icon icon-1 pull-right push-left", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 237 152" },
                        h("path", { d: "M200.731 135.586L92.136 244.182c-1.854 1.853-4.05 2.78-6.587 2.78s-4.731-.927-6.586-2.78l-24.295-24.295c-1.854-1.854-2.781-4.05-2.781-6.587s.927-4.732 2.78-6.586L132.385 129 54.669 51.285c-1.854-1.853-2.781-4.05-2.781-6.586 0-2.537.927-4.732 2.78-6.587l24.296-24.295c1.854-1.853 4.05-2.78 6.586-2.78 2.537 0 4.732.927 6.587 2.78L200.73 122.414c1.854 1.853 2.781 4.049 2.781 6.586s-.927 4.732-2.78 6.586z", transform: "translate(-9 -53) rotate(90 127.7 129)" }))),
                h("p", null,
                    h("small", null, "*This will update the site field in your profile")))));
    }
    /** Helpers **/
    isUserSiteSet() {
        return this.user.site && this.user.site !== 'Not site specific';
    }
    /** Render **/
    render() {
        return (h("div", { class: "container push-top" },
            h("div", { class: "relative" },
                this.maybeRenderSetSiteModal(),
                h("hr", { class: "push-half-bottom" }),
                h("div", { class: "happenings-dropdown-container push-half-bottom" },
                    h("h4", { id: "happening-filter-label", class: "flush font-size-base font-family-base text-gray-light" }, "happening at crossroads"),
                    h("div", { class: "happenings-dropdown", "data-automation-id": "happenings-dropdown" },
                        h("select", { class: "happenings-dropdown-select font-family-base", onInput: event => this.handleSiteSelection(event) }, this.contentfulSites.map(siteName => (h("option", { value: siteName, selected: this.selectedSite === siteName }, siteName)))),
                        h("svg", { class: "dropdown-caret icon icon-1 pull-right push-left", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 237 152" },
                            h("path", { d: "M200.731 135.586L92.136 244.182c-1.854 1.853-4.05 2.78-6.587 2.78s-4.731-.927-6.586-2.78l-24.295-24.295c-1.854-1.854-2.781-4.05-2.781-6.587s.927-4.732 2.78-6.586L132.385 129 54.669 51.285c-1.854-1.853-2.781-4.05-2.781-6.586 0-2.537.927-4.732 2.78-6.587l24.296-24.295c1.854-1.853 4.05-2.78 6.586-2.78 2.537 0 4.732.927 6.587 2.78L200.73 122.414c1.854 1.853 2.781 4.049 2.781 6.586s-.927 4.732-2.78 6.586z", transform: "translate(-9 -53) rotate(90 127.7 129)" })),
                        this.selectedSite === (this.user && this.user.site) ? h("span", { class: "my-site-label" }, "(my site)") : '')),
                h("div", { class: "card-deck carousel", "data-crds-carousel": "mobile-scroll" },
                    h("div", { id: "section-what-s-happening", class: "feature-cards card-deck--expanded-layout carousel", "data-automation-id": "happenings-cards", "data-crds-carousel": "mobile-scroll" }, this.renderHappenings())))));
    }
    static get is() { return "crds-site-happenings"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["site-happenings.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["site-happenings.css"]
    }; }
    static get properties() { return {
        "authToken": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "auth-token",
            "reflect": false
        }
    }; }
    static get states() { return {
        "selectedSite": {}
    }; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "authToken",
            "methodName": "watchHandler"
        }]; }
}
