import { r as registerInstance, h, c as getElement } from './chunk-baaaaca5.js';
import './chunk-950a1dca.js';
import { a as axios } from './chunk-bab4a87b.js';
import { F as Fragment } from './chunk-97d1cf70.js';

class SharedFooter {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.env = 'prod';
        this.data = [];
    }
    componentWillLoad() {
        const url = this.src || `https://crds-data.netlify.com/shared-footer/${this.env}.json`;
        axios.get(url).then(response => (this.data = response.data));
    }
    componentDidLoad() {
        this.element.parentElement.classList.add('shared-footer');
        this.element.parentElement.classList.remove('shared-footer-skeleton');
    }
    renderElement(el) {
        if (!el.href)
            return el.title;
        let attrs = {
            target: el.href.match(/:\/\//) ? '_blank' : '',
            href: el.href
        };
        if (el['automation-id'])
            attrs['data-automation-id'] = el['automation-id'];
        return h("a", Object.assign({}, attrs), el.img ? h("img", { src: el.img, alt: el.title, title: el.title }) : el.title);
    }
    renderGroups(groups) {
        const groupMarkup = groups.map(group => {
            if (!group.children)
                return h("li", null, this.renderElement(group));
            return (h(Fragment, null, h("p", null, group.title), h("ul", null, group.children.map(el => (h("li", null, this.renderElement(el)))))));
        });
        const Tag = groups.filter(g => g.children).length > 0 ? 'Fragment' : 'ul';
        return h(Tag, null, groupMarkup);
    }
    renderColumns() {
        return this.data.map(column => (h("div", { class: column.class }, h("h5", null, this.renderElement(column)), this.renderGroups(column.children))));
    }
    render() {
        if (this.data.length === 0)
            return null;
        return (h("footer", null, h("div", { class: "container" }, this.renderColumns())));
    }
    get element() { return getElement(this); }
    static get style() { return "footer {\n  font-family: \"acumin-pro\", helvetica, arial, sans-serif !important;\n  font-weight: 300 !important;\n  color: #737373;\n  background-color: #e7e7e7;\n  overflow: hidden;\n  padding: 3.125rem 0;\n}\nfooter .container {\n  margin: 0 auto;\n  max-width: 1170px;\n}\n\@media only screen and (min-width: 768px) {\n  footer .container {\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\nfooter .container div {\n  padding-left: 15px;\n  padding-right: 15px;\n  margin-bottom: 24px;\n  vertical-align: top;\n}\n\@media only screen and (min-width: 768px) {\n  footer .container div {\n    -ms-flex: 1;\n    flex: 1;\n    width: 16.66667%;\n  }\n}\nfooter .container div p {\n  margin-bottom: 0;\n  font-weight: bold;\n}\nfooter .container div ul {\n  list-style-type: none;\n  margin: 0;\n  padding-left: 0;\n}\nfooter .container div.social-icons {\n  padding-left: 0;\n}\n\@media only screen and (min-width: 768px) {\n  footer .container div.social-icons {\n    -ms-flex: 2;\n    flex: 2;\n    text-align: right;\n    width: 33.33333%;\n  }\n}\nfooter .container div.social-icons li {\n  display: inline;\n}\nfooter .container div.social-icons li a {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  margin-left: 0.75rem;\n  background: #737373;\n  border-radius: 50%;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -ms-flex-pack: center;\n  justify-content: center;\n  height: 36px;\n  width: 36px;\n  padding: 10px;\n}\nfooter .container div.social-icons li a img {\n  max-width: 100%;\n}\nfooter .container a {\n  color: #737373;\n  text-decoration: none;\n}\nfooter .container h5 {\n  font-size: 16.1px !important;\n  line-height: 1.1;\n  margin: 12px 0;\n}"; }
}

export { SharedFooter as crds_shared_footer };
