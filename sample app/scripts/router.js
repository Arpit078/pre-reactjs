const dom = document.getElementById('virtual-dom');

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

const ContactData =sessionStorage.getItem("Contact");
function Contact()
      {
          onNavigate("#Contact");
          let myScript = document.createElement("script");
          myScript.setAttribute("src", "../Logic/Contact.js");
          removeScriptBySrc("Logic")
          document.body.appendChild(myScript);
      };
      
      
const HomeData =sessionStorage.getItem("Home");
function Home()
      {
          onNavigate("#Home");
          let myScript = document.createElement("script");
          myScript.setAttribute("src", "../Logic/Home.js");
          removeScriptBySrc("Logic")
          document.body.appendChild(myScript);
      };
      
      
const routes = {"":HomeData,"#Contact":ContactData,"#Home":HomeData};
if(window.location.hash in routes == true)
    {
        dom.innerHTML = routes[window.location.hash];
    }

const logicRoutes =["Contact","Home"];

//executes only once for the cases when the user visits the specific route from search
if(logicRoutes.includes(window.location.hash.slice(1)))
    {
        let myScript = document.createElement("script");
        const filename = window.location.hash.slice(1)
        const filepath = "../Logic/" + filename + ".js"
        myScript.setAttribute("src", filepath);
        document.body.appendChild(myScript);
    }