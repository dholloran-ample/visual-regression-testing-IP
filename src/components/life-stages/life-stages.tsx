import { Component, Prop, State, Element, h, Watch } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { CrdsUser, CrdsLifeStage } from './life-stages-interface';
import { Utils } from '../../shared/utils';
import axios from 'axios';

@Component({
  tag: 'life-stages',
  styleUrl: 'life-stages.scss',
  shadow: true
})
export class LifeStages {
  private analytics = window['analytics'] || {};
  private imgix = window['imgix'] || {};
  private gqlUrl = process.env.CRDS_GQL_ENDPOINT;
  private user: CrdsUser = { name: '', lifeStage: '' };
  private recommendedContent: [] = [];
  private lifeStages: CrdsLifeStage[] = [];
  private lifeStageId: string = null;

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
    this.fetchUser(this.authToken);
  }

  public componentDidRender() {
    document.dispatchEvent(this.renderedEvent);
    this.imgixRefresh();
    Utils.trackInView(this.host, 'LifeStageComponent', this.getLifeStageId.bind(this));
  }

  private refresh() {
    console.log('manual re-render');
    this.host.forceUpdate();
  }

  private imgixRefresh() {
    this.imgix.init({ force: true });
  }

  private getLifeStageId() {
    return this.lifeStageId;
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
        this.refresh();
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
        // scroll this container left to make sure content starts at the beginning
        this.host.shadowRoot.querySelector('.cards').scrollLeft = 0;
        this.refresh();
      })
      .catch(err => console.error(err));
  }

  /**
   * Get content with set life stages
   */
  public setLifeStage(token, lifeStageId?, lifeStageName?) {
    const obj = lifeStageId
      ? {
          id: lifeStageId,
          title: lifeStageName
        }
      : null;
    console.log('attempting to set life stage', JSON.stringify(obj));
    return axios
      .post(
        this.gqlUrl,
        {
          query: `
          mutation {
            setLifeStage(lifeStage: ${JSON.stringify(obj)}) {
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
    this.lifeStageId = card.dataset.lifeStageId;
    const lifeStageName = card.dataset.lifeStageName;
    // this.analytics.track('LifeStageUpdated', {
    //   lifeStageId: this.lifeStageId,
    // });
    this.fetchContent(this.authToken, this.lifeStageId);
    this.setLifeStage(this.authToken, this.lifeStageId, lifeStageName);
  }

  private renderCardSkeleton() {
    return [1, 2, 3, 4, 5].map(() => (
      <div class={`card-skeleton ${this.recommendedContent.length > 0 || this.lifeStages.length > 0 ? 'd-none' : ''}`}>
        <div class="content">
          <div class="text title" />
          <div class="text subtitle" />
        </div>
      </div>
    ));
  }

  private renderLifeStages() {
    return this.lifeStages.map((obj, index) => (
      <div
        class={`card ${this.recommendedContent.length > 0 ? 'd-none' : ''}`}
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
    return type != 'podcast' || type != 'series' ? (
      <div class="media-label bg-charcoal text-white align-items-center">
        {duration && <span class="font-size-smallest">{duration}</span>}
        {this.renderIcon(type)}
      </div>
    ) : ('');
  }

  private renderIcon(type) {
    console.log(type);
    let src;
    switch (type) {
      case 'video':
        src = (
          <path d="M168.209 84.996c4.231 2.371 7.075 5.665 8.53 9.88 1.454 4.217 1.454 8.433 0 12.649-1.455 4.216-4.299 7.51-8.53 9.88L28.564 199.619c-3.967 2.371-8.2 3.162-12.695 2.371-4.496-.79-8.265-2.898-11.307-6.324C1.521 192.24 0 188.155 0 183.412V18.99c0-5.27 1.587-9.552 4.76-12.845C7.935 2.85 11.77.874 16.266.214c4.497-.658 8.596.198 12.299 2.57l139.645 82.212z" />
        );
        break;
      case 'message':
        src = (
          <path d="M168.209 84.996c4.231 2.371 7.075 5.665 8.53 9.88 1.454 4.217 1.454 8.433 0 12.649-1.455 4.216-4.299 7.51-8.53 9.88L28.564 199.619c-3.967 2.371-8.2 3.162-12.695 2.371-4.496-.79-8.265-2.898-11.307-6.324C1.521 192.24 0 188.155 0 183.412V18.99c0-5.27 1.587-9.552 4.76-12.845C7.935 2.85 11.77.874 16.266.214c4.497-.658 8.596.198 12.299 2.57l139.645 82.212z" />
        );
        break;
      case 'podcast':
        src = (
          <path d="M30.857 41.151c0-11.43 4-21.147 12-29.149C50.857 4.001 60.571 0 72 0c11.428 0 21.143 4 29.143 12.002s12 17.718 12 29.149v68.585c0 11.43-4 21.147-12 29.149-8 8.001-17.715 12.002-29.143 12.002-11.429 0-21.143-4-29.143-12.002s-12-17.718-12-29.15V41.152zm108 44.58c1.428 0 2.643.5 3.643 1.5s1.5 2.215 1.5 3.644v18.86c0 12.003-2.715 23.077-8.143 33.222-5.429 10.145-12.857 18.575-22.286 25.29-9.428 6.716-19.857 10.931-31.285 12.646v19.718h29.142c1.429 0 2.643.5 3.643 1.5s1.5 2.215 1.5 3.644v8.573c0 1.429-.5 2.643-1.5 3.644-1 1-2.214 1.5-3.643 1.5H32.571c-1.428 0-2.643-.5-3.642-1.5-1-1-1.5-2.215-1.5-3.644v-8.573c0-1.429.5-2.643 1.5-3.644 1-1 2.214-1.5 3.642-1.5h29.143v-19.718c-11.428-1.715-21.857-5.93-31.286-12.645-9.428-6.716-16.857-15.146-22.285-25.291C2.714 132.812 0 121.738 0 109.736v-18.86c0-1.43.5-2.644 1.5-3.644s2.214-1.5 3.643-1.5h10.286c1.428 0 2.642.5 3.642 1.5s1.5 2.214 1.5 3.643v18.86c0 9.431 2.358 18.076 7.072 25.935 4.714 7.858 11 14.074 18.857 18.646 7.857 4.573 16.428 6.859 25.714 6.859 9.286 0 17.857-2.358 25.714-7.073 7.857-4.715 14.072-11.074 18.643-19.075 4.572-8.002 6.857-16.575 6.857-25.72V90.875c0-1.429.5-2.643 1.5-3.643s2.215-1.5 3.643-1.5h10.286z" />
        );
        break;
      case 'episode':
        src = (
          <path d="M30.857 41.151c0-11.43 4-21.147 12-29.149C50.857 4.001 60.571 0 72 0c11.428 0 21.143 4 29.143 12.002s12 17.718 12 29.149v68.585c0 11.43-4 21.147-12 29.149-8 8.001-17.715 12.002-29.143 12.002-11.429 0-21.143-4-29.143-12.002s-12-17.718-12-29.15V41.152zm108 44.58c1.428 0 2.643.5 3.643 1.5s1.5 2.215 1.5 3.644v18.86c0 12.003-2.715 23.077-8.143 33.222-5.429 10.145-12.857 18.575-22.286 25.29-9.428 6.716-19.857 10.931-31.285 12.646v19.718h29.142c1.429 0 2.643.5 3.643 1.5s1.5 2.215 1.5 3.644v8.573c0 1.429-.5 2.643-1.5 3.644-1 1-2.214 1.5-3.643 1.5H32.571c-1.428 0-2.643-.5-3.642-1.5-1-1-1.5-2.215-1.5-3.644v-8.573c0-1.429.5-2.643 1.5-3.644 1-1 2.214-1.5 3.642-1.5h29.143v-19.718c-11.428-1.715-21.857-5.93-31.286-12.645-9.428-6.716-16.857-15.146-22.285-25.291C2.714 132.812 0 121.738 0 109.736v-18.86c0-1.43.5-2.644 1.5-3.644s2.214-1.5 3.643-1.5h10.286c1.428 0 2.642.5 3.642 1.5s1.5 2.214 1.5 3.643v18.86c0 9.431 2.358 18.076 7.072 25.935 4.714 7.858 11 14.074 18.857 18.646 7.857 4.573 16.428 6.859 25.714 6.859 9.286 0 17.857-2.358 25.714-7.073 7.857-4.715 14.072-11.074 18.643-19.075 4.572-8.002 6.857-16.575 6.857-25.72V90.875c0-1.429.5-2.643 1.5-3.643s2.215-1.5 3.643-1.5h10.286z" />
        );
        break;
      case 'article':
        src = (
          <path d="M118.96 18.175c0 1.376-.481 2.547-1.445 3.51-.964.964-2.134 1.446-3.511 1.446H4.957c-1.377 0-2.547-.482-3.511-1.445C.482 20.722 0 19.55 0 18.175V4.957C0 3.58.482 2.41 1.446 1.446S3.58 0 4.956 0h109.048c1.377 0 2.547.482 3.51 1.446.965.964 1.447 2.134 1.447 3.51v13.219zM4.958 76.003c-1.377 0-2.547-.482-3.511-1.446S0 72.423 0 71.046V57.828c0-1.377.482-2.547 1.446-3.51.964-.965 2.134-1.447 3.51-1.447h175.137c1.377 0 2.547.482 3.511 1.446s1.446 2.134 1.446 3.511v13.218c0 1.377-.482 2.547-1.446 3.51-.964.965-2.134 1.447-3.51 1.447H4.956zm0 105.742c-1.377 0-2.547-.482-3.511-1.445C.482 179.336 0 178.166 0 176.789V163.57c0-1.377.482-2.547 1.446-3.511s2.134-1.446 3.51-1.446h175.137c1.377 0 2.547.482 3.511 1.446s1.446 2.134 1.446 3.51v13.219c0 1.377-.482 2.547-1.446 3.51-.964.964-2.134 1.446-3.51 1.446H4.956zm109.047-76.002c1.377 0 2.547.482 3.51 1.445.965.964 1.447 2.135 1.447 3.511v13.218c0 1.377-.482 2.547-1.446 3.511s-2.134 1.446-3.511 1.446H4.957c-1.377 0-2.547-.482-3.511-1.446S0 125.294 0 123.918v-13.219c0-1.376.482-2.547 1.446-3.51.964-.964 2.134-1.446 3.51-1.446h109.048z" />
        );
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
          <img src={obj.imageUrl + imgixParams} class="img-responsive" />
        </a>
        <a href={`/media/${obj.contentType}/${obj.slug}`}>
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

  private renderText() {
    const selectedLifeStage: any = this.lifeStages.filter(stage => stage.id === this.lifeStageId)[0];
    return (
      <div>
        <h2 class="component-header flush-bottom">
          {this.recommendedContent.length > 0 ? selectedLifeStage.title : 'Personalize Your Experience'}
        </h2>
        <p class="push-half-top">
          {this.recommendedContent.length > 0
            ? selectedLifeStage.description
            : 'Which of these best describes your stage of life? (Pick one)'}
        </p>
      </div>
    );
  }

  public render() {
    const cardsClasses = `cards ${this.recommendedContent.length > 0 ? 'media-cards' : ''}`;
    return (
      <div class="life-stages">
        <div class="life-stages-inner">
          <div class="life-stages-header">{this.renderText()}</div>
          <div class={cardsClasses}>
            {this.renderCardSkeleton()}
            {this.lifeStages.length > 0 ? this.renderLifeStages() : ''}
            {this.recommendedContent.length > 0 ? this.renderRecommendedContent() : ''}
          </div>
        </div>
      </div>
    );
  }
}
