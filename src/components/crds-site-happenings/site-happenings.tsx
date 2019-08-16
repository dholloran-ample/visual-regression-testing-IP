import { Component, Prop, State, Element, h, Watch } from '@stencil/core';
import axios from 'axios';
import marked from 'marked';
import { Utils } from '../../shared/utils';
import { CrdsUser, CrdsHappening, MpCongregation } from './site-happenings-interface';

@Component({
  tag: 'crds-site-happenings',
  styleUrl: 'site-happenings.scss',
  shadow: true
})
export class SiteHappenings {
  private analytics = window['analytics'] || {};
  private gqlUrl = process.env.CRDS_GQL_ENDPOINT;
  private contentfulSites: string[] = [];
  private mpSites: MpCongregation[] = [];
  private happenings: CrdsHappening[] = [];
  private user: CrdsUser = { name: '', site: '' };
  private observer;
  private inViewCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.analytics.track('HappeningComponentInView', {
          target: entry.target,
          selectedSite: this.selectedSite
        });
      }
    });
  };

  constructor(){
    if (!('IntersectionObserver' in window)){
      //TODO add better fallback if IntersectionObserver not supported
      this.observer = () => { };
    } else {
      this.observer = new IntersectionObserver(this.inViewCallback, {
        threshold: 1.0
      });
    }
  }

  @Prop() authToken: string;
  @State() selectedSite: string = 'Churchwide';
  @Element() host: HTMLElement;

  renderedEvent = new CustomEvent('component rendered', {
    detail: this.host
  });

  @Watch('authToken')
  watchHandler(newValue: string, oldValue: string) {
    console.log(`watching authToken change. old val: ${oldValue} vs new val: ${newValue}`);
    if (newValue !== oldValue) {
      this.fetchMpData();
    }
  }

  /** Stencil Lifecycle methods **/
  /**
   * Check to see if user is authenticated
   * then fetch MP data is applicable
   */
  //What happens if this isn't called when logged out? the skeleton loads and isn't replaced
  componentWillLoad() {
    return Promise.all([this.fetchMpData(), this.fetchContentfulPromoData()]);
  }

  /**
  * Update the width of the dropdown based
  * on the current selected site
  */
  componentDidRender() {
    this.handleSelectorWidthBasedOnText(this.host.shadowRoot.querySelector('.happenings-dropdown-select'), this.selectedSite);
    document.dispatchEvent(this.renderedEvent);
    this.observer.observe(this.host);
  }

  /** GraphQL I/O **/
  private fetchMpData() {
    if (this.authToken) {
      return Promise.all([
        this.fetchMPSitesData(this.authToken),
        this.fetchMPUserData(this.authToken)
      ]);
    }
  }

  fetchMPSitesData(token) {
    return axios
      .post(
        this.gqlUrl,
        {
          query: `
          {
            sites(filter: "Available_Online = 1") {
              name
              id
            }
          }
          `
        },
        {
          headers: {
            authorization: token
          }
        }
      )
      .then(success => {
        const siteList = success.data.data.sites;
        this.setMPSites(siteList);
      })
      .catch(err => this.logError(err));
  }

  fetchMPUserData(token) {
    return axios
      .post(
        this.gqlUrl,
        {
          query: `
          {
            user {
              site {
                id
                name
              }
            }
          }`
        },
        {
          headers: {
            authorization: token
          }
        }
      )
      .then(success => {
        //Store user's mp site
        //if selected, display
        //if not selected, ask
        let mpUser = success.data.data.user;
        let siteName = mpUser.site && mpUser.site.name; //either the site's name or null
        //this.user = { ...this.user, site: siteName };
        this.setUserSite(siteName);
        //If has selectable site, set it
        this.setSelectedSite(this.user.site);
        // siteName == (null || 'Not site specific')
        //   ? this.renderSetSiteModal()
        //   : this.setSelectedSite(this.user.site);
      })
      .catch(err => this.logError(err));
  }

  fetchContentfulPromoData() {
    let apiUrl = `https://graphql.contentful.com/content/v1/spaces/${
      process.env.CONTENTFUL_SPACE_ID
      }/environments/${process.env.CONTENTFUL_ENV || 'master'}`;
    return axios
      .get(apiUrl, {
        params: {
          access_token: process.env.CONTENTFUL_ACCESS_TOKEN,
          query: `{
            promoCollection {
              items {
                title
                image {
                  url
                }
                description
                targetAudience
                linkUrl
              }
            }
          }`
        }
      })
      .then(success => {
        const promoList = success.data.data.promoCollection.items;
        this.setHappenings(promoList);
        this.setContentfulSites();
        this.renderHappenings(); //What happens if this isn't here? will skeleton stay forever?
      })
      .catch(err => this.logError(err));
  }

  updateMPUserSite(token, siteId) {
    return axios
      .post(
        this.gqlUrl,
        {
          query: `
          mutation {
            setSite(siteId: ${siteId}) {
              site {
                id
                name
              }
            }
          }
          `
        },
        {
          headers: {
            authorization: token
          }
        }
      )
      .then(success => {
        console.log('updated site', success.statusText);
      })
      .catch(err => this.logError(err));
  }

  // This lets unit tests capture and confirm errors rather than listening in on console.error
  private logError(err) {
    console.error(err);
  }

  /** Setters **/

  /**
   * Set mpSites after sorting and removing invalid/excluded sites
   * @param sites
   */
  setMPSites(sites) {
    const allowedSites = sites.filter(site => typeof site.name === 'string' && site.name !== 'Not site specific' && site.name !== 'Xroads Church');
    this.mpSites = allowedSites.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  }

  /**
   * Sets user's site if new site is a non-empty string
   * @param siteName
   */
  setUserSite(siteName) {
    if (typeof siteName === 'string' && siteName !== '') {
      this.user = { ...this.user, site: siteName };
    }
  }

  /**
   * Sets selectdSite to given site name or 'Churchwide' if name meets conditions.
   * This method will trigger a re-render of the component.
   * @param siteName
   */
  setSelectedSite(siteName) {
    if (typeof siteName !== "string" || siteName === 'Not site specific' || siteName === 'I do not attend Crossroads' || siteName === 'Anywhere' || siteName === '') {
      this.selectedSite = 'Churchwide';
    }
    else if (this.contentfulSites.includes(siteName))
      this.selectedSite = siteName;
    else {
      this.selectedSite = 'Churchwide';
      //this.selectedSite = siteName;
    }
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
    const uniqueAudiences = new Set<string>();
    this.happenings.forEach(promo => promo.targetAudience.forEach(audience => uniqueAudiences.add(audience)));
    this.contentfulSites = Array.from<string>(uniqueAudiences).sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));
  }


  /** Event handlers/DOM modifiers */
  /**
     * Update selected site based on selection in dropdown
     * @param event
     */
  handleSiteSelection(event) {
    // this.selectedSite = event.target.value;
    this.setSelectedSite(event.target.value);
    // this.setWidthBasedOnText(event.target, event.target.value);
    this.analytics.track('HappeningSiteFiltered', {
      site: this.selectedSite
    });
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
      userSite: this.user.site || 'logged out',
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
    //Update class's values - do these trigger anything? yes - selectedSite triggers rerender
    const siteName = event.target.options[event.target.selectedIndex].text;
    this.setUserSite(siteName);
    this.setSelectedSite(siteName);
    //ORIGINAL logic
    // this.selectedSite = event.target.options[event.target.selectedIndex].text;
    // this.user = { ...this.user, site: this.selectedSite };
    // this.setSelectedSite(this.user.site); //NOTE: can the first this.selectedSite = ? step be wrapped into this?

    this.handleSetSiteModalClose();

    //Store changes to DB
    const selectedSiteId = event.target.value; //Note that this is the id from Contentful/Graphql - what if this is invalid?
    this.updateMPUserSite(this.authToken, selectedSiteId);

    //Report analytics
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
  * Override HTML's behavior of
  * sizing dropdowns to the largest
  * string in the list
  */
  handleSelectorWidthBasedOnText(selector, text) {
    let tmpSelect = document.createElement('select');
    let styles = window.getComputedStyle(selector);
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
    selector.parentNode.style.width = `${tmpSelect.offsetWidth + 12}px`;
    this.host.shadowRoot.removeChild(tmpSelect);
  }

  /** Render */

  render() {
    return (
      <div class="container push-top">
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
              {this.selectedSite === this.user.site ? <span class="my-site-label">(my site)</span> : ''}
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

  /**
   * Display happenings cards filtered by dropdown
   */
  renderHappenings() {
    if (!this.happenings.length) return this.renderHappeningsSkeleton();
    return this.happenings
      .filter(happening => happening.targetAudience.find(ta => ta === this.selectedSite))
      .map((obj, index) => (
        <div class="card carousel-cell" key={index}>
          <a class="relative" href={obj.linkUrl} onClick={event => this.handleHappeningsClicked(event)}>
            <img
              alt={obj.title}
              class="img-responsive"
              src={Utils.imgixify(obj.image ? obj.image.url : '') + `?auto=format&w=400&h=300&fit=crop`} //TODO this handles unpublished images. make sure this handles removed images too.
            />
          </a>
          <div class="card-block">
            <h4 class="card-title card-title--overlap text-uppercase">
              <a href={obj.linkUrl} onClick={event => this.handleHappeningsClicked(event)}>
                {obj.title}
              </a>
            </h4>
            <div class="card-text" innerHTML={marked(obj.description || '')} />
          </div>
        </div>
      ));
  }

  /**
   * Map 4 fake cards while processing data
   * from ctfl
   */
  renderHappeningsSkeleton() {
    return [1, 2, 3, 4].map(() => (
      <div class="card-skeleton">
        <svg
          width="270px"
          height="302px"
          viewBox="0 0 323 302"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns-xlink="http://www.w3.org/1999/xlink"
        >
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.5">
            <g id="Short-skeleton-double" transform="translate(-30.000000, -30.000000)" fill="#979797">
              <g transform="translate(30.000000, 30.000000)">
                <rect id="bg-recent-1-copy" x="0" y="0" width="323" height="182" rx="1" />
                <rect id="Rectangle" x="0" y="196" width="94" height="9" rx="1" />
                <rect id="Rectangle" x="0" y="293" width="72" height="9" rx="1" />
                <rect id="Rectangle" x="0" y="219" width="275" height="25" rx="1" />
                <rect id="Rectangle" x="0" y="254" width="145" height="25" rx="1" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    ));
  }


  /**
   * Returns set site modal if conditions are met
   */
  maybeRenderSetSiteModal() {
    if (!this.authToken) return '';

    if (this.user.site === 'Not site specific' || this.user.site === null || this.user.site === '')
      return this.renderSetSiteModal();
    else
      return '';
  }

  /**
   * User selects site if not set
   */
  renderSetSiteModal() {
    return (
      <div class="site-select-message">
        <button type="button" class="close" aria-label="Close" onClick={() => this.handleSetSiteModalClose()}>
          <svg xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="10" x2="10" y2="1" stroke="#fff" strokeWidth="2" />
            <line x1="1" y1="1" x2="10" y2="10" stroke="#fff" strokeWidth="2" />
          </svg>
        </button>
        <div class="text-center push-top w-100">
          <h2 class="component-header flush-bottom">Select your Crossroads location</h2>
          <p class="flush-half-top">See what's happening in and around your community.</p>
          <div class="happenings-dropdown" data-automation-id="happenings-choose-site">
            <select class="dropdown w-100" onInput={event => this.handleSetSiteInput(event)}>
              <option disabled selected>
                Choose a site
            </option>
              {this.mpSites.map(site => (
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
}