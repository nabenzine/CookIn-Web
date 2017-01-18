/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('PublicationCtrl',PublicationCtrlFnt);

PublicationCtrlFnt.$inject=['$scope', '$filter', '$stateParams', 'AnnonceFactory','ReservationFactory','$element','$mdDialog']

function PublicationCtrlFnt($scope, $filter, $stateParams, AnnonceFactory, ReservationFactory, $element, $mdDialog) {

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
                $state.go('/dashboard/ordersplaced');
            },
            function (error) {

            }
        );
    }

    // à chaque changement de date
    $scope.dateChanged = function (newDate) {
        if (newDate != undefined){
            // Selectionner l'objet session actuelle
            var formattedDate = 'key'+$filter('date')(newDate, "ddMMyyyy");

            // Si l'utilisateur a déja réservé pour cette session
            if($scope.bookedSession.map[formattedDate]){
                $scope.isValid = false;
            }else{
                $scope.isValid = true;

                $scope.actualSession = $scope.availableday.map[formattedDate][0];

                // Mettre à jours les places restantes
                $scope.listQuantite = [];
                for (var i = $scope.donneesAnnonce.QUANTITE_MIN -1; i < $scope.actualSession.QUANTITE_RESTANTE; i++) {
                    $scope.listQuantite.push(i+1);
                }
                // Selectionner le premier element de la liste
                $scope.nbPlacesAreserver = $scope.donneesAnnonce.QUANTITE_MIN ;

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
    AnnonceFactory.getAnnonce($stateParams.id).then(
        function(dataAnnonce) {
            $scope.donneesAnnonce = dataAnnonce;

            // Si l'annonce existe
            if(dataAnnonce)
            {
                // Afficher l'addresse sur une map
                var element = "map-item";
                simpleMap(dataAnnonce.ADRESSE.LATITUDE,dataAnnonce.ADRESSE.LONGITUDE, element);

                // Récupérer les session déja réservé
                AnnonceFactory.getBookedSessionByAnnonceAndUser(dataAnnonce.IDANNONCE, dataAnnonce.UTILISATEUR.IDUTILISATEUR).then(
                    function(dataBookedSession) {
                        $scope.bookedSession = dataBookedSession;

                        // Convertir en tableau les résultat (par date)
                        $scope.bookedSession.map = AnnonceFactory.jsonAvailabilityToArray(dataBookedSession);
                    },
                    function(errorPayload) {
                        $log.error('failure loading getAnnonce', errorPayload);
                    }
                );

                // Récupérer les disponibilités de l'annonce
                AnnonceFactory.getAvailabilityByAnnonce(dataAnnonce.IDANNONCE).then(
                    function(dataDates) {
                        $scope.availableday = dataDates;
                        // Initialiser le datePicker avec la premiére dispo de l'annonce
                        $scope.dateReservation = new Date(dataDates[0].DATE_DEBUT) ;

                        // Convertir en tableau les résultat (par date)
                        $scope.availableday.map = AnnonceFactory.jsonAvailabilityToArray(dataDates);

                        $scope.SelectorOptions = {
                            min : new Date(),
                            culture: "fr-FR",
                            disableDates : function(date) {
                                var formattedDate = 'key'+$filter('date')(date, "ddMMyyyy");
                                return $scope.availableday.map[formattedDate]== undefined ;
                            },
                            change : function(){
                                $scope.dateChanged(this.value())
                            }
                        };

                        //Lancer l'evenement dateChanged pour mettre à jours la quantité et le calcul du prix
                        $scope.dateChanged($scope.dateReservation);

                    },
                    function(errorPayload) {
                        $log.error('failure loading getAvailabilityByAnnonce', errorPayload);
                    }
                );


                // Récupérer les avis liés
                AnnonceFactory.getAvisByUser(dataAnnonce.UTILISATEUR.IDUTILISATEUR).then(
                    function(dataAvis) {
                        $scope.avisUtilisateurs = dataAvis;
                    },
                    function(errorPayload) {
                        $log.error('failure loading getAnnonce', errorPayload);
                    }
                );
            }

        },
        function(errorPayload) {
            $log.error('failure loading getAnnonce', errorPayload);
        }
    );
};


