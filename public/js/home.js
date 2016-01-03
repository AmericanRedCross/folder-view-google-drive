function buildFolders(){

  // GROUP THE FOLDERS ON THE ID OF THEIR PARENT
  var rollup = d3.nest()
    .key(function(d) {
      var id = (d.parents[0] !== undefined) ? d.parents[0].id : "parentless";
      return id;
    })
    .map(folders.items)

  // ADD A LIST FOR EACH TOP LEVEL FOLDER (ONES WILL UNDEFINED PARENTS)
  d3.select('body').selectAll('div').data(rollup['parentless']).enter()
    .append('ul')
    .html(function(d){
      return '<li data-id="' + d.id + '"><h3>' + d.title+ '</h3><ul></ul></li>'
    })

  var count = 0;
  function complete(){
    count++
    if(count === folders.items.length){
      buildFiles();
    }
  }

  function traverse(parent) {
    // GET THE ARRAY OF FOLDER OBJECTS FOR THE PASSED PARENT ID AND ADD ELEMENTS FOR EACH CHILD
    d3.select('[data-id="' + parent + '"]').select('ul').selectAll('li')
      .data(rollup[parent]).enter().append('li')
      .attr('data-id', function(d){ return d.id })
      .html(function(d){ return '<i class="fa fa-folder"></i> ' + d.title + '<ul></ul>'; })
    for (var i in rollup[parent]) {
      // CHECK TO SEE IF THE CHILD ID IS IN THE ROLLUP
      // IF IT IS, IT IS ALSO A PARENT SO SEND IT THROUGH THE FUNCTION AS WELL
      if (rollup[rollup[parent][i].id] !== undefined) {
        traverse(rollup[parent][i].id)
      }
      complete()
    }
  }
  // START BUILDING THE FOLDER HIERARCHY
  for (var i in rollup['parentless']) {
    count ++;
    traverse(rollup['parentless'][i].id);
  }
}

function buildFiles(){

  var typeIcon = function(extension){
    switch(extension) {
      case "doc":
      case "docx":
        return '<i class="fa fa-file-word-o"></i> '
        break;
      case "jpeg":
      case "jpg":
      case "png":
        return '<i class="fa fa-file-image-o"></i> '
        break;
      case "pdf":
        return '<i class="fa fa-file-pdf-o"></i> '
        break;
      case "ppt":
      case "pptx":
        return '<i class="fa fa-file-powerpoint-o"></i> '
        break;
      case "xls":
      case "xlsm":
      case "xlsx":
        return '<i class="fa fa-file-excel-o"></i> '
        break;
      case "zip":
        return '<i class="fa fa-file-archive-o"></i> '
        break;
      default:
        return '<i class="fa fa-file-o"></i> '
    }
  }

  for(var i=0;i<files.items.length;i++){
    // CHECK THAT FILE HAS A PARENT LOCATION
    if(files.items[i].parents[0] !== undefined){
      var thisHtml = '<li>' + typeIcon(files.items[i].fileExtension);
      if(files.items[i].webContentLink !== undefined){
        thisHtml += '<a href="' + files.items[i].webContentLink + '" download>' + files.items[i].title + '</a>';
      } else {
        thisHtml += files.items[i].title;
      }
      thisHtml += '</li>';
      $('[data-id="' + files.items[i].parents[0].id + '"]').children('ul').prepend(thisHtml)
    }
  }

}

buildFolders();
