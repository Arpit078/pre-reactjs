#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const folderNames = ['./scripts','./components','./components/Style','./components/Navbar','./Logic','./Pages'];


for(let i=0;i<folderNames.length;i++){
    try {
    const folderName = folderNames[i]
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }
}


const compileContent = `
import fs from 'fs'
import {
	fileURLToPath
} from 'url';
import {
	dirname
} from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


function readDirAsync(directoryPath) {
	return new Promise((resolve, reject) => {
		fs.readdir(directoryPath, (err, files) => {
			if (err) {
				reject(err);
			} else {
				// console.log(files)
				resolve(files);
			}
		});
	});
}

function appendRouterWithNavigate_WithScript(fileName) {
      const toWriteRouter = \`
const \${fileName}Data =sessionStorage.getItem("\${fileName}");
function \${fileName}()
      {
          onNavigate("#\${fileName}");
          let myScript = document.createElement("script");
          myScript.setAttribute("src", "../Logic/\${fileName}.js");
          removeScriptBySrc("Logic")
          document.body.appendChild(myScript);
      };
      
      \`
      fs.appendFileSync(routerFilePath, toWriteRouter, (err, contents) => {
      if (err) throw err;
        // console.log(\`Content of \${file}: \${contents}\`);
	});
}

function appendRouterWithNavigate_WithoutScript(fileName) {
      const toWriteRouter = \`const \${fileName}Data =sessionStorage.getItem("\${fileName}");
            function \${fileName}(){
                onNavigate("#\${fileName}");
            };\`
      fs.appendFileSync(routerFilePath, toWriteRouter, (err, contents) => {
        if (err) throw err;
        // console.log(\`Content of \${file}: \${contents}\`);
      });
}
async function blockingFileNamesRead(files){
  let fileNames = []
  files.forEach((file) => {
	//removes .js from the string
  // console.log(file)
	const str = file.slice(0,-3)
  console.log(str)
	fileNames.push(str)
})
  return fileNames;
}
const logicFiles = await readDirAsync(path.join(__dirname, "../Logic"))
const logicFileNames = await blockingFileNamesRead(logicFiles)

const pagesFiles = await readDirAsync(path.join(__dirname, "../Pages"))
let pageFileNames = await blockingFileNamesRead(pagesFiles)




const loaderFilePath = path.join(__dirname, 'loader.js')
const routerFilePath = path.join(__dirname, 'router.js')


const defaultPage = 'Home';
const defaultPageData = \`const dom = document.getElementById("virtual-dom");
dom.innerHTML = \${defaultPage};\`;
fs.writeFileSync(loaderFilePath, defaultPageData, (err) => {
	if (err) throw err
})


const routesLogicData = \`const dom = document.getElementById('virtual-dom');

//don't touch this function            
function onNavigate(pathname){
    // window.history.pushState(
    //     {},
    //     '',
    //     window.location.origin +pathname
    //     )
    window.location.hash = pathname
    dom.innerHTML = routes[window.location.hash];
    
}

function removeScriptBySrc(src) {
  console.log("in remove script : ")
  const scripts = document.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
      // console.log(scripts[i].src)
      if (scripts[i].src.includes(src)) {
          scripts[i].parentNode.removeChild(scripts[i]);

      }
  }
}
\`;
fs.writeFileSync(routerFilePath, routesLogicData, (err) => {
	if (err) throw err
})


let routesObj = \`
const routes = {"":\${defaultPage}Data\`

pageFileNames.forEach(file => {

	//----------------loader file-------------------//
	const toWriteLoader = \`import \${file} from "../Pages/\${file}.js";
      window.sessionStorage.setItem("\${file}",\${file});\`
	fs.appendFileSync(loaderFilePath, toWriteLoader, (err, contents) => {
		if (err) throw err;
		// console.log(\`Content of \${file}: \${contents}\`);
	});

	//--------------router file--------------------//
	if (logicFileNames.includes(file)) {
		appendRouterWithNavigate_WithScript(file);
	} else {
		appendRouterWithNavigate_WithoutScript(file);
	}
	routesObj = routesObj + \`,"#\${file}":\${file}Data\`

});

routesObj = routesObj + \`};
if(window.location.hash in routes == true)
    {
        dom.innerHTML = routes[window.location.hash];
    }

const logicRoutes =\${JSON.stringify(logicFileNames)};

//executes only once for the cases when the user visits the specific route from search
if(logicRoutes.includes(window.location.hash.slice(1)))
    {
        let myScript = document.createElement("script");
        const filename = window.location.hash.slice(1)
        const filepath = "../Logic/" + filename + ".js"
        myScript.setAttribute("src", filepath);
        document.body.appendChild(myScript);
    }\`
fs.appendFileSync(routerFilePath, routesObj, (err, contents) => {
	if (err) throw err;
});

`
const Pages_HomeJS = `
//use inline html vs code extension to write html like these in template strings. Don't forget write /*html*/ or /*css*/
//before template string after installing inline html extention.
import Navbar from "../components/Navbar/Navbar.js"
const Home = /*html*/ \`
<div class="Text">
<div id="headAndNav">
    <h1 class="title">Welcome to Pre-ReactJS ✌️ </h1>
    <div class="bg">\${Navbar()}</div>
    </div>
    <p class="subHead">Why Pre-ReactJS</p>
    <p class="paragraph">
        The main Idea behind developing pre-react was to solve all the problems that I was facing with ReactJS while still having the goodness it offered as a single page application development library. 
    </p>
    <p class="paragraph">
        I hated react for 
        <br>
        • No DOM manipulation access, as I was used to vanillaJS it hurt a bit
        <br>
        • No inhouse routing and required to use router tag
        <br>
        • dev server took infinity to load up.
        <br>
        • bulky boiler code only made for industry level web apps
    </p>
    <p class="subHead">
        What Pre-ReactJS solves 
    </p>
    <p class="paragraph">
        The features included packed in this powerpacked light library are :
        <br>
        • Component based architecture and one time call on server for static resources.
        <br>
        • Inhouse hashrouting so that all routes of the website are directly accesible from the searchbar even on free tier hosting services.
        <br>
        • Automatic routing using build command, No routing tags.
        <br>
        •Dom manipulation access in a single page application😲. Very handy for the vanilla JS dev looking for a SPA library.
        <br>
        • Extremely light weight and made for indie and hobby projects.
    </p>

    </div>
</div>
\`;
export default Home;
`
const Pages_ContactJS = `
import Navbar from "../components/Navbar/Navbar.js"

let Projects = /*html*/\`
<div class="Text">
    <div id="headAndNav">
        <h1 class="title">Contact the dev :) </h1>
        <div class="bg">\${Navbar()}</div>
    </div>
    <p class="subHead">Hello I am Arpit Kumar Verma.</p>
    <p class="paragraph">
        I am a student pursuing bachelor of technology in Electrical Engineering at IIT Ropar. I am a software development ethusiast. I love working on task automation, scripting and making backend systems for web applications. I am the creator of the JavaScript library <a href="https://www.npmjs.com/package/@arpit078/preactjs" class="link">@arpit078/preactJS<span class="bar"></span></a> that is powering this website. PreactJS is a single page application javascript library. Most of my work is open sourced and publicly available on 
    <a href="https://github.com/Arpit078" class="link">Github</a> 
    </p>
    <p class="paragraph">
        You can connect with me on <a href="https://www.linkedin.com/in/arpit-verma-806268227/" class="link"><span class="bar"></span>LinkedIN </a>.If you have something in mind and want to let me know please get in touch with me on my <a href="mailto:verma.arpit078@gmail.com" class="link"><span class="bar"></span>Mail </a>.
    </p>
    <p class="paragraph">
        Outside of goofing around with scripting and automation, I enjoy playing Basketball, Reading books, Watching anime and maybe travelling sometimes.
    </p>
    <p class="paragraph">
        And it's definitely not me who took the website design from Evan You's portfolio:}
    </p>

</div>
\`

export default Projects`

