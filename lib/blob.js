
var azure = require('azure');
var accountName = "unige"
var accountKey = "5StTgqao3TLQE9j/Koz3VUalY7nIkM7v5pajhecHMfjZMyPi9yvH6/3OgGA/0WjYYWT6VTQi4Vr6VO7xU+PK/g==";
var blobService=azure.createBlobService(accountName, accountKey);
module.exports = new function Blob() {
  this.blobService = blobService;
  this.containerName = containerName;
  this.blobService.createContainerIfNotExists(containerName, {
    publicAccessLevel: 'blob'
  }, function(error) {
      if (error) {
        throw error;
      }
    });
  this.addFile = function(containerName,fileSrc, fileName, callback) {
    self = this;
    self.blobService.createBlockBlobFromFile(containerName, fileName, fileSrc, function(error) {
    callback();

    });
  }
};
