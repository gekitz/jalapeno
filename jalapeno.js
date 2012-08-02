//
//  jalapeno.js
//
//  Created by Georg Kitz on 8/2/12.
//  Copyright (c) 2012 Aurora Apps. All rights reserved.

var watch = require('watch');

var argv = process.argv;
var value = argv[2];

if (value == '-help' || argv.length != 4) {
    console.log('Use the script like this\n');
    console.log('node jalapeno.js <absolute_path_to_watch> <absolute_path_to_copy_changed_files>\n'); 
    return;
};

var watch_folder = value;
var dest_folder = argv[3];

watch.watchTree(watch_folder, function (f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null) {
        // Finished walking the tree
        console.log('finished walking tree');
    } else if (prev === null) {
        // f is a new file
        console.log('new file: ' + f);
        if (isDirectory(f)){
            //check if directory exists copy it if not
        } else{
            //it's a file so let's copy it
            copyFileFrom(f, dest_folder);
        }

    } else if (curr.nlink === 0) {
        // f was removed
        console.log('removed file');
        if (isDirectory(f)){
            
        } else{
            removeFileAtPath(f, dest_folder);   
        }
    } else {
        // f was changed
        console.log('changed file f: ' + f);
        if (isDirectory(f)){
            //check if directory exists copy it if not
        } else{
            //it's a file so let's copy it
            copyFileFrom(f, dest_folder);
        }
    }
});

function isDirectory(file_to_copy){
    var fs = require('fs');
    try {
        // Query the entry
        stats = fs.lstatSync(file_to_copy);
    
        // Is it a directory?
        if (stats.isDirectory()) {
            console.log('is a dirctory');
            return true;
        } else if(stats.isFile()){
            console.log('is file');
        }
    }
    catch (e) {
        // ...
    }
    
    return false;
}

// copy files to dest directory
function copyFileFrom(file, to_dir){
    var sys = require("sys");
    var fs = require('fs');

    var file_name = filenameFromPath(file);
    if (file_name == ".DS_Store") {
        return;
    }

    console.log("\n");
    console.log("Copying File: " + file_name);

    sys.pump(fs.createReadStream(file), fs.createWriteStream(to_dir + file_name),function(){
        console.log("Copied file: " + file);
        console.log("To new destination: " + to_dir + file_name + "\n");
    });
};


//remove files at dest path
function removeFileAtPath(file, to_dir){
    var fs = require('fs');
    var file_name = filenameFromPath(file);
    var file_at_dest_dir = to_dir + file_name;
    fs.unlink(file_at_dest_dir);
    
    console.log("Removed file at directory: " + file_at_dest_dir);
}


//return last path element, the filename
function filenameFromPath(file_with_path){
    var split = file_with_path.split("/");
    return split[split.length - 1];
}
