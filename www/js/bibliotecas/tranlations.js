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
        JOGOS:"Juegos",
        JOGO:"Juego",
        REGRAS: "Reglas",
        CONFIGURACAO: "Configuración",
        DESENVOLVIDOPOR: "Desarrollado por",
        SELECIONARIDIOMA:"Seleccionar el Idioma",
        VITORIA: "Victoria",
        ADICIONEASFOTOS: "Agregue aqui la(s) foto(s):",
        SELECIONECONQUISTAS: "Seleccione una o más conquistas:",
        CONQUISTASSELECIONADAS: "Conquistas seleccionadas:",
        ELIMINECONQUISTAS: "Elimine un elemento moviendo la conquista de la derecha hacia la izquierda y click en el botón Delete.",
        TOTALDEPONTOS:"Total de Puntos de las Conquistas seleccionadas:",
        JOGOENVIADO: "Este juego fue enviado.",
        DETALHECONQUISTAS:"Detalle de las conquistas:",
        DETALHEJOGO:"Detalle del Juego"
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
        JOGOS:"Jogos",
        JOGO:"Jogo",
        REGRAS: "Regras",
        CONFIGURACAO: "Configuração",
        DESENVOLVIDOPOR: "Desenvolvido por",
        SELECIONARIDIOMA:"Selecione o Idioma",
        VITORIA: "Vitória",
        ADICIONEASFOTOS: "Adicione aqui a(s) foto(s):",
        SELECIONECONQUISTAS: "Selecione uma o mais conquistas:",
        CONQUISTASSELECIONADAS: "Conquistas selecionadas:",
        ELIMINECONQUISTAS: "Elimine um elemento movendo a conquista da direita para a esquerda e presionando o botão Delete.",
        TOTALDEPONTOS:"Total de Pontos das Conquistas selecionadas:",
        JOGOENVIADO:"Este jogo já foi enviado.",
        DETALHECONQUISTAS:"Detalhe das conquistas:",
        DETALHEJOGO:"Detalhe do Jogo"

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
