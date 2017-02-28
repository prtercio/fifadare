'Use Strict';
var tab = angular.module('App.Tabs', []);

tab.controller('TabsCtrl', function($scope, $state, $localStorage, Popup, $ionicHistory, $ionicTabsDelegate) {

	var resultado = [];
	$scope.prova = 10;
	$scope.resumoSocial = 1;
	
	var num = 0;
	console.log("ABC "+$ionicHistory.currentStateName());

	$scope.resumoSocial = 10;

	var ref = firebase.database().ref().child("fifadare/social").limitToLast(15);
	ref.on("child_added", function(snapshot) {
		num++;
		if($ionicHistory.currentStateName() === "tab.dash" || $ionicHistory.currentStateName() === "tab.chats" || $ionicHistory.currentStateName() === "tab.account"){
			//console.log(num+" Dash");
			if(num === 15){
				
				var result = 0;
				window.localStorage.setItem('nuevoSocial', result);
				//$scope.$apply(function(){
					$scope.resumoSocial = window.localStorage.getItem('nuevoSocial');
					//console.log(num+" actualizou Tab 16 "+$scope.resumoSocial);
				//});
				
			} else {
				
				var resul = parseInt(window.localStorage.getItem('nuevoSocial')) + 1;
				window.localStorage.setItem('nuevoSocial', resul);				
				$scope.$apply(function(){
					$scope.resumoSocial = resul;
					//console.log(num+" actualizou Tab Nao "+$scope.resumoSocial);
				});
			}
		} else if($ionicHistory.currentStateName() === "tab.social"){
			window.localStorage.setItem('nuevoSocial', 0);
			var resul = parseInt(window.localStorage.getItem('nuevoSocial'));
			window.localStorage.setItem('nuevoSocial', resul);				
			$scope.$apply(function(){
				$scope.resumoSocial = resul;
					//console.log(num+" Social, nao atualiza "+$scope.resumoSocial);
				});
		}else {
			$scope.$apply(function(){
				$scope.resumoSocial = 0;
					//console.log("resumo fora de tab.dash")
				});
		}
		
		
	});	
	
});
