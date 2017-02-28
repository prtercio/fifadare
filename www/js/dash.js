'Use Strict';
var dash = angular.module('App.Dash', []);

dash.controller('DashCtrl', function($scope, $state, $localStorage, Popup, $ionicPopover) {

	var ref = firebase.database().ref("fifadare/users");
	ref.once("value").then(function(snapshot) {
	   $scope.$apply(function(){
	   	var datos = snapshot.val();
	   });
	});	


});
