'Use Strict';
var dash = angular.module('App.DashJogos', []);

dash.controller('JogosCtrl', function($scope, $state, $localStorage, Popup, Chats, $window) {
	$scope.atualizarPagina = function(){
		$window.location.reload();
	}
	var resultado = [];

	 var key = localStorage.getItem('key');

    var refjogos = firebase.database().ref('fifadare/users/'+key+'/jogos').orderByChild('jogo');
    refjogos.once("value").then(function(snapshot) {
    	$scope.$apply(function(){
      		//$scope.jogos = snapshot.val();
      		snapshot.forEach(function(minisnapshot) {
               
          	   resultado.push({
                "jogo":minisnapshot.val().jogo, 
                "bloqueado":minisnapshot.val().bloqueado, 
                "estado":minisnapshot.val().estado, 
                "pontos":minisnapshot.val().pontos
              })
          });
      	});
      	$scope.jogos = resultado;  
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