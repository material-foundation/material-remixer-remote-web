# Remixer Remote for Web

Remixer helps teams use and refine design specs by providing an abstraction for these values that is accessible and configurable from both inside and outside the app itself.

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

## State of development

Visit our [State of Development](https://github.com/material-foundation/material-remixer/wiki/State-of-Development) wiki for the current roadmap and status of development for each platform.

## Other Repositories

The main Remixer GitHub repo for documentation, project tracking, and general information:
- [Remixer docs](https://github.com/material-foundation/material-remixer)

Other platform specific libraries and tools can be found in the following GitHub repos:

- [iOS](https://github.com/material-foundation/material-remixer-ios) - Remixer for iOS.
- [Android](https://github.com/material-foundation/material-remixer-android) - Remixer for Android.
- [JavaScript](https://github.com/material-foundation/material-remixer-js) - Remixer for JavaScript.
- Web Remote - Remixer web remote controller for all platforms (available soon).

## Is material-foundation affiliated with Google?

Yes, the [material-foundation](https://github.com/material-foundation) organization is one of Google's new homes for tools and frameworks related to our [Material Design](https://material.io) system. Please check out our blog post [Design is Never Done](https://design.google.com/articles/design-is-never-done/) for more information regarding Material Design and how Remixer integrates with the system.

## Contributing

We gladly welcome contributions! If you have found a bug, have questions, or wish to contribute, please follow our [Contributing Guidelines](https://github.com/material-foundation/material-remixer-remote-web/blob/develop/CONTRIBUTING.md).

## License

© Google, 2016. Licensed under an [Apache-2](https://github.com/material-foundation/material-remixer-remote-web/blob/develop/LICENSE) license.
