<p align="center">
  <img src="https://kenticoprod.azureedge.net/kenticoblob/crestron/media/crestron/generalsiteimages/crestron-logo.png">
</p>
 
# CH5 Utilities and CLI - Getting Started

#### Continuous Integration and Deployment Status

| DEV NIGHTLY - latest-dev | Status |
| ------ | ----------- |
| Build Pipeline | ![Build status](https://dev.azure.com/crestron-mobile-devops/MobileApps/_apis/build/status/Blackbird/CoreBuild/CH5Utilities?branchName=dev) |
| Release Pipeline - Blob, NPM | ![Build status](https://vsrm.dev.azure.com/crestron-mobile-devops/_apis/public/Release/badge/0403b700-ab40-43cd-9990-961924c561bc/33/84) |
| NPM CH5 Utilities CLI | ![npm (tag)](https://img.shields.io/npm/v/@crestron/ch5-utilities-cli/latest-dev) |

| MASTER-QE - latest-qe | Status |
| ------ | ----------- |
| Build Pipeline | ![Build status](https://dev.azure.com/crestron-mobile-devops/MobileApps/_apis/build/status/Blackbird/CoreBuild/CH5Utilities?branchName=master) |
| Release Pipeline - Blob, NPM | ![Build status](https://vsrm.dev.azure.com/crestron-mobile-devops/_apis/public/Release/badge/0403b700-ab40-43cd-9990-961924c561bc/33/90) |
| NPM CH5 Utilities | ![npm (tag)](https://img.shields.io/npm/v/@crestron/ch5-utilities/latest-qe) |
| NPM CH5 Utilities CLI | ![npm (tag)](https://img.shields.io/npm/v/@crestron/ch5-utilities-cli/latest-qe) |

#### Getting Started
This is the main readme file for the **CH5 utilities** apps.
The current folder contains three subfolders/packages: 

* **ch5-utilities** - this contains the bulk of functionality for the ``archiver`` and `` distributor`` features.
* **ch5-utilities-cli** - this implements the **ch5-utilities** as a CLI application. 
* **ch5-utilities-webpack-plugin** - this implements the **ch5-utilities** as a pair of webpack plugins. The folder ch5-utilities-webpack-sample-app contains an example how to use it.

### Setup

#### Method 1 - one by one

Go through the setup section of each readme file (linked below). The [ch5-utilities](./ch5-utilities/readme.md) should be first, since the other two projects depend on it.
- [CH5 Utilities](./ch5-utilities/README.md)
- [CH5 Utilities CLI](./ch5-utilities-cli/README.md)
- [CH5 Utilities Webpack Plugin](./ch5-utilities-webpack-plugin/README.md)
- [CH5 Utilities Webpack Sample App](./ch5-utilities-webpack-sample-app/README.md)

#### Method 2 - all

Just run `yarn setup` in the current folder, this will create the setup for each project.
After this, you can use `yarn publish:all` to rebuild and publish all projects.
