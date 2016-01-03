var express = require('express');
var path = require('path');
var exphbs  = require('express-handlebars');
var localConfig = require('./config');

var app = express();
var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    json: function(context) {
			return JSON.stringify(context);
		}
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

var DriveHelper = require('./routes/driveHelper.js');
var drivehelper = new DriveHelper();

// app.get('/',function(req,res) {
// 		drivehelper.retrieveAllFolders(function(err, data){
// 	    res.render('home', {
// 	      // opts:localConfig.page,
// 	      drivedata:data
// 	    });
// 	  });
// })

app.get('/',function(req,res) {
		drivehelper.retrieveFoldersAndFiles(function(err, folders, files){
	    res.render('home', {
	      // opts:localConfig.page,
	      folderData:folders,
        fileData:files
	    });
	  });
})


app.listen(localConfig.application.port, function(){
  console.log('Listening on port '+localConfig.application.port);
});
