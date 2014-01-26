'use strict';

angular.module('inputFilters', [])
	.filter('DoubleFormat', function($filter) {
  return function(newValue, oldValue) {
  	newValue = String(newValue);
  	oldValue = String(oldValue);
		var isOneDot = (newValue.match(/\./g) || []).length === 1;
  	var isFloat = newValue.match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/);

  	if (newValue === '') {
  		return '';
  	}

  	if (isOneDot || isFloat) {
  		return newValue;
  	} else {
  		return oldValue;
  	}
  };
});
