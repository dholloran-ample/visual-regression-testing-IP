import { Component, Prop, State, Element, h } from '@stencil/core';
import axios from 'axios';
import marked from 'marked';
import { Utils } from '../../shared/utils';

@Component({
  tag: 'crds-site-happenings',
  styleUrl: 'site-happenings.scss',
  shadow: true
})
export class SiteHappenings {
  @Prop() sites: string[];
  @Prop() happenings: any;
  @Prop() user: any;
  @Prop() sessionToken: string;
  @State() selectedSite: string;
  @Element() host: HTMLElement;

  constructor() {
    this.fetchContentfulData(),
    this.fetchUserData()
  }

  componentDidRender() {
    this.setWidthBasedOnText(this.host.shadowRoot.querySelector('.happenings-dropdown-select'), this.selectedSite);
  }

  handleSiteSelection(event) {
    this.selectedSite = event.target.value;
    this.setWidthBasedOnText(event.target, event.target.value);
  }

  handleSetDefaultSite(event) {
    this.user = { ...this.user, site: event.target.value };
    this.selectedSite = this.user.site;
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
      this.selectedSite = 'Churchwide'
    } else {
      this.selectedSite = site
    }
  }

  setContentfulData(data) {
    this.happenings = data.filter(promo => promo.targetAudience !== null);
    // filter for unique sites
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

  fetchUserData() {
    if (this.sessionToken !== undefined) {
      console.log(this.sessionToken);
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
              authorization: this.sessionToken
            }
          }
        )
        .then(success => {    
          let siteName = success.data.data.user.site.name;
          this.user = { ...this.user, site: siteName };
          this.defaultToUserSite(this.user.site);
        });
    } else {
      console.log('user passed in', this.user.site);
      this.defaultToUserSite(this.user.site);
    }
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
        this.setContentfulData(success.data.data.promoCollection.items);
      });
  }

  render() {
    return (
      <div class="container push-top">
        <div class="relative">
          {this.user.site == 'Not site specific' ? (
            <div class="site-select-message">
              <div class="text-center">
                <h2 class="component-header flush-bottom">Looks like you haven't selected a Crossroads site</h2>
                <p class="flush-top">Let us know which site you attend and we will keep you</p>
                <select class="dropdown" onInput={event => this.handleSetDefaultSite(event)}>
                  <option disabled selected>
                    Choose a site
                  </option>
                  {this.sites.map(site => (
                    <option value={site}>{site}</option>
                  ))}
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
              {this.selectedSite === this.user.site 
                ? <span class="my-site-label">(my site)</span> 
                : ''}
            </div>
          </div>

          <div class="card-deck--expanded-layout">
            {this.happenings.map((obj, index) =>
              obj.targetAudience.includes(this.selectedSite) ? (
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
              ) : (
                ''
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}
