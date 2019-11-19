"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ch5_utilities_1 = require("@crazvansandu/ch5-utilities");
const lodash_1 = require("lodash");
const Env_1 = __importDefault(require("./Env"));
class WebpackCh5DeployPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tapAsync('WebpackCh5UtilitiesPlugin', (compilation, callback) => {
            let configOptions = {
                controlSystemHost: Env_1.default.CH5_HOST,
                sftpUser: Env_1.default.CH5_HOST_USER,
                sftpPassword: Env_1.default.CH5_HOST_PASSWORD,
                sftpDirectory: Env_1.default.CH5_HOST_DIRECTORY,
                deviceType: WebpackCh5DeployPlugin.getDeviceType(Env_1.default.CH5_HOST_DEVICE_TYPE)
            };
            const validationErrors = WebpackCh5DeployPlugin.validateConfig(configOptions);
            if (validationErrors.length > 0) {
                console.error(validationErrors.join('. '));
                return;
            }
            const archive = WebpackCh5DeployPlugin.getArchivePath();
            ch5_utilities_1.distributor(archive, configOptions)
                .then(() => callback())
                .catch((error) => {
                console.error(error);
                callback();
            });
        });
    }
    static validateConfig(config) {
        let errors = [];
        if (lodash_1.isNil(config.controlSystemHost)) {
            errors.push('Target host is empty.');
        }
        if (lodash_1.isNil(config.deviceType)) {
            errors.push('Target host device type is empty.');
        }
        return errors;
    }
    static getArchivePath() {
        return `${Env_1.default.CH5_TARGET_DIRECTORY}/${Env_1.default.CH5_PROJECT_NAME}.ch5z`;
    }
    static getDeviceType(deviceTypeInput) {
        switch (deviceTypeInput) {
            case 'touchscreen':
                return ch5_utilities_1.DeviceType.TouchScreen;
            case 'controlsystem':
                return ch5_utilities_1.DeviceType.ControlSystem;
            case 'web':
                return ch5_utilities_1.DeviceType.WebServer;
            default:
                throw new Error(`Unknown device type ${deviceTypeInput}`);
        }
    }
}
exports.WebpackCh5DeployPlugin = WebpackCh5DeployPlugin;
//# sourceMappingURL=WebpackCh5DeployPlugin.js.map