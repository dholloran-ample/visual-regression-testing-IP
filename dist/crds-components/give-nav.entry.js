import { r as registerInstance, h } from './chunk-67523e50.js';
import { S as SimpleNavHelper } from './chunk-f982586e.js';

class GiveMenu {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.giveNavIsShowing = true;
        this.simpleNav = new SimpleNavHelper();
    }
    navTitle() {
        const data = this.data;
        return (data && data.title) || '';
    }
    backgroundImageURL(data) {
        return data.background_img || '';
    }
    render() {
        if (!this.giveNavIsShowing || !this.simpleNav.isObjectTruthyNonArray(this.data))
            return null;
        return (h("div", { class: "give-nav", style: { backgroundImage: `url(${this.backgroundImageURL(this.data)})` } }, this.simpleNav.renderSections(this.data, this.navTitle())));
    }
    static get style() { return ".give-nav,\n.profile-nav {\n  font-family: \"acumin-pro\", helvetica, arial, sans-serif !important;\n  font-weight: 300 !important;\n  color: white;\n  background-color: black;\n  background-repeat: no-repeat;\n  background-size: 100%;\n  height: 100vh;\n  left: 0;\n  margin-left: -15px;\n  max-height: 100vh;\n  overflow-y: scroll;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 48px;\n  width: 100vw;\n  z-index: 2;\n}\n.give-nav div,\n.profile-nav div {\n  height: auto;\n  padding: 30px 20px 90px;\n}\n.give-nav a,\n.profile-nav a {\n  color: white;\n  display: inline-block;\n  font-size: 19px;\n  margin-bottom: 10px;\n  padding-left: 10px;\n  text-decoration: none;\n  text-transform: capitalize;\n}\n.give-nav a.all,\n.profile-nav a.all {\n  margin-bottom: 30px;\n}\n.give-nav a:hover,\n.profile-nav a:hover {\n  color: #cccccc;\n}\n.give-nav h2,\n.profile-nav h2 {\n  font-family: \"acumin-pro-extra-condensed\", sans-serif !important;\n  font-weight: 500 !important;\n  font-size: 48px;\n  line-height: 48px;\n  margin: 0;\n  text-transform: uppercase;\n  margin-bottom: 20px;\n}\n.give-nav h4,\n.profile-nav h4 {\n  font-size: 11px;\n  margin: 0 0 10px;\n  opacity: 0.5;\n  text-transform: uppercase;\n}\n.give-nav ul,\n.profile-nav ul {\n  padding-left: 0;\n  margin-top: 0;\n}\n.give-nav ul li,\n.profile-nav ul li {\n  list-style: none;\n}\n.give-nav ul li.top-level a,\n.profile-nav ul li.top-level a {\n  padding-left: 0;\n}\n\@media (min-width: 992px) {\n  .give-nav,\n.profile-nav {\n    height: auto;\n    left: auto;\n    margin-right: -15px;\n    position: absolute;\n    right: 15px;\n    width: 375px;\n  }\n}\n\@media (min-width: 1170px) {\n  .give-nav,\n.profile-nav {\n    margin-right: 0;\n  }\n}\n.give-nav::-webkit-scrollbar,\n.profile-nav::-webkit-scrollbar {\n  width: 0;\n}\n.give-nav ul:last-of-type,\n.profile-nav ul:last-of-type {\n  padding-bottom: 30px;\n}\n\n.give-nav {\n  background-image: url(\"https://crds-media.imgix.net/6sNxa1MWhMOfjhAB47yTCa/0acf1af4109f23abc0199b1e34abeb7a/give-bg_2x.jpg?auto=format%2Ccompress\");\n}\n\n.profile-nav:after {\n  background-color: rgba(0, 0, 0, 0.75);\n  content: \" \";\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  z-index: -1;\n}\n.profile-nav .profile-nav-img {\n  background-position: top;\n  background-repeat: no-repeat;\n  background-size: contain;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-filter: blur(2px);\n  filter: blur(2px);\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  z-index: -2;\n}\n\@media (min-width: 992px) {\n  .profile-nav div {\n    padding-bottom: 0;\n  }\n}"; }
}

export { GiveMenu as give_nav };
