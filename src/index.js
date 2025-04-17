import { initialPage } from "./pageLoad.js";
import { menuPage } from "./tabMenu.js";
import { aboutPage } from "./tabAbout.js";
import "./styles.css";

initialPage();

document.querySelector('#menu').addEventListener("click", menuPage);
document.querySelector('#home').addEventListener("click", initialPage);
document.querySelector('#about').addEventListener("click", aboutPage);
