import { Component, State, Element, h } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { CrdsUser, CrdsLifeStage } from './crds-recommended-content-interface';
import { Utils } from '../../shared/utils';
import { SvgSrc } from '../../shared/svgSrc';
import { CrdsApolloService } from '../../shared/apollo';
import { GET_USER, GET_LIFESTAGES, SET_LIFESTAGE } from './crds-recommended-content.graphql';
import { isAuthenticated } from '../../global/authInit';

@Component({
  tag: 'crds-recommended-content',
  styleUrl: 'crds-recommended-content.scss',
  shadow: true
})
export class CrdsRecommendedContent {
  private analytics = window['analytics'] || {};
  private crdsDefaultImg = 'https://crds-cms-uploads.imgix.net/content/images/cr-social-sharing-still-bg.jpg';
  private recommendedContent: [] = [];
  @State() lifeStages: CrdsLifeStage[] = [];
  @State() user: CrdsUser = { name: '', lifeStage: null };
  @Element() public host: HTMLStencilElement;

  public async componentWillLoad() {
    await CrdsApolloService.subscribeToApolloClient();
    this.getLifeStages();
    this.getUser();
  }

  public componentDidLoad() {
    Utils.trackInView(this.host, 'RecommendedContentComponent', this.getLifeStageId.bind(this));
  }

  public componentWillRender() {
    if (this.user.lifeStage && this.user.lifeStage.id !== null && this.lifeStages.length)
      return this.filterContent(this.user.lifeStage.id);
  }

  private getLifeStageId() {
    return this.user.lifeStage && this.user.lifeStage.id;
  }

  private getUser() {
    if (!isAuthenticated()) return null;
    return CrdsApolloService.apolloClient.query({ query: GET_USER }).then(success => {
      const name = success.data.user.lifeStage && success.data.user.lifeStage.title;
      const id = success.data.user.lifeStage && success.data.user.lifeStage.id;
      this.user =  { ...this.user,lifeStage: { id: id, title: name } };
      this.host.forceUpdate();
    });
  }

  private getLifeStages() {
    return CrdsApolloService.apolloClient.query({ query: GET_LIFESTAGES }).then(success => {
      this.lifeStages = success.data.lifeStages;
      this.host.forceUpdate();
    });
  }

  /**
   * Get content with set life stages
   */
  private filterContent(lifeStageId) {
    return this.recommendedContent = this.lifeStages.find(lifestage => lifestage.id === lifeStageId).content;
  }

  private handleBackClick(event) {
    this.recommendedContent = [];
    this.user = { ...this.user, lifeStage: { id: null, title: null } };
    event.target.parentNode.scrollLeft = 0;
  }

  private handleContentClicked(event) {
    try {
      this.analytics.track('RecommendedContentClicked', {
        parent: this.host.tagName,
        title: event.currentTarget.querySelector('.component-header').innerText,
        targetUrl: event.target.parentElement.href,
        lifeStageId: this.user.lifeStage.id,
        lifeStageName: this.user.lifeStage.title
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Get content with set life stages
   */
  private setLifeStage(lifeStageId, lifeStageName?) {
    const obj = lifeStageId
      ? {
          id: lifeStageId,
          title: lifeStageName
        }
      : null;
    return CrdsApolloService.apolloClient
      .mutate({
        variables: { lifeStage: obj },
        mutation: SET_LIFESTAGE
      })
      .catch(err => console.error(err));
  }

  private handleLifeStageClicked(event) {
    const card = event.target;
    const cards = this.host.shadowRoot.querySelectorAll('[data-life-stage-id]');
    cards.forEach(card => card.classList.add('disabled'));
    this.user = { ...this.user, lifeStage: { id: card.dataset.lifeStageId, title: card.dataset.lifeStageName } };
    try {
      this.analytics.track('LifeStageUpdated', {
        lifeStageId: this.user.lifeStage.id,
        lifeStageName: this.user.lifeStage.title
      });
    } catch (error) {
      console.error(error);
    }
    this.filterContent(this.user.lifeStage.id);
    card.parentNode.scrollLeft = 0;
    cards.forEach(card => card.classList.remove('disabled'));
    this.setLifeStage(this.user.lifeStage.id, this.user.lifeStage.title);
  }

  private renderCardSkeleton() {
    return [1, 2, 3, 4, 5].map(() => (
    <div class="skeleton skeleton-life-stage">
        <div class="content">
          <div class="text title shimmer shimmer-reverse" />
          <div class="text subtitle shimmer shimmer-reverse" />
        </div>
      </div>
    ));
  }

  private renderTextSkeleton() {
    return (
      <div class="skeleton text-skeleton">
        <div class="title shimmer" />
        <div class="subtitle shimmer" />
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
      <div class="card" key={index} onClick={event => this.handleContentClicked(event)}>
        <a class="relative d-block" href={obj.qualifiedUrl}>
          {this.renderMediaLabel(obj.contentType, obj.duration)}
          <img src={(obj.imageUrl || this.crdsDefaultImg) + imgixParams} class="img-responsive" />
        </a>
        <a href={obj.qualifiedUrl}>
          <h4 class="text-gray font-size-smaller font-weight-mid text-uppercase soft-quarter-top">{obj.category}</h4>
          <h3 class="component-header">{obj.title}</h3>
          {obj.authors && (
            <p class="soft-quarter-top">
              {obj.authors.map((author, index) => (
                <a
                  class="text-gray-light font-size-smaller"
                  href={author.qualifiedUrl}
                  style={{
                    color: 'inherit',
                    display: 'inline-block',
                    textDecoration: 'none'
                  }}
                >
                  {author.fullName}
                  {index < obj.authors.length - 1 ? <span>,&nbsp;</span> : ''}
                </a>
              ))}
            </p>
          )}
        </a>
      </div>
    ));
  }

  private renderText() {
    const selectedLifeStage: any = this.lifeStages.find(
      stage => stage.id === (this.user.lifeStage && this.user.lifeStage.id)
    );

    return (
      <div>
        <h2 class="component-header flush-bottom">
          {this.recommendedContent.length && selectedLifeStage
            ? 'Recommended For You'
            : 'Personalize Your Experience'}
        </h2>
        <p class="push-half-top push-half-bottom color-gray">
          {this.recommendedContent.length && selectedLifeStage
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
    return (
      <div class="life-stages">
        <div class="life-stages-inner">
          <div class="life-stages-header">
            {(() => {
              if (renderLifeStages || renderRecommendedContent) return this.renderText();
              return this.renderTextSkeleton();
            })()}
            {!!this.recommendedContent.length && (
              <div class="life-stage-selected">
                <a
                  class="btn btn-gray-light btn-outline btn-sm back-btn flush"
                  onClick={event => this.handleBackClick(event)}
                >
                  change
                </a>
              </div>
            )}
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
