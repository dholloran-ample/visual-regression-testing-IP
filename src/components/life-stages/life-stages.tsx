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
  private lifeStages: CrdsLifeStage[] = [
    {
      title: 'Student',
      total: 7,
      description: '',
      image: {
        url:
          'https://images.unsplash.com/photo-1461280360983-bd93eaa5051b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
      },
      slug: 'student'
    },
    {
      title: 'Parenting',
      total: 5,
      description: '',
      image: {
        url:
          'https://images.unsplash.com/photo-1545074439-5b5078c5f149?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
      },
      slug: 'parenting'
    },
    {
      title: 'Single',
      total: 9,
      description: '',
      image: {
        url:
          'https://images.unsplash.com/photo-1464020486846-34aa429118c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1361&q=80'
      },
      slug: 'single'
    },
    {
      title: 'Married',
      total: 3,
      description: '',
      image: {
        url:
          'https://images.unsplash.com/photo-1459501462159-97d5bded1416?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
      },
      slug: 'married'
    },
    {
      title: 'Retired',
      total: 21,
      description: '',
      image: {
        url:
          'https://images.unsplash.com/photo-1562557082-7f2785d741e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80'
      },
      slug: 'retired'
    }
  ];
  private lfContent: [] = [];

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
    return Promise.all([this.fetchLifeStageData()]);
  }

  componentWillRender() {
    return Promise.all([this.fetchLifeStageData()]);
  }

  private fetchUserLifeStage() {
    // reach into cosmos db with user identifier and see if they already have a life stage
    console.log("fetching user's life stage!");
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
    this.host.shadowRoot.querySelector('.life-stages-inner').classList.add('fade');
    console.log('query for:', this.selectedStage, event);
    // TODO: analytics call here
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
            {this.lifeStages.map((obj, index) => (
              <div
                class={`card ${this.selectedStage == obj.slug ? 'selected' : ''}`}
                key={index}
                style={{
                  backgroundImage: `url(${obj.image.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                data-life-stage={obj.slug}
                onClick={event => this.handleLifeStageClicked(event)}
              >
                <div class="bg-overlay" />
                <div class="card-content">
                  <h2 class="card-title component-header">{obj.title}</h2>
                  <h3 class="card-subtitle">{`${obj.total} items`}</h3>
                </div>
              </div>
            ))}
          </div>
          <button
            class="confirm-btn"
            onClick={event => this.handleConfirmClick(event)}
            style={{
              transform: `translateY(${this.selectedStage == '' ? '100%' : 0})`
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
