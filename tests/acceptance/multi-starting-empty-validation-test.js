import { run } from '@ember/runloop';
import startApp from '../helpers/start-app';
import { test, module } from 'qunit';

var application;

const ADD_BUTTON = 'button.add';
const SAVE_BUTTON = 'button.save';
const REMOVE_LAST_BUTTON = 'button.remove:eq(3)';

const FIRST_NAME_ERROR_FIELD = '.name-parent-div:eq(0) span';
const FIRST_NAME_INPUT = '.name-parent-div:eq(0) input';

const SECOND_NAME_ERROR_FIELD = '.name-parent-div:eq(1) span';
const SECOND_NAME_INPUT = '.name-parent-div:eq(1) input';

const THIRD_NAME_ERROR_FIELD = '.name-parent-div:eq(2) span';
const THIRD_NAME_INPUT = '.name-parent-div:eq(2) input';

const FOURTH_NAME_ERROR_FIELD = '.name-parent-div:eq(3) span';
const FOURTH_NAME_INPUT = '.name-parent-div:eq(3) input';

module('Acceptance: Multi Starting Empty Validation', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {
    run(application, 'destroy');
  }
});

test('unique name validation will fire for newly added models and when a model is removed', function(assert) {
  visit('/multi-starting-empty');
  click(ADD_BUTTON);
  click(ADD_BUTTON);
  fillIn(FIRST_NAME_INPUT, 'toran');
  fillIn(SECOND_NAME_INPUT, 'brandon');
  andThen(function() {
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), true);
  });
  click(ADD_BUTTON);
  andThen(function() {
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(THIRD_NAME_INPUT, 'toran');
  andThen(function() {
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(FIRST_NAME_INPUT, 'toranz');
  andThen(function() {
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), true);
  });
  click(ADD_BUTTON);
  fillIn(FOURTH_NAME_INPUT, 'brandon');
  andThen(function() {
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FOURTH_NAME_ERROR_FIELD).hasClass('hidden'), false);
  });
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(currentURL(), '/multi-starting-empty');
  });
  click(REMOVE_LAST_BUTTON);
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(currentURL(), '/success');
  });
});
