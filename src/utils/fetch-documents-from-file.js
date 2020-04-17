const fs = require('fs').promises;
const mingo = require('mingo');

const getSource = (() => {
  let source;
  return async () => {
    if (source !== undefined) {
      return source;
    }
    const path = process.env.SOURCE_FILE_PATH;
    console.log(`Loading data from .env.SOURCE_FILE_PATH '${path}'...`);
    const data = await fs.readFile(path);
    source = JSON.parse(data);
    return source;
  };
})();

exports.fetchDocumentsFromFile = async (documentSource, filter) => {
  console.log(`Fetch from file: ${documentSource} with filter`, filter);
  const source = await getSource();
  const subsection = source[documentSource];
  const cursor = mingo.find(subsection, filter);
  console.log(`...found ${cursor.count()} documents.`);
  return cursor.all();
};

exports.fetchDocumentFromFile = async (documentSource, filter) => {
  console.log(`Fetch from file: ${documentSource} with filter`, filter);
  const source = await getSource();
  const subsection = source[documentSource];
  return mingo.find(subsection, filter).next();
};
