'Use Strict';
var dash = angular.module('App.RankingJogos', []);

dash.controller('RankingJogosCtrl', function($scope, $state, $localStorage, Popup, idRankJogo) {

	var usuario = idRankJogo.substring(0, idRankJogo.indexOf("|"));
	var	keyUsuario = idRankJogo.substring(idRankJogo.indexOf("|") + 1);
	$scope.keyUsuario = keyUsuario;

	$scope.titulo = usuario+ " - Jogos";

    var refjogos = firebase.database().ref('fifadare/users/'+keyUsuario+'/jogos');
    refjogos.once("value").then(function(snapshot) {
    	$scope.$apply(function(){
      		$scope.jogos = snapshot.val();
      	});     
    });  

    var refResumo = firebase.database().ref('fifadare/users/'+keyUsuario);
    refResumo.once("value").then(function(snapshot) {
      $scope.$apply(function(){
          $scope.resumo = snapshot.val();
          $scope.jogosQuantidade = $scope.resumo.jogosQuantidade;
          $scope.vitoria = $scope.resumo.vitoria;
          $scope.empate = $scope.resumo.empate;
          $scope.derrota = $scope.resumo.derrota;
          $scope.pontos = $scope.resumo.pontos;
        });     
    });  
});