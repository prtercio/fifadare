var trans = angular.module('App.translations', ['pascalprecht.translate']);

trans.config(['$translateProvider', function ($translateProvider, $translate) {
  //$translateProvider.preferredLanguage(window.localStorage.getItem("lang"));
  $translateProvider.useLoader('asyncLoader');
  $translateProvider.useSanitizeValueStrategy('escaped');

  $translateProvider.preferredLanguage(window.localStorage.getItem("lang"));

  //console.log("Lenguaje: "+window.localStorage.getItem("lang"))
  $translateProvider.fallbackLanguage(window.localStorage.getItem("lang"));;

}]);

trans.factory('asyncLoader', function ($q, $timeout) {

  return function (options) {
    var deferred = $q.defer(),
        translations;

    if (options.key === 'es') {
      translations = {
        LENGUAJE_ID: 1,
        LENGUAJE: "Español",
        SENHA: "Contraseña",
        INISESSAO:"Iniciar sesión",
        RECSENHA:"Restablecer Contraseña",
        REGISTRO: "Registrárse",
        VOLTAR: "Volver",
        PONTOS: "Puntos",
        JOGOS:"Juegos"
      };
    } if (options.key === 'pt') {
      translations = {
        LENGUAJE_ID: 2,
        LENGUAJE: "Portugues",
        SENHA: "Senha",
        INISESSAO:"Iniciar sessão",
        RECSENHA:"Recuperar Senha",
        REGISTRO: "Registro",
        VOLTAR:"Volver",
        PONTOS: "Pontos",
        JOGOS:"Jogos"
      };
    }
    if (options.key === 'en') {
      translations = {
        LENGUAJE_ID: 3,
        LENGUAJE: "English",
        PONTOS: "Score"
      };
    }

    $timeout(function () {
      deferred.resolve(translations);
    }, 2000);

    return deferred.promise;
  };
});
