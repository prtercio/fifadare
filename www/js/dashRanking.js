'Use Strict';
var dashRanking = angular.module('App.DashRanking', []);

dashRanking.controller('RankingCtrl', function($scope, $state, $localStorage, Popup, Chats, $window) {

	
  $scope.usuario = $localStorage.account.gamertag;

  var ranking = [];

	var refTodosjogos = firebase.database().ref('fifadare/users');
    refTodosjogos.orderByChild('pontos').once("value").then(function(snapshot) {
      $scope.$apply(function(){
        $scope.jogos = snapshot.val(); 
          snapshot.forEach(function(minisnapshot) {
          	console.log(minisnapshot.val().pontos);
          	   ranking.push({"key":minisnapshot.key, "gamertag":minisnapshot.val().gamertag, "quantidade":minisnapshot.val().jogosQuantidade, "pontos":minisnapshot.val().pontos})
          });
       });      
      });  
    console.log(ranking);
    $scope.resultado = ranking;
});