'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-c7c01652.js');

const CrdsDefaultLayout = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        return core.h("div", null, "Hello there");
    }
    static get style() { return ".card-wrapper{margin-bottom:2.75rem;max-width:360px}.card-image-wrapper{margin-bottom:.5rem;overflow:hidden;position:relative}.card-stamp-container{background-color:hsla(0,0%,9%,.9);bottom:0;padding:.25rem;position:absolute;right:0;display:-ms-flexbox;display:flex}.card-stamp-container>*{margin:.25rem}.card-stamp{display:inline-block;color:#fff;font-family:acumin-pro,helvetica,arial,sans-serif;font-size:10px;font-weight:600}.card-meta-top{color:#737373;display:block;font-family:acumin-pro,helvetica,arial,sans-serif;font-size:12px;line-height:1.67}.card-heading,.card-meta-top{font-weight:500;text-transform:uppercase}.card-heading{color:#4d4d4d;font-family:acumin-pro-extra-condensed,sans-serif;font-size:38px;line-height:.89;margin:0 0 .5rem;-webkit-transition:color .3s;transition:color .3s}.card-heading.hover:hover{color:#000}.card-meta-bottom{color:#979797;font-size:13px;line-height:1;margin:0}.card-content,.card-meta-bottom{display:block;font-weight:300;font-family:acumin-pro,helvetica,arial,sans-serif}.card-content{font-size:16px;line-height:24px;color:#4d4d4d;margin:.5rem 0 0 0}.hover:hover{cursor:pointer}crds-card .active{border:1px solid red}crds-card .active,crds-card .active .card-wrapper{display:none!important}.inactive{display:none}"; }
};

exports.crds_default_layout = CrdsDefaultLayout;
