'Use Strict';
var dashRanking = angular.module('App.DashRanking', []);

dashRanking.controller('RankingCtrl', function($scope, $state, $localStorage, Popup, Chats, $window) {

	var ranking = [];

	var refTodosjogos = firebase.database().ref('fifadare/users');
    refTodosjogos.orderByChild('pontos').once("value").then(function(snapshot) {
      $scope.$apply(function(){
        $scope.jogos = snapshot.val(); 
          snapshot.forEach(function(minisnapshot) {
          	console.log(minisnapshot.val().pontos);
          
          	   ranking.push({"gamertag":minisnapshot.val().gamertag, "quantidade":minisnapshot.val().jogosQuantidade, "pontos":minisnapshot.val().pontos})
          });
       });      
      });  
    console.log(ranking);
    $scope.resultado = ranking;
});