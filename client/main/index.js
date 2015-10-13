export default angular
    .module('main', [])
    .controller('main', Controller);

Controller.$inject = [
    '$scope'
];
function Controller($scope) {

    $scope.menuItems = [
        {href: 'href1', text: 'Action 1'}
    ]
}
