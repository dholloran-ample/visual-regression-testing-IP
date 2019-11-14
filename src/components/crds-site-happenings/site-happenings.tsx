import { Component, Prop, State, Element, h, Watch } from '@stencil/core';
import marked from 'marked';
import { Utils } from '../../shared/utils';
import { CrdsUser, CrdsHappening, Site } from './site-happenings-interface';
import { deprecatedApolloInit } from '../../shared/apollo';
import ApolloClient from 'apollo-client';
import { GET_SITES, GET_USER, SET_SITE, GET_PROMOS, GET_COPY } from './site-happenings.graphql';
import { HTMLStencilElement } from '@stencil/core/internal';
import { ContentBlockHandler } from '../../shared/contentBlocks/contentBlocks';
@Component({
  tag: 'crds-site-happenings',
  styleUrl: 'site-happenings.scss',
  shadow: true
})
export class SiteHappenings {
  private analytics = window['analytics'];
  private contentfulSites: string[] = [];
  private sites: Site[] = [];
  private happenings: CrdsHappening[] = [];
  private apolloClient: ApolloClient<{}>;
  private user: CrdsUser = null;
  private contentBlockHandler: ContentBlockHandler;

  @State() selectedSite: string;
  @Prop() authToken: string;

  @Element() host: HTMLStencilElement;