const Logic_ContactJS = `console.log("logic file of contact js")`
const Logic_HomeJS = `console.log("logic file of home js")`

const serverJS = `import http from 'http';
import fs from 'fs/promises';
import {
	fileURLToPath
} from 'url';
import {
	dirname
} from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    // Map file extensions to MIME types
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        // Add more as needed
    };

    // Function to send a response with a specific status code and content type
    const sendResponse = (statusCode, contentType, content) => {
        res.writeHead(statusCode, { 'Content-Type': contentType });
        res.end(content);
    };

    // Function to serve static files
    const serveStaticFile = async (filePath) => {
        try {
            const fileContent = await fs.readFile(filePath);
            const ext = path.extname(filePath);
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            sendResponse(200, contentType, fileContent);
        } catch (error) {
            sendResponse(404, 'text/plain', 'Not Found');
        }
    };

    // Function to handle routes
    const handleRoutes = async () => {
        const indexPath = path.join(__dirname, 'index.html');
        await serveStaticFile(indexPath);
    };

    // Routing logic
    if (method === 'GET') {
        if (url === '/') {
            await handleRoutes();
        } else {
            const filePath = path.join(__dirname, url);
            await serveStaticFile(filePath);
        }
    } else {
        sendResponse(405, 'text/plain', 'Method Not Allowed');
    }
});

const PORT = process.env.PORT || 8181;

// Start the server
server.listen(PORT, '0.0.0.0', () => {
    console.log(\`Server is running at http://localhost:\${PORT}/\`);
});

`
const Navbar_CSS = `#headAndNav{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#headAndNav ul{
  list-style: none;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  
}
#headAndNav ul li{
  padding: 1rem;
}
.bg{
background: transparent;
backdrop-filter: blur(10px);
position:fixed;
bottom: 0;
right: 0;
z-index: 10;

}

@media only screen and (max-width: 700px) {
 #headAndNav{
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: flex-start ;

 }
 #headAndNav ul li{
  margin: 0;
  padding-right: 1rem;
  padding-left: 0;
 }
 
 ul{
  position:sticky;
  top: 0;
  left:50;
  /* background-color: rgba(126, 134, 131, 0.236); */
  /* filter: blur(5px); */
  height: max-content;
  width: max-content;
}
}

ul li{
  position: relative;
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

ul li:hover {
  color: #000;
}
/* ul{
  position: fixed;
  bottom: 0;
  right: 20;
} */

`
const NavbarJS = `const Navbar = () =>{
  return(
      /*html*/\`
  <ul id="navbar">
      <li onclick="Home()">home</li>
      <li onclick="Contact()">contact</li>
  </ul>
\`
  )
}
export default Navbar`
const general_CSS = `
.text{
  font-family: 'Rubik', sans-serif;
  margin: 8px;
  padding: 35px 40px 35px 40px;
}

@media only screen and (min-width: 600px) {
  .text{
    padding:35px 40px 35px 100px;
  }
}
.title{
  font-weight: 600;
  font-size: 3.2rem;
}
.subHead{
  font-weight: 500;
  font-size: 2.1rem;
}
.paragraph{
  max-width: 40em;
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.4;
  color: black!important;
}
.highlight{
  max-width: 40em;
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.4;
  color: rgb(156, 57, 57,0.8);

}
p{
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

a {
  position: relative;
  color: #000;
  text-decoration: none;
}

a:hover {
  color: #000;
}

a::before {
  content: "";
  z-index: -1;
  position: absolute;
  display: block;
  width: 100%;
  height: 1.6rem;
  bottom: -4px;
  left: 0;
  background-color: rgba(79, 90, 192, 0.5);
  transform: scaleY(0.3) translateY(1.6rem);
  transition: transform 0.3s ease;
}

a:hover::before {
  transform: scaleY(1);
}
.code_block{
  background-color: black;
  font-family: 'Source Code Pro', monospace;
  color: wheat;
  width: max-content;
  border-radius: 6px;
  padding: 1rem;
  filter: drop-shadow(3px 1px 4px #484849);
  border-radius: 5px;
}
`
const indexhtmlContent = `
<html lang="en" >
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../components/style/general.css">
    <link rel="stylesheet" type="text/css" href="../components/style/Home.css">
    <link rel="stylesheet" type="text/css" href="../components/Navbar/Navbar.css">
    <!-- <link rel="stylesheet" href="./components/st/box.css"> -->



    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300&display=swap');
    </style>
    <title>Pre-ReactJS</title>
    
</head>
<body>
    <div id="virtual-dom"></div>
</body>
<script src="../scripts/loader.js" type="module"  type="text/javascript"></script>
<script src="../scripts/router.js"  type="text/javascript" defer></script>
<script src="../scripts/dynamic.js"  type="text/javascript" defer></script>
</html>


`

