N_CONTROLLERS.controller("ctrl_dashboard", function($scope, $firebaseAuth, $firebaseObject, $timeout, md5) {
    $scope.authObj = $firebaseAuth();
    $scope.data = {}
    $scope.credentials = null;
    $scope.loaded = false;
    var timeout;

    function credentialError(error) {
        $scope.success = false;
        $scope.error = {
            message: "There was an error saving your credentials: " + error.message
        };
    }

    $scope.saveData = function() {
        if ($scope.data.pass) {
            $scope.credentials.pass = md5.createHash($scope.data.pass);
            $scope.authObj.$updatePassword($scope.data.pass).then(function() {
                $scope.credentials.$save().then(function() {
                    $scope.error = null;
                    $scope.success = true;
                    $timeout.cancel(timeout);
                    $scope.data.pass = "";
                    timeout = $timeout(function() {
                        $scope.success = false;
                    }, 3600)
                }).catch(credentialError);
            }).catch(credentialError);
        }
    }
    
    $scope.signOut = function() {
        $scope.data.enabled.$destroy();
        $scope.credentials.$destroy();
        $scope.authObj.$signOut();
    }

    $scope.$watch("authObj.$getAuth()", function(val) {
        if (val) {
            var enabled = firebase.database().ref("users/" + val.uid + "/enabled");
            var ref = firebase.database().ref("users/" + val.uid + "/credentials");
            $scope.data.enabled = $firebaseObject(enabled);
            $scope.credentials = $firebaseObject(ref);
            $scope.credentials.$loaded(function() {
                $scope.loaded = true;
            });
        }
    });

    $('.ui.dropdown').dropdown();
    $('.message .close').click(function() {
        $(this).closest('.message').fadeOut();
    });
    $('.corner').popup();
});