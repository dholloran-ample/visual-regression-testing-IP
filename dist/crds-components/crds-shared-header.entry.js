import { r as registerInstance, h, c as getElement } from './chunk-67523e50.js';
import './chunk-950a1dca.js';
import { a as axios } from './chunk-bab4a87b.js';
import { F as Fragment } from './chunk-97d1cf70.js';

class SharedHeader {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.env = 'prod';
        this.mainNavIsShowing = false;
        this.profileNavIsShowing = false;
        this.giveNavIsShowing = false;
        this.data = [];
    }
    /**
     * Fires before render...
     */
    componentWillLoad() {
        const url = this.src || `https://crds-data.netlify.com/shared-header/${this.env}.json`;
        return axios.get(url).then(response => (this.data = response.data)).catch(err => console.error(err));
    }
    componentDidLoad() {
        this.element.parentElement.classList.add('shared-header');
        this.element.parentElement.classList.remove('shared-header-skeleton');
    }
    toggleMenu(event, navType) {
        event.preventDefault();
        event.stopPropagation();
        if (navType == 'main-nav') {
            this.giveNavIsShowing = false;
            this.mainNavIsShowing = !this.mainNavIsShowing;
            this.profileNavIsShowing = false;
            if (this.mainNavIsShowing) {
                document.body.setAttribute('style', 'overflow: hidden; position: absolute; width: 100vw;');
            }
            else {
                document.body.setAttribute('style', 'overflow: scroll;');
            }
        }
        else if (navType == 'profile-nav') {
            this.giveNavIsShowing = false;
            this.mainNavIsShowing = false;
            this.profileNavIsShowing = !this.profileNavIsShowing;
            return this.profileNavIsShowing
                ? document.body.setAttribute('style', 'overflow: hidden; position: absolute; width: 100vw;')
                : document.body.setAttribute('style', 'overflow: scroll;');
        }
        else if (navType == 'give-nav') {
            this.giveNavIsShowing = !this.giveNavIsShowing;
            this.mainNavIsShowing = false;
            this.profileNavIsShowing = false;
            return this.giveNavIsShowing
                ? document.body.setAttribute('style', 'overflow: hidden; position: absolute; width: 100vw;')
                : document.body.setAttribute('style', 'overflow: scroll; ');
        }
    }
    closeMenus(event) {
        event.preventDefault();
        this.giveNavIsShowing = false;
        this.mainNavIsShowing = false;
        this.profileNavIsShowing = false;
        return document.body.setAttribute('style', 'overflow: scroll;');
    }
    navCloseClasses() {
        let classes = ['close'];
        if (this.mainNavIsShowing || this.profileNavIsShowing || this.giveNavIsShowing)
            classes.push('is-showing');
        return classes.join(' ');
    }
    handleScroll(event) {
        if (this.mainNavIsShowing || this.giveNavIsShowing || this.profileNavIsShowing) {
            return document.body.setAttribute('style', 'overflow: scroll;'), this.closeMenus(event);
        }
    }
    /**
     * HTML
     */
    render() {
        let close = '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>';
        return (h(Fragment, null, h("global-nav", { mainNavIsShowing: this.mainNavIsShowing, profileNavIsShowing: this.profileNavIsShowing, giveNavIsShowing: this.giveNavIsShowing, navClickHandler: this.toggleMenu.bind(this), giveData: this.data.give, profileData: this.data.profile, config: this.data.config, env: this.env }), h("main-nav", { mainNavIsShowing: this.mainNavIsShowing, data: this.data.nav, promoData: this.data.promos }), h("div", { class: this.navCloseClasses() }, h("div", { class: "close-icon", innerHTML: close, onClick: this.closeMenus.bind(this) }))));
    }
    get element() { return getElement(this); }
    static get style() { return "\@media (max-width: 992px) {\n  .subnavigation {\n    left: 100vw;\n    padding-bottom: 125px;\n    position: absolute;\n    top: 0;\n  }\n}\n\@media (min-width: 992px) {\n  .subnavigation {\n    padding-top: 47px;\n  }\n}\n.subnavigation h3 {\n  color: #fff;\n  font-size: 11px;\n  opacity: 0.5;\n  text-transform: uppercase;\n}\n\nnav {\n  background-color: black;\n  background-repeat: no-repeat;\n  background-size: cover;\n  color: white;\n  display: none;\n  font-family: \"acumin-pro\", helvetica, arial, sans-serif;\n  height: calc(100% - 47px);\n  overflow-x: hidden;\n  overflow-y: scroll;\n  position: fixed;\n  top: 47px;\n  -webkit-transform: translateX(0);\n  transform: translateX(0);\n  width: 100vw;\n  z-index: 2;\n  background-image: url(\"https://crds-media.imgix.net/7B6MoNNiWMZOtdusfRpipl/651049926b72990ae4f510a725cc2b26/nav-section-default-mobile.jpg?auto=format%2Ccompress\");\n}\nnav.is-showing {\n  display: block;\n}\n\@media (min-width: 768px) {\n  nav {\n    height: 100vh;\n  }\n}\n\@media (min-width: 992px) {\n  nav {\n    background-size: 100%;\n  }\n}\n\@media (min-width: 992px) {\n  nav {\n    background-image: url(\"https://crds-media.imgix.net/1OTqm9FjFl6wtjCXAkA04V/d44f06765e1fe0cf6a33ac3222b29302/nav-section-default.jpg?auto=format%2Ccompress\");\n  }\n}\nnav.section--come-visit {\n  background-image: url(\"https://crds-media.imgix.net/7tP5INZjs0NUsWUlUDRpKv/6af5b40c0caf555a52876d51037de2a2/nav-section-locations-mobile.jpg?auto=format%2Ccompress\");\n}\n\@media (min-width: 992px) {\n  nav.section--come-visit {\n    background-image: url(\"https://crds-media.imgix.net/49tv3Wjdt28dPnim7TbR89/6e9931a3700a3894510faa32d6dcea0f/nav-section-locations.jpg?auto=format%2Ccompress\");\n  }\n}\nnav.section--find-community {\n  background-image: url(\"https://crds-media.imgix.net/67LrfkAcGom2zu23JncnA0/6e3c9b52f38f455d69f8b441d0d60726/nav-section-community-mobile.jpg?auto=format%2Ccompress\");\n}\n\@media (min-width: 992px) {\n  nav.section--find-community {\n    background-image: url(\"https://crds-media.imgix.net/zEx1Ajg3dIlh5SpvzQ1qI/981c79df660b3dc5b393338a7640b2a1/nav-section-community.jpg?auto=format%2Ccompress\");\n  }\n}\nnav.section--get-support {\n  background-image: url(\"https://crds-media.imgix.net/Cx02UnQr9sbVzjpXIcuqY/92b73ec270bf84af99c590bbd0173c54/nav-section-support-mobile.jpg?auto=format%2Ccompress\");\n}\n\@media (min-width: 992px) {\n  nav.section--get-support {\n    background-image: url(\"https://crds-media.imgix.net/7i7YFUv6uY8MpwztZwIZE0/d093954885a5af29757040281c3b7e4c/nav-section-support.jpg?auto=format%2Ccompress\");\n  }\n}\nnav.section--watch-listen-read {\n  background-image: url(\"https://crds-media.imgix.net/5lMvnR6A9cavGG4aS0zzO8/bcff1c0f42284f027a411b22a85bfb55/nav-section-media-mobile.jpg?auto=format%2Ccompress\");\n}\n\@media (min-width: 992px) {\n  nav.section--watch-listen-read {\n    background-image: url(\"https://crds-media.imgix.net/59liSAMGW8dBCeUza5NUvj/b43c1e158ac599fd6debc40b916997d9/nav-section-media.jpg?auto=format%2Ccompress\");\n  }\n}\nnav .content {\n  position: relative;\n  width: 200vw;\n  z-index: 3;\n  margin: 0 auto;\n  max-width: 1170px;\n}\n\@media (max-width: 992px) {\n  nav .content {\n    padding-bottom: 125px;\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    -webkit-transition: -webkit-transform 0.2s linear;\n    transition: -webkit-transform 0.2s linear;\n    transition: transform 0.2s linear;\n    transition: transform 0.2s linear, -webkit-transform 0.2s linear;\n  }\n}\n\@media (min-width: 992px) {\n  nav .content {\n    display: -ms-flexbox;\n    display: flex;\n    padding-bottom: 0;\n  }\n}\n\@media (max-width: 992px) {\n  nav[class*=section--] .content {\n    -webkit-transform: translateX(-100vw);\n    transform: translateX(-100vw);\n    -webkit-transition: -webkit-transform 0.2s linear;\n    transition: -webkit-transform 0.2s linear;\n    transition: transform 0.2s linear;\n    transition: transform 0.2s linear, -webkit-transform 0.2s linear;\n  }\n}\n\@media (min-width: 992px) {\n  nav[class*=section--] .ctas {\n    display: none;\n  }\n}\n\@media (min-width: 992px) {\n  nav[class*=section--] .subnavigation {\n    width: calc(50% - 40px);\n  }\n}\n\n.navigation {\n  position: relative;\n  width: 100vw;\n}\n\@media (min-width: 992px) {\n  .navigation {\n    margin-right: 1.2%;\n    width: 50%;\n  }\n}\n.navigation ul {\n  padding-left: 0;\n  margin: 0;\n  padding: 30px 0 20px;\n}\n.navigation ul li {\n  list-style: none;\n}\n\@media (min-width: 992px) {\n  .navigation ul {\n    padding: 50px 20px 0;\n    position: relative;\n    z-index: 1;\n  }\n}\n.navigation li {\n  width: 100%;\n}\n.navigation::after {\n  background-color: #d8d8d8;\n  bottom: 0;\n  content: \"\";\n  height: 2px;\n  left: 20px;\n  margin: 0 auto;\n  opacity: 0.2;\n  position: absolute;\n  width: calc(100vw - 40px);\n}\n\@media (min-width: 992px) {\n  .navigation::after {\n    background: -webkit-gradient(linear, left top, left bottom, from(white), to(rgba(255, 255, 255, 0)));\n    background: linear-gradient(to bottom, white 0%, rgba(255, 255, 255, 0) 100%);\n    height: 100%;\n    left: auto;\n    right: 56px;\n    top: 50px;\n    width: 2px;\n  }\n}\n\n.close {\n  background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 0.9)));\n  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%);\n  bottom: 0;\n  display: none;\n  height: 125px;\n  padding-left: 22px;\n  position: fixed;\n  width: 100%;\n  z-index: 3;\n}\n\@media (max-width: 992px) {\n  .close.is-showing {\n    display: block;\n  }\n}\n.close-icon {\n  background-color: #0095d9;\n  border-radius: 50%;\n  bottom: 22px;\n  -webkit-box-shadow: 0 5px 24px -5px rgba(0, 0, 0, 0.75);\n  box-shadow: 0 5px 24px -5px rgba(0, 0, 0, 0.75);\n  cursor: pointer;\n  height: 64px;\n  position: absolute;\n  width: 64px;\n}\n.close svg {\n  fill: white;\n  height: 30px;\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  width: 30px;\n}"; }
}

export { SharedHeader as crds_shared_header };
