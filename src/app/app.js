import './assets/scss/app.scss';
import { RegionView, ProductView } from './view';
import { RegionController, ProductController } from './controller';

const region = new RegionController(new RegionView());
const product = new ProductController(new ProductView());
