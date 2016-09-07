var BLANK_MD5 = "d41d8cd98f00b204e9800998ecf8427e";
var BLANK_MD5_HASHED = "74be16979710d4c4e7c6647856088456";

var utils = (function() {
    var module = {}
    module.randomString = function(length) {
        return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
    }
    module.ntlm = function(str) {
        var utf = str.split('').join('\x00') + '\x00';
        return md4(utf);
    }
    return module;
}());