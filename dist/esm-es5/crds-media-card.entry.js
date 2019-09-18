import { r as registerInstance, h } from './core-9036992e.js';
var CrdsMediaCard = /** @class */ (function () {
    function CrdsMediaCard(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.contentLayout = 'default';
        // state
        this.isVisible = false;
        this.childProps = {};
        this.propNames = [
            'imageSrc',
            'heading',
            'meta',
            'metaPosition',
            'body',
            'url',
            'buttonSrc',
            'nearestMinute',
            'author',
            'mediaTopic',
            'thumbnailSrc',
            'contentCount',
            'contentType'
        ];
        this.contentLayouts = ['default', 'overlay', 'media-object'];
        this.contentTypes = ['article', 'video', 'podcast-episode', 'message', 'song', 'series', 'album', 'podcast'];
        this.metaPositions = ['top', 'bottom'];
        this.getLayout = function () {
            return {
                default: h("crds-default-layout", Object.assign({}, _this.childProps)),
                overlay: h("crds-overlay-layout", Object.assign({}, _this.childProps)),
                'media-object': h("crds-media-object-layout", Object.assign({}, _this.childProps))
            }[_this.contentLayout];
        };
    }
    // ----------------------------------------------- | Validations
    CrdsMediaCard.prototype.validateContentType = function () {
        if (typeof this.contentType != 'undefined' && this.contentTypes.indexOf(this.contentType) == -1) {
            throw new Error(this.contentType + " is not a valid value for contentType");
        }
    };
    CrdsMediaCard.prototype.validateContentLayout = function () {
        if (typeof this.contentLayout != 'undefined' && this.contentLayouts.indexOf(this.contentLayout) == -1) {
            throw new Error(this.contentLayout + " is not a valid value for contentLayout");
        }
    };
    CrdsMediaCard.prototype.validateImage = function () {
        var isEmpty = typeof this.imageSrc == 'undefined';
        if (isEmpty) {
            throw new Error('imageSrc property is required on all media cards');
        }
    };
    CrdsMediaCard.prototype.validateMeta = function () {
        if (typeof this.meta != 'undefined' && typeof this.metaPosition == 'undefined') {
            throw new Error("metaPosition is required if you want to provide a meta");
        }
    };
    CrdsMediaCard.prototype.validateMetaPosition = function () {
        if (typeof this.metaPosition != 'undefined' && this.metaPositions.indexOf(this.metaPosition) == -1) {
            throw new Error(this.metaPosition + " is not a valid value for metaPosition");
        }
        else if (typeof this.meta == 'undefined' && typeof this.metaPosition != 'undefined') {
            throw new Error("Meta is required if you want to provide a meta posittion");
        }
    };
    // ----------------------------------------------- | Methods
    CrdsMediaCard.prototype.componentWillLoad = function () {
        var _this = this;
        // Set props for child component
        this.propNames
            .filter(function (prop) { return _this[prop] != undefined; })
            .forEach(function (prop) {
            _this.childProps[prop] = _this[prop];
        });
    };
    CrdsMediaCard.prototype.runValidations = function () {
        this.validateImage();
        this.validateContentLayout();
        this.validateContentType();
        this.validateMeta();
        this.validateMetaPosition();
    };
    CrdsMediaCard.prototype.connectedCallback = function () {
        this.runValidations();
    };
    CrdsMediaCard.prototype.render = function () {
        return this.getLayout();
    };
    Object.defineProperty(CrdsMediaCard, "style", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    return CrdsMediaCard;
}());
export { CrdsMediaCard as crds_media_card };
