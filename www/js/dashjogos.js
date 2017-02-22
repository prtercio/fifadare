'Use Strict';
var dash = angular.module('App.DashJogos', []);

dash.controller('JogosCtrl', function($scope, $state, $localStorage, Popup, Chats, $window) {
	$scope.atualizarPagina = function(){
		$window.location.reload();
	}

	$scope.chats = Chats.all();
	var lista = Chats.all();

	$scope.remove = function(chat) {
	   Chats.remove(chat);
	};

	 var key = localStorage.getItem('key');

    var refjogos = firebase.database().ref('fifadare/users/'+key+'/jogos');
    refjogos.once("value").then(function(snapshot) {
    	$scope.$apply(function(){
      		$scope.jogos = snapshot.val();
      	});     
    });  

	/*
	var jogos = [];
	console.log($localStorage.key);
	for(var i = 0; i < lista.length; i++){
		//console.log("Chat "+lista[i].lastText);
		var refjogos = firebase.database().ref("fifadare/users/"+$localStorage.key+"/jogos/"+lista[i].lastText);
		refjogos.once("value").then(function(snapshot) {	
		   if(snapshot.val() != null){
		   	$scope.jogos=snapshot.val();
		   	var jogosFB = JSON.stringify(snapshot.val());
		   	console.log(jogosFB);
		   	for(var j = 0; j < jogosFB.length; j++){
		   		if(jogosFB[j].nome == snapshot.key){
		   			jogos.push(jogosFB[j]);
		   			console.log("0 "+jogos);
		   		}
		   	}			   	
		   } 
		});
	}
	
	function eliminarJogosSubidos(jogos){
		var jogosListado = Chats.all();
		for(var i = 0; i < jogosListado.length; i++){
			console.log(jogos[i]);
			jogosListado.splice(jogosListado.indexOf(jogos[i]), 1);
			console.log("1 "+jogosListado);
		}
	}

	*/

});