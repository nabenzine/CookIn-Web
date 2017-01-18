
angular.module('CookIn').controller('AddPublicationCtrl',AddPublicationCtrlFnt);

AddPublicationCtrlFnt.$inject=['$scope', '$rootScope', 'SearchFactory', 'SubmitFactory', 'Auth', '_']

function AddPublicationCtrlFnt($scope, $rootScope, SearchFactory, SubmitFactory, Auth, _) {

    Auth.islogin();

    // liste des données
    $scope.typeCuisine = {};
    $scope.typeRepas = {};
    $scope.modeConsommation = {};
    $scope.languesParlees = {};

    $scope.regimeAlimentaire = {};
    $scope.lieuxEnregistres = {};

    $scope.utilisateur = {};
    $scope.modeConso = '';

    $scope.latitude = {};
    $scope.longitude = {};

    // Aficher le nom d'adresse
    $scope.showNewMapInput = false;

    // Label quantité
    $scope.libelleQuantite = 'Nombre de personnes';

    // Initialiser les champs checkbox
    $scope.assiterPreparation = false;
    $scope.enfantAdmis = false;
    $scope.animauxAutorise = false;
    $scope.raccompagnerInvite = false;

    // Conf du slider
    $scope.nbrPersonneSlider ={
        minValue: 1,
        maxValue: 5,
        options: {
        hideLimitLabels: true,
            minRange : 0,
            noSwitching: true,
            floor: 1,
            ceil: 15
        }
    };

    $scope.activeDate = null;
    $scope.selectedDates = [];

    $scope.removeFromSelected = function(dt) {
        $scope.selectedDates.splice($scope.selectedDates.indexOf(dt), 1);
    }

    $scope.updateModeConsoLabel = function (value) {
        if(value.CODE === 'SURPLACE'){
            $scope.libelleQuantite = 'Nombre de personnes' ;
        }else {
            $scope.libelleQuantite = 'Quantité' ;
        }
    };

    SearchFactory.fillTypeRepas().then(
        function(payload) {
            $scope.typeRepas = payload;
            //Affichage de l'élément par défaut
            $scope.typeExperience=$scope.typeRepas[0];
        },
        function(errorPayload) {
            $log.error('failure loading TypeRepas', errorPayload);
        }
    );

    SearchFactory.fillTypeCuisine().then(
        function(payload) {
            $scope.typeCuisine = payload;
            //Affichage de l'élément par défaut
            $scope.typeDeCuisine=$scope.typeCuisine[0];
        },
        function(errorPayload) {
            $log.error('failure loading TypeCuisine', errorPayload);
        }
    );


    SearchFactory.fillModeConsommation().then(
        function(payload) {
            $scope.modeConsommation = payload;
            //Affichage de l'élément par défaut
            $scope.Adeguster=$scope.modeConsommation[0];
        },
        function(errorPayload) {
            $log.error('failure loading ModeConso', errorPayload);
        }
    );


    SubmitFactory.fillRegimeAlimentaire().then(
        function(payload) {
            $scope.regimeAlimentaire = payload;
        },
        function(errorPayload) {
            $log.error('failure loading fillRegimeAlimentaire', errorPayload);
        }
    );


    SubmitFactory.GetAdressesByUtilisateur($rootScope.globals.currentUser.id).then(
        function(payload) {
            $scope.lieuxEnregistres = payload;
            //Affichage de l'élément par défaut avec l'affichage sur la map
            $scope.adresses=$scope.lieuxEnregistres[0];

            $scope.placemap();

        },
        function(errorPayload) {
            $log.error('failure loading GetAdressesByUtilisateur', errorPayload);
        }
    );

    SubmitFactory.GetUtilisateur($rootScope.globals.currentUser.id).then(
        function(payload) {
            $scope.utilisateur = payload;
        },
        function(errorPayload) {
            $log.error('failure loading GetUtilisateur', errorPayload);
        }
    );


    // Créer ou mettre à jour la map
    $scope.placemap = function() {
        if($scope.adresses == null | $scope.adresses == undefined){
            $scope.showNewMapInput = true;
        }
        else
        {
            $scope.showNewMapInput = false;

            $scope.latitude=$scope.adresses.LATITUDE;
            $scope.longitude=$scope.adresses.LONGITUDE;
            var element = "map-item";

            simpleMap($scope.latitude,$scope.longitude, element);
        }

    };

    // ng-model des choix de langue
    $scope.selectOptions = {
        placeholder: "Selectionnez la (les) langue(s)",
        dataTextField: "LIBELLE",
        dataValueField: "IDLANGUE",
        valuePrimitive: true,
        autoBind: true,
        dataSource: {
            transport: {
                read: function (options) {//options holds the grids current page and filter settings
                    SearchFactory.fillLanguage().then(function(data) {
                        $scope.languesParlees = data.data;
                        options.success(data);
                    });
                }
            }
        }
    };

    // ng-model des choix de langues, permettant d'afficher des valeurs par défaut
    $scope.selectedIdsRegime = [];

    SubmitFactory.GetLanguesByUtilisateur($rootScope.globals.currentUser.id).then(function(data) {
        $scope.selectedIdsLangues = _.pluck(data,"IDLANGUE");
    });

    // ng-model des régimes alimentaires;
    $scope.regimeAlimentaire = {
        placeholder: "Selectionnez le(s) régime(s)",
        dataTextField: "LIBELLE",
        dataValueField: "IDREGIME",
        valuePrimitive: true,
        autoBind: true,
        dataSource: {
            transport: {
                read: function (options) {//options holds the grids current page and filter settings
                    SubmitFactory.fillRegimeAlimentaire().then(function(data) {
                        $scope.regimeAlimentaire = data.data;
                        options.success(data);
                    });
                }
            }
        }
    };

    $scope.insertAnnonce = function () {
        //Création adresse si elle n'existe pase!

        // Création de  l'annonce
        var annonce = {
            IDTYPEAMBIANCE: 1  ,
            IDUTILISATEUR: $rootScope.globals.currentUser.id,
            IDTYPEREPAS: $scope.typeExperience.IDTYPEREPAS   ,
            IDADRESSE:  $scope.adresses.IDADRESSE  ,
            IDMODECONSO: $scope.Adeguster.IDMODECONSO   ,
            IDCUISINE: $scope.typeDeCuisine.IDCUISINE  ,
            LIBELLE:  $scope.titre  ,
            DESCRIPTION: $scope.description  ,
            DATE_ENVOI: new Date() ,
            PRIX:   $scope.prix ,
            ACCEPTATION_AUTO: true   ,
            ASSISTER_PREPARATION:  $scope.assiterPreparation  ,
            ACCEPTE_ENFANT:  $scope.enfantAdmis  ,
            ACCEPTE_ANIMAUX: $scope.animauxAutorise   ,
            RACCOMPAGNE_INVITE:  $scope.raccompagnerInvite  ,
            QUANTITE_MAX:   $scope.nbrPersonneSlider.minValue ,
            QUANTITE_MIN:  $scope.nbrPersonneSlider.maxValue
        };
        //ReservationFactory.addReservation(reservation);
        // Création des sessions

        // Création des régimes alimentaires

        // Mettre à jours les données de l'utilisateur
            // 1- Langues
            // 2- (PROFESSION, Numero de telephone
            // 3- Si nouvelle adresse l'associer à l'utilisateur
    }


};
