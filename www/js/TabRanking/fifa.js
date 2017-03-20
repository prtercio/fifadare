'Use Strict';
var fifa = angular.module('App.Fifa', []);

fifa.controller('FifaCtrl', function($scope, $state, $http) {
  $http.get('js/BD/conquistasFifa.json').then(function(respuesta) {                   
    //console.log(respuesta.data)  ;
    $scope.listafifa = respuesta.data;
  }, function(err) { 
    console.log("Error "+err);
    //$scope.error = err;
  }); 

 
/*
  $http({
      url: 'https://xbl.io/api/v1/account',
      method: 'GET',
      jsonp: "callback",
      dataType: "json", 
      headers: {
        "X-Authorization": "22370178cb401241f483de14482968a858dabb63"
      }
    }).then(function(data) {
      console.log(" Abc "+data.data);  
    }, function(error) { 
      console.log(" Err "+error.data.data[0].profileUsers[0].id);
      $scope.error = error.data;
    }); 
  */


    $.ajax({
      url: "https://xbl.io/api/v1/presence",
      method: "GET", 
      jsonp: "callback",
      dataType: "json", 
      headers: {
        "X-Authorization": "22370178cb401241f483de14482968a858dabb63"
      }, error(error){        
        var datos = error.responseText;
        //console.log(datos);
         $scope.$apply(function(){
          $scope.error = JSON.parse(datos);
        });

         var jp = JSON.parse(datos);
         var todos = jp.data[0];
         var nuevoGames = [];
         for(var i = 0; i < todos.length; ++i){
          if(todos[i].state == "Online"){
            nuevoGames.push(todos[i]);
            console.log(nuevoGames);
            $scope.online = nuevoGames;

          }
          
         }


        //console.log("1 "-datos[0]);
    
        //console.log("2 "-datos.data[0]);
        
         /*console.log("1 "-datos.data[0][0].state);        
        
        console.log("4 "-datos.data[0][0][0].state);
        */



        /*
        for(var i = 0; i < total.length; i++){
          console.log(" GT: "+ total[i].state);
        }
        */
        
      }
  });


  /*

 var xmlhttpA = new XMLHttpRequest();
  xmlhttpA.open("GET", "https://xboxapi.com/v2/xuid/Benbaodan", true);
  xmlhttpA.setRequestHeader('Access-Control-Allow-Origin','*');
  xmlhttpA.setRequestHeader('X-AUTH','4a58d6c0d49e5884e43a756d729940c95c82cca7');
  xmlhttpA.setRequestHeader('Content-Type','application/json');

 xmlhttpA.onreadystatechange=function() {
   console.log(xmlhttpA);
  if (xmlhttpA.readyState==4) {

    console.log(" abc2 "+xmlhttpA.responseText);  
  }
 }
 xmlhttpA.send(null);
 */
	
});

//'X-AUTH': '4a58d6c0d49e5884e43a756d729940c95c82cca7', //Benbaodan
                                //'X-AUTH' : '5056c2081205740a2d765ebe3ff5807dd4178a87', // BenbaodanJr
                                                                //'Access-Control-Allow-Methods': 'GET',