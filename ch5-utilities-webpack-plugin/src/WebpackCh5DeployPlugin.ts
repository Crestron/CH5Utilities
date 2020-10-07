// Copyright (C) 2018 to the present, Crestron Electronics, Inc.
// All rights reserved.
// No part of this software may be reproduced in any form, machine
// or natural, without the express written consent of Crestron Electronics.
// Use of this source code is subject to the terms of the Crestron Software License Agreement
// under which you licensed this source code.

import { DeviceType, distributor } from "@crestron/ch5-utilities";
import { IConfigOptions } from "@crestron/ch5-utilities/src/interfaces";
import { Compiler, Plugin } from "webpack";
import { isNil } from "lodash";
import Env from "./Env";

export class WebpackCh5DeployPlugin implements Plugin {

  public apply(compiler: Compiler) {
    compiler.hooks.afterEmit.tapAsync('WebpackCh5UtilitiesPlugin', (compilation, callback) => {
      let configOptions = {
        controlSystemHost: Env.CH5_HOST,
        sftpUser: Env.CH5_HOST_USER,
        sftpPassword: Env.CH5_HOST_PASSWORD,
        sftpDirectory: Env.CH5_HOST_DIRECTORY,
        deviceType: WebpackCh5DeployPlugin.getDeviceType(Env.CH5_HOST_DEVICE_TYPE as string)
      } as IConfigOptions;

      const validationErrors = WebpackCh5DeployPlugin.validateConfig(configOptions);
      if (validationErrors.length > 0) {
        console.error(validationErrors.join('. '));
        return;
      }

      const archive = WebpackCh5DeployPlugin.getArchivePath();

      distributor(archive, configOptions)
        .then(() => callback())
        .catch((error: any) => {
          console.error(error);
          callback()
        });
    });
  }

  private static validateConfig(config: IConfigOptions): string[] {
    let errors = [];

    if (isNil(config.controlSystemHost)) {
      errors.push('Target host is empty.');
    }

    if (isNil(config.deviceType)) {
      errors.push('Target host device type is empty.');
    }

    return errors;
  }

  private static getArchivePath(): string {
    return `${Env.CH5_TARGET_DIRECTORY}/${Env.CH5_PROJECT_NAME}.ch5z`;
  }

  private static getDeviceType(deviceTypeInput: string): DeviceType {
    switch (deviceTypeInput) {
      case 'touchscreen':
        return DeviceType.TouchScreen;
      case 'controlsystem':
        return DeviceType.ControlSystem;
      case 'web':
        return DeviceType.Web;
      case 'mobile':
        return DeviceType.Mobile;
      default:
        throw new Error(`Unknown device type ${deviceTypeInput}`);
    }
  }
}
