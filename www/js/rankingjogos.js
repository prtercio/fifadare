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

});