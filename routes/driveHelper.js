var request = require('google-oauth-jwt').requestWithJWT(); // obtain a JWT-enabled version of request
var localConfig = require('../config');


var DriveHelper = function(){
  this.jwt = {
    // use the email address of the service account, as seen in the API console
    email: localConfig.application.email,
    // use the PEM file we generated from the downloaded key
    keyFile: localConfig.application.keyFile,
    // specify the scopes you wish to access - each application has different scopes
    scopes: ['https://www.googleapis.com/auth/drive.readonly']
  }

  // // ## CAN WE GET THE ID FOR A SPECIFIC FOLDER, SEARCHING BY TITLE, AND THEN USE THAT ID TO FILTER
  // // ## OUR FUTURE SEARCHES E.G. // this.folderId // qs: {q: "'" + this.folderId + "' in parents"}

};


DriveHelper.prototype.retrieveFoldersAndFiles = function(cb){

  var folders, files;

  var completeCount = 0;
  var complete = function() {
    completeCount += 1;
    if (completeCount == 2) {
      cb(null, folders, files);
    }
  }

  // GET ALL FOLDERS
  request({
    url: 'https://www.googleapis.com/drive/v2/files',
    qs: {maxResults: 1000,  q: "mimeType = 'application/vnd.google-apps.folder' and trashed = false"},
    jwt: this.jwt
  }, function (err, res, body) {
    if(err){
      console.log('request error: ', err)
    }
    folders = body;
    complete();
  });
  // GET ALL FILES
  request({
    url: 'https://www.googleapis.com/drive/v2/files',
    qs: {maxResults: 1000, corpus: "DOMAIN", q: "mimeType != 'application/vnd.google-apps.folder' and trashed = false"},
    jwt: this.jwt
  }, function (err, res, body) {
    if(err){
      console.log('request error: ', err)
    }
    files = body;
    complete();
  });

};

// DriveHelper.prototype.retrieveAllFolders = function(cb){
//   request({
//     url: 'https://www.googleapis.com/drive/v2/files',
//     qs: {maxResults: 1000,  q: "mimeType = 'application/vnd.google-apps.folder' and trashed = false"},
//     jwt: this.jwt
//   }, function (err, res, body) {
//     if(err){
//       console.log('request error: ', err)
//     }
//     cb(err, body);
//   });
// };
//
// DriveHelper.prototype.retrieveAllFiles = function(cb){
//   request({
//     url: 'https://www.googleapis.com/drive/v2/files',
//     qs: {maxResults: 1000, q: "'" + this.folderId + "' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false"},
//     jwt: this.jwt
//   }, function (err, res, body) {
//     if(err){
//       console.log('request error: ', err)
//     }
//     cb(err, body);
//   });
// };

module.exports = DriveHelper;
