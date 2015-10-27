import {defaultComponentStubUrl} from '../config.js';
import {components, fromCamelCase} from './component.js';

angular.module('component-loader', [])
    .directive('componentLoader', ($http, $q, $compile, $controller, $injector) => {
        return {
            restrict: 'E',
            scope: {
                name: '=',
                params: '='
            },
            compile: (tElement, tAttrs, $transclude) => {
                return (scope, $element, $attrs)=> {
                    let componentDescriptor = components[scope.name];
                    if (!componentDescriptor) {
                        throw new Error(`There is no component with name ${scope.name}`)
                    }

                    let params = Object.keys(componentDescriptor.scope)
                        .filter(key => $attrs[key])
                        .map(key => `${fromCamelCase(key)}="${$attrs[key]}"`)
                        .join(' ');

                    var template = `<${scope.name} ${params}></${scope.name}>`;
                    let $elementToProcess = $element.after(template);

                    var link = $compile($elementToProcess);
                    link(scope);

                    $element.remove();
                };
            }
        };
    });
