N_CONTROLLERS.controller("ctrl_dashboard", function($scope, $firebaseAuth, $firebaseObject, $timeout, md5) {
    $scope.authObj = $firebaseAuth();
    $scope.defaultMD5 = BLANK_MD5_HASHED;
    $scope.data = {}
    $scope.credentials = null;
    $scope.loaded = false;

    $scope.saveData = function() {
        $scope.credentials.pass = md5.createHash($scope.data.pass);
        $scope.credentials.$save().then(function() {
            $scope.error = null;
            $scope.success = true;
        }).catch(function(error) {
            $scope.success = false;
            $scope.error = {
                message: "There was an error saving your credentials."
            };
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
        if ($scope.data.pass && $scope.data.pass.length >= 3) {
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