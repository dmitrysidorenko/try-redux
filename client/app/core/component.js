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
        templateUrl = pathPrefix + 'components/' + name + '/index.html',
        controller = angular.noop,
        controllerAs = null,
        params = null,
        restrict = 'E',
        scope = {
            params: '='
        },
        stubTemplate = `<div>Component "${name}" is loading...</div>`,
        stubTemplateUrl = undefined,
        } = {}) => {

        let directiveName = toCamelCase(name);

        components[name] = {
            name,
            stubTemplate,
            stubTemplateUrl,
            templateUrl,
            controller,
            controllerAs,
            params,
            scope
        };

        if (!name) {
            throw new Error('You can not register a component without a name!');
        }

        // Create a new directive
        extendedModule.directive(directiveName, ($http, $q, $compile, $controller, $injector) => {
            let stubTemplateKind = stubTemplateUrl ? 'templateUrl' : 'template';
            let stub = stubTemplateUrl || stubTemplate;
            return {
                restrict: restrict,
                scope: scope,
                [stubTemplateKind]: stub,
                compile: (tElement, tAttrs, $transclude) => {
                    var templateCache = $injector.get('$templateCache');

                    return ($scope, $element, $attrs)=> {
                        let needStub = true;
                        let scopeParams = angular.copy($scope.params);

                        $element.addClass(name);

                        $http.get(templateUrl, {
                            cache: templateCache
                        }).then(response => {
                            needStub = false;
                            let componentParams = Object.keys(scope).reduce((store, key) => {
                                store[key] = $scope[key];
                                return store;
                            }, {});

                            $element.html(response.data);
                            var link = $compile($element.contents());
                            var controllerInstance = $controller(controller, {
                                $scope: $scope,
                                params: scopeParams,
                                componentParams: componentParams
                            });
                            if (controllerAs) {
                                $scope[controllerAs] = controllerInstance;
                            }
                            $element.data('$ngControllerController', controllerInstance);
                            $element.children().data('$ngControllerController', controllerInstance);

                            if (controllerInstance && typeof controllerInstance.onComponentWillMounted === 'function') {
                                controllerInstance.onComponentWillMounted();
                            }

                            link($scope);

                            if (controllerInstance && typeof controllerInstance.onComponentDidMounted === 'function') {
                                controllerInstance.onComponentDidMounted();
                            }

                            $scope.$on('$destroy', ()=> {
                                if (controllerInstance && typeof controllerInstance.onComponentWillUnmounted === 'function') {
                                    controllerInstance.onComponentWillUnmounted();
                                }
                            });


                            Object.keys(scope).forEach(key => {
                                let val = scope[key];
                                let attrType = val.charAt(0);
                                switch (attrType) {
                                    case '=':
                                        $scope.$watch(key, (newValue, oldValue)=> {
                                            if(angular.equals(newValue, oldValue)){
                                                return;
                                            }
                                            if (controllerInstance && typeof controllerInstance.onParamChanged === 'function') {
                                                controllerInstance.onParamChanged(key, newValue, oldValue);
                                            }
                                        });
                                        break;
                                    case '@':
                                        $attrs.$observe(key, (newValue, oldValue)=> {
                                            if(angular.equals(newValue, oldValue)){
                                                return;
                                            }
                                            if (controllerInstance && typeof controllerInstance.onParamChanged === 'function') {
                                                controllerInstance.onParamChanged(key, newValue, oldValue);
                                            }
                                        })
                                }
                            });

                            $scope.$watch('params', (newParams, oldParams)=> {
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
