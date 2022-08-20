## About app

This is simple orderbook, which uses Kraken's futures websockets. It also automatically reconnects if there is connection lost.

Supported devices:

* iOS Mobile devices (iPhone)
* Android Mobile devices

App was tested on following devices (in release mode, not development mode): iPhone 11, LG Q7 and on both of them is responsive on press on touchable opacity in flat list.

## Installation

Clone project and do following to install the deps:

```
yarn
```

After you have installed deps you need to install pods:

```
npx pod-install
```

## Running app

NOTE: Please do not forget to try out to run app in production mode, because develop mode is not perfectly optimized, also some middlewares in redux are included by default in development mode (https://redux-toolkit.js.org/api/getDefaultMiddleware). Also do not forget to remove "original" Kraken Futures app on android before you install this one (because of the same name).

How to run app in development mode:

## iOS

### Development mode

```
npx react-native run-ios
```

### Production release mode

Read more about it here: https://reactnative.dev/docs/running-on-device

## Android

### Development mode

```
npx react-native run-android
```

Note: Please keep in mind that in development mode on android device app will not be responsible as we want to. Instructions below.

How to run app in production mode:

### Production release mode

Build apk release

```
cd android && ./gradlew assembleRelease
```

Install apk release (via cable) - app release path should be in: android/app/build/outputs/apk/release

```
adb install app-release.apk
```

## Testing

We use Jest runner for unit tests with combination of react testing library.

### Jest

Just to run basic tests

```
yarn test
```
