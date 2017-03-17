'Use Strict';
var dash = angular.module('App.DashJogos', []);

dash.controller('JogosCtrl', function($scope, $state, $localStorage, Popup, $window, $ionicLoading, $ionicHistory) {
	$ionicLoading.show().then(function(){
	   //console.log("Loading Jogos");
	});

	if($ionicHistory.backView() === "tab.configuracao"){
	   $window.location.reload(true);    
	}

	var resultado = [];

	var key = localStorage.getItem('key');

    var refjogos = firebase.database().ref('fifadare/users/'+key+'/jogos');
    refjogos.orderByChild('jogo').once("value").then(function(snapshot) {
    	//$scope.$apply(function(){
      		//$scope.jogos = snapshot.val();
      		snapshot.forEach(function(minisnapshot) {
               $ionicLoading.hide().then(function(){
                  //console.log("Loading Hide");
                });
          	   resultado.push({
                "jogo":minisnapshot.val().jogo, 
                "bloqueado":minisnapshot.val().bloqueado, 
                "estado":minisnapshot.val().estado, 
                "pontos":minisnapshot.val().pontos
              });
          });
      	//});
      	$scope.jogosLista = resultado;  
    });


     var refResumo = firebase.database().ref('fifadare/users/'+key);
	    refResumo.once("value").then(function(snapshot) {
	      //$scope.$apply(function(){
	          $scope.resumo = snapshot.val();	          
	          $scope.jogosQuantidade = $scope.resumo.jogosQuantidade;
	          $scope.vitoria = $scope.resumo.vitoria;
	          $scope.empate = $scope.resumo.empate;
	          $scope.derrota = $scope.resumo.derrota;
	          $scope.pontos = $scope.resumo.pontos;

	        //});     
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