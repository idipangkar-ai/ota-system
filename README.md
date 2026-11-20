# OTA Shopping App

A React Native customer shopping app foundation backed by Frappe v15. The current release establishes the authentication flow and app navigation; catalog, cart and order workflows are intentionally still placeholders.

## Requirements

- Node.js 22.11 or newer
- Android Studio and an Android emulator/device for Android development
- macOS, Xcode and CocoaPods for iOS development
- A reachable Frappe v15 site

## Setup

Install the JavaScript dependencies:

```sh
npm install
```

Set the Frappe base URL in [`src/config/frappe.js`](src/config/frappe.js). The checked-in development value is `http://127.0.0.1:8000`; use an address reachable from the device or emulator. For example, an Android emulator commonly reaches a host machine through `http://10.0.2.2:8000`. Use HTTPS for production.

Start Metro:

```sh
npm start
```

Run on Android:

```sh
npm run android
```

Run on iOS (macOS):

```sh
cd ios
pod install
cd ..
npm run ios
```

`expo-secure-store` is used to store the Frappe session ID in the platform secure store. Rebuild the native app after installing or changing native dependencies; do not use Expo Go for this bare React Native project.

## Authentication and navigation

- The splash screen checks for a saved session and validates it with Frappe's `frappe.auth.get_logged_user` method.
- A missing or invalid session opens Welcome and the Login, Register or Forgot Password flow.
- Login saves the Frappe `sid` in SecureStore. Requests attach the saved session cookie. Logout clears the local session even if the server logout request cannot complete.
- Registration and password reset call Frappe's standard `frappe.core.doctype.user.user.sign_up` and `frappe.core.doctype.user.user.reset_password` methods. Registration availability and email delivery depend on Frappe site settings.
- Authenticated users enter five tabs: Home, Categories, Cart, Orders and Account. Each tab keeps its own navigation stack.
- The shopping tabs are navigation scaffolding only; product, cart and order APIs have not been added.

The Frappe base URL and current-user check are in `src/config/frappe.js` and `src/domains/feed/api/feedApi.js`. Authentication requests are in `src/domains/auth/api/authApi.js`.

## Expo EAS Updates

The existing EAS project ID, update URL, runtime version and build channels are configured in `app.json` and `eas.json`. Keep the runtime version and project/channel settings aligned with the installed native build when publishing updates. Changes that add or change native modules require a new native build before an OTA update can use them.

Build profiles:

| Profile | Distribution | Channel |
| --- | --- | --- |
| `development` | Development client, internal | `development` |
| `preview` | Internal | `preview` |
| `production` | Store build | `production` |

## Quality checks

```sh
npm run lint
npm test -- --runInBand
```

## Project structure

```text
src/
  config/             Frappe URL, secure session and request helper
  domains/
    auth/             Login, registration, password reset and auth API
    feed/             Current-user API and Home content
    ota/              OTA status UI and hook
  navigation/         Session gate, auth flow and tab stacks
```
