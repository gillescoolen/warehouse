import './assets/scss/app.scss';
import { RegionView, ProductView, FormView, EditorView } from './view';
import {
  RegionController,
  ProductController,
  FormController,
  EditorController
} from './controller';
import { Form, Editor } from './model';

const region = new RegionController(new RegionView());
const product = new ProductController(new ProductView());
const form = new FormController(new Form(), new FormView());
const editor = new EditorController(new Editor(), new EditorView());
