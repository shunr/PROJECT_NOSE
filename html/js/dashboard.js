N_CONTROLLERS.controller("ctrl_dashboard", function($scope, $firebaseAuth, $firebaseObject, $timeout) {
    $scope.authObj = $firebaseAuth();
    $scope.credentials = null;
    $scope.loaded = false;

    $scope.saveData = function() {
        $scope.credentials.$save().then(function() {
            $scope.success = true;
            $scope.error = null;
        }).catch(function(error) {
            $scope.error = {
                message: "There was an error saving your credentials."
            };
            $scope.success = false;
        });
    }

    $scope.$watch("authObj.$getAuth()", function(val) {
        if (val) {
            var ref = firebase.database().ref("users/" + val.uid + "/credentials")
            $scope.credentials = $firebaseObject(ref);
            $scope.credentials.$loaded(function() {
                $scope.loaded = true;
            });
        }
    });

    $scope.isCredentialsValid = function() {
        if ($scope.credentials.user.length >= 3 && $scope.credentials.pass.length >= 3) {
            return true;
        }
        return false;
    }

    $('.ui.dropdown').dropdown();
    $('.message .close').click(function() {
        $(this).closest('.message').fadeOut();
    });
    $('.corner').popup();
});