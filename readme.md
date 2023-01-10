# preactJS 😁
a JS framework that helps you make single page web apps, while saving you burn your head learning complex frameworks made for industries.
# Installation and create app
    $> npm install @arpit078/preactjs
    $> npx @arpit078/preactjs
# requirements for dev environment
    - node and npm installed to run the cli script.
    - VS code prefered.
    - install inline html and live server extensions 
    from vs code extension store.
# Documentation

    FOLDER STRUCTURE
    ├───assets
    ├───components
    │   └───styles
    ├───public
    │   └───styles
    └───scripts
    -----x----------------x-----
    1. assets : this folder is meant to contain all your asset files ,nothing more fancy.
    
    2. components : this is where all the view html js files and jsx files are to be written.
     some examples have been already made inside the diretory. 
     To make these some points to consider are:
        
        a. use template literals `` to write the html code in js file.
        
        b. use inline html vs code extention to make life easier.

        c. don't forget to default export your const variable.
    
    3. public : this folder is used to host the index.html file and its stylesheet.
    some points to remember about this file:
        
        a. index.html has a div with id virtual-dom that is the only place where you
        are inserting your components jsx files.

        b. along with virtual dom you can have the benefits of a real dom as you can 
        that social media bar being in the real dom.

        c. YES! you can still use document.querySelector and all dom manipulations 
        with all your window api:}

        d. do not change the order of script tags else somethings might not work.
    
    4. scripts : this folder is the heart of your app. Files in this folder include
        
        a. loader.js : this file loads your component into the sessionStorage for 
        future use. whenever you make a new page just load in this file and you'll 
        have it stored in the sessionStorage and available for view.

        b. functional.js : this file is used to write all your custom functions
        promoting you to write modular code, it really helps.

        c. router.js : this is a very important file in your project. 
        It handles all the routing on your single page application.

            - to make a route first define a const that getsItem (your component)
             from the sessionStorage.

            - then add its relative link in the routes object.

            - add the function similar to more() and about() that get triggered on
             navigation to call onNavigate(pathname) inside.
    
