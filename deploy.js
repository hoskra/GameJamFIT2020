var fs = require("fs");
var path = require("path");


const deleteFolderRecursive = (path, keepDir) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }

  if (keepDir) {
    fs.mkdirSync(path);
  }
}


copyFileSync = (source, target) => {
  var targetFile = target;
  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }
  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

const copyFolderRecursiveSync = (source, target) => {
  var files = [];
  //check if folder needs to be created or integrated
  var targetFolder = path.join(target, path.basename(source));

  //copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);

    // skip folders that contain '.dontcopy' file
    if (!files.find(file => file === '.dontcopy')) {
      if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
      }

      files.forEach(function (file) {
        var curSource = path.join(source, file);
        if (fs.lstatSync(curSource).isDirectory()) {
          copyFolderRecursiveSync(curSource, targetFolder);
        } else {
          copyFileSync(curSource, targetFolder);
        }
      });
    }
  }
}

deleteFolderRecursive("build", true);
copyFolderRecursiveSync("assets", "build");