const readmeContent = `
## strong instructions
1. do not delete Pages folder.
2. Name your entry point file as Home.js or change it in the script/compile.js
3. your page file and logic file should have the same name.
4. to navigate to a certain page use the function named as the page. for eg to navigate to Contact page run Contact() anywhere link or routing point in your app like the navbar.
5. whenever importing components always use extensions .js
6. when calling a component in a file use call like a function -> "{Navbar()}"
7. no other restriction on file naming only you need to make your entry file as Home.js and logic and pages files must have same names.

`



try {
  fs.writeFileSync('./scripts/compile.js', compileContent);
  fs.writeFileSync('./components/Navbar/Navbar.js', NavbarJS);
  fs.writeFileSync('./components/Navbar/Navbar.css', Navbar_CSS);
  fs.writeFileSync('./components/Style/general.css', general_CSS);
  fs.writeFileSync('./index.html', indexhtmlContent);
  fs.writeFileSync('./readme.md', readmeContent);
  fs.writeFileSync('./Pages/Home.js', Pages_HomeJS);
  fs.writeFileSync('./Pages/Contact.js', Pages_ContactJS);
  fs.writeFileSync('./Logic/Home.js', Logic_HomeJS);
  fs.writeFileSync('./Logic/Contact.js', Logic_ContactJS);
  fs.writeFileSync('./readme.md', readmeContent);
  fs.writeFileSync('./server.js',serverJS);

  fs.writeFileSync('./.gitignore', "node_modules");

  


  // file written successfully
} catch (err) {
  console.error(err);
}

