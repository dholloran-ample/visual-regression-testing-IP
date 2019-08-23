import { Component, Prop, State, Element, h, Watch } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { CrdsUser, CrdsLifeStage } from './life-stages-interface';
import { Utils } from '../../shared/utils';
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
    // this.analytics.track('LifeStageUpdated', {
    //   event: event,
    //   lifeStageId: this.user.lifeStage.id,
    //   lifeStageName: this.user.lifeStage.title
    // });
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
            <div class="life-stages-avatar">
              <svg id="account-thin" width="36" height="36" viewBox="0 0 256 256" fill="#c0c0c0">
                <g>
                  <path d="M128,10 C62.8145161,10 10,62.8145161 10,128 C10,193.185484 62.8145161,246 128,246 C193.185484,246 246,193.185484 246,128 C246,62.8145161 193.185484,10 128,10 Z M188.903226,210.6 C171.821774,223.208871 150.791129,230.774194 128,230.774194 C105.208871,230.774194 84.1782258,223.208871 67.0967742,210.6 L67.0967742,204.129032 C67.0967742,187.333065 80.7524194,173.677419 97.5483871,173.677419 C102.829839,173.677419 110.633065,179.101613 128,179.101613 C145.414516,179.101613 153.122581,173.677419 158.451613,173.677419 C175.247581,173.677419 188.903226,187.333065 188.903226,204.129032 L188.903226,210.6 Z M203.462903,197.515323 C200.227419,175.437903 181.433065,158.451613 158.451613,158.451613 C148.697581,158.451613 143.987097,163.875806 128,163.875806 C112.012903,163.875806 107.35,158.451613 97.5483871,158.451613 C74.5669355,158.451613 55.7725806,175.437903 52.5370968,197.515323 C35.6459677,179.196774 25.2258065,154.835484 25.2258065,128 C25.2258065,71.3314516 71.3314516,25.2258065 128,25.2258065 C184.668548,25.2258065 230.774194,71.3314516 230.774194,128 C230.774194,154.835484 220.354032,179.196774 203.462903,197.515323 Z M128,63.2903226 C104.875806,63.2903226 86.1290323,82.0370968 86.1290323,105.16129 C86.1290323,128.285484 104.875806,147.032258 128,147.032258 C151.124194,147.032258 169.870968,128.285484 169.870968,105.16129 C169.870968,82.0370968 151.124194,63.2903226 128,63.2903226 Z M128,131.806452 C113.297581,131.806452 101.354839,119.86371 101.354839,105.16129 C101.354839,90.458871 113.297581,78.516129 128,78.516129 C142.702419,78.516129 154.645161,90.458871 154.645161,105.16129 C154.645161,119.86371 142.702419,131.806452 128,131.806452 Z" />
                </g>
              </svg>
            </div>
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
