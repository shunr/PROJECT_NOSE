N_CONTROLLERS.controller("ctrl_login", function($scope, $firebaseAuth, $firebaseObject, $state) {
    $scope.authObj = $firebaseAuth();
    $scope.data = {};
    $scope.error = null;
    $scope.success = null;
    
    function msg_error(errorObj) {
        $scope.success = null;
        $scope.error = errorObj;
    }
    
    function msg_success(successObj) {
        $scope.error = null;
        $scope.success = successObj;
    }
    
    $scope.login = function() {
        $scope.authObj.$signInWithEmailAndPassword($scope.data.user, $scope.data.password).then(function(firebaseUser) {
            //console.log("Signed in as:", firebaseUser.uid);
        }).catch(msg_error);
    }
    
    $scope.register = function() {
        $scope.authObj.$createUserWithEmailAndPassword($scope.data.user, $scope.data.password).then(function(auth) {
            firebase.database().ref('users/' + auth.uid).set({
                credentials: {
                    user: auth.email,
                    pass: utils.ntlm($scope.data.password),
                },
                enabled: true
            });
        }).catch(msg_error);
    }
    
    $scope.isLoginValid = function() {
        if ($scope.data.user && $scope.data.password) {
            return true;
        }
        return false;
    }
    
    $scope.isRegistrationValid = function() {
        if ($scope.data.user && $scope.data.password && $scope.data.confirm) {
            if ($scope.data.password == $scope.data.confirm) {
                return true;
            }
        }
        return false;
    }
    if ($scope.authObj.$getAuth()) {
        $state.go("dashboard");
    }

    $scope.forgotModal = function() {
        $('.ui.modal').modal('show');
    }
    
    $scope.forgotPassword = function() {
        if ($scope.data.resetEmail) {
            $scope.authObj.$sendPasswordResetEmail($scope.data.resetEmail).then(function() {
                msg_success({ 
                    message: "Password reset sent to " + $scope.data.resetEmail
                });
                $scope.data.resetEmail = null;
            }).catch(function(error){
                msg_error({ 
                    message: "Could not reset password: " + error.message
                });
            });
        }
    }
});