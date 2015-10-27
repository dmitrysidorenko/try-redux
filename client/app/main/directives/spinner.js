require('./spinner.less');
let template = require('html!./spinner.html');

export default ()=> {
    return {
        restrict: 'A',
        link: ($scope, $element, $attrs)=> {
            $element.append(template);

            $attrs.$observe('spinner', (showSpinner)=> {
                if (!showSpinner) {
                    $element.addClass('spinner_hide');
                } else {
                    $element.removeClass('spinner_hide');
                }
            })
        }
    };
}
