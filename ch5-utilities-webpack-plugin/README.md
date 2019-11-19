<p align="center">
  <img src="https://kenticoprod.azureedge.net/kenticoblob/crestron/media/crestron/generalsiteimages/crestron-logo.png">
</p>

# CH5 Utilities Webpack Plugin

> Archiving and distribution utilities from the ch5-utilities library wrapped as a Webpack plugins library.

## Table of Contents

- [Background](#background)
- [Setup](#setup)
- [Commands](#commands)
- [Usage](#usage)
- [License](#license)

## Background

The purpose of the library is to expose the [ch5-utilities](./../ch5-utilities/readme.md) archive and distribute features as two Webpack plugins.

Webpack plugins documentation: https://webpack.js.org/concepts/plugins.

## Setup

Before going through these steps, make sure you have completed the setup section in [ch5-utilities](./../ch5-utilities/readme.md), since it is a dependency.

Install the required packages.
```
yarn install
```

Add the ch5-utilities library.
```
yarn link ch5-utilities
```

Build the library.
```
yarn build
```

Publish the ch5-utilities-webpack-plugin library for local usage.
```
yarn link
```

## Commands

#### yarn publish:local

After the initial setup, you can use this command to rebuild and publish changes in the library.

## Usage

There are two plugins: `WebpackCh5ArchiverPlugin` and `WebpackCh5DeployPlugin`.
Of course, you have the option of using only one of them, but if you are using both, the archive plugin needs to be registered before the deploy plugin.

```javascript
// webpack.config.js

// import the plugins
const { WebpackCh5ArchiverPlugin, WebpackCh5DeployPlugin } = require("ch5-utilities-webpack-plugin");

module.exports = {
  module: {
    rules: [
      // ...
    ]
  },
  plugins: [
    // other plugins
    // ...
    // register the archiver plugin
    new WebpackCh5ArchiverPlugin(),
    // register the deploy plugin
    new WebpackCh5DeployPlugin()
  ]
};
```

The options for the archiving and deploy are not set in the webpack config file, but are read from a .env file.
So in the root folder you need to have a .env file that should contain the following:

```dotenv
# WebpackCh5ArchiverPlugin options
CH5_PROJECT_NAME=webpackSampleApp
CH5_SOURCE_DIRECTORY=dist/webpackSampleApp
CH5_TARGET_DIRECTORY=dist
CH5_APP_UI_MANIFEST_PARAMS=key1=value1,key2=value2
CH5_PROJECT_MANIFEST_PARAMS=key1=value1,key2=value2
CH5_CONTRACT_EDITOR_CONFIG_FILE=temp/contract.cse2j

# WebpackCh5DeployPlugin options
CH5_HOST=127.0.0.1
CH5_HOST_USER=crestron
CH5_HOST_PASSWORD=<placeholder>
CH5_HOST_DIRECTORY=display
CH5_HOST_DEVICE_TYPE=touchscreen
```

#### WebpackCh5ArchiverPlugin options

##### CH5_PROJECT_NAME

**Required**. The name of the project will set the package name and the manifest details for the project.
It should be set according to the delivered package.

##### CH5_SOURCE_DIRECTORY

**Required**. This is the path to the directory that contains the deliverables.

The path can be absolute or should be relative to the location from which the webpack command is run in the CLI.

##### CH5_TARGET_DIRECTORY

**Required**. This is the path where the archive file will be copied to.

The path can be absolute or should be relative to the location from which the webpack command is run in the CLI.

##### CH5_APP_UI_MANIFEST_PARAMS

**Optional**. Additional parameters to be added to the app ui manifest file.

Should be sent as comma separated list of {key}={value}, as in the example above.

##### CH5_PROJECT_MANIFEST_PARAMS

**Optional**. Additional parameters to be added to the project manifest file.

Should be sent as comma separated list of {key}={value}, as in the example above. 

#### WebpackCh5DeployPlugin options

##### CH5_HOST

**Required**. This should be the hostname or IP address of the device where the package will be deployed.

##### CH5_HOST_USER and CH5_HOST_PASSWORD

**Optional**. These are the SFTP upload credentials for the target device. Will default to user `crestron` and empty password.

**IMPORTANT** When developing locally, you can keep the default credentials, but in production use the .env file should generated dynamically, rather than stored, for security purposes. 

##### CH5_HOST_DIRECTORY

**Optional**. This is the target directory on the target device. It will default to `display` for touchscreen devices, and to `HTML` for control system devices.

It must be relative to the SFTP root directory.

##### CH5_HOST_DEVICE_TYPE

**Required**. This should be set based on ``CH5_HOST``, depending on what kind of device you are targeting for the deploy.

Possible values are: ``touchscreen | controlsystem | web``.

##### CH5_CONTRACT_EDITOR_CONFIG_FILE

**Optional**. Relative or absolute file path for contract editor config file.File must have .cse2j extension.

## License

ISC © 2019 Crestron
