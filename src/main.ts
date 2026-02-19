import { WorldModel } from './models/world.model';
import './styles/styles.scss';
let appRef = document.querySelector<HTMLCanvasElement>('[data-app]');
let game: WorldModel;

function init() {
  if (!appRef) return;
  game = new WorldModel(appRef);
}
init();
