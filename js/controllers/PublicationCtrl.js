/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('PublicationCtrl',PublicationCtrlFnt);

PublicationCtrlFnt.$inject=['$scope', '$state', '$filter', '$stateParams', 'AnnonceFactory', 'SessionFactory', 'AvisFactory', 'ReservationFactory','$mdDialog']

function PublicationCtrlFnt($scope, $state, $filter, $stateParams, AnnonceFactory, SessionFactory, AvisFactory, ReservationFactory, $mdDialog) {

    $scope.donneesAnnonce = [];
    $scope.avisUtilisateurs = [];
    $scope.availableday = {};
    $scope.bookedSession = {};
    $scope.actualSession = {};
    $scope.notePourChef = '';

    // liste nombre invités
    $scope.listQuantite = [];

    // Facturation
    $scope.totalPrice = 0;
    $scope.fraisDesService = 0;

    // Validation du formulaire
    $scope.isValid =  true ;

    // DatePicker Conf (minDate et attribution d'un nom)
    //$scope.minDate = new Date();
    //angular.element($element[0].querySelector('#myDatePicker'))[0].children[0].children[0].setAttribute("name", "myDatePickerInput");

    // Message de confirmation de la réservation
    $scope.showPrompt = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('Confirmer votre réservation')
            .placeholder('Laissez un message à votre hôte')
            .ariaLabel('')
            .targetEvent(ev)
            .ok('Okay!')
            .cancel('Annuler');

        $mdDialog.show(confirm).then(function(result) {
            $scope.notePourChef = result ;

            // Inserer la réservation
            $scope.insertReservation();
        });
    };

    // Fnction ajouter reservation
    $scope.insertReservation = function () {
        var reservation = {
            IDSESSION: $scope.actualSession.IDSESSION,
            IDSTATUSRESER: 3,
            LIBELLE: $scope.donneesAnnonce.LIBELLE,
            NOTE_POUR_CHEF: $scope.notePourChef,
            QUANTITE: $scope.nbPlacesAreserver,
            FRAIS_RESERVATION: $scope.fraisDesService,
            TOTAL: $scope.totalPrice
        };

        ReservationFactory.addReservation(reservation).then(
            function (data) {
                $state.go('dashboard.ordersplaced');
            },
            function (error) {

            }
        );
    }

    // à chaque changement de date
    $scope.dateChanged = function (newDate, reload) {
        if (newDate != undefined){
            // Selectionner l'objet session actuelle
            var formattedDate = 'key'+$filter('date')(newDate, "ddMMyyyy");

            // Si l'utilisateur a déja réservé pour cette session
            if($scope.bookedSession.map[formattedDate]){
                $scope.isValid = false;
            }else{
                $scope.isValid = true;
                $scope.actualSession = $scope.availableday.map[formattedDate][0];

                // Si y'a déja une résevation sur la session on prend plus en compte la quantité min
                var selectStart = ($scope.actualSession.QUANTITE_RESTANTE === $scope.donneesAnnonce.QUANTITE_MAX)? $scope.donneesAnnonce.QUANTITE_MIN : 1 ;

                // vider la liste quantié
                $scope.listQuantite.length = 0;
                // Si ce n'est pas le premier chargement du controlleur
                if (reload){
                    $scope.$apply(function(){
                        // Mettre à jours les places restantes
                        for (var i = selectStart ; i <= $scope.actualSession.QUANTITE_RESTANTE; i++) {
                            $scope.listQuantite.push(i);
                        }
                    });
                }else{
                    // Mettre à jours les places restantes
                    for (var i = selectStart ; i <= $scope.actualSession.QUANTITE_RESTANTE; i++) {
                        $scope.listQuantite.push(i);
                    }
                }

                // Selectionner le premier element de la liste
                $scope.nbPlacesAreserver = selectStart ;
                // Mettre à jours les prix
                $scope.updatePrice();
            }
        }
    }

    // Mettre à jours les prix
    $scope.updatePrice = function () {
        $scope.fraisDesService = ($scope.donneesAnnonce.PRIX * $scope.nbPlacesAreserver) * 0.15;
        $scope.totalPrice = $scope.fraisDesService + ($scope.donneesAnnonce.PRIX * $scope.nbPlacesAreserver);
    }

    //Méthodes
    AnnonceFactory.getAnnonceDetail($stateParams.id).then(
        function(dataAnnonce) {
            $scope.donneesAnnonce = dataAnnonce;

            // Si l'annonce existe
            if(dataAnnonce)
            {

                // Afficher l'addresse sur une map
                var element = "map-item";
                simpleMap(dataAnnonce.ADRESSE.LATITUDE,dataAnnonce.ADRESSE.LONGITUDE, element);

                // Récupérer les session déja réservé
                SessionFactory.getBookedSessionByAnnonceAndUser(dataAnnonce.IDANNONCE, dataAnnonce.UTILISATEUR.IDUTILISATEUR).then(
                    function(dataBookedSession) {
                        $scope.bookedSession = dataBookedSession;

                        // Convertir en tableau les résultat (par date)
                        $scope.bookedSession.map = SessionFactory.jsonAvailabilityToArray(dataBookedSession);
                    },
                    function(errorPayload) {
                        $log.error('failure loading getAnnonceDetail', errorPayload);
                    }
                );

                // Récupérer les disponibilités de l'annonce
                SessionFactory.getAvailabilityByAnnonce(dataAnnonce.IDANNONCE).then(
                    function(dataDates) {
                        $scope.availableday = dataDates;
                        // Initialiser le datePicker avec la premiére dispo de l'annonce
                        $scope.dateReservation = new Date(dataDates[0].DATE_DEBUT) ;

                        // Convertir en tableau les résultat (par date)
                        $scope.availableday.map = SessionFactory.jsonAvailabilityToArray(dataDates);

                        $scope.SelectorOptions = {
                            min : new Date(),
                            culture: "fr-FR",
                            disableDates : function(date) {
                                var formattedDate = 'key'+$filter('date')(date, "ddMMyyyy");
                                return $scope.availableday.map[formattedDate]== undefined ;
                            },
                            change : function(){
                                $scope.dateChanged(this.value(), true)
                            }
                        };

                        //Lancer l'evenement dateChanged pour mettre à jours la quantité et le calcul du prix
                        $scope.dateChanged($scope.dateReservation, false);

                    },
                    function(errorPayload) {
                        $log.error('failure loading getAvailabilityByAnnonce', errorPayload);
                    }
                );


                // Récupérer les avis liés
                AvisFactory.getAvisByUser(dataAnnonce.UTILISATEUR.IDUTILISATEUR).then(
                    function(dataAvis) {
                        $scope.avisUtilisateurs = dataAvis;
                    },
                    function(errorPayload) {
                        $log.error('failure loading getAnnonceDetail', errorPayload);
                    }
                );
            }

        },
        function(errorPayload) {
            $log.error('failure loading getAnnonceDetail', errorPayload);
        }
    );
};


