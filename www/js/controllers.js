'Use Strict';
var tab = angular.module('App.controllers', []);

tab.controller('AccountCtrl', function($scope, $state, $localStorage, Popup) {
  $scope.settings = {
    enableFriends: true
  };

  var key = localStorage.getItem('key');
  var imageSelecionada1;
  var imageSelecionada2;

  $scope.$on('$ionicView.enter', function() {
    //Check if there's an authenticated user, if there is non, redirect to login.
    if(firebase.auth().currentUser) {
      $scope.loggedIn = true;
    } else {
      $scope.loggedIn = false;
      $state.go('login');
    }
    if(!$localStorage.isGuest) {
      //Authentication details.
      console.log("Firebase Auth: " + JSON.stringify(firebase.auth().currentUser));
      //Account details.
      var email = JSON.stringify(firebase.auth().currentUser.email);
      var uid = JSON.stringify(firebase.auth().currentUser.uid); 
      console.log("Account: " + email);
      //Set the variables to be shown on home.html
      $scope.email = $localStorage.account.email;
      $scope.provider = $localStorage.account.provider;
      $scope.gamertag = $localStorage.account.gamertag;

      var ref = firebase.database().ref("fifadare/users/"+key);
      ref.once("value").then(function(snapshot) {
         $scope.$apply(function(){
            $scope.games = snapshot.val(); // {first:"Ada",last:"Lovelace"}
            $scope.pontos = $scope.games.pontos;
            $scope.jogosQuantidade = $scope.games.jogosQuantidade;
         });
      });
     

      if($localStorage.account.email == "benbaodan@outlook.com"){
        $scope.agregarRegra = true;
      } else {
        $scope.agregarRegra = false;
      }
    } else {
      //Logged in user is previously logged in as guest. Set variables to Guest variables.
      console.log("Firebase Auth: " + JSON.stringify(firebase.auth().currentUser));
      $scope.email = "Guest";
      $scope.provider = "Firebase";
      $scope.loggedIn = true;
    }
  })

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
                console.log(response);
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
        console.log(progress);
        if(progress === 100){
          console.log("Primeira imagen enviada com sucesso "+ imageSelecionada2);
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
        console.log(downloadURL);
      });

    } 

    function enviarOutraImg(){
      var filename = imageSelecionada2.name;
    var storageRef = firebase.storage().ref('/primeirotorneio50/'+key+'/'+filename);
    var uploadTask = storageRef.put(imageSelecionada2);

      uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        if(progress === 100){
          $scope.$apply(function(){
            $scope.imagen1 = "";
            $scope.imagen2 = "";
          });
          $('#botao2').hide(); 
          console.log("Segunda imagen enviada com sucesso");
        }
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log(downloadURL);
      });
    }   


});
