const { Stitch, AnonymousCredential } = require('mongodb-stitch-server-sdk');
const { siteMetadata } = require('./site-metadata');

const DB = siteMetadata.database;
const { stitchId } = siteMetadata;

// Lazy load stitch client
const getStitch = (() => {
  let stitchClient;
  return () =>
    new Promise((resolve, reject) => {
      if (stitchClient != null && stitchClient.auth.user != null) {
        return resolve(stitchClient);
      }
      stitchClient = Stitch.hasAppClient(stitchId)
        ? Stitch.getAppClient(stitchId)
        : Stitch.initializeAppClient(stitchId);
      stitchClient.auth
        .loginWithCredential(new AnonymousCredential())
        .then(user => {
          console.log('logged into stitch');
          resolve(stitchClient);
        })
        .catch(console.error);
    });
})();

exports.fetchDocumentsFromStitch = async (documentSource, filter) => {
  const stitchClient = await getStitch();
  return await stitchClient.callFunction('fetchDocuments', [DB, documentSource, filter]);
};

exports.fetchDocumentFromStitch = async (documentSource, filter) => {
  const stitchClient = await getStitch();
  return await stitchClient.callFunction('fetchDocument', [DB, documentSource, filter]);
};
