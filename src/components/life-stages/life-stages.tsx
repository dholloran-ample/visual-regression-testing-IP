import { Component, Prop, State, Element, h, Watch } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { CrdsUser, CrdsLifeStage } from './life-stages-interface';
import { Utils } from '../../shared/utils';
import { SvgSrc } from '../../shared/svgSrc';
import axios from 'axios';
import stringifyObject from 'stringify-object';

@Component({
  tag: 'life-stages',
  styleUrl: 'life-stages.scss',
  shadow: true
})
export class LifeStages {
  private analytics = window['analytics'] || {};
  private imgix = window['imgix'] || {};
  private gqlUrl = process.env.CRDS_GQL_ENDPOINT;
  private crdsDefaultImg = 'https://crds-cms-uploads.imgix.net/content/images/cr-social-sharing-still-bg.jpg';

  @State() user: CrdsUser = { name: '', lifeStage: null };
  @State() lifeStages: CrdsLifeStage[] = [];
  @State() recommendedContent: [] = [];
  @Prop() public authToken: string;
  @Element() public host: HTMLStencilElement;

  @Watch('authToken')
  authTokenHandler() {
    this.fetchUser(this.authToken);
  }

  renderedEvent = new CustomEvent('component rendered', {
    detail: this.host
  });

  public componentWillLoad() {
    this.fetchLifeStages(this.authToken);
    this.fetchUser(this.authToken);
  }

  public componentDidRender() {
    document.dispatchEvent(this.renderedEvent);
    this.imgixRefresh();
    Utils.trackInView(this.host, 'LifeStageComponent', this.getLifeStageId.bind(this));
  }

  private imgixRefresh() {
    this.imgix.init({ force: true });
  }

  public getLifeStageId() {
    return this.user.lifeStage.id;
  }

