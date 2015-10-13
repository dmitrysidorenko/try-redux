import angular from 'angular';
import './app.js';

export default ()=> {
    angular.element(document).ready(()=> {
        angular.bootstrap(document, ['app'])
    });
};
