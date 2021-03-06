// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('App', [
  'ionic',
  'App.Ranking',  
  'App.controllers', 
  'App.services', 
  'App.DashJogos', 
  'App.SubirJogosDetalle',  
  'App.RankingJogosDetalhe', 
  'App.RankingJogos', 
  'App.Social',
  'App.Configuracao', 
  'App.translations', 
  'App.Tabs',
  'App.Xbox',
  'App.Lab',
  'App.Fifa',
  'App.Screenshot',
  'App.dataServices',
  'ngStorage', 
  'ngCordovaOauth'
  ])

.constant('Social', {
  facebookAppId: "1025234637591184",
  googleWebClientId: "86899339460-kqrko1uuhu9a532l9f0jdhf9tgnp8b00.apps.googleusercontent.com",
  twitterKey: "aJWByCgPhUgYZJMojyFeH2h8F",
  twitterSecret: "XxqKHi6Bq3MHWESBLm0an5ndLxPYQ2uzLtIDy6f9vgKKc9kemI"
})
  //Constants for the Popup messages
  //For the icons, refer to http://ionicons.com for all icons.
  //Here you can edit the success and error messages on the popups.
  .constant('Popup', {
    delay: 3000, //How long the popup message should show before disappearing (in milliseconds -> 3000 = 3 seconds).
    successIcon: "ion-happy-outline",
    errorIcon: "ion-sad-outline",
    accountCreateSuccess: "Congratulations! Your account has been created. Logging you in.",
    emailAlreadyExists: "Sorry, but an account with that email address already exists. Please register with a different email and try again.",
    accountAlreadyExists: "Sorry, but an account with the same credential already exists. Please check your account and try again.",
    emailNotFound: "Sorry, but we couldn\'t find an account with that email address. Please check your email and try again.",
    userNotFound: "Sorry, but we couldn\'t find a user with that account. Please check your account and try again.",
    invalidEmail: "Sorry, but you entered an invalid email. Please check your email and try again.",
    notAllowed: "Sorry, but registration is currently disabled. Please contact support and try again.",
    serviceDisabled: "Sorry, but logging in with this service is current disabled. Please contact support and try again.",
    wrongPassword: "Sorry, but the password you entered is incorrect. Please check your password and try again.",
    accountDisabled: "Sorry, but your account has been disabled. Please contact support and try again.",
    weakPassword: "Sorry, but you entered a weak password. Please enter a stronger password and try again.",
    errorRegister: "Sorry, but we encountered an error registering your account. Please try again later.",
    passwordReset: "A password reset link has been sent to: ",
    errorPasswordReset: "Sorry, but we encountered an error sending your password reset email. Please try again later.",
    errorLogout: "Sorry, but we encountered an error logging you out. Please try again later.",
    sessionExpired: "Sorry, but the login session has expired. Please try logging in again.",
    errorLogin: "Sorry, but we encountered an error logging you in. Please try again later.",
    welcomeBack: "Welcome back! It seems like you should still be logged in. Logging you in now.",
    manyRequests: "Sorry, but we\'re still proccessing your previous login. Please try again later.",
    PontosSuccess:"Os pontos foram enviados com sucesso!",
    SelecioneConquista: "Antes de enviar selecione uma ou mais conquistas!",
    concluir50Jogos:"Os pontos foram enviados com sucesso!   Parabéns, você concluiu os 50 jogos!!!",
    enviarRegra: "A regra foi enviada com sucesso!",
    conflictoConquista:"Você não pode adicionar esta Conquista!",
    fotoNaoSelecionada:"Antes de selecionar uma conquista suba uma foto",
    errorFoto:"No funciona",
    okFoto:"Funciona!!!"
    
  })

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  })


  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.tabs.position("bottom");
    $stateProvider
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'views/tabs.html',
    controller: 'TabsCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.ranking', {
    url: '/ranking',
    views: {
      'tab-ranking': {
        templateUrl: 'views/TabRanking/tab-ranking.html',
        controller: 'RankingCtrl'
      }
    }
  }) 
  .state('tab.rankingjogos', {
    url: '/ranking/:jogoId',
    views: {
      'tab-ranking': {
        templateUrl: 'views/TabRanking/rankingjogos.html',
        controller: 'RankingJogosCtrl as idRankJogo'
      }
    },
    resolve:{
      idRankJogo: function($stateParams){
        return $stateParams.jogoId;
      }
    }
  })
  .state('tab.rankingjogosdetalhe', {
    url: '/rankingjogosdetalhe/:jogoId',
    views: {
      'tab-ranking': {
        templateUrl: 'views/TabRanking/rankingjogosdetalhe.html',
        controller: 'RankingJogosDetalheCtrl as idJogoDetalhe'
      }
    },
    resolve:{
      idJogoDetalhe: function($stateParams){
        return $stateParams.jogoId;
      }
    }
  })
   .state('tab.conquistas', {
    url: '/conquistas',
    views: {
      'tab-ranking': {
        templateUrl: 'views/regras/conquistas.html',
        controller: 'ConquistasCtrl'
      }
    }
  })
  .state('tab.regras', {
    url: '/regras',
    views: {
      'tab-ranking': {
        templateUrl: 'views/regras/regras.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.configuracao', {
    url: '/configuracao/:xboxId',
    views: {
      'tab-ranking': {
        templateUrl: 'views/regras/configuracao.html',
        controller: 'ConfiguracaoCtrl as idXbox'
      }
    },
    resolve:{
      idXbox: function($stateParams){
        return $stateParams.xboxId;
      }
    }
  })
 
  //laboratorio
  .state('tab.laboratorio', {
    url: '/laboratorio',
    views: {
      'tab-ranking': {
        templateUrl: 'views/laboratorio/index.html',
        controller: 'LabCtrl'
      }
    }
  })
  .state('tab.fifa', {
    url: '/fifa',
    views: {
      'tab-ranking': {
        templateUrl: 'views/laboratorio/fifa.html',
        controller: 'FifaCtrl'
      }
    }
  })
  .state('tab.screenshot', {
    url: '/screenshot',
    views: {
      'tab-ranking': {
        templateUrl: 'views/laboratorio/screenshot.html',
        controller: 'ScreenshotCtrl'
      }
    }
  })
  .state('tab.chats', {
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: 'views/tab-chats.html',
        controller: 'JogosCtrl'
      }
    }
  })
  .state('tab.chat-detail', {
    url: '/chats/:jogoId',
    views: {
      'tab-chats': {
        templateUrl: 'views/chat-detail.html',
        controller: 'JogosDetalheCtrl as idJogo'
      }
    },
    resolve:{
      idJogo: function($stateParams){
        return $stateParams.jogoId;
      }
    }
  })
  .state('tab.social', {
    url: '/social',
    views: {
      'tab-social': {
        templateUrl: 'views/social/social.html',
        controller: 'SocialCtrl'
      }
    }
  })
  .state('tab.xbox', {
    url: '/xbox',
    views: {
      'tab-xbox': {
        templateUrl: 'views/xbox/xbox.html',
        controller: 'XboxCtrl'
      }
    }
  })
 
  
  .state('login', {
    url: '/login',
    templateUrl: 'views/login/login.html',
    controller: 'loginController'
  })
  .state('forgotPassword', {
    url: '/forgotPassword',
    templateUrl: 'views/forgotPassword/forgotPassword.html',
    controller: 'forgotPasswordController'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'views/register/register.html',
    controller: 'registerController'
  })
  .state('completeAccount', {
    url: '/completeAccount',
    templateUrl: 'views/completeAccount/completeAccount.html',
    controller: 'completeAccountController'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});