import { h, r as registerInstance, c as getElement } from './chunk-67523e50.js';
import { g as gql, C as CrdsApollo } from './chunk-3601aa65.js';
import './chunk-a9955f90.js';
import './chunk-950a1dca.js';
import { U as Utils } from './chunk-4786bf9d.js';

class SvgSrc {
    static articleIcon() {
        return h("path", { d: "M118.96 18.175c0 1.376-.481 2.547-1.445 3.51-.964.964-2.134 1.446-3.511 1.446H4.957c-1.377 0-2.547-.482-3.511-1.445C.482 20.722 0 19.55 0 18.175V4.957C0 3.58.482 2.41 1.446 1.446S3.58 0 4.956 0h109.048c1.377 0 2.547.482 3.51 1.446.965.964 1.447 2.134 1.447 3.51v13.219zM4.958 76.003c-1.377 0-2.547-.482-3.511-1.446S0 72.423 0 71.046V57.828c0-1.377.482-2.547 1.446-3.51.964-.965 2.134-1.447 3.51-1.447h175.137c1.377 0 2.547.482 3.511 1.446s1.446 2.134 1.446 3.511v13.218c0 1.377-.482 2.547-1.446 3.51-.964.965-2.134 1.447-3.51 1.447H4.956zm0 105.742c-1.377 0-2.547-.482-3.511-1.445C.482 179.336 0 178.166 0 176.789V163.57c0-1.377.482-2.547 1.446-3.511s2.134-1.446 3.51-1.446h175.137c1.377 0 2.547.482 3.511 1.446s1.446 2.134 1.446 3.51v13.219c0 1.377-.482 2.547-1.446 3.51-.964.964-2.134 1.446-3.51 1.446H4.956zm109.047-76.002c1.377 0 2.547.482 3.51 1.445.965.964 1.447 2.135 1.447 3.511v13.218c0 1.377-.482 2.547-1.446 3.511s-2.134 1.446-3.511 1.446H4.957c-1.377 0-2.547-.482-3.511-1.446S0 125.294 0 123.918v-13.219c0-1.376.482-2.547 1.446-3.51.964-.964 2.134-1.446 3.51-1.446h109.048z" });
    }
    static podcastIcon() {
        return h("path", { d: "M30.857 41.151c0-11.43 4-21.147 12-29.149C50.857 4.001 60.571 0 72 0c11.428 0 21.143 4 29.143 12.002s12 17.718 12 29.149v68.585c0 11.43-4 21.147-12 29.149-8 8.001-17.715 12.002-29.143 12.002-11.429 0-21.143-4-29.143-12.002s-12-17.718-12-29.15V41.152zm108 44.58c1.428 0 2.643.5 3.643 1.5s1.5 2.215 1.5 3.644v18.86c0 12.003-2.715 23.077-8.143 33.222-5.429 10.145-12.857 18.575-22.286 25.29-9.428 6.716-19.857 10.931-31.285 12.646v19.718h29.142c1.429 0 2.643.5 3.643 1.5s1.5 2.215 1.5 3.644v8.573c0 1.429-.5 2.643-1.5 3.644-1 1-2.214 1.5-3.643 1.5H32.571c-1.428 0-2.643-.5-3.642-1.5-1-1-1.5-2.215-1.5-3.644v-8.573c0-1.429.5-2.643 1.5-3.644 1-1 2.214-1.5 3.642-1.5h29.143v-19.718c-11.428-1.715-21.857-5.93-31.286-12.645-9.428-6.716-16.857-15.146-22.285-25.291C2.714 132.812 0 121.738 0 109.736v-18.86c0-1.43.5-2.644 1.5-3.644s2.214-1.5 3.643-1.5h10.286c1.428 0 2.642.5 3.642 1.5s1.5 2.214 1.5 3.643v18.86c0 9.431 2.358 18.076 7.072 25.935 4.714 7.858 11 14.074 18.857 18.646 7.857 4.573 16.428 6.859 25.714 6.859 9.286 0 17.857-2.358 25.714-7.073 7.857-4.715 14.072-11.074 18.643-19.075 4.572-8.002 6.857-16.575 6.857-25.72V90.875c0-1.429.5-2.643 1.5-3.643s2.215-1.5 3.643-1.5h10.286z" });
    }
    static videoIcon() {
        return h("path", { d: "M168.209 84.996c4.231 2.371 7.075 5.665 8.53 9.88 1.454 4.217 1.454 8.433 0 12.649-1.455 4.216-4.299 7.51-8.53 9.88L28.564 199.619c-3.967 2.371-8.2 3.162-12.695 2.371-4.496-.79-8.265-2.898-11.307-6.324C1.521 192.24 0 188.155 0 183.412V18.99c0-5.27 1.587-9.552 4.76-12.845C7.935 2.85 11.77.874 16.266.214c4.497-.658 8.596.198 12.299 2.57l139.645 82.212z" });
    }
    static bullseyeIcon(width, height, fillColor) {
        return h("svg", { width: width, height: height, "aria-hidden": "true", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 496 512" },
            h("path", { fill: fillColor, d: "M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 432c-101.69 0-184-82.29-184-184 0-101.69 82.29-184 184-184 101.69 0 184 82.29 184 184 0 101.69-82.29 184-184 184zm0-312c-70.69 0-128 57.31-128 128s57.31 128 128 128 128-57.31 128-128-57.31-128-128-128zm0 192c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z" }));
    }
}

const GET_USER = gql `
{
    user {
        lifeStage {
            id
            title
        }
    }
}
`;
const GET_LIFESTAGES = gql `
{
  lifeStages{
    title
    description
    id
    imageUrl
    contentType
    contentTotal
    content {
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
  }
}
`;
const SET_LIFESTAGE = gql `
mutation setLifeStage($lifeStage: LifeStageInput)
 {
  setLifeStage(lifeStage: $lifeStage) {
    lifeStage {
      title
      id
    }
  }
}`;

class CrdsRecommendedContent {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.analytics = window['analytics'] || {};
        this.crdsDefaultImg = 'https://crds-cms-uploads.imgix.net/content/images/cr-social-sharing-still-bg.jpg';
        this.recommendedContent = [];
        this.lifeStages = [];
        this.user = { name: '', lifeStage: null };
    }
    authTokenHandler(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.apolloClient = CrdsApollo(newValue);
            this.getUser();
        }
    }
    componentWillLoad() {
        this.apolloClient = CrdsApollo(this.authToken);
        this.getLifeStages();
        this.getUser();
    }
    componentDidLoad() {
        Utils.trackInView(this.host, 'RecommendedContentComponent', this.getLifeStageId.bind(this));
    }
    componentWillRender() {
        if (this.user.lifeStage && this.user.lifeStage.id !== null && this.lifeStages.length)
            return this.filterContent(this.user.lifeStage.id);
    }
    getLifeStageId() {
        return this.user.lifeStage && this.user.lifeStage.id;
    }
    getUser() {
        if (!this.authToken)
            return null;
        return this.apolloClient.query({ query: GET_USER }).then(success => {
            const name = success.data.user.lifeStage && success.data.user.lifeStage.title;
            const id = success.data.user.lifeStage && success.data.user.lifeStage.id;
            this.user = Object.assign({}, this.user, { lifeStage: { id: id, title: name } });
            this.host.forceUpdate();
        });
    }
    getLifeStages() {
        return this.apolloClient.query({ query: GET_LIFESTAGES }).then(success => {
            this.lifeStages = success.data.lifeStages;
            this.host.forceUpdate();
        });
    }
    /**
     * Get content with set life stages
     */
    filterContent(lifeStageId) {
        return this.recommendedContent = this.lifeStages.find(lifestage => lifestage.id === lifeStageId).content;
    }
    handleBackClick(event) {
        this.recommendedContent = [];
        this.user = Object.assign({}, this.user, { lifeStage: { id: null, title: null } });
        event.target.parentNode.scrollLeft = 0;
    }
    handleContentClicked(event) {
        try {
            this.analytics.track('RecommendedContentClicked', {
                parent: this.host.tagName,
                title: event.currentTarget.querySelector('.component-header').innerText,
                targetUrl: event.target.parentElement.href,
                lifeStageId: this.user.lifeStage.id,
                lifeStageName: this.user.lifeStage.title
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    /**
     * Get content with set life stages
     */
    setLifeStage(lifeStageId, lifeStageName) {
        const obj = lifeStageId
            ? {
                id: lifeStageId,
                title: lifeStageName
            }
            : null;
        return this.apolloClient
            .mutate({
            variables: { lifeStage: obj },
            mutation: SET_LIFESTAGE
        })
            .catch(err => console.error(err));
    }
    handleLifeStageClicked(event) {
        const card = event.target;
        const cards = this.host.shadowRoot.querySelectorAll('[data-life-stage-id]');
        cards.forEach(card => card.classList.add('disabled'));
        this.user = Object.assign({}, this.user, { lifeStage: { id: card.dataset.lifeStageId, title: card.dataset.lifeStageName } });
        try {
            this.analytics.track('LifeStageUpdated', {
                lifeStageId: this.user.lifeStage.id,
                lifeStageName: this.user.lifeStage.title
            });
        }
        catch (error) {
            console.error(error);
        }
        this.filterContent(this.user.lifeStage.id);
        card.parentNode.scrollLeft = 0;
        cards.forEach(card => card.classList.remove('disabled'));
        this.setLifeStage(this.user.lifeStage.id, this.user.lifeStage.title);
    }
    renderCardSkeleton() {
        return [1, 2, 3, 4, 5].map(() => (h("div", { class: "skeleton skeleton-life-stage" }, h("div", { class: "content" }, h("div", { class: "text title shimmer shimmer-reverse" }), h("div", { class: "text subtitle shimmer shimmer-reverse" })))));
    }
    renderTextSkeleton() {
        return (h("div", { class: "skeleton text-skeleton" }, h("div", { class: "title shimmer" }), h("div", { class: "subtitle shimmer" })));
    }
    renderLifeStages() {
        return this.lifeStages.map((obj, index) => (h("div", { class: `card ${this.recommendedContent.length ? 'd-none' : ''}`, key: index, style: {
                backgroundImage: `url(${Utils.imgixify(obj.imageUrl + '?auto=format&h=400')}`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }, "data-life-stage-name": obj.title, "data-life-stage-id": obj.id, onClick: event => this.handleLifeStageClicked(event) }, h("div", { class: "bg-overlay" }), h("div", { class: "card-content" }, h("h2", { class: "card-title component-header" }, obj.title), h("h3", { class: "card-subtitle" }, `${obj.contentTotal} items`)))));
    }
    renderMediaLabel(type, duration) {
        if (type !== 'series') {
            return (h("div", { class: "media-label bg-charcoal text-white align-items-center" }, duration && h("span", { class: "font-size-smallest" }, duration), this.renderIcon(type)));
        }
    }
    renderIcon(type) {
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
        return (h("svg", { class: "icon", viewBox: "0 0 256 256" }, src));
    }
    renderRecommendedContent() {
        const imgixParams = window.innerWidth > 767 ? '?auto=format&w=400&h=225&fit=crop' : '?auto=format&w=262&h=196.5&fit=crop';
        return this.recommendedContent.map((obj, index) => (h("div", { class: "card", key: index, onClick: event => this.handleContentClicked(event) }, h("a", { class: "relative d-block", href: obj.qualifiedUrl }, this.renderMediaLabel(obj.contentType, obj.duration), h("img", { src: (obj.imageUrl || this.crdsDefaultImg) + imgixParams, class: "img-responsive" })), h("a", { href: obj.qualifiedUrl }, h("h4", { class: "text-gray font-size-smaller font-weight-mid text-uppercase soft-quarter-top" }, obj.category), h("h3", { class: "component-header" }, obj.title), obj.authors && (h("p", { class: "soft-quarter-top" }, obj.authors.map((author, index) => (h("a", { class: "text-gray-light font-size-smaller", href: author.qualifiedUrl, style: {
                color: 'inherit',
                display: 'inline-block',
                textDecoration: 'none'
            } }, author.fullName, index < obj.authors.length - 1 ? h("span", null, ",\u00A0") : '')))))))));
    }
    renderText() {
        const selectedLifeStage = this.lifeStages.find(stage => stage.id === (this.user.lifeStage && this.user.lifeStage.id));
        return (h("div", null, h("h2", { class: "component-header flush-bottom" }, this.recommendedContent.length && selectedLifeStage
            ? 'Recommended For You'
            : 'Personalize Your Experience'), h("p", { class: "push-half-top push-half-bottom color-gray" }, this.recommendedContent.length && selectedLifeStage
            ? selectedLifeStage.description
            : 'Which of these best describes your stage of life? (Pick one)')));
    }
    render() {
        const renderLifeStages = this.lifeStages.length && this.user.lifeStage && !this.user.lifeStage.id;
        const renderRecommendedContent = this.recommendedContent.length;
        const cardsClasses = `cards ${this.recommendedContent.length ? 'media-cards' : ''}`;
        return (h("div", { class: "life-stages" }, h("div", { class: "life-stages-inner" }, h("div", { class: "life-stages-header" }, (() => {
            if (renderLifeStages || renderRecommendedContent)
                return this.renderText();
            return this.renderTextSkeleton();
        })(), !!this.recommendedContent.length && (h("div", { class: "life-stage-selected" }, h("a", { class: "btn btn-gray-light btn-outline btn-sm back-btn flush", onClick: event => this.handleBackClick(event) }, "change")))), h("div", { class: cardsClasses }, (() => {
            if (renderLifeStages)
                return this.renderLifeStages();
            if (renderRecommendedContent)
                return this.renderRecommendedContent();
            return this.renderCardSkeleton();
        })()))));
    }
    get host() { return getElement(this); }
    static get watchers() { return {
        "authToken": ["authTokenHandler"]
    }; }
    static get style() { return "* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.relative {\n  position: relative;\n}\n\n.overflow-hidden {\n  overflow: hidden;\n}\n\n.d-flex {\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.d-block {\n  display: block;\n}\n\n.d-inline {\n  display: inline;\n}\n\n.d-none {\n  display: none;\n}\n\n.align-items-center {\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.w-100 {\n  width: 100%;\n}\n\n.img-responsive {\n  display: block;\n  height: auto;\n  max-width: 100%;\n}\n\nhr {\n  border: 0;\n  border-top: 1px solid #e7e7e7;\n  margin-bottom: 1rem;\n  margin-top: 1rem;\n}\n\n.font-family-base {\n  font-family: \"acumin-pro\", helvetica, arial, sans-serif !important;\n  font-weight: 300 !important;\n}\n\n.text-white {\n  color: #fff !important;\n}\n\n.text-gray-light {\n  color: #979797 !important;\n}\n\n.text-gray {\n  color: #737373 !important;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-uppercase.font-size-smaller {\n  font-size: 13px !important;\n  letter-spacing: 0.5px;\n}\n\n.font-size-base {\n  font-size: 16px !important;\n}\n\@media (min-width: 480px) {\n  .font-size-base {\n    font-size: 19px !important;\n  }\n}\n\n.font-size-large {\n  font-size: 19px !important;\n}\n\@media (min-width: 480px) {\n  .font-size-large {\n    font-size: 22px !important;\n  }\n}\n\n.font-size-smaller {\n  font-size: 14px !important;\n}\n\n.font-size-smallest {\n  font-size: 10px;\n}\n\n.font-weight-mid {\n  font-weight: 500;\n}\n\n.bg-charcoal {\n  background-color: #171717;\n}\n\n.flush {\n  margin: 0 !important;\n}\n\n.flush-bottom {\n  margin-bottom: 0 !important;\n}\n\n.flush-top {\n  margin-top: 0 !important;\n}\n\n.push-half-bottom {\n  margin-bottom: 12px !important;\n}\n\n.push-bottom {\n  margin-bottom: 24px !important;\n}\n\n.push-top {\n  margin-top: 24px;\n}\n\n.push-half-top {\n  margin-top: 12px !important;\n}\n\n.soft-quarter-top {\n  padding-top: 6px;\n}\n\n.component-header {\n  font-family: \"acumin-pro-extra-condensed\";\n  font-size: 2rem;\n  font-weight: 500;\n  line-height: 0.95;\n  text-transform: uppercase;\n}\n\@media (min-width: 480px) {\n  .component-header {\n    font-size: 2.125rem;\n  }\n}\n\n.card > a {\n  color: inherit;\n  display: block;\n  text-decoration: none;\n}\n.card img {\n  width: 100%;\n}\n\n.color-gray {\n  color: #737373;\n}\n\n.media-label {\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  padding: 6px 8px;\n}\n.media-label > *:not(:last-child) {\n  margin-right: 5px;\n}\n.media-label .icon {\n  fill: #fff;\n  height: 16px;\n  width: 12px;\n}\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  font-weight: 300;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  padding: 8px 10px;\n  font-size: 16px;\n  line-height: 1.5;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  border-radius: 4px;\n  line-height: 1;\n  margin-top: 5px;\n  margin-bottom: 5px;\n  font-size: 14px;\n  padding: 13px 16px;\n}\n.btn.btn-gray-light {\n  color: #fff;\n  background-color: #979797;\n  border-color: #979797;\n}\n.btn.btn-gray-light.btn-outline {\n  background: transparent;\n  border-style: solid;\n  border-width: 1px;\n  color: #979797;\n}\n.btn.btn-gray-light.btn-outline:hover {\n  background-color: #979797;\n  color: #fff;\n}\n.btn.btn-sm {\n  font-size: 13px;\n  padding: 10px 16px 11px;\n}\n\n.skeleton {\n  overflow: hidden;\n  position: relative;\n}\n.skeleton .shimmer {\n  overflow: hidden;\n}\n.skeleton .shimmer::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n  background-image: linear-gradient(100deg, #f0f0f0 20%, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0.7) 40%, #f0f0f0 50%);\n  -webkit-animation: shimmer 1.5s infinite;\n  animation: shimmer 1.5s infinite;\n  -webkit-animation-timing-function: ease;\n  animation-timing-function: ease;\n  content: \"\";\n}\n.skeleton .shimmer-reverse::after {\n  background-image: linear-gradient(100deg, white 20%, rgba(240, 240, 240, 0.3) 30%, rgba(240, 240, 240, 0.7) 40%, white 50%);\n}\n\n\@-webkit-keyframes shimmer {\n  to {\n    -webkit-transform: translateX(100%);\n    transform: translateX(100%);\n  }\n}\n\n\@keyframes shimmer {\n  to {\n    -webkit-transform: translateX(100%);\n    transform: translateX(100%);\n  }\n}\np,\nh1,\nh2,\nh3,\nh4,\nh5 {\n  margin: 0;\n}\n\n.disabled {\n  opacity: 0.5;\n  pointer-events: none;\n}\n\n.life-stages {\n  background-color: #fff;\n  min-height: 300px;\n  overflow: hidden;\n}\n\@media (min-width: 768px) {\n  .life-stages {\n    min-height: 500px;\n  }\n}\n.life-stages .life-stages-inner {\n  -webkit-transition: all 0.45s ease;\n  transition: all 0.45s ease;\n}\n.life-stages .life-stages-header {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  padding-bottom: 1.875rem;\n}\n\@media (min-width: 768px) {\n  .life-stages .life-stages-header {\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n}\n\@media (min-width: 768px) {\n  .life-stages .life-stages-header {\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n}\n.life-stages .life-stages-header .life-stage-selected {\n  font-size: 0.875rem;\n}\n\@media (min-width: 768px) {\n  .life-stages .life-stages-header .life-stage-selected {\n    margin-left: auto;\n  }\n}\n\n.cards {\n  display: grid;\n  grid-auto-columns: 180px;\n  grid-auto-flow: column;\n  grid-column: 1/-1;\n  grid-gap: 1rem;\n  -webkit-overflow-scrolling: touch;\n  overflow-x: scroll;\n  padding-bottom: 1.875rem;\n  -webkit-scroll-snap-type: x mandatory;\n  -ms-scroll-snap-type: x mandatory;\n  scroll-snap-type: x mandatory;\n  scrollbar-base-color: transparent;\n}\n.cards.media-cards {\n  grid-auto-columns: 262px;\n}\n\@media (min-width: 768px) {\n  .cards {\n    grid-auto-columns: 220px;\n    grid-gap: 1.875rem;\n  }\n  .cards.media-cards {\n    grid-auto-columns: 400px;\n  }\n}\n.cards .card,\n.cards .skeleton-life-stage {\n  cursor: pointer;\n  height: 340px;\n  overflow: hidden;\n  position: relative;\n  scroll-snap-align: start;\n}\n.cards .card:hover,\n.cards .skeleton-life-stage:hover {\n  cursor: pointer;\n}\n.cards .card:hover .bg-overlay,\n.cards .skeleton-life-stage:hover .bg-overlay {\n  opacity: 0.75;\n}\n.cards .card .bg-overlay,\n.cards .card .card-content,\n.cards .skeleton-life-stage .bg-overlay,\n.cards .skeleton-life-stage .card-content {\n  bottom: 0;\n  pointer-events: none;\n  position: absolute;\n  width: 100%;\n}\n.cards .card .bg-overlay,\n.cards .skeleton-life-stage .bg-overlay {\n  background: -webkit-gradient(linear, left bottom, left top, from(black), color-stop(50%, rgba(0, 0, 0, 0)));\n  background: linear-gradient(0deg, black 0%, rgba(0, 0, 0, 0) 50%);\n  height: 100%;\n  -webkit-transition: all 0.45s ease;\n  transition: all 0.45s ease;\n}\n.cards .card .card-content,\n.cards .skeleton-life-stage .card-content {\n  bottom: 0;\n  left: 0;\n  padding: 1rem;\n}\n.cards .card .card-content .card-title,\n.cards .card .card-content .card-subtitle,\n.cards .skeleton-life-stage .card-content .card-title,\n.cards .skeleton-life-stage .card-content .card-subtitle {\n  letter-spacing: 0.5px;\n  margin: 0;\n  text-transform: uppercase;\n}\n.cards .card .card-content .card-title,\n.cards .skeleton-life-stage .card-content .card-title {\n  color: #fff;\n}\n.cards .card .card-content .card-subtitle,\n.cards .skeleton-life-stage .card-content .card-subtitle {\n  color: rgba(255, 255, 255, 0.75);\n  font-size: 0.75rem;\n}\n\n.skeleton-life-stage {\n  background-color: #f0f0f0;\n}\n.skeleton-life-stage .content {\n  bottom: 0;\n  padding: 1rem;\n  position: absolute;\n  width: 100%;\n}\n.skeleton-life-stage .content .text {\n  background-color: #fff;\n  margin-top: 0.5rem;\n  overflow: hidden;\n  position: relative;\n}\n.skeleton-life-stage .content .title {\n  height: 24px;\n  width: 90%;\n}\n.skeleton-life-stage .content .subtitle {\n  height: 16px;\n  width: 55%;\n}\n\n.text-skeleton {\n  width: 100%;\n}\n.text-skeleton .title,\n.text-skeleton .subtitle {\n  background-color: #f0f0f0;\n  overflow: hidden;\n  position: relative;\n}\n.text-skeleton .title {\n  height: 24px;\n  margin-bottom: 1rem;\n  width: 35%;\n}\n.text-skeleton .subtitle {\n  height: 16px;\n  width: 50%;\n}"; }
}

export { CrdsRecommendedContent as crds_recommended_content };
