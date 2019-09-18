import { h } from '@stencil/core';
import { Utils } from '../../shared/utils';
import { SvgSrc } from '../../shared/svgSrc';
import { CrdsApollo } from '../../shared/apollo';
import { GET_USER, GET_LIFESTAGES, SET_LIFESTAGE } from './crds-recommended-content.graphql';
export class CrdsRecommendedContent {
    constructor() {
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
        return [1, 2, 3, 4, 5].map(() => (h("div", { class: "skeleton skeleton-life-stage" },
            h("div", { class: "content" },
                h("div", { class: "text title shimmer shimmer-reverse" }),
                h("div", { class: "text subtitle shimmer shimmer-reverse" })))));
    }
    renderTextSkeleton() {
        return (h("div", { class: "skeleton text-skeleton" },
            h("div", { class: "title shimmer" }),
            h("div", { class: "subtitle shimmer" })));
    }
    renderLifeStages() {
        return this.lifeStages.map((obj, index) => (h("div", { class: `card ${this.recommendedContent.length ? 'd-none' : ''}`, key: index, style: {
                backgroundImage: `url(${Utils.imgixify(obj.imageUrl + '?auto=format&h=400')}`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }, "data-life-stage-name": obj.title, "data-life-stage-id": obj.id, onClick: event => this.handleLifeStageClicked(event) },
            h("div", { class: "bg-overlay" }),
            h("div", { class: "card-content" },
                h("h2", { class: "card-title component-header" }, obj.title),
                h("h3", { class: "card-subtitle" }, `${obj.contentTotal} items`)))));
    }
    renderMediaLabel(type, duration) {
        if (type !== 'series') {
            return (h("div", { class: "media-label bg-charcoal text-white align-items-center" },
                duration && h("span", { class: "font-size-smallest" }, duration),
                this.renderIcon(type)));
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
        return this.recommendedContent.map((obj, index) => (h("div", { class: "card", key: index, onClick: event => this.handleContentClicked(event) },
            h("a", { class: "relative d-block", href: obj.qualifiedUrl },
                this.renderMediaLabel(obj.contentType, obj.duration),
                h("img", { src: (obj.imageUrl || this.crdsDefaultImg) + imgixParams, class: "img-responsive" })),
            h("a", { href: obj.qualifiedUrl },
                h("h4", { class: "text-gray font-size-smaller font-weight-mid text-uppercase soft-quarter-top" }, obj.category),
                h("h3", { class: "component-header" }, obj.title),
                obj.authors && (h("p", { class: "soft-quarter-top" }, obj.authors.map((author, index) => (h("a", { class: "text-gray-light font-size-smaller", href: author.qualifiedUrl, style: {
                        color: 'inherit',
                        display: 'inline-block',
                        textDecoration: 'none'
                    } },
                    author.fullName,
                    index < obj.authors.length - 1 ? h("span", null, ",\u00A0") : '')))))))));
    }
    renderText() {
        const selectedLifeStage = this.lifeStages.find(stage => stage.id === (this.user.lifeStage && this.user.lifeStage.id));
        return (h("div", null,
            h("h2", { class: "component-header flush-bottom" }, this.recommendedContent.length && selectedLifeStage
                ? 'Recommended For You'
                : 'Personalize Your Experience'),
            h("p", { class: "push-half-top push-half-bottom color-gray" }, this.recommendedContent.length && selectedLifeStage
                ? selectedLifeStage.description
                : 'Which of these best describes your stage of life? (Pick one)')));
    }
    render() {
        const renderLifeStages = this.lifeStages.length && this.user.lifeStage && !this.user.lifeStage.id;
        const renderRecommendedContent = this.recommendedContent.length;
        const cardsClasses = `cards ${this.recommendedContent.length ? 'media-cards' : ''}`;
        return (h("div", { class: "life-stages" },
            h("div", { class: "life-stages-inner" },
                h("div", { class: "life-stages-header" },
                    (() => {
                        if (renderLifeStages || renderRecommendedContent)
                            return this.renderText();
                        return this.renderTextSkeleton();
                    })(),
                    !!this.recommendedContent.length && (h("div", { class: "life-stage-selected" },
                        h("a", { class: "btn btn-gray-light btn-outline btn-sm back-btn flush", onClick: event => this.handleBackClick(event) }, "change")))),
                h("div", { class: cardsClasses }, (() => {
                    if (renderLifeStages)
                        return this.renderLifeStages();
                    if (renderRecommendedContent)
                        return this.renderRecommendedContent();
                    return this.renderCardSkeleton();
                })()))));
    }
    static get is() { return "crds-recommended-content"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["crds-recommended-content.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["crds-recommended-content.css"]
    }; }
    static get properties() { return {
        "authToken": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "auth-token",
            "reflect": false
        }
    }; }
    static get states() { return {
        "lifeStages": {},
        "user": {}
    }; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "authToken",
            "methodName": "authTokenHandler"
        }]; }
}
