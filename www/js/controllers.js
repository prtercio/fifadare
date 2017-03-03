'Use Strict';
var tab = angular.module('App.controllers', []);

tab.controller('ConquistasCtrl', function($scope, $state, $timeout, Utils, Popup) {

  //$timeout(function() {
    var ref = firebase.database().ref("fifadare/regra");
    ref.once("value", function(snapshot) {    
      console.log(snapshot.val());
    //console.log(window.localStorage.getItem('nuevoSocial'));
     //$scope.$apply(function(){
      $scope.$apply(function(){        
       $scope.conquistas = snapshot.val();
      //$scope.datos = snapshot.val();
     });
      
     });


    $scope.data = {};
    $scope.obj;
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value
    var url;

  //});

  $scope.takePicture = function() {
    console.log("got camera button click");
    var options =   {
      quality: 50,
      destinationType: destinationType,
      sourceType: pictureSource,
      encodingType: 0
      };
    if (!navigator.camera)
      {
      // error handling
      return;
      }
    navigator.camera.getPicture(
      function (imageURI) {
        //console.log("got camera success ", imageURI);
        $scope.mypicture = imageURI;
        },
      function (err) {
        //console.log("got camera error ", err);
        // error handling camera plugin
        },
      options);
    };

  // https://github.com/yafraorg/ionictests/blob/master/camera/www/js/controllers.js

});

tab.controller('AccountCtrl', function($scope, $state, $localStorage, Popup, $ionicPopover) {
  $scope.settings = {
    enableFriends: true
  };


  var imageSelecionada1;
  var imageSelecionada2;

  
  $scope.logout = function() {
    if (firebase.auth()) {
      firebase.auth().signOut().then(function() {
        //Clear the saved credentials.
        $localStorage.$reset();
        //Proceed to login screen.
        $state.go('login');
      }, function(error) {
        //Show error message.
        Utils.message(Popup.errorIcon, Popup.errorLogout);
      });
    }
  };

  $scope.enviarregra = function(regra) {
//Check if form is filled up.

          //Add Firebase account reference to Database. Firebase v3 Implementation.
          firebase.database().ref().child('fifadare/regra').push({
            titulo: regra.titulo,
            pontos: regra.pontos,
            descricao: regra.descricao                
          }).then(function(response) {
            //console.log(response);
            enviarRegra
            Utils.message(Popup.successIcon, Popup.enviarRegra)
            .then(function() {
              $scope.regra = "";
            })                  
            //Account created successfully, logging user in automatically after a short delay.
            /*Utils.message(Popup.successIcon, Popup.accountCreateSuccess)
              .then(function() {
                getAccountAndLogin(response.key);
              })
              .catch(function() {
                //User closed the prompt, proceed immediately to login.
                getAccountAndLogin(response.key);
              });
              */

        });           
    }

      //abrir menuFlotante
      $ionicPopover.fromTemplateUrl('templates/popover.html', {
          scope: $scope,
      }).then(function(popover) {
          $scope.popover = popover;
      });

      $scope.cerrarMenu = function(){
         $scope.popover.hide();
      };

/*

            $(document).ready(function(){
              $('#uploadButton').hide();
              $('#botao2').hide();
            });

            $('#file').on("change", function(event){
              imageSelecionada1 = event.target.files[0];
              $('#uploadButton').show();
              verArchivo1(imageSelecionada1);
              $('#botao2').show();
            })

            $('#file3').on("change", function(event){
              imageSelecionada2 = event.target.files[0];
              $('#uploadButton').show();
              verArchivo2(imageSelecionada2);
            })

            function verArchivo1(img) {
              $scope.$apply(function(){
                $scope.imagen1 = img;
              });

            }

            function verArchivo2(img) {
              $scope.$apply(function(){
                $scope.imagen2 = img;
              });

            }


            $scope.uploadFile = function(){
              var filename = imageSelecionada1.name;
              var storageRef = firebase.storage().ref('/primeirotorneio50/'+key+'/'+filename);
              var uploadTask = storageRef.put(imageSelecionada1);

              uploadTask.on('state_changed', function(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //console.log(progress);
                if(progress === 100){
                  //console.log("Primeira imagen enviada com sucesso "+ imageSelecionada2);
                  if(imageSelecionada2){
                    enviarOutraImg();
                  } else {
                    $scope.$apply(function(){
                      $scope.imagen1 = "";
                      $scope.imagen2 = "";
                    });
                    $('#botao2').hide();
                    $('#uploadButton').hide();
                  }

                }
              }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        var downloadURL = uploadTask.snapshot.downloadURL;
        //console.log(downloadURL);
      });

            } 

            function enviarOutraImg(){
              var filename = imageSelecionada2.name;
              var storageRef = firebase.storage().ref('/primeirotorneio50/'+key+'/'+filename);
              var uploadTask = storageRef.put(imageSelecionada2);

              uploadTask.on('state_changed', function(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //console.log(progress);
                if(progress === 100){
                  $scope.$apply(function(){
                    $scope.imagen1 = "";
                    $scope.imagen2 = "";
                  });
                  $('#botao2').hide(); 
                  //console.log("Segunda imagen enviada com sucesso");
                }
              }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        var downloadURL = uploadTask.snapshot.downloadURL;
        //console.log(downloadURL);
      });
  }  

*/

 
});