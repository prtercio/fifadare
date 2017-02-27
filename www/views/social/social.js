'Use Strict';
var social = angular.module('App.Social', []);

social.controller('SocialCtrl', function($scope, $state, $localStorage, Popup, $ionicHistory, $timeout) {

	var resultado = [];
	console.log("EFG "+$ionicHistory.currentStateName());
	if($ionicHistory.currentStateName() === "tab.social"){
		window.localStorage.setItem('nuevoSocial', 0);
	}

	$timeout(function() {
	var ref = firebase.database().ref().child("fifadare/social").limitToLast(15);
	ref.on("child_added", function(snapshot) {		
	
		console.log(window.localStorage.getItem('nuevoSocial'));
	   //$scope.$apply(function(){
	   	$scope.$apply(function(){
	   		
			   	resultado.push({               
		                "gamertag":snapshot.val().gamertag, 
		                "resultado":snapshot.val().resultado, 
		                "data":snapshot.val().data,
		                "pontos":snapshot.val().pontos,
		                "empate":snapshot.val().empate
		              })

	   	//$scope.datos = snapshot.val();
	   	});
	   	 $scope.datos = resultado;
	   });
	});
	  //});

});
