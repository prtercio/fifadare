'Use Strict';
var social = angular.module('App.Social', []);

social.controller('SocialCtrl', function($scope, $state, $localStorage, Popup) {

	var resultado = [];


	var ref = firebase.database().ref("fifadare/social").limitToLast(15);
	ref.once("value", function(snapshot) {
	   $scope.$apply(function(){
	   	//$scope.datos = snapshot.val();
	   	snapshot.forEach(function(minisnapshot) {
               
          	   resultado.push({               
                "gamertag":minisnapshot.val().gamertag, 
                "resultado":minisnapshot.val().resultado, 
                "data":minisnapshot.val().data,
                "pontos":minisnapshot.val().pontos,
                "empate":minisnapshot.val().empate
              })
          });
	   	$scope.datos = resultado;
	   });


	});
	
	
	/*
	var commentsRef = firebase.database().ref('fifadare/social').limitToLast(20);
	/*
	commentsRef.on('child_added', function(data) {
	  addCommentElement(postElement, data.key, data.val().text, data.val().author);
	});
	*/
	/*
	commentsRef.on('child_changed', function(data) {
	  //setCommentValues(postElement, data.key, data.val().text, data.val().author);
	  console.log(data.key, data.val().pontos, data.val().resultado, data.val().gamertag);
	});
	*/

});
