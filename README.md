# <img align="center" src="https://cdn.rawgit.com/material-foundation/material-remixer-remote-web/develop/docs/assets/remixer_logo_32x32.png"> Remixer Remote for Web

<img align="right" src="https://cdn.rawgit.com/material-foundation/material-remixer-remote-web/develop/docs/assets/app_screenshot.png" width="339px">

[![Build Status](https://travis-ci.org/material-foundation/material-remixer-remote-web.svg?branch=develop)](https://travis-ci.org/material-foundation/material-remixer-remote-web) [![npm version](https://badge.fury.io/js/material-remixer-remote-web.svg)](https://badge.fury.io/js/material-remixer-remote-web)

If enabled, the variables defined in your app will be exposed on a remote controller website that you can set up using Firebase hosting. Share the link to this site with your teammates from within the Remixer overlay or by emailing them. The remote controller allows updating the defined variables, and changes will be propagated in real-time across associated apps.

If you are interested in using Remixer in another platform, you may want to check out the [iOS](https://github.com/material-foundation/material-remixer-ios), [Android](https://github.com/material-foundation/material-remixer-android), and [JavaScript](https://github.com/material-foundation/material-remixer-js) repos. With any of the three platforms you can use this Remote Controller to change the variables from a web dashboard.

**New to Remixer?** Visit our [main repo](https://github.com/material-foundation/material-remixer) to get a full description of what it is and how it works.
- - -

## Quickstart

#### 1. Sign up for Firebase.

Remixer remote will work with any new or existing Firebase account. It will use the [Firebase Hosting](https://firebase.google.com/docs/hosting/) feature to host this remote controller. If you don't have an existing Firebase account you wish to use, you can signup following instructions [here](https://firebase.google.com).

#### 2. Use `npm` to install the necessary dependencies.

```bash
# Run the following script from root of this repo
npm install
```

#### 3. Add your Firebase credentials.

Add your Firebase credentials to the `index.html` file located in the `src` folder.

```javascript
// TODO: Replace with your project's info.
var config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
};
```

#### 4. Build and deploy the library to your Firebase Hosting account.

Running the following script will generate a new `public` folder first with all of the required files. It will then copy these files to your Firebase Hosting storage.

```bash
# Run the following script from root of this repo
npm run deploy -- --project=<PROJECT_ID>
```

#### 5. Your site is now ready.

The Remixer remote controller will now be available at:
```
https://<PROJECT_ID>.firebaseapp.com/<REMOTE_ID>
```

## Is material-foundation affiliated with Google?

Yes, the [material-foundation](https://github.com/material-foundation) organization is one of Google's new homes for tools and frameworks related to our [Material Design](https://material.io) system. Please check out our blog post [Design is Never Done](https://design.google.com/articles/design-is-never-done/) for more information regarding Material Design and how Remixer integrates with the system.

## Contributing

We gladly welcome contributions! If you have found a bug, have questions, or wish to contribute, please follow our [Contributing Guidelines](https://github.com/material-foundation/material-remixer-remote-web/blob/develop/CONTRIBUTING.md).

## License

© Google, 2016. Licensed under an [Apache-2](https://github.com/material-foundation/material-remixer-remote-web/blob/develop/LICENSE) license.
