import dashboard from './ngModule.js';
import './components/dashboard-widget/index.js';
import './controllers/index.js';
import {addReducer} from '../reducers.js';
import reducer from './reducer.js';

addReducer('widgets', reducer);