  @Watch('authToken')
  watchHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.apolloClient = deprecatedApolloInit(newValue);
      this.getUser();
    }
  }

  /** Stencil Personalization Components Defaults **/
  // This lets unit tests capture and confirm errors rather than listening in on console.error
  private logError(err) {
    console.error(err);
  }

  public getInViewDetails(): {} {
    return { selectedSite: this.selectedSite };
  }

  /** Stencil Lifecycle methods **/
  public componentDidLoad() {
    Utils.trackInView(this.host, 'HappeningComponent', this.getInViewDetails.bind(this));
  }

  public componentWillLoad() {
    this.apolloClient = deprecatedApolloInit(this.authToken);
    this.contentBlockHandler = new ContentBlockHandler(this.apolloClient, 'site happenings');
    Promise.all([this.getSites(), this.getPromos(), this.contentBlockHandler.getCopy(), this.getUser()]).then(() => {
      this.validateSelectedSite((this.user && this.user.site) || 'Churchwide');
    });
  }

  public componentDidRender() {
    this.handleParentElementWidthBasedOnText(
      this.host.shadowRoot.querySelector('.happenings-dropdown-select'),
      this.selectedSite
    );
  }

  /** GraphQL I/O **/
  private getSites(): Promise<any> {
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

  private getUser(): Promise<any> {
    if (!this.authToken) return Promise.resolve(this.resetUser());
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

  private getPromos(): Promise<any> {
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

  private setUserSite(siteId) {
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

  private resetUser() {
    this.user = null;
    this.validateSelectedSite('Churchwide');
  }

  /**
   * Set sites after sorting and removing invalid/excluded sites
   * @param sites
   */
  private validateSites(sites) {
    const allowedSites = sites.filter(
      site => typeof site.name === 'string' && site.name !== 'Not site specific' && site.name !== 'Xroads Church'
    );
    this.sites = allowedSites.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  }

  /**
   * Sets user's site if new site is a non-empty string
   * @param siteName
   */
  private validateUserSite(siteName) {
    if (typeof siteName === 'string' && siteName !== '') {
      this.user = { site: siteName };
    }
  }

  /**
   * Sets selectdSite to given site name if name meets conditions or 'Churchwide'.
   * This method will trigger a re-render of the component.
   * @param siteName
   */
  private validateSelectedSite(siteName) {
    if (
      siteName === 'Not site specific' ||
      siteName === 'I do not attend Crossroads' ||
      siteName === 'Anywhere' ||
      siteName === ''
    ) {
      siteName = 'Churchwide';
    }
    if (this.contentfulSites.includes(siteName)) this.selectedSite = siteName;
  }

  /**
   * Sets happenings to a list of Contentful promos with audiences
   * @param promoList
   */
  private setHappenings(promoList) {
    this.happenings = promoList.filter(promo => promo.targetAudience !== null);
  }

  /**
   * Sets contentfulSites to unique contentful sites currently in happenings
   */
  private setContentfulSites() {
    const uniqueAudiences = new Set<string>();
    this.happenings.forEach(promo => promo.targetAudience.forEach(audience => uniqueAudiences.add(audience)));
    this.contentfulSites = Array.from<string>(uniqueAudiences).sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));
  }

  /** Event handlers/DOM modifiers **/

  /**
   * Update selected site based on selection in dropdown
   * @param event
   */
  private handleSiteSelection(event) {
    this.validateSelectedSite(event.target.value);
    if(this.analytics) {
      this.analytics.track('HappeningSiteFiltered', {
        site: this.selectedSite
      });
    }
  }

  /**
   * Override HTML's behavior of
   * sizing dropdowns to the largest
   * string in the list
   */
  private handleParentElementWidthBasedOnText(element, text) {
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
  private handleHappeningsClicked(event) {
    let target = event.target;

    let params = {
      title: target.tagName === 'A' ? target.innerText.toLowerCase() : target.alt.toLowerCase(),
      url: target.tagName === 'A' ? target.href : target.parentNode.href,
      userSite: (this.user && this.user.site) || 'logged out',
      selectedSite: this.selectedSite
    };

    if(this.analytics) {
      this.analytics.track('HappeningCardClicked', {
        params
      });
    }
  }

  /**
   * Receive user input from the select site
   * modal
   */
  private handleSetSiteInput(event) {
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
    if(this.analytics) {
      this.analytics.track('HappeningSiteUpdated', {
        id: selectedSiteId,
        name: this.selectedSite
      });
    }
  }

  /**
   * Close the site select modal
   */
  private handleSetSiteModalClose() {
    this.host.shadowRoot.querySelector('.site-select-message').classList.add('hidden');
  }

  /**
   * Map 4 fake cards while processing data
   * from ctfl
   */
  private renderHappeningsSkeleton() {
    let arr = [];
    if (window.innerWidth < 768) {
      arr.push(1, 2);
    } else if (window.innerWidth < 960) {
      arr.push(1,2,3);
    } else {
      arr.push(1,2,3,4);
    }
    return arr.map(() => (
      <div class="skeleton skeleton-happenings">
        <div class="image shimmer" />
        <div class="content">
          <div class="overlap">
            <div class="text title shimmer" />
            <div class="text title shimmer" />
          </div>
          <div class="text subtitle shimmer" />
          <div class="text subtitle shimmer" />
          <div class="text subtitle shimmer" />
          <div class="text subtitle shimmer" />
        </div>
      </div>
    ));
  }

  /**
   * Display happenings cards filtered by dropdown
   */
  private renderHappenings() {
    if (!this.selectedSite) return this.renderHappeningsSkeleton();
    return this.happenings
      .filter(happening => happening.targetAudience.find(ta => ta === this.selectedSite))
      .map((obj, index) => (
        <div class="card carousel-cell" key={index}>
          <a class="relative" href={obj.qualifiedUrl} onClick={event => this.handleHappeningsClicked(event)}>
            <img
              alt={obj.title}
              class="img-responsive"
              src={Utils.imgixify(obj.imageUrl) + `?auto=format&w=400&h=300&fit=crop`}
            />
          </a>
          <div class="card-block">
            <h4 class="card-title card-title--overlap text-uppercase">
              <a href={obj.qualifiedUrl} onClick={event => this.handleHappeningsClicked(event)}>
                {obj.title}
              </a>
            </h4>
            <div class="card-text" innerHTML={marked(obj.description || '')} />
          </div>
        </div>
      ));
  }

  /**
   * Returns set site modal if conditions are met or empty string
   */
  private maybeRenderSetSiteModal() {
    if (this.user && !this.isUserSiteSet()) return this.renderSetSiteModal();
    return '';
  }

  /**
   * User selects site
   */
  private renderSetSiteModal() {
    return (
      <div class="site-select-message">
        <button type="button" class="close" aria-label="Close" onClick={() => this.handleSetSiteModalClose()}>
          <svg xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="10" x2="10" y2="1" stroke="#fff" strokeWidth="2" />
            <line x1="1" y1="1" x2="10" y2="10" stroke="#fff" strokeWidth="2" />
          </svg>
        </button>
        <div class="text-center push-top w-100">
          {this.contentBlockHandler.getContentBlock('SiteHappeningsPrompt')}
          <div class="happenings-dropdown" data-automation-id="happenings-choose-site">
            <select class="dropdown w-100" onInput={event => this.handleSetSiteInput(event)}>
              <option disabled selected>
                Choose a site
              </option>
              {this.sites.map(site => (
                <option value={site.id} data-name={site.name}>
                  {site.name}
                </option>
              ))}
            </select>
            <svg
              class="dropdown-caret icon icon-1 pull-right push-left"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 237 152"
            >
              <path
                d="M200.731 135.586L92.136 244.182c-1.854 1.853-4.05 2.78-6.587 2.78s-4.731-.927-6.586-2.78l-24.295-24.295c-1.854-1.854-2.781-4.05-2.781-6.587s.927-4.732 2.78-6.586L132.385 129 54.669 51.285c-1.854-1.853-2.781-4.05-2.781-6.586 0-2.537.927-4.732 2.78-6.587l24.296-24.295c1.854-1.853 4.05-2.78 6.586-2.78 2.537 0 4.732.927 6.587 2.78L200.73 122.414c1.854 1.853 2.781 4.049 2.781 6.586s-.927 4.732-2.78 6.586z"
                transform="translate(-9 -53) rotate(90 127.7 129)"
              />
            </svg>
          </div>
          <p>
            <small>*This will update the site field in your profile</small>
          </p>
        </div>
      </div>
    );
  }

  /** Helpers **/
  private isUserSiteSet(): Boolean {
    return this.user.site && this.user.site !== 'Not site specific';
  }

  /** Render **/

  public render() {
    return (
      <div class="container">
        <div class="relative">
          {this.maybeRenderSetSiteModal()}
          <hr class="push-half-bottom" />
          <div class="happenings-dropdown-container push-half-bottom">
            <h4 id="happening-filter-label" class="flush font-size-base font-family-base text-gray-light">
              happening at crossroads
            </h4>
            <div class="happenings-dropdown" data-automation-id="happenings-dropdown">
              <select
                class="happenings-dropdown-select font-family-base"
                onInput={event => this.handleSiteSelection(event)}
              >
                {this.contentfulSites.map(siteName => (
                  <option value={siteName} selected={this.selectedSite === siteName}>
                    {siteName}
                  </option>
                ))}
              </select>
              <svg
                class="dropdown-caret icon icon-1 pull-right push-left"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 237 152"
              >
                <path
                  d="M200.731 135.586L92.136 244.182c-1.854 1.853-4.05 2.78-6.587 2.78s-4.731-.927-6.586-2.78l-24.295-24.295c-1.854-1.854-2.781-4.05-2.781-6.587s.927-4.732 2.78-6.586L132.385 129 54.669 51.285c-1.854-1.853-2.781-4.05-2.781-6.586 0-2.537.927-4.732 2.78-6.587l24.296-24.295c1.854-1.853 4.05-2.78 6.586-2.78 2.537 0 4.732.927 6.587 2.78L200.73 122.414c1.854 1.853 2.781 4.049 2.781 6.586s-.927 4.732-2.78 6.586z"
                  transform="translate(-9 -53) rotate(90 127.7 129)"
                />
              </svg>
              {this.selectedSite === (this.user && this.user.site) ? <span class="my-site-label">(my site)</span> : ''}
            </div>
          </div>
          <div class="card-deck carousel" data-crds-carousel="mobile-scroll">
            <div
              id="section-what-s-happening"
              class="feature-cards card-deck--expanded-layout carousel"
              data-automation-id="happenings-cards"
              data-crds-carousel="mobile-scroll"
            >
              {this.renderHappenings()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
