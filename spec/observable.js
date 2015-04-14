/*global beforeEach, describe, expect, it, SAMURAIPRINCIPLE */
describe('observable', function () {
  'use strict';
  it('should use eventDispatcher as a mixin', function () {
    var base = {}, result;

    result = SAMURAIPRINCIPLE.observable(base);

    expect(result).toBe(base);
  });
  it('should use dispatchEvent to invoke registered listener', function () {
    var underTest = SAMURAIPRINCIPLE.observable({}),
      listener = jasmine.createSpy();
    underTest.on('balanceChanged', listener);
    underTest.trigger('balanceChanged', 'argument');
    expect(listener).toHaveBeenCalledWith('argument');
  });
  it('should be able to add multiple listeners', function () {
    var underTest = SAMURAIPRINCIPLE.observable({}),
      firstListener = jasmine.createSpy(),
      secondListener = jasmine.createSpy();
    underTest.on('balanceChanged', firstListener);
    underTest.on('balanceChanged', secondListener);

    underTest.trigger('balanceChanged', 'argument');

    expect(firstListener).toHaveBeenCalledWith('argument');
    expect(secondListener).toHaveBeenCalledWith('argument');
  });
  it('should be able to add listener for an event type', function () {
    var underTest = SAMURAIPRINCIPLE.observable({}),
      listenerOnTypeA = jasmine.createSpy(),
      listenerOnTypeB = jasmine.createSpy();
    underTest.on('TypeA', listenerOnTypeA);
    underTest.on('TypeB', listenerOnTypeB);

    underTest.trigger('TypeA', 'argument');

    expect(listenerOnTypeA).toHaveBeenCalledWith('argument');
    expect(listenerOnTypeB).not.toHaveBeenCalled();
  });
  it('should be able to specify the order in which listeners are invoked, by setting priority', function () {
    var underTest = SAMURAIPRINCIPLE.observable({}),
      result = ':',
      lowPriorityListener = function () { result += 'first:'; },
      highPriorityListener = function () { result += 'second:'; };
    underTest.on('EventType', lowPriorityListener, 1);
    underTest.on('EventType', highPriorityListener, 2);

    underTest.trigger('EventType', 'argument');

    expect(result).toBe(':second:first:');
  });
  it('should be able to cancel event propagation by returning false from event listener', function () {
    var underTest = SAMURAIPRINCIPLE.observable({}),
      firstListener = jasmine.createSpy().and.returnValue(false),
      secondListener = jasmine.createSpy();
    underTest.on('EventType', firstListener);
    underTest.on('EventType', secondListener);
    underTest.trigger('EventType', 'argument');

    expect(firstListener).toHaveBeenCalledWith('argument');

    expect(secondListener).not.toHaveBeenCalled();
  });
});
