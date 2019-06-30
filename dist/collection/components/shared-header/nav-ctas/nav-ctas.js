import decode from 'unescape';
export class NavCtas {
    decodedData() {
        return decode(this.data || '');
    }
    render() {
        if (this.active)
            return null;
        return h("div", { class: "ctas", innerHTML: this.decodedData() });
    }
    static get is() { return "nav-ctas"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "active": {
            "type": String,
            "attr": "active"
        },
        "data": {
            "type": String,
            "attr": "data"
        },
        "href": {
            "type": String,
            "attr": "href"
        }
    }; }
    static get style() { return "/**style-placeholder:nav-ctas:**/"; }
}
