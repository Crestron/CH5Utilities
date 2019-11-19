"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ch5_utilities_1 = require("@crazvansandu/ch5-utilities");
const lodash_1 = require("lodash");
const Env_1 = __importDefault(require("./Env"));
class WebpackCh5ArchiverPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tapAsync('WebpackCh5UtilitiesPlugin', (compilation, callback) => {
            let configOptions = {
                projectName: Env_1.default.CH5_PROJECT_NAME,
                directoryName: Env_1.default.CH5_SOURCE_DIRECTORY,
                outputDirectory: Env_1.default.CH5_TARGET_DIRECTORY,
                additionalAppuiManifestParameters: this.extractKeyValuePairs(Env_1.default.CH5_APP_UI_MANIFEST_PARAMS),
                additionalProjectManifestParameters: this.extractKeyValuePairs(Env_1.default.CH5_PROJECT_MANIFEST_PARAMS)
            };
            const validationErrors = WebpackCh5ArchiverPlugin.validateConfig(configOptions);
            if (validationErrors.length > 0) {
                // console.error('Environment variables are missing, please make sure are all set correctly.');
                console.error(validationErrors.join('. '));
                return;
            }
            ch5_utilities_1.archiver(configOptions)
                .then(() => callback())
                .catch((error) => {
                console.error(error);
                callback();
            });
        });
    }
    static validateConfig(config) {
        let errors = [];
        if (lodash_1.isNil(config.projectName)) {
            errors.push('Project name is empty.');
        }
        if (lodash_1.isNil(config.directoryName)) {
            errors.push('Directory name is empty.');
        }
        if (lodash_1.isNil(config.outputDirectory)) {
            errors.push('Output directory is empty.');
        }
        return errors;
    }
    extractKeyValuePairs(commaSeparatedList) {
        if (!commaSeparatedList) {
            return {};
        }
        let params = {};
        commaSeparatedList.split(',').forEach(value => {
            const keyValuePair = value.split('=');
            params[keyValuePair[0]] = keyValuePair[1];
        });
        return params;
    }
}
exports.WebpackCh5ArchiverPlugin = WebpackCh5ArchiverPlugin;
//# sourceMappingURL=WebpackCh5ArchiverPlugin.js.map