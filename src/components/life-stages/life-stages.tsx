import { Component, Prop, State, Element, h, Watch } from '@stencil/core';
import { CrdsUser, CrdsLifeStage } from './life-stages-interface';
import axios from 'axios';

@Component({
  tag: 'life-stages',
  styleUrl: 'life-stages.scss',
  shadow: true
})

export class LifeStages {
  private gqlUrl = process.env.CRDS_GQL_ENDPOINT;
  private CrdsUser: CrdsUser = { name: '', lifeStage: '' };
  private lifeStages: CrdsLifeStage[] = [];

  @Prop() authToken: string;
  @Element() host: HTMLElement;

  @Watch('authToken')
  authTokenHandler() {
    this.fetchUserLifeStage();
  }

  componentWillLoad() {
    // actually need to do a fetch to cosmosDB first
    // if user already has life stage we just need that single life stages data
    return Promise.all([this.fetchLifeStageData()]);
  }

  componentWillRender() {
    return Promise.all([this.fetchLifeStageData()]);
  }

  private fetchUserLifeStage() {
    // reach into cosmos db with user identifier and see if they already have a life stage
    console.log("fetching user's life stage!");
  }

  /**
   * Close the site select modal
   */
  handleClose() {
    this.host.shadowRoot.querySelector('.life-stage-select').classList.add('hidden');
  }

  fetchLifeStageData() {
    let apiUrl = `https://graphql.contentful.com/content/v1/spaces/${
      process.env.CONTENTFUL_SPACE_ID
      }/environments/${process.env.CONTENTFUL_ENV || 'master'}`;
    return axios
      .get(apiUrl, {
        params: {
          access_token: process.env.CONTENTFUL_ACCESS_TOKEN,
          query: `{
            lifeStageCollection {
              items {
                title
                image {
                  url
                }
                description
                contentCollection{
                  total
                }
              }
            }
          }`
        }
      })
      .then(success => {
        this.setLifeStageData(success.data.data.lifeStageCollection.items);
      });
  }

  setLifeStageData(data) {
    this.lifeStages = data;
  }

  renderLifeStageOptions(lifeStages: CrdsLifeStage[]) {
    return lifeStages
      .map(lifeStage => (
        <option value={lifeStage.title} data-name={lifeStage.title}>
          {lifeStage.title}
        </option>
      ));
  }

  renderSelectLifeStageModal() {
    return (
      <div class="life-stage-select">
        <div class="text-center push-top w-100">
          <h2 class="component-header flush-bottom">What's going on in your life?</h2>
          <p class="flush-top">Lets see if we can figure out what you need!</p>
          <div class="life-stage-cards">
            <select class="dropdown w-100">
              <option disabled selected>
                What's going on in your life?
              </option>
              {this.renderLifeStageOptions(this.lifeStages)}
            </select>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderSelectLifeStageModal()}
        <p>LIFE STAGES YO</p>
        <h3>Auth Token</h3>
        {this.authToken}
      </div>
    );
  }
}
