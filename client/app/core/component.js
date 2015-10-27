import {defaultComponentStubUrl} from '../config.js';
require('./component.less');

let components = {};
let toCamelCase = str => str.split(/-/).reduce((str, strPart, index)=> {
    if (!index) {
        return str += strPart;
    }
    str += strPart.charAt(0).toUpperCase() + strPart.substr(1);
    return str;
}, '');

let fromCamelCase = str => str.split(/([A-Z])/).reduce((str, strPart, index)=> {
    if(!index){
        return str + strPart;
    }
    if(part.toUpperCase() === strPart){
        return str + '-' + strPart.toLowerCase()
    }
    return str + strPart;
}, '');

function extendComponent(extendedModule) {
    // Alternatively, shortcut to accessing the componentProvider via extendedModule.component
    extendedModule.component = (name, {
        pathPrefix = '',
        templateUrl = pathPrefix + 'components/' + name + '/index.html',
        controller = angular.noop,
        controllerAs = null,
        restrict = 'E',
        scope = {},
        stubTemplate = `
            <div class="spinner">
              <div class="rect1"></div>
              <div class="rect2"></div>
              <div class="rect3"></div>
              <div class="rect4"></div>
              <div class="rect5"></div>
            </div>`,
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
                        $element.addClass(name);

                        $http.get(templateUrl, {
                            cache: templateCache
                        }).then(response => {
                            let componentParams = Object.keys(scope).reduce((store, key) => {
                                store[key] = $scope[key];
                                return store;
                            }, {});

                            $element.html(response.data);
                            var link = $compile($element.contents());
                            var controllerInstance = $controller(controller, {
                                $scope: $scope,
                                params: componentParams
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

                            let unwatchers = Object.keys(scope).map(key => {
                                let val = scope[key];
                                let attrType = val.charAt(0);
                                switch (attrType) {
                                    case '=':
                                    case '&':
                                        return $scope.$watch(key, (newValue, oldValue)=> {
                                            if (angular.equals(newValue, oldValue)) {
                                                return;
                                            }
                                            if (controllerInstance && typeof controllerInstance.onParamChanged === 'function') {
                                                controllerInstance.onParamChanged(key, newValue, oldValue);
                                            }
                                        });
                                    case '@':
                                        return $attrs.$observe(key, (newValue, oldValue)=> {
                                            if (angular.equals(newValue, oldValue)) {
                                                return;
                                            }
                                            if (controllerInstance && typeof controllerInstance.onParamChanged === 'function') {
                                                controllerInstance.onParamChanged(key, newValue, oldValue);
                                            }
                                        });
                                    default:
                                        return ()=>undefined
                                }
                            });
                        }, error => {
                            console.error('Template for component "' + name + '" not found by URL ' + templateUrl);
                        });
                    };
                }
            };
        });

        return extendedModule;
    };

    return extendedModule;
}

export {extendComponent, components, toCamelCase, fromCamelCase};
