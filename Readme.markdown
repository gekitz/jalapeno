## What is Jalapeno?

Jalapeno is basically a watchdog which observes a directory, monitores changes in the observed directory (as example, new file, file changes, file is removed) and forwards those changes to a destination directory.

As I'm often working with a designer, who shares me the assets of our apps in a Dropbox folder, I observe this folder and copy every change to my app's directory. With this method I can be sure that I always use the latest assets he pushed into the Dropbox folder.

Actually I've no idea why I used node.js to build it, but I think I just wanted to try something new.

## How to use Jalapeno?

- As Jalapeno is using [Node.js](http://nodejs.org/#download) as his base you have to install it first.
- Install [watch](https://github.com/mikeal/watch/) by [Mikael Rogers](https://github.com/mikeal/) which does the whole watchdog operations, just type `nmp install watch`
- Simple execute `node jalapeno.js <absolute_path_to_observe> <absolute_path_to_dest_directory>`
- Follow [Georg Kitz](http://twitter.com/gekitz) on Twitter.

## What's next?

As jalapeno only supports files in a root folder and don't support folder hierachies at the moment, it's the logical next step to implement it.

Other things which will show up sooner or later:

- Launch on startup.
- Support for multiple folders to observe and multiple destination folders.GK
- Any idea you come up with.

## License 
Jalapeno is under MIT.
