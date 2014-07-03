'use strict';

describe('Directive: anglePicker', function () {

  // load the directive's module
  beforeEach(module('sherNegarApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<angle-picker></angle-picker>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the anglePicker directive');
  }));
});
