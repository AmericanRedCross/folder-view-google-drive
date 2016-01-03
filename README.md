### folder-view-google-drive

- follow the [instructions](https://github.com/extrabacon/google-oauth-jwt#creating-a-service-account-using-the-google-developers-console) in the google-oauth-jwt readme to create a service account using the google developers console
- save the converted PEM key in the root level of the project folder
- create a config.js file using the config.js.example template and add the correct values for your setup
- `npm install`
- `node app.js`

# current problems
- not all files are being fetched?
- fileExtension attribute isn't present on a lot of files
- need to deal with google doc files (need to convert for download)
- need download option for files without webContentLink
- config should target a specific folder
- prettification of page needed

![](https://raw.githubusercontent.com/AmericanRedCross/folder-view-google-drive/master/public/images/ScreenShot2016-01-03at1.10.41PM.png)
