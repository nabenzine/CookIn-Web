/**
 * Created by Nad on 05/01/2017.
 */

angular.module('CookIn').factory('GlobalFactory', function(_) {

    var global = {
        findElement:       findElement,
        findComponent : findComponent,
        checkBoxToGetParametes : checkBoxToGetParametes,
        stateParamsToGetRequest : stateParamsToGetRequest
    };

    // Trouver un objet dans un tableau avec une clé => valeur
    function findElement(arr, propName, propValue) {
        for (var i=0; i < arr.length; i++)
            if (arr[i][propName] == propValue)
                return arr[i];

        // will return undefined if not found; you could return a default instead
    }

    // Trouver les élements dans l'objet retourné par google maps
    function findComponent(result, type) {
        var component = _.find(result.address_components, function(component) {
            return _.include(component.types, type);
        });
        return component && component.long_name;
    }

    // Preparer la requette Get en y ajoutant seulement les parameters qui ont des valeurs associés
    function stateParamsToGetRequest(data){
        var getParameters = '';
        var firstElement = false;
        for (var key in data) {
            if (data[key]){
                if(!firstElement){
                    firstElement = true;
                    getParameters = getParameters + encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) ;
                }else{
                    getParameters = getParameters + '&' + encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) ;
                }
            }
        }
        return getParameters;
    }

    // Transformer un tableau de checkbox en parametres Get
    function checkBoxToGetParametes(data){
        var typeCuisineParameters = '';
        var firstElement = false;
        for (var prop in data) {
            if (data[prop]){
                if(!firstElement){
                    firstElement = true;
                    typeCuisineParameters = typeCuisineParameters + prop ;
                }else{
                    typeCuisineParameters = typeCuisineParameters + ',' + prop ;
                }
            }
        }
        return typeCuisineParameters;
    }

    return global;
})
