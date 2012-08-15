## What is jalapeno?
  
jalapeno is basically a watchdog which observes a directory, monitores changes in the observed directory (as example, new file, file changes, file is removed) and forwards those changes to a destination directory.

As I'm often working with a designer, who shares me the assets of our apps in a Dropbox folder, I observe this folder and copy every change to my app's directory. With this method I can be sure that I always use the latest assets he pushed into the Dropbox folder.

Actually I've no idea why I used node.js to build it, but I think I just wanted to try something new.

## How to use jalapeno?
 
- Install jalapeno with `npm install jalapeno` .
- For a single file simple execute `node jalapeno.js <absolute_path_to_observe> <absolute_path_to_dest_directory>`
- For multiple files simple execute `node jalapne.js -list <absolute_path_to_json_file_list>` <br>	
Where the json file should look like this:

		[
			{
				"src": "/Users/gk/Desktop/src/",
				"dest": "/Users/gk/Desktop/dest/"
			},
			{
				"src": "/Users/gk/Dropbox/ImportantImages/",
				"dest": "/Users/gk/Desktop/dest/"	
			}
		]


- Have fun and follow [Georg Kitz](http://twitter.com/gekitz) on Twitter.

## What's next?

Other things which will show up sooner or later:

- Launch on startup.
- Any idea you come up with.

## License 
jalapeno is under MIT.

## Contributions

jalapeno uses the following source under the hood.

- [watch](https://github.com/mikeal/watch/) by [Mikael Rogers](https://github.com/mikeal/) which does the whole watchdog operations.

- [mkdirp](https://github.com/substack/node-mkdirp) by [James Halliday](https://github.com/substack) which does the recursive directory creation.
