import Ember from 'ember';
import startApp from '../helpers/start-app';
import { test, module } from 'qunit';

var application;

const SAVE_BUTTON = 'button.save';
const ADD_BUTTON = 'button.add';
const VALID_DISPLAY_NAME = 'x';
const INVALID_DISPLAY_NAME = '';

const FIRST_DISPLAY_NAME_ERROR_FIELD = '.display-name-parent-div:eq(0) span';
const FIRST_TOS_ERROR_FIELD = '.tos-parent-div:eq(0) span';
const FIRST_DISPLAY_NAME_INPUT = '.display-name-parent-div:eq(0) input';
const FIRST_TOS_INPUT = '.tos-parent-div:eq(0) input';

const SECOND_DISPLAY_NAME_ERROR_FIELD = '.display-name-parent-div:eq(1) span';
const SECOND_TOS_ERROR_FIELD = '.tos-parent-div:eq(1) span';
const SECOND_DISPLAY_NAME_INPUT = '.display-name-parent-div:eq(1) input';
const SECOND_TOS_INPUT = '.tos-parent-div:eq(1) input';

const THIRD_DISPLAY_NAME_ERROR_FIELD = '.display-name-parent-div:eq(2) span';
const THIRD_TOS_ERROR_FIELD = '.tos-parent-div:eq(2) span';
const THIRD_DISPLAY_NAME_INPUT = '.display-name-parent-div:eq(2) input';
const THIRD_TOS_INPUT = '.tos-parent-div:eq(2) input';

const FOURTH_DISPLAY_NAME_ERROR_FIELD = '.display-name-parent-div:eq(3) span';
const FOURTH_TOS_ERROR_FIELD = '.tos-parent-div:eq(3) span';
const FOURTH_DISPLAY_NAME_INPUT = '.display-name-parent-div:eq(3) input';
const FOURTH_TOS_INPUT = '.tos-parent-div:eq(3) input';

module('Acceptance: Other Array Form Validation', {
  setup: function() {
    application = startApp();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('adding and removing elements from the other array will keep validations in sync', function(assert) {
  visit('/other');
  andThen(function() {
    assert.equal(find(FIRST_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FIRST_TOS_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_TOS_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_TOS_ERROR_FIELD).hasClass('hidden'), true);
  });
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(find(FIRST_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_TOS_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_TOS_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_TOS_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(THIRD_DISPLAY_NAME_INPUT, VALID_DISPLAY_NAME);
  click(FIRST_TOS_INPUT);
  andThen(function() {
    assert.equal(find('.display-name-parent-div span').length, 3);
    assert.equal(currentURL(), '/other');
    assert.equal(find(FIRST_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FIRST_TOS_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_TOS_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_TOS_ERROR_FIELD).hasClass('hidden'), false);
  });
  click('.add');
  andThen(function() {
    assert.equal(find('.display-name-parent-div span').length, 4);
    assert.equal(find(FIRST_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FOURTH_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_TOS_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_TOS_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_TOS_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FOURTH_TOS_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(SECOND_DISPLAY_NAME_INPUT, VALID_DISPLAY_NAME);
  andThen(function() {
    assert.equal(find(FIRST_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FOURTH_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_TOS_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_TOS_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_TOS_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FOURTH_TOS_ERROR_FIELD).hasClass('hidden'), false);
  });
  click('.remove:eq(2)');
  andThen(function() {
    assert.equal(find('.display-name-parent-div span').length, 3);
    assert.equal(find(FIRST_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_TOS_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_TOS_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_TOS_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(SECOND_DISPLAY_NAME_INPUT, INVALID_DISPLAY_NAME);
  click(FIRST_TOS_INPUT);
  andThen(function() {
    assert.equal(find('.display-name-parent-div span').length, 3);
    assert.equal(find(FIRST_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_TOS_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_TOS_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_TOS_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(SECOND_DISPLAY_NAME_INPUT, VALID_DISPLAY_NAME);
  click(FIRST_TOS_INPUT);
  andThen(function() {
    assert.equal(find('.display-name-parent-div span').length, 3);
    assert.equal(find(FIRST_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_DISPLAY_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_TOS_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_TOS_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_TOS_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(FIRST_DISPLAY_NAME_INPUT, VALID_DISPLAY_NAME);
  fillIn(THIRD_DISPLAY_NAME_INPUT, VALID_DISPLAY_NAME);
  click(SECOND_TOS_INPUT);
  click(THIRD_TOS_INPUT);
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(currentURL(), '/success');
  });
});
