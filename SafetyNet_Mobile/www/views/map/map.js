
angular.module("map", ["leaflet-directive"])
.controller("GoogleMapsController", [ "$scope","$cordovaGeolocation", function($scope,$cordovaGeolocation) {
    var myPos = { lat : 25.0196772, lng : 121.4779051, };
    var latpos = null;

    var posOptions = {timeout: 10000, enableHighAccuracy: false};

    navigator.geolocation.getCurrentPosition(function(position){

        latpos = { 
            lat : position.coords.latitude,
            lng : position.coords.longitude,
        }

        console.log(latpos);
    });


    angular.extend($scope, {


        myPos: {
            lat: myPos.lat,
            lng: myPos.lng,
            zoom: 14
        },

        markers: {
            m1: {
                lat: 25.0196772,
                lng: 121.4779051,
            }
        },

        layers: {
            baselayers: {
                googleRoadmap: {
                    name: 'Google Streets',
                    layerType: 'ROADMAP',
                    type: 'google'
                }
            }
        }
    });
}]);