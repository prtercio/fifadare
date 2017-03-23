'Use Strict';
var screen = angular.module('App.Screenshot', []);

screen.controller('ScreenshotCtrl', function($scope, $state, $localStorage, Popup, $http, $ionicLoading) {


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

    var xboxids = firebase.database().ref('fifadare/users');
    xboxids.orderByChild('pontos').once("value").then(function(snapshot) {
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

 $scope.buscarScreens = function(){
	$http({
       url: 'https://xboxapi.com/v2/'+idUsuario+'/screenshots',
      method: 'GET',
      headers: {
                  'Access-Control-Allow-Origin': '*',                
                  'X-AUTH': '5056c2081205740a2d765ebe3ff5807dd4178a87', //Benbaodan
                  //'X-AUTH' : '5056c2081205740a2d765ebe3ff5807dd4178a87', // BenbaodanJr
                  //'X-Authorization':idXbl,
                  //'Access-Control-Allow-Methods': 'GET',
                  'Accept-Language':'es-ES',
                  'Content-Type':'application/json'
                }
    }).then(function(resp) { 
              //console.log("Resp2: "+resp.data.devices[0].titles[1].activity.richPresence);
        var datos = resp.responseText;
        //console.log(datos);
        //console.log(datos);
        console.log("resp "+resp);
        $scope.datos = resp.data;
             
    }, function(err) {
            console.log("Error2 "+err.data);  
            $scope.error = err;  
    });
  }
});