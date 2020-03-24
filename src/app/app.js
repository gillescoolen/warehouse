import './assets/scss/app.scss';
import { GridView } from './view';
import { GridController } from './controller';
import { Grid } from './model';

const grid = new GridController(new Grid(), new GridView());
