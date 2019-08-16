import { Component, Prop, State, Element, h, Watch } from '@stencil/core';
import { CrdsUser, CrdsLifeStage } from './life-stages-interface';
import { Utils } from '../../shared/utils';
import axios from 'axios';
import { HTMLStencilElement } from '@stencil/core/internal';

@Component({
  tag: 'life-stages',
  styleUrl: 'life-stages.scss',
  shadow: true
})
export class LifeStages {
  private gqlUrl = process.env.CRDS_GQL_ENDPOINT;
  private user: CrdsUser = { name: '', lifeStage: '' };
  private recommendedContent: [] = [];
  private lifeStages: CrdsLifeStage[] = [];
  private lifeStageId: string = null;

  @Prop() authToken: string;
  @Element() host: HTMLStencilElement;

  @Watch('authToken')
  authTokenHandler() {
    this.fetchUser(this.authToken);
  }

  componentWillLoad() {
    this.fetchUser(this.authToken);
  }

  refresh() {
    console.log('manual re-render');
    this.host.forceUpdate();
  }

  private fetchUser(token) {
    return axios
      .post(
        this.gqlUrl,
        {
          query: `
            {
              user {
                lifeStage {
                  title
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
        let name = success.data.data.user.lifeStage && success.data.data.user.lifeStage.title;
        this.lifeStageId = success.data.data.user.lifeStage && success.data.data.user.lifeStage.id;
        this.user = { ...this.user, lifeStage: name };
        this.user.lifeStage == null
          ? this.fetchLifeStages(this.authToken)
          : this.fetchContent(this.authToken, this.lifeStageId);
      });
  }

  private fetchLifeStages(token) {
    return axios
      .post(
        this.gqlUrl,
        {
          query: `{
            lifeStages {
              id
              title
              imageUrl
              contentTotal
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
        this.lifeStages = success.data.data.lifeStages;
        this.refresh();
      });
  }

  /**
   * Get content with set life stages
   */
  fetchContent(token, lifeStageId) {
    console.log(token, lifeStageId);
    return axios
      .post(
        this.gqlUrl,
        {
          query: `{
            lifeStageContent(id: "${lifeStageId}") {
              id
              title
              slug
              imageUrl
              contentType
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
        this.recommendedContent = success.data.data.lifeStageContent;
        this.refresh();
      })
      .catch(err => console.error(err));
  }

  handleLifeStageClicked(event) {
    const card = event.target;
    this.lifeStageId = card.dataset.lifeStageId;
    this.fetchContent(this.authToken, this.lifeStageId);
    console.log('fire analytics', event);
    // TODO: analytics call here
  }

  renderSkeleton() {
    return [1, 2, 3, 4, 5].map(() => (
      <div
        class={`card-skeleton ${
          this.recommendedContent.length > 0 || this.lifeStages.length > 0 ? 'fade display-none' : ''
        }`}
      >
        <div class="content">
          <div class="text title" />
          <div class="text subtitle" />
        </div>
      </div>
    ));
  }

  renderLifeStages() {
    return this.lifeStages.map((obj, index) => (
      <div
        class={`card ${this.recommendedContent.length > 0 ? 'fade display-none' : ''}`}
        key={index}
        style={{
          backgroundImage: `url(${Utils.imgixify(obj.imageUrl)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        data-life-stage-name={obj.title}
        data-life-stage-id={obj.id}
        onClick={event => this.handleLifeStageClicked(event)}
      >
        <div class="bg-overlay" />
        <div class="card-content">
          <h2 class="card-title component-header">{obj.title}</h2>
          <h3 class="card-subtitle">{`${obj.contentTotal} items`}</h3>
        </div>
      </div>
    ));
  }

  renderRecommendedContent() {
    return this.recommendedContent.map((obj: any, index) => (
      <div class="card" key={index}>
        <a class="no-style" href={`/media/${obj.contentType}/${obj.slug}`}>
          <div
            class="image"
            style={{
              backgroundImage: `url(${Utils.imgixify(obj.imageUrl + '?auto=format&w=400')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* <div class="card-stamp bg-charcoal text-white">
              <span class="font-size-smallest soft-quarter-right">6 mins 27 sec</span>
              <svg class="icon" viewBox="0 0 256 256">
                <use xlink:href="/media/assets/svgs/icons.svg#media-video"></use>
              </svg>
            </div> */}
          </div>
          <div class="text-gray font-size-smaller font-family-base-mid text-uppercase">{obj.category}</div>
          <h3 class="component-header">{obj.title}</h3>
        </a>
      </div>
    ));
  }

  render() {
    return (
      <div class="life-stages">
        <div class="life-stages-inner">
          <div class="life-stages-header">
            <h2 class="component-header flush-bottom">Personalize Your Experience</h2>
            <p>Which of these best describes your stage of life? (Pick one)</p>
          </div>
          <div class={`cards ${this.recommendedContent.length > 0 ? 'media-cards' : ''}`}>
            {this.renderSkeleton()}
            {this.lifeStages.length > 0 ? this.renderLifeStages() : ''}
            {this.recommendedContent.length > 0 ? this.renderRecommendedContent() : ''}
          </div>
        </div>
      </div>
    );
  }
}
