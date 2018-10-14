// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// <>となっている部分は、自分のapiKeyを入力
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDKi7F0N37PJnkBJ-tTz3OKIrQjsZNnkUI',
    authDomain: 'myblog-e82b9.firebaseapp.com',
    databaseURL: 'https://myblog-e82b9.firebaseio.com',
    projectId: 'myblog-e82b9',
    storageBucket: 'myblog-e82b9.appspot.com',
    messagingSenderId: '238422763791'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
