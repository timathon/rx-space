import { game$ } from './game';
import renderer from './renderer';


game$.subscribe(renderer);

