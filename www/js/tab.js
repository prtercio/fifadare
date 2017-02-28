'Use Strict';
var tab = angular.module('App.Tabs', []);

tab.controller('TabsCtrl', function($scope, $state, $localStorage, Popup, $ionicHistory, $ionicTabsDelegate) {

	var resultado = [];
	$scope.prova = 10;
	$scope.resumoSocial = 1;
	
	var num = 0;
	console.log("ABC "+$ionicHistory.currentStateName());


	var ref = firebase.database().ref().child("fifadare/social").limitToLast(15);
	ref.on("child_added", function(snapshot) {
			console.log("actualizou Tab");
			num++;
		if($ionicHistory.currentStateName() === "tab.dash"){
			console.log("Dash");
			if(num === 16){
				
				var result = 1;
				window.localStorage.setItem('nuevoSocial', result);
				//$scope.$apply(function(){
					console.log("local "+ window.localStorage.getItem('nuevoSocial'))
					$scope.resumoSocial = window.localStorage.getItem('nuevoSocial');
					console.log(num+" actualizou Tab 16 "+$scope.resumoSocial);
				//});
				
			} else {
				
				var resul = 0;
				window.localStorage.setItem('nuevoSocial', resul);
				$scope.$apply(function(){
					$scope.resumoSocial = resul;
					console.log(num+" actualizou Tab Nao "+$scope.resumoSocial);
				});
			}
		}
			
		
	});	
});
