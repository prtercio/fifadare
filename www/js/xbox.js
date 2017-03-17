'Use Strict';
var xbox = angular.module('App.Xbox', []);
var ranking = [];
xbox.controller('XboxCtrl', function($scope, $state, $ionicLoading) {

	$ionicLoading.show().then(function(){
                  //console.log("Loading Hide");
                });
	var refTodosPerfil = firebase.database().ref('fifadare/users');
    refTodosPerfil.orderByChild('pontos').once("value").then(function(snapshot) {
      $scope.$apply(function(){
          snapshot.forEach(function(minisnapshot) {
               $ionicLoading.hide().then(function(){
                  //console.log("Loading Hide");
                });
              

          	   ranking.push({
                "key":minisnapshot.key, 
                "gamertag":minisnapshot.val().gamertag, 
                "quantidade":minisnapshot.val().jogosQuantidade, 
                "pontos":minisnapshot.val().pontos,
                "vitoria":minisnapshot.val().vitoria,
                "empate":minisnapshot.val().empate,
                "derrota":minisnapshot.val().derrota,
                "ImagenGt":minisnapshot.val().imagenGt,
                "Gamerscore":minisnapshot.val().gamerscore
              })
          });
       });      
      });  
   

    $scope.listaXbox = ranking;
});