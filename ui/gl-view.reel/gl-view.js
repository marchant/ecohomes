/**
 * @module ./gl-view.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;
var Map = require("montage/collections/map");

/**
 * @class GlView
 * @extends Component
 */
exports.GlView = Component.specialize(/** @lends GlView# */ {

    _panelKeyViewpointMap: {
        value: null
    },

    constructor: {
        value: function GlView() {
            this.super();
        }
    },

    currentPanel: {
        value: null
    },

    configuration: {
        value: null
    },

    templateDidLoad: {
        value: function () {
            var templateObjects = this.templateObjects;

            // Setup which viewpoint to use for each panel
            this._panelKeyViewpointMap = new Map({
                staircase: templateObjects.staircaseViewpoint,
                kitchen: templateObjects.kitchenViewpoint,
                counters: templateObjects.counterViewpoint,
                window: templateObjects.windowViewpoint
            });

            // React to changes in the configuration
            this.addPathChangeListener("configuration.configurationMap.get('staircase').optionMap.get('material')._selectedOption", this, "handleStaircaseMaterialChange");
            this.addPathChangeListener("configuration.configurationMap.get('window').optionMap.get('coating').value", this, "handleWindowCoatingChange");
            this.addPathChangeListener("configuration.configurationMap.get('kitchen').optionMap.get('appliances')._selectedOption", this, "handleKitchenAppliancesChange");
            this.addPathChangeListener("configuration.configurationMap.get('counters').optionMap.get('material')._selectedOption", this, "handleCountertopMaterialChange");

            //React to the currentPanel changing
            this.addPathChangeListener("currentPanel", this, "handleCurrentPanelChange");
        }
    },

    handleStaircaseMaterialChange: {
        value: function (newMaterial) {
            var staircaseMaterial = this.templateObjects.staircaseMaterial;
            var texture = "wood-stairs.jpg";

            //TODO improve this; just done enough to get it working
            //TODO not rely on the fragile name
            if (newMaterial) {
                switch (newMaterial.name) {
                    case "FSC Pine":
                        texture = "wood-stairs.jpg";
                        break;
                    case "Dark Ash":
                        texture = "dark-stairs.jpg";
                        break;
                    case "Dark Walnut":
                        texture = "walnut-stairs.jpg";
                        break;
                    case "Powder Coated Metal":
                        texture = "bold-stairs.jpg";
                        break;
                    default:
                        texture = "";
                }
            }

            staircaseMaterial.image = texture;
        }
    },

    handleKitchenAppliancesChange: {
        value: function (newApplianceValue) {
            var appliancesMaterial = this.templateObjects.appliancesMaterial,
                appliancesNode = this.templateObjects.appliancesNode,
                opacity = 1,
                hidden = false;

            //TODO not rely on the fragile name
            if (!newApplianceValue || "None" === newApplianceValue.name) {
                opacity = 0;
                hidden = true;
            }

            appliancesMaterial.opacity = opacity;
            appliancesNode.hidden = hidden;
        }
    },

    handleCountertopMaterialChange: {
        value: function (newMaterial) {
            var countertopMaterial = this.templateObjects.countertopMaterial;
            var texture = "paper-counters.jpg";

            //TODO improve this; just done enough to get it working
            //TODO not rely on the fragile name
            if (newMaterial) {
                switch (newMaterial.name) {
                    case "Black Quartz":
                        texture = "7_cuisineVRayCompleteMap.jpg";
                        break;
                    case "Paper Composite":
                        break;
                    case "Bamboo":
                        texture = "bamboo-counters.jpg";
                        break;
                    case "Cement and Fly Ash":
                        texture = "cement-counters.jpg";
                        break;
                    default:
                        texture = "";
                }
            }

            countertopMaterial.image = texture;
        }
    },

    handleWindowCoatingChange: {
        value: function (newCoatingValue) {
            newCoatingValue = 1 - (newCoatingValue/2400); //TODO not hardcode this, fit to some reasonable curve
            var backgroundMaterial = this.templateObjects.backgroundMaterial;
            backgroundMaterial.filterColor = [newCoatingValue, 1, newCoatingValue, 1];
        }
    },

    handleCurrentPanelChange: {
        value: function (panelEntry) {
            var roomView = this.templateObjects.roomView;
            var rideViewpoint = this.templateObjects.rideViewpoint;

            if (panelEntry) {
                var preferredViewpoint = this._panelKeyViewpointMap.get(panelEntry.panelKey);

                if (preferredViewpoint) {

                    if (this._autoActivateRideTimeout) {
                        clearTimeout(this._autoActivateRideTimeout);
                        this._autoActivateRideTimeout = null;
                    }

                    roomView.pause();
                    roomView.viewPoint = preferredViewpoint;
                } else if (rideViewpoint !== roomView.viewPoint) {
                    roomView.viewPoint = rideViewpoint;
                    roomView.play();
                }

            } else if (rideViewpoint !== roomView.viewPoint) {
                roomView.viewPoint = rideViewpoint;
                roomView.play();
            }

        }
    },

    play: {
        value: function () {
            if (this.templateObjects && this.templateObjects.roomView) {
                this.templateObjects.roomView.play();
            }
        }
    },

    pause: {
        value: function () {
            if (this.templateObjects && this.templateObjects.roomView) {
                this.templateObjects.roomView.pause();
            }
        }
    }


});
