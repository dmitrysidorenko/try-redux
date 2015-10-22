import {defaultComponentStubUrl} from '../config.js';

angular.module('component-loader', []).directive('componentLoader', ($http, $q, $compile, $controller, $injector) => {
    return {
        restrict: 'E',
        scope: {
            name: '=',
            params: '='
        },
        compile: (tElement, tAttrs, $transclude) => {
            return (scope, $element)=> {
                var template = '<' + scope.name + ' params="params"></' + scope.name + '>';

                $element.html(template);

                var link = $compile($element.contents());
                link(scope);
            };
        }
    };
});
