import {defaultComponentStubUrl} from '../config.js';

let components = {};
let toCamelCase = (str) => str.split(/-/).reduce((str, strPart, index)=> {
    if (!index) {
        return str += strPart;
    }
    str += strPart.charAt(0).toUpperCase() + strPart.substr(1);
    return str;
}, '');

function extendComponent(extendedModule) {
    // Alternatively, shortcut to accessing the componentProvider via extendedModule.component
    extendedModule.component = (name, {
        pathPrefix = '',
        stubUrl = defaultComponentStubUrl,
        templateUrl = pathPrefix + 'components/' + name + '/index.html',
        controller = angular.noop,
        controllerAs = null,
        params = null,
        restrict = 'E'
        } = {}) => {

        let directiveName = toCamelCase(name);

        components[name] = {
            name,
            stubUrl,
            templateUrl,
            controller,
            controllerAs,
            params
        };

        if (!name) {
            throw new Error('You can not register a component without a name!');
        }

        // Create a new directive
        extendedModule.directive(directiveName, ($http, $q, $compile, $controller, $injector) => {
            return {
                restrict: restrict,
                scope: {
                    params: '='
                },
                compile: (tElement, tAttrs, $transclude) => {
                    var templateCache = $injector.get('$templateCache');

                    return (scope, $element)=> {
                        let needStub = true;
                        let scopeParams = angular.copy(scope.params);

                        $element.addClass(name);

                        $http.get(stubUrl, {
                            cache: templateCache
                        }).then(renderStubIfNeeded, errorStub);

                        $http.get(templateUrl, {
                            cache: templateCache
                        }).then(response => {
                            needStub = false;

                            $element.html(response.data);
                            var link = $compile($element.contents());
                            var controllerInstance = $controller(controller, {
                                $scope: scope,
                                params: scopeParams
                            });
                            if (controllerAs) {
                                scope[controllerAs] = controllerInstance;
                            }
                            $element.data('$ngControllerController', controllerInstance);
                            $element.children().data('$ngControllerController', controllerInstance);

                            if (controllerInstance && typeof controllerInstance.onComponentWillMounted === 'function') {
                                controllerInstance.onComponentWillMounted();
                            }

                            link(scope);

                            if (controllerInstance && typeof controllerInstance.onComponentDidMounted === 'function') {
                                controllerInstance.onComponentDidMounted();
                            }

                            scope.$on('$destroy', ()=> {
                                if (controllerInstance && typeof controllerInstance.onComponentWillUnmounted === 'function') {
                                    controllerInstance.onComponentWillUnmounted();
                                }
                            });

                            scope.$watch('params', (newParams, oldParams)=> {
                                if (angular.equals(newParams, oldParams)) {
                                    return;
                                }
                                if (controllerInstance && typeof controllerInstance.onParamsChanged === 'function') {
                                    controllerInstance.onParamsChanged(newParams);
                                }
                            });
                        }, error => {
                            console.error('Template for component "' + name + '" not found by URL ' + templateUrl);
                        });

                        function renderStubIfNeeded(response) {
                            if (needStub) {
                                $element.html(response.data);
                            }
                        }

                        function errorStub(error) {

                        }
                    };
                }
            };
        });

        return extendedModule;
    };

    return extendedModule;
}

export {extendComponent};