  public fetchUser(token) {
    return axios
      .post(
        this.gqlUrl,
        {
          query: `
            {
              user {
                lifeStage {
                  id
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
        const name = success.data.data.user.lifeStage && success.data.data.user.lifeStage.title;
        const id = success.data.data.user.lifeStage && success.data.data.user.lifeStage.id;
        this.user = { ...this.user, lifeStage: { id: id, title: name } };
        if (this.user.lifeStage.id !== null) this.fetchContent(this.authToken, this.user.lifeStage.id);
      });
  }

  public fetchLifeStages(token) {
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
              description
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
      });
  }

  /**
   * Get content with set life stages
   */
  public fetchContent(token, lifeStageId) {
    return axios
      .post(
        this.gqlUrl,
        {
          query: `{
            lifeStageContent(id: "${lifeStageId}") {
              id
              title
              authors {
                fullName
                qualifiedUrl
              }
              duration
              contentType
              category
              slug
              qualifiedUrl
              imageUrl
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
      })
      .catch(err => console.error(err));
  }

  /**
   * Get content with set life stages
   */
  public setLifeStage(token, lifeStageId, lifeStageName?) {
    const obj = lifeStageId
      ? {
          id: lifeStageId,
          title: lifeStageName
        }
      : null;
    return axios
      .post(
        this.gqlUrl,
        {
          query: `
          mutation {
            setLifeStage(lifeStage: ${stringifyObject(obj, { singleQuotes: false })}) 
            {
              lifeStage {
                title
                id
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
        console.log('updated user life stage', success);
      })
      .catch(err => console.error(err));
  }

  private handleLifeStageClicked(event) {
    const card = event.target;
    const cards = this.host.shadowRoot.querySelectorAll('[data-life-stage-id]');
    cards.forEach(card => card.classList.add('disabled'));
    this.user.lifeStage.id = card.dataset.lifeStageId;
    this.user.lifeStage.title = card.dataset.lifeStageName;
    this.analytics.track('LifeStageUpdated', {
      event: event,
      lifeStageId: this.user.lifeStage.id,
      lifeStageName: this.user.lifeStage.title
    });
    this.fetchContent(this.authToken, this.user.lifeStage.id).then(() => {
      card.parentNode.scrollLeft = 0;
      return cards.forEach(card => card.classList.remove('disabled'));
    });
    this.setLifeStage(this.authToken, this.user.lifeStage.id, this.user.lifeStage.title);
  }

  private renderCardSkeleton() {
    return [1, 2, 3, 4, 5].map(() => (
      <div class={`card-skeleton ${this.recommendedContent.length || this.lifeStages.length ? 'd-none' : ''}`}>
        <div class="content">
          <div class="text title" />
          <div class="text subtitle" />
        </div>
      </div>
    ));
  }

  private renderTextSkeleton() {
    return (
      <div class="text-skeleton">
        <div class="title" />
        <div class="subtitle" />
      </div>
    );
  }

  private renderLifeStages() {
    return this.lifeStages.map((obj, index) => (
      <div
        class={`card ${this.recommendedContent.length ? 'd-none' : ''}`}
        key={index}
        style={{
          backgroundImage: `url(${Utils.imgixify(obj.imageUrl + '?auto=format&h=400')}`,
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

  private renderMediaLabel(type, duration) {
    if (type !== 'series') {
      return (
        <div class="media-label bg-charcoal text-white align-items-center">
          {duration && <span class="font-size-smallest">{duration}</span>}
          {this.renderIcon(type)}
        </div>
      );
    }
  }

  private renderIcon(type) {
    let src;
    switch (type) {
      case 'video':
        src = SvgSrc.videoIcon();
        break;
      case 'message':
        src = SvgSrc.videoIcon();
        break;
      case 'podcast':
        src = SvgSrc.podcastIcon();
        break;
      case 'episode':
        src = SvgSrc.podcastIcon();
        break;
      case 'article':
        src = SvgSrc.articleIcon();
        break;
    }
    return (
      <svg class="icon" viewBox="0 0 256 256">
        {src}
      </svg>
    );
  }

  private renderRecommendedContent() {
    const imgixParams =
      window.innerWidth > 767 ? '?auto=format&w=400&h=225&fit=crop' : '?auto=format&w=262&h=196.5&fit=crop';
    return this.recommendedContent.map((obj: any, index) => (
      <div class="card" key={index}>
        <a class="relative d-block" href={`/media/${obj.contentType}/${obj.slug}`}>
          {this.renderMediaLabel(obj.contentType, obj.duration)}
          <img src={(obj.imageUrl || this.crdsDefaultImg) + imgixParams} class="img-responsive" />
        </a>
        <a href={obj.qualifiedUrl}>
          <h4 class="text-gray font-size-smaller font-weight-mid text-uppercase soft-quarter-top">{obj.category}</h4>
          <h3 class="component-header">{obj.title}</h3>
          {obj.authors && (
            <p class="soft-quarter-top">
              {obj.authors.map(author => (
                <a
                  class="text-gray-light font-size-smaller"
                  href="/authors/"
                  style={{
                    color: 'inherit',
                    display: 'block',
                    textDecoration: 'none'
                  }}
                >
                  {author.fullName}
                </a>
              ))}
            </p>
          )}
        </a>
      </div>
    ));
  }

  public handleBackClick(event) {
    this.recommendedContent = [];
    this.user.lifeStage.id = null;
    this.user.lifeStage.title = null;
    event.target.parentNode.scrollLeft = 0;
  }

  private renderText() {
    const selectedLifeStage: any = this.lifeStages.find(
      stage => stage.id === (this.user.lifeStage && this.user.lifeStage.id)
    );
    return (
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline'
          }}
        >
          <h2 class="component-header flush-bottom">
            {this.recommendedContent.length ? this.user.lifeStage.title : 'Personalize Your Experience'}
          </h2>
          {this.recommendedContent.length ? (
            <a class="back-btn" onClick={event => this.handleBackClick(event)}>
              change
            </a>
          ) : (
            ''
          )}
        </div>
        <p class="push-half-top">
          {this.recommendedContent.length
            ? selectedLifeStage.description
            : 'Which of these best describes your stage of life? (Pick one)'}
        </p>
      </div>
    );
  }

  public render() {
    const renderLifeStages = this.lifeStages.length && this.user.lifeStage && !this.user.lifeStage.id;
    const renderRecommendedContent = this.recommendedContent.length;
    const cardsClasses = `cards ${this.recommendedContent.length ? 'media-cards' : ''}`;
    console.log(renderLifeStages, renderRecommendedContent);
    return (
      <div class="life-stages">
        <div class="life-stages-inner">
          <div class="life-stages-header">
            {(() => {
              if (renderLifeStages || renderRecommendedContent) return this.renderText();
              return this.renderTextSkeleton();
            })()}
            <div class="life-stages-avatar" innerHTML={SvgSrc.accountThinIcon()}></div>
          </div>
          <div class={cardsClasses}>
            {(() => {
              if (renderLifeStages) return this.renderLifeStages();
              if (renderRecommendedContent) return this.renderRecommendedContent();
              return this.renderCardSkeleton();
            })()}
          </div>
        </div>
      </div>
    );
  }
}
