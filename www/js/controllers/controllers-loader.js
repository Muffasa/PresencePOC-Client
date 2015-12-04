/* This is the module that loads all the other controller modules.
* any module must load the injected modules before it instanciate itself.
*/
angular.module('controllers-loader',['app-controller','view-controllers'])