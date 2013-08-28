/**
 * @module ./later.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Later
 * @extends Component
 */
exports.Later = Component.specialize(/** @lends Later# */ {
    constructor: {
        value: function Later() {
            this.super();
        }
    },

    handleCallAction: {
        value: function() {
            this.controller.call();
        }
    },

    handleCallNowAction: {
        value: function() {
            this.controller.now();
        }
    },

    controller: {
        value: null
    }
});
