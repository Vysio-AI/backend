const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const videoBucket = storage.bucket('vysio-video');

const generateReadSignedUrl = async (fileName) => {
  const options = {
    action: 'read',
    version: 'v4',
    virtualHostedStyle: true,
    expires: Date.now() + 15 * 60 * 1000,
  };

  const url = await videoBucket
    .file(fileName)
    .getSignedUrl(options)

  return url
}

module.exports = {
  generateReadSignedUrl
}
