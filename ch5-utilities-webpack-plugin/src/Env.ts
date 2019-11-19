// Copyright (C) 2018 to the present, Crestron Electronics, Inc.
// All rights reserved.
// No part of this software may be reproduced in any form, machine
// or natural, without the express written consent of Crestron Electronics.
// Use of this source code is subject to the terms of the Crestron Software License Agreement
// under which you licensed this source code.

const dotenv = require('dotenv');

export default class Env {
  public static CH5_PROJECT_NAME: string;
  public static CH5_SOURCE_DIRECTORY: string;
  public static CH5_TARGET_DIRECTORY: string;
  public static CH5_APP_UI_MANIFEST_PARAMS: string;
  public static CH5_PROJECT_MANIFEST_PARAMS: string;
  public static CH5_HOST: string;
  public static CH5_HOST_USER: string;
  public static CH5_HOST_PASSWORD: string;
  public static CH5_HOST_DIRECTORY: string;
  public static CH5_HOST_DEVICE_TYPE: string;
  public static CH5_CONTRACT_EDITOR_CONFIG_FILE: string;

  public static setup() {
    const result = dotenv.config();

    if (result.error) {
      throw result.error
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
    Env.CH5_CONTRACT_EDITOR_CONFIG_FILE = result.parsed.CH5_CONTRACT_EDITOR_CONFIG_FILE;
  }
}
