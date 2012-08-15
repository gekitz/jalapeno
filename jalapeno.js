//
//  jalapeno.js
//
//  Created by Georg Kitz on 8/2/12.
//  Copyright (c) 2012 Aurora Apps. All rights reserved.
var argv = process.argv;
var value = argv[2];

if (value == '-help' || argv.length != 4) {
    console.log('\nUse the script like this\n');
    console.log('For a single file use:');
    console.log('node jalapeno.js <absolute_path_to_watch> <absolute_path_to_copy_changed_files>\n'); 
    console.log('For a multiple files use:');
    console.log('node jalapeno.js -list <absolute_path_to_json_file>\n');
    console.log('For a sample file, checkout http://github.com/gekitz/jalapeno\n');
    return;
};

if (value == '-list') {

    path_to_file = argv[3];

    fs = require('fs');
    fs.readFile(path_to_file, 'utf-8', function(error, data){

        if (error) {
            return console.log("Couldn't load json file at path: " + path_to_file);
        };

        var parsed_object = JSON.parse(data);
        console.log(parsed_object);

        for (var i = parsed_object.length - 1; i >= 0; i--) {
            startWatching(parsed_object[i].src, parsed_object[i].dest);
        };

    });

} else {
    var watch_folder = value;
    var dest_folder = argv[3];

    startWatching(watch_folder, dest_folder);
}

//functions
function startWatching(watch_folder, dest_folder){

    var watch = require('watch');
    watch.watchTree(watch_folder, function (f, curr, prev) {
        if (typeof f == "object" && prev === null && curr === null) {

        // Finished walking the tree
        console.log('finished walking tree');
        
    } else if (prev === null) {

        // f is a new file
        console.log('new file: ' + f);
        var real_save_path = realDestinationPath(f, watch_folder, dest_folder);
        if (isDirectory(f, false)){
            //check if directory exists, if not create it
            isDirectory(real_save_path, true); 
        } else{
            //it's a file so let's copy it
            copyFileFrom(f, real_save_path);
        }

    } else if (curr.nlink === 0) {

        // f was removed
        console.log('removed file');
        if (isDirectory(f, false)){

        } else{
            removeFileAtPath(f, dest_folder);   
        }
    } else {

        // f was changed
        console.log('changed file f: ' + f);
        var real_save_path = realDestinationPath(f, watch_folder, dest_folder);
        
        if (isDirectory(f, false)){
            //check if directory exists, if not create it
            isDirectory(real_save_path, true); 
        } else{
            //it's a file so let's copy it
            copyFileFrom(f, real_save_path);
        }
    }
    });
}

function isDirectory(file_to_copy, create_if_not_there){
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
        
        if (create_if_not_there){
            var mkdirp = require('mkdirp');
            
            mkdirp(file_to_copy, function (err) {
                if (err) 
                    console.error(err)
                else 
                    console.log('Created Dir at path', file_to_copy);
            });
        }
        
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

    sys.pump(fs.createReadStream(file), fs.createWriteStream(to_dir),function(){
        console.log("Copied file: " + file);
        console.log("To new destination: " + to_dir + "\n");
    });
};

//create the real dest path with intermediate dirs
function realDestinationPath(file, from_dir, to_dir)
{
    var length = from_dir.length;
    var from_dir_path = file.substring(length, file.length);
    return to_dir + from_dir_path;
}

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
