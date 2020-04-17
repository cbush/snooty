const { fetchDocumentFromStitch, fetchDocumentsFromStitch } = require('./fetch-documents-from-stitch');
const { fetchDocumentFromFile, fetchDocumentsFromFile } = require('./fetch-documents-from-file');

exports.fetchDocuments = async (documentSource, filter) => {
  if (process.env.SOURCE_TYPE === 'file') {
    return await fetchDocumentsFromFile(documentSource, filter);
  }
  return await fetchDocumentsFromStitch(documentSource, filter);
};

exports.fetchDocument = async (documentSource, filter) => {
  if (process.env.SOURCE_TYPE === 'file') {
    return await fetchDocumentFromFile(documentSource, filter);
  }
  return await fetchDocumentFromStitch(documentSource, filter);
};

// The standard source collection of the documents.
exports.DocumentSource = {
  METADATA: 'metadata',
  ASSETS: 'assets',
  DOCUMENTS: 'documents',
};
