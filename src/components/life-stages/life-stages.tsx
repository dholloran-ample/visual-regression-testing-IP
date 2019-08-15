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
  private lifeStageContent: [] = [];
  private lifeStages: CrdsLifeStage[] = [];

  @Prop() authToken: string;
  @State() selectedStage: string = '';
  @Element() host: HTMLElement;

  @Watch('authToken')
  authTokenHandler() {
    this.fetchUserLifeStage();
  }

  componentWillLoad() {
    // actually need to do a fetch to cosmosDB first
    // if user already has life stage we just need that single life stages data
    return Promise.all([this.fetchUserLifeStage(), this.fetchLifeStages()]);
  }

  private fetchUserLifeStage() {
    // reach into cosmos db with user identifier and see if they already have a life stage
    console.log("fetching user's life stage!");
  }

  fetchLifeStages() {
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
        this.lifeStages = success.data.data.lifeStageCollection.items;
      });
  }

  /**
   * Get content with set life stages
   */
  fetchContent() {
    let apiUrl = `https://graphql.contentful.com/content/v1/spaces/${
      process.env.CONTENTFUL_SPACE_ID
    }/environments/${process.env.CONTENTFUL_ENV || 'master'}`;
    return axios
      .get(apiUrl, {
        params: {
          access_token: process.env.CONTENTFUL_ACCESS_TOKEN,
          query: `{
            articleCollection {
              items {
                title
                image {
                  url
                }
                duration
                body
                slug
              }
            }
          }`
        }
      })
      .then(success => {
        let articles = success.data.data.articleCollection.items;
        // faking the content here
        this.lifeStageContent = articles.filter(item => item.duration > 550).slice(1, 3);
        this.lifeStages = [];
        this.renderCards();
      })
      .catch(err => console.error(err));
  }

  handleLifeStageClicked(event) {
    const card = event.target;
    card.classList.toggle('selected');
    if (this.selectedStage === card.dataset.lifeStage) {
      this.selectedStage = '';
    } else {
      this.selectedStage = card.dataset.lifeStage;
    }
    // TODO: analytics call here
  }

  handleConfirmClick(event) {
    this.fetchContent();
    event;
    // TODO: analytics call here
  }

  renderCards() {
    console.log('rendering cards', this.lifeStageContent, this.lifeStages);
    const parent = this.host.shadowRoot.querySelector('.cards');
    let cards: any = this.skeletonCards;
    if (this.lifeStages !== []) {
      cards = this.lifeStageCards();
    }  else {
      cards = this.contentCards();
    }
    return cards;
  }

  skeletonCards() {
    return ([1,2,3].map(item => <div class="skeleton-card" key={item}><h1>Loading</h1></div>));
  }

  lifeStageCards() {
    return this.lifeStages.map((obj, index) => (
      <div
        class={`card ${this.selectedStage == obj.title ? 'selected' : ''}`}
        key={index}
        style={{
          bakgroundImage: `url(${obj.image.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        data-life-stage={obj.title}
        onClick={event => this.handleLifeStageClicked(event)}
      >
        <div class="bg-overlay" />
        <div class="card-content">
          <h2 class="card-title component-header">{obj.title}</h2>
          <h3 class="card-subtitle">{`${obj.contentCollection.total} items`}</h3>
        </div>
      </div>
    ));
  }

  contentCards() {
    return this.lifeStageContent.map((obj: any, index) => {
      <div class="card" key={index}>
        {obj.title}
      </div>;
    });
  }

  render() {
    return (
      <div class="life-stages">
        <div class="life-stages-inner">
          <div class="life-stages-header">
            <h2 class="component-header flush-bottom">Personalize Your Experience</h2>
            <p>Which of these best describes your stage of life? (Pick one)</p>
          </div>
          <div class="cards">
            {this.renderCards()}
          </div>
          <button
            class="confirm-btn"
            onClick={event => this.handleConfirmClick(event)}
            style={{
              transform: `translateY(${this.selectedStage == '' ? '100%' : 0})`,
              opacity: `${this.selectedStage == '' ? 0 : 1}`
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
