import { WorldModel } from './models/world.model';
import './styles/styles.scss';
// damit game in den DevTools angezeigt wird!!!
declare global {
  interface Window {
    game: WorldModel;
  }
}

let appRef = document.querySelector<HTMLCanvasElement>('[data-app]');
let game: WorldModel;

function init() {
  if (!appRef) return;
  game = new WorldModel(appRef);

  //devtools
  window.game = game;
}
init();
