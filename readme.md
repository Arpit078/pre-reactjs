# pre-reactJS 😁
a JS Library that helps you make single page web apps with the sacred feature of dom manipulations.

## Installation and create app
```
npm i @arpit078/preactjs
npx @arpit078/preactjs

## set in package.json => "type":"module" 

node server
```
requirements for dev environment
- node and npm installed to run the cli script.
- install inline html and live server extensions 
from vs code extension store.
## strong instructions
1. do not delete Pages folder.
2. Name your entry point file as Home.js or change it in the script/compile.js
3. your page file and logic file should have the same name.
4. to navigate to a certain page use the function named as the page. for eg to navigate to Contact page run Contact() anywhere link or routing point in your app like the navbar.
5. whenever importing components always use extensions .js
6. when calling a component in a file use call like a function -> "{Navbar()}"
7. no other restriction on file naming only you need to make your entry file as Home.js and logic and pages files must have same names.

