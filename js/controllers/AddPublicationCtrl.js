
angular.module('CookIn').controller('AddPublicationCtrl',AddPublicationCtrlFnt);

AddPublicationCtrlFnt.$inject=['$scope', '$state', '$rootScope', 'LangueFactory','TypeRepasFactory', 'TypeCuisineFactory', 'ModeConsommationFactory',
    'UtilisateurFactory', 'AdresseFactory', 'RegimeFactory', 'AnnonceFactory', 'SessionFactory', 'ImageFactory', '_']

function AddPublicationCtrlFnt($scope, $state, $rootScope, LangueFactory, TypeRepasFactory, TypeCuisineFactory, ModeConsommationFactory, UtilisateurFactory,
                               AdresseFactory, RegimeFactory, AnnonceFactory, SessionFactory, ImageFactory, _) {


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

    // gestion images
    $scope.imagesArray = [];

    // Initialiser les dates
    $scope.dateDebut = new Date(2017, 12, 01, 12, 0 , 0);
    $scope.dateFin = new Date(2017, 12, 01, 13, 0 , 0);

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

    // Date conf
    $scope.activeDate = null;
    $scope.selectedDates = [];

    // Heure debut/Fin conf
    $scope.SelectorOptionsDebut = {
        culture: "fr-FR",
        change: function() {
            $scope.SelectorOptionsFin.min = new Date(2017, 0, 1, 9, 0, 0)
        }
    };

    $scope.SelectorOptionsFin = {
        culture: "fr-FR"
    };

    // Supprimer la date de dispo
    $scope.removeFromSelected = function(dt) {
        $scope.selectedDates.splice($scope.selectedDates.indexOf(dt), 1);
    }

    // Mettre à jours le libelle quantite
    $scope.updateModeConsoLabel = function (value) {
        if(value.CODE === 'SURPLACE'){
            $scope.libelleQuantite = 'Nombre de personnes' ;
        }else {
            $scope.libelleQuantite = 'Quantité' ;
        }
    };


    TypeRepasFactory.fillTypeRepas().then(
        function(payload) {
            $scope.typeRepas = payload;
            //Affichage de l'élément par défaut
            $scope.typeExperience=$scope.typeRepas[0];
        },
        function(errorPayload) {
            $log.error('failure loading TypeRepas', errorPayload);
        }
    );

    TypeCuisineFactory.fillTypeCuisine().then(
        function(payload) {
            $scope.typeCuisine = payload;
            //Affichage de l'élément par défaut
            $scope.typeDeCuisine=$scope.typeCuisine[0];
        },
        function(errorPayload) {
            $log.error('failure loading TypeCuisine', errorPayload);
        }
    );


    ModeConsommationFactory.fillModeConsommation().then(
        function(payload) {
            $scope.modeConsommation = payload;
            //Affichage de l'élément par défaut
            $scope.Adeguster=$scope.modeConsommation[0];
        },
        function(errorPayload) {
            $log.error('failure loading ModeConso', errorPayload);
        }
    );

    AdresseFactory.getAdressesByUtilisateur($rootScope.globals.currentUser.id).then(
        function(payload) {
            $scope.lieuxEnregistres = payload;
            //Affichage de l'élément par défaut avec l'affichage sur la map
            $scope.adresses=$scope.lieuxEnregistres[0];

            $scope.placemap();

        },
        function(errorPayload) {
            $log.error('failure loading getAdressesByUtilisateur', errorPayload);
        }
    );

    UtilisateurFactory.getUtilisateur($rootScope.globals.currentUser.id).then(
        function(payload) {
            $scope.utilisateur = payload;
        },
        function(errorPayload) {
            $log.error('failure loading getUtilisateur', errorPayload);
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
                    LangueFactory.fillLanguage().then(function(data) {
                        $scope.languesParlees = data.data;
                        options.success(data);
                    });
                }
            }
        }
    };

    // ng-model des choix de langues, permettant d'afficher des valeurs par défaut
    $scope.selectedIdsRegime = [];

    LangueFactory.getLanguesByUtilisateur($rootScope.globals.currentUser.id).then(function(data) {
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
                    RegimeFactory.fillRegimeAlimentaire().then(function(data) {
                        $scope.regimeAlimentaire = data.data;
                        options.success(data);
                    });
                }
            }
        }
    };


    $scope.addImage = function( $file, $message, $flow ){
        var response = JSON.parse($message);
        if (response.status_code == 200){
            var image = {
                FILENAME :  response.data.img_url,
                TAILLE : response.data.img_size,
                DESCRIPTION : response.data.img_name,
                DATE_CREATION : new Date(),
                PAR_DEFAUT : 0
            };
            $scope.imagesArray.push(image);
        }
    };

    $scope.insertAnnonce = function (newAdresse) {
        // Si erreurs sur le formulaire
        if ($scope.form_submit.$invalid) {
            // déclenche l'evenement touched
            angular.forEach($scope.form_submit.$error, function (field) {
                angular.forEach(field, function(errorField){
                    errorField.$setTouched();
                })
            });
        }
        else{
            //Création adresse si elle n'existe pas et l'associer à l'utilisateur!
            // 3- Si nouvelle adresse l'associer à l'utilisateur
            //console.log('its ok');
            //console.log(newAdresse);
            //AdresseFactory.addAdresse()

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

            // Ajouter l'annonce
            AnnonceFactory.addAnnonce(annonce).then(
                function (data) {
                    // Récupérer l'id annonce depuis l'objet inséré
                    var idAnnonce = data.IDANNONCE;

                    // Création des sessions
                    _.each($scope.selectedDates, function(element, index, list){
                        // Date de la session
                        var dateSession = new Date(element) ;

                        var session = {
                            IDANNONCE: idAnnonce,
                            DATE_DEBUT : new Date(dateSession.getFullYear(), dateSession.getMonth(), dateSession.getDate(), $scope.dateDebut.getHours(), $scope.dateDebut.getMinutes(), 0, 0),
                            DATE_FIN : new Date(dateSession.getFullYear(), dateSession.getMonth(), dateSession.getDate(), $scope.dateFin.getHours(), $scope.dateFin.getMinutes(), 0, 0),
                            QUANTITE_RESTANTE : $scope.nbrPersonneSlider.maxValue
                        };

                        SessionFactory.addSession(session).then(
                            function (data) {

                            }
                        )
                    });

                    // Insertion des images
                    _.each($scope.imagesArray, function(element, index, list){
                        var image = element ;

                        // Rajouter l'id de l'annonce
                        image['IDANNONCE'] = idAnnonce;

                        // Ajouter l'image
                        ImageFactory.addImage(image).then(
                            function (data) {

                            }
                        )
                    });

                },
                function (error) {
                    console.log(error);
                }
            );

            // Création des régimes alimentaires

            // Mettre à jours les données de l'utilisateur
            // 1- Langues
            // 2- (PROFESSION, Numero de telephone
        }
    }


};
