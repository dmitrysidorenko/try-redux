import app from '../app.js';
import {defaultComponentStubUrl} from '../config.js';

app.directive('componentLoader', ($http, $q, $compile, $controller, $injector) => {
    return {
        restrict: 'E',
        scope: {
            name: '=',
            params: '='
        },
        compile: (tElement, tAttrs, $transclude) => {
            return (scope, $element)=> {
                debugger;
                var template = '<' + scope.name + ' params="params"></' + scope.name + '>';

                $element.html(template);

                var link = $compile($element.contents());
                link(scope);
            };
        }
    };
});
