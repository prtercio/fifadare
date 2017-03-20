'Use Strict';
var lab = angular.module('App.Lab', []);


lab.controller('LabCtrl', function($scope, $state, $ionicLoading, $ionicPopup, $http) {

  var usuarios = [];
  var idUsuario;
  var ganhador;
 var time1;
 var time2;
 var resultado1;
 var resultado2;
 $scope.btnDisabled = true;
 $scope.verBtn = true;
$scope.placar = "";

	var listauser = firebase.database().ref('fifadare/users');
    listauser.orderByChild('pontos').once("value").then(function(snapshot) {
      $scope.$apply(function(){
          snapshot.forEach(function(minisnapshot) {
               $ionicLoading.hide().then(function(){
                  //console.log("Loading Hide");
                });
              

          	   usuarios.push({
                "gamertag":minisnapshot.val().gamertag, 
                "ImagenGt":minisnapshot.val().imagenGt,
                "idXbox":minisnapshot.val().idXbox

              })
          });
       });      
      });  
   

    $scope.blisterPackTemplates = usuarios;

     $scope.changedValue=function(item){
      console.log(item.idXbox);
      idUsuario = item.idXbox;
      $scope.btnDisabled = false;
     }

 $scope.jogoSelecionado = function(valor){
  console.log("Resutaldo "+valor);
  $scope.verBtn = false;
  ganhador = valor;
  if(ganhador == 'A'){
    if(resultado1 > resultado2){
      console.log("Vc ganhou o jogo. "+$scope.placar);
      $scope.placarFinal = "Vitoria";
    } else if(resultado1 < resultado2){
      console.log("Vc perdeu o jogo. "+$scope.placar);
      $scope.placarFinal = "Derrota";
    } else {
      console.log("Vc empatou o jogo. "+$scope.placar);
      $scope.placarFinal = "Empate";
    }  
  } else if(ganhador == 'B'){
     if(resultado1 < resultado2){
      console.log("Vc ganhou o jogo. "+$scope.placar);
      $scope.placarFinal = "Vitoria"
    } else if(resultado1 > resultado2){
      console.log("Vc perdeu o jogo. "+$scope.placar);
      $scope.placarFinal = "Derrota";
    } else {
      console.log("Vc empatou o jogo. "+$scope.placar);
      $scope.placarFinal = "Empate";
    }  
  } else {
    ganhador = false;
  }

  if(ganhador != false){
     
  }
 }

  var urlLocal = 'js/BD/presenceJonathan.json';

 $scope.recuperarJogo = function(){
  $scope.lista = false;
  $ionicLoading.show().then(function(){
            //console.log("Loading Jogos");
         });
  $scope.placar = "";
  $scope.respuesta = "";
    $http({
       url: 'https://xboxapi.com/v2/'+idUsuario+'/presence',
      method: 'GET',
      headers: {
                  'Access-Control-Allow-Origin': '*',                
                  'X-AUTH': '4a58d6c0d49e5884e43a756d729940c95c82cca7', //Benbaodan
                  //'X-AUTH' : '5056c2081205740a2d765ebe3ff5807dd4178a87', // BenbaodanJr
                  //'X-Authorization':idXbl,
                  //'Access-Control-Allow-Methods': 'GET',
                  'Accept-Language':'es-ES',
                  'Content-Type':'application/json'
                }
      }).then(function(resp) { 
               var richPresence;
               $scope.respuesta = resp.data;
              //console.log("Resp2a: "+resp.data.devices[0].titles[1].activity.richPresence); 
              if(resp.data.state === "Online"){
                $ionicLoading.hide();
                if(resp.data.devices[0].titles[0].id === 69094388){
                  richPresence  = resp.data.devices[0].titles[0].activity.richPresence;
                  console.log(richPresence);
                } else if(resp.data.devices[0].titles[1].id === 69094388){
                  richPresence  = resp.data.devices[0].titles[1].activity.richPresence;
                  console.log(richPresence);
                } else if(resp.data.devices[0].titles[2].id === 69094388){
                 richPresence  = resp.data.devices[0].titles[2].activity.richPresence;
                 console.log(richPresence);
                } else {
                  $scope.placar = "Please goto Fifa.";
                  richPresence = false;
                } 

                if(richPresence != false){
                 var fifaMenu = 'FIFA 17 Temporadas (en los menús)';
                   if(fifaMenu === richPresence){
                      $scope.placar = "No se mostrará el resultado";
                      
                   } else {
                     var idFifa = 69094388;
                     $scope.lista = true;
                   
                   //console.log("Resp2: "+resp.data.devices[0].titles[0].activity.richPresence);               
                   
                   var resultado = richPresence;
                   var separador = ","; // un espacio en blanco
                   var limite    = 1;
                   //var resposta = resultado.split(separador);
                   //console.log(resposta[27], resposta[29]) ;
                   
                   var ini = parseInt(resultado.indexOf("-"))-1;
                   var fin = parseInt(resultado.indexOf("-"))+1;
                   var parcial = resultado.substr(ini, fin);
                   var final = parcial.split(separador);

                   var corta = parcial.indexOf(" ");
                   placar = parcial.substr(0,corta);
                   arrayResultado = placar.split("");
                   console.log(parseInt(arrayResultado[0]) + parseInt(arrayResultado[2]));
                   console.log("------");
                   var recortarTime = String(final.slice(0, -1));
                   var sep = "";
                   var array = "";
                   array = recortarTime.split(sep);
                   console.log("--"+ array); 
                   
                     time1 = array[4]+array[5]+array[6];
                     resultado1 = array[0];
                     time2 = array[10]+array[11]+array[12];
                     resultado2 = array[2];
                   if(resultado1 != undefined){
                   $scope.placar = time1+" "+resultado1+" X "+resultado2+" "+time2;
                     $scope.casa = time1+" "+resultado1;
                     $scope.fora = time2+" "+resultado2;
                     $scope.timeCasa = time1;
                     $scope.timeVisitante = time2;
                     $scope.resCasa = resultado1;
                     $scope.resVisitante = resultado2;
                     console.log("Placar "+$scope.placar);
                    } else {
                       $scope.placar = "Vc está no Menú";
                    }

                     /*
                     
                     */
                  }
                }

             

              } else {
                console.log("Off");
                  $ionicLoading.hide();
                   var alertPopup = $ionicPopup.alert({
                   title: 'Error',
                   template: 'Vc está offline!'
                 });

                 alertPopup.then(function(res) {
                   console.log('cerrar');
                 });
              }

        

    }, function(err) {
             console.log("Error2 "+err.data);
             $scope.error = err;
             $ionicLoading.hide();
    });

} // function
});