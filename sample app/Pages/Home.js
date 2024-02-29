
//use inline html vs code extension to write html like these in template strings. Don't forget write /*html*/ or /*css*/
//before template string after installing inline html extention.
import Navbar from "../components/Navbar/Navbar.js"
const Home = /*html*/ `
<div class="Text">
<div id="headAndNav">
    <h1 class="title">Welcome to Pre-ReactJS ✌️ </h1>
    <div class="bg">${Navbar()}</div>
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
`;
export default Home;
