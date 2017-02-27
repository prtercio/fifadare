'Use Strict';
var tab = angular.module('App.Tabs', []);

tab.controller('TabsCtrl', function($scope, $state, $localStorage, Popup, $ionicHistory) {

	var resultado = [];
	
	var num = 0;
	console.log("ABC "+$ionicHistory.currentStateName());


	var ref = firebase.database().ref().child("fifadare/social").limitToLast(15);
	ref.on("child_added", function(snapshot) {
			console.log("actualizou Tab");
			num++;
		if($ionicHistory.currentStateName() === "tab.dash"){
			console.log("Dash");
			if(num === 16){
				console.log(num+" actualizou Tab 16 ");
				var result = 1;
				window.localStorage.setItem('nuevoSocial', result);
				//$scope.$apply(function(){
					console.log("local "+ window.localStorage.getItem('nuevoSocial'))
					$scope.resumoSocial = result;
				//});
				
			} else {
				console.log(num+" actualizou Tab Nao");
				var resul = 0;
				window.localStorage.setItem('nuevoSocial', resul);
				$scope.$apply(function(){
					$scope.resumoSocial = resul;
				});
			}
		}
			
		
	});

});
