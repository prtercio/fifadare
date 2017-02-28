'Use Strict';
var dashRanking = angular.module('App.DashRanking', []);

dashRanking.controller('RankingCtrl', function($scope, $state, $localStorage, Popup, Chats, $window, $ionicLoading) {
  $ionicLoading.show().then(function(){
    //console.log("Loading");
  });
	
  $scope.usuario = $localStorage.account.gamertag;

  var ranking = [];

	var refTodosjogos = firebase.database().ref('fifadare/users');
    refTodosjogos.orderByChild('pontos').once("value").then(function(snapshot) {
      $scope.$apply(function(){
        $scope.jogos = snapshot.val(); 
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
                "derrota":minisnapshot.val().derrota
              })
          });
       });      
      });  
    $scope.resultado = ranking;
});