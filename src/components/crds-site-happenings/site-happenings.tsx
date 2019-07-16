import { Component, Prop, State, Element, h } from '@stencil/core';
import axios from 'axios';
import marked from 'marked';
import { Auth } from '../../shared/auth';
import { Utils } from '../../shared/utils';
import { CrdsUser, CrdsHappening } from './site-happenings-interface';
import { CrdsTokens } from '@crds_npm/crds-client-auth';

@Component({
  tag: 'crds-site-happenings',
  styleUrl: 'site-happenings.scss',
  shadow: true
})
export class SiteHappenings {
  sites: string[] = [];
  auth: any;
  user: CrdsUser = { name: '', site: '' };
  config: Object = {
    mp_access_token_cookie: 'intsessionId',
    mp_refresh_token_cookie: 'intrefreshToken',
    okta_client_id: '0oahgpg7elMxVJedi0h7',
    okta_issuer: 'https://crossroads.oktapreview.com/oauth2/default'
  };
  env: string = process.env.ENV || 'int';

  @Prop() happenings: CrdsHappening[] = [];
  @State() selectedSite: string = 'Churchwide';
  @State() authenticated: boolean = false;
  @Element() host: HTMLElement;

  async componentWillLoad() {
    // this.authenticated = true;
    // this.user = { ...this.user, site: 'Not site specific' };
    // this.defaultToUserSite(this.user.site);
    this.initAuth();
    this.fetchContentfulData();
  }

  initAuth() {
    this.auth = new Auth(Object.assign(this.config, { env: this.env }));
    this.auth.authService.authenticated().subscribe((tokens: CrdsTokens) => {
      if (tokens != null) {
        this.fetchUserData(tokens.access_token.access_token);
      } else {
        console.log('not signed in');
        this.selectedSite = 'Churchwide';
      }
    });
  }

  componentDidRender() {
    this.setWidthBasedOnText(this.host.shadowRoot.querySelector('.happenings-dropdown-select'), this.selectedSite);
  }

  handleSiteSelection(event) {
    this.selectedSite = event.target.value;
    this.setWidthBasedOnText(event.target, event.target.value);
  }

  handleSetDefaultSite(event) {
    if (event.target.value == 'Anywhere') {
      this.user = { ...this.user, site: 'Not site specific' };
    } else {
      this.user = { ...this.user, site: event.target.value };
    }

    this.defaultToUserSite(this.user.site);
    this.handleClose();
    // call MP with updates
  }

  handleClose() {
    this.host.shadowRoot.querySelector('.site-select-message').classList.add('hidden');
  }

  setWidthBasedOnText(el, text) {
    let tmpSelect = document.createElement('select');
    let tmpOption = document.createElement('option');
    let styles = window.getComputedStyle(el);
    tmpSelect.style.visibility = 'hidden';
    tmpSelect.appendChild(tmpOption);
    tmpSelect.style.fontSize = styles.fontSize;
    tmpOption.innerText = text;
    this.host.shadowRoot.appendChild(tmpSelect);
    el.style.width = `${tmpSelect.offsetWidth}px`;
    this.host.shadowRoot.removeChild(tmpSelect);
  }

  defaultToUserSite(site) {
    if (site == 'Not site specific' || site == 'I do not attend Crossroads') {
      this.selectedSite = 'Churchwide';
    } else {
      this.selectedSite = site;
    }
  }

  fetchUserData(token) {
    let apiUrl = process.env.CRDS_GQL_ENDPOINT;
    return axios
      .post(
        apiUrl,
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
        let siteName = success.data.data.user.site.name;
        this.authenticated = true;
        this.user = { ...this.user, site: siteName };
        this.defaultToUserSite(this.user.site);
      });
  }

  fetchContentfulData() {
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
        console.log(success);
        this.setContentfulData(success.data.data.promoCollection.items);
      });
  }

  setContentfulData(data) {
    this.happenings = data.filter(promo => promo.targetAudience !== null);
    this.renderHappenings(this.happenings);
    let audiences = [];
    for (let i = 0; i < this.happenings.length; i += 1) {
      if (this.happenings[i].targetAudience) {
        for (let x = 0; x < this.happenings[i].targetAudience.length; x += 1) {
          audiences.push(this.happenings[i].targetAudience[x]);
        }
      }
    }

    let unique_audiences = audiences.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    this.sites = unique_audiences;
  }

  renderHappenings(happenings) {
    if (!happenings.length) return this.renderHappeningsSkeleton();
    return happenings
      .filter(happening => happening.targetAudience.find(ta => ta === this.selectedSite))
      .map((obj, index) => (
        <div class="card" key={index}>
          <a class="relative" href={obj.linkUrl}>
            <img
              alt={obj.title}
              class="img-responsive"
              src={Utils.imgixify(obj.image.url) + `?auto=format&w=270&h=202&fit=crop`}
            />
          </a>
          <div class="card-block hard soft-quarter-top">
            <h3 class="component-header flush">
              <a href={obj.linkUrl}>{obj.title}</a>
            </h3>
            <div class="card-text" innerHTML={marked(obj.description)} />
          </div>
        </div>
      ));
  }

  renderHappeningsSkeleton() {
    return [1, 2, 3].map(() => (
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

  render() {
    return (
      <div class="container push-top">
        <div class="relative">
          {this.authenticated && this.user.site == 'Not site specific' ? (
            <div class="site-select-message">
              <button type="button" class="close" aria-label="Close" onClick={() => this.handleClose()}>
                <svg xmlns="http://www.w3.org/2000/svg">
                  <line x1="1" y1="10" x2="10" y2="1" stroke="#fff" strokeWidth="2" />
                  <line x1="1" y1="1" x2="10" y2="10" stroke="#fff" strokeWidth="2" />
                </svg>
              </button>
              <div class="text-center">
                <h2 class="component-header flush-bottom">Looks like you haven't selected a Crossroads site</h2>
                <p class="flush-top">
                  Let us know which site you attend and we will keep you up to date on everything going on.
                </p>
                <select class="dropdown" onInput={event => this.handleSetDefaultSite(event)}>
                  <option disabled selected>
                    Choose a site
                  </option>
                  {this.sites.map(site => (site !== 'Churchwide' ? <option value={site}>{site}</option> : ''))}
                  <option value="Anywhere">Anywhere</option>
                  <option value="I do not attend Crossroads">I do not attend Crossroads</option>
                </select>
                <p>
                  <small>*This will update the site field in your profile</small>
                </p>
              </div>
            </div>
          ) : (
            ''
          )}
          <hr class="push-bottom-half" />
          <div class="d-flex align-items-center push-bottom-half">
            <h4 id="happening-filter-label" class="flush font-size-base font-family-base text-gray-light">
              happening at
            </h4>
            <div class="happenings-dropdown" data-automation-id="happenings-dropdown">
              <select
                class="happenings-dropdown-select font-family-base"
                onInput={event => this.handleSiteSelection(event)}
              >
                {this.sites.map(site => (
                  <option value={site} selected={this.selectedSite === site}>
                    {site}
                  </option>
                ))}
              </select>
              <i class="dropdown-caret">▼</i>
              {this.selectedSite === this.user.site ? <span class="my-site-label">(my site)</span> : ''}
            </div>
          </div>
          <div class="card-deck--expanded-layout">{this.renderHappenings(this.happenings)}</div>
        </div>
      </div>
    );
  }
}
