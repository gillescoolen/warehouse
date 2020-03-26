import './assets/scss/app.scss';
import { RegionView, ProductView, FormView } from './view';
import {
  RegionController,
  ProductController,
  FormController
} from './controller';
import { Form } from './model';

const region = new RegionController(new RegionView());
const product = new ProductController(new ProductView());
const form = new FormController(new Form(), new FormView());
