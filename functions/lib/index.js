"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const env = functions.config();
const algoliasearch = require("algoliasearch");
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('posts');
exports.indexPost = functions.firestore
    .document('post/{postId}')
    .onCreate((snap, context) => {
    const data = snap.data();
    const objectId = snap.id;
    return index.addObject(Object.assign({ objectId }, data));
});
exports.unindexAnimal = functions.firestore
    .document('post/{postId}')
    .onDelete((snap, context) => {
    const objectId = snap.id;
    return index.deleteObject(objectId);
});
//# sourceMappingURL=index.js.map