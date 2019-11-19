// Copyright (C) 2018 to the present, Crestron Electronics, Inc.
// All rights reserved.
// No part of this software may be reproduced in any form, machine
// or natural, without the express written consent of Crestron Electronics.
// Use of this source code is subject to the terms of the Crestron Software License Agreement
// under which you licensed this source code.

import { archiver } from "@crestron/ch5-utilities";
import { IAdditionalParameters, IConfigOptions } from "@crestron/ch5-utilities/src/interfaces";
import { Compiler, Plugin } from "webpack";
import { isNil } from "lodash";
import Env from "./Env";

export class WebpackCh5ArchiverPlugin implements Plugin {

  public apply(compiler: Compiler) {
    compiler.hooks.afterEmit.tapAsync('WebpackCh5UtilitiesPlugin', (compilation, callback) => {
      let configOptions = {
        projectName: Env.CH5_PROJECT_NAME as string,
        directoryName: Env.CH5_SOURCE_DIRECTORY as string,
        outputDirectory: Env.CH5_TARGET_DIRECTORY as string,
        additionalAppuiManifestParameters: this.extractKeyValuePairs(Env.CH5_APP_UI_MANIFEST_PARAMS),
        additionalProjectManifestParameters: this.extractKeyValuePairs(Env.CH5_PROJECT_MANIFEST_PARAMS),
        contractFile: Env.CH5_CONTRACT_EDITOR_CONFIG_FILE as string
      } as IConfigOptions;

      const validationErrors = WebpackCh5ArchiverPlugin.validateConfig(configOptions);
      if (validationErrors.length > 0) {
        // console.error('Environment variables are missing, please make sure are all set correctly.');
        console.error(validationErrors.join('. '));
        return;
      }

      archiver(configOptions)
        .then(() => callback())
        .catch((error: any) => {
          console.error(error);
          callback()
        });
    });
  }

  private static validateConfig(config: IConfigOptions): string[] {
    let errors = [];

    if (isNil(config.projectName)) {
      errors.push('Project name is empty.');
    }

    if (isNil(config.directoryName)) {
      errors.push('Directory name is empty.');
    }

    if (isNil(config.outputDirectory)) {
      errors.push('Output directory is empty.');
    }

    return errors;
  }

  private extractKeyValuePairs(commaSeparatedList: string): IAdditionalParameters {
    if (!commaSeparatedList) {
      return {};
    }

    let params = {} as any;
    commaSeparatedList.split(',').forEach(value => {
      const keyValuePair = value.split('=');
      params[keyValuePair[0]] = keyValuePair[1];
    });

    return params as IAdditionalParameters;
  }
}
