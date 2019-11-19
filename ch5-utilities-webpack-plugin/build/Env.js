"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
class Env {
    static setup() {
        const result = dotenv.config();
        if (result.error) {
            throw result.error;
        }
        Env.CH5_PROJECT_NAME = result.parsed.CH5_PROJECT_NAME;
        Env.CH5_SOURCE_DIRECTORY = result.parsed.CH5_SOURCE_DIRECTORY;
        Env.CH5_TARGET_DIRECTORY = result.parsed.CH5_TARGET_DIRECTORY;
        Env.CH5_APP_UI_MANIFEST_PARAMS = result.parsed.CH5_APP_UI_MANIFEST_PARAMS;
        Env.CH5_PROJECT_MANIFEST_PARAMS = result.parsed.CH5_PROJECT_MANIFEST_PARAMS;
        Env.CH5_HOST = result.parsed.CH5_HOST;
        Env.CH5_HOST_USER = result.parsed.CH5_HOST_USER;
        Env.CH5_HOST_PASSWORD = result.parsed.CH5_HOST_PASSWORD;
        Env.CH5_HOST_DIRECTORY = result.parsed.CH5_HOST_DIRECTORY;
        Env.CH5_HOST_DEVICE_TYPE = result.parsed.CH5_HOST_DEVICE_TYPE;
    }
}
exports.default = Env;
//# sourceMappingURL=Env.js.map