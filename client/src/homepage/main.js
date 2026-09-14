import { startContainerPage } from '../main.js';
import './style.css';

export function homePageScript() {
  const buttonHomePage = document.getElementById('navigation-button');

  buttonHomePage.addEventListener('click', () => {
    startContainerPage();
  })
}
