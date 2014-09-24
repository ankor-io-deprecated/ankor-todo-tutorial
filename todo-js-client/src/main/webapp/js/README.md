Note: Do not modify the `.js` files in the `build` directory.

Edit the `.jsx` files in `src` instead. 
Use the JSX compiler to compile the `.jsx` files into `.js` files.

    jsx -w -x jsx src/ build/
    
You can also run the `jsx.sh` script.
    
If you don't have the `jsx` command you can get it via `npm` (part of node.js):

    npm install -g react-tools
    
