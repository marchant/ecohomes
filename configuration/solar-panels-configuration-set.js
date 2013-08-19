var ConfigurationSet = require("core/configuration-set").ConfigurationSet;
var ConfigurationOption = require("core/configuration-option").ConfigurationOption;
var ConfigurationChoice = require("core/configuration-choice").ConfigurationChoice;

exports.SolarPanelsConfigurationSet = ConfigurationSet.specialize({

    constructor: {
        value: function SolarPanelsConfigurationSet() {
            this.super();

            var optionMap = this.optionMap;
            optionMap.set("solar-panel", new ConfigurationChoice().init(
                new ConfigurationOption().init("No Solar Panels", 0),
                new ConfigurationOption().init("Solar Photovoltaic System", 15999),
                new ConfigurationOption().init("Solar Thermal System", 13499)
            ));
        }
    }
});
