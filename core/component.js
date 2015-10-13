import app from '../app.js';
import {defaultComponentStubUrl} from '../config.js';

let components = {};
let toCamelCase = (str) => str.split(/-/).reduce((str, strPart, index)=> {
    if (!index) {
        return str += strPart;
    }
    str += strPart.charAt(0).toUpperCase() + strPart.substr(1);
    return str;
}, '');


let registerComponent = (name, {
    stubUrl = defaultComponentStubUrl,
    templateUrl = 'components/' + name + '/index.html',
    controller = ()=> undefined,
    controllerAs = null,
    params = {},
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
    app.directive(directiveName, ($http, $q, $compile, $controller, $injector) => {
        return {
            restrict: restrict,
            scope: {
                params: '='
            },
            compile: (tElement, tAttrs, $transclude) => {
                var templateCache = $injector.get('$templateCache');

                return (scope, $element)=> {
                    let needStub = true;
                    let scopeParams = Object.assign({}, scope.params, params);

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
                        link(scope);

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
};

// Alternatively, shortcut to accessing the componentProvider via app.dialog
app.component = registerComponent;
