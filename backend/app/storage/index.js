const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const videoBucket = storage.bucket('vysio-video');

const generateSignedUrl = async (fileName, action) => {
  const options = {
    action: action,
    version: 'v4',
    virtualHostedStyle: true,
    expires: Date.now() + 15 * 60 * 1000,
  };

  const url = await videoBucket
    .file(fileName)
    .getSignedUrl(options)

  return url[0]
}

const generateReadSignedUrl = async (fileName) => {
  return generateSignedUrl(fileName, 'read')
}

const generateUploadSignedUrl = async (fileName) => {
  return generateSignedUrl(fileName, 'write')
}

const deleteVideoFile = async (fileName) => {
  await videoBucket
    .file(fileName)
    .delete()
}

module.exports = {
  generateReadSignedUrl,
  generateUploadSignedUrl,
  deleteVideoFile,
}
