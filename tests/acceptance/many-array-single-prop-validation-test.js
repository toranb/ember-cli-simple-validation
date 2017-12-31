import { run } from '@ember/runloop';
import startApp from '../helpers/start-app';
import { test, module } from 'qunit';

var application;

const SAVE_BUTTON = 'button.save';
const VALID_NAME = '123';
const VALID_NAME_AND_LEN = '1234';

const FIRST_LEN_ERROR_FIELD = '.name-parent-div:eq(0) span.len';
const FIRST_BASIC_ERROR_FIELD = '.name-parent-div:eq(0) span.basic';
const FIRST_NAME_INPUT = '.name-parent-div:eq(0) input';

const SECOND_LEN_ERROR_FIELD = '.name-parent-div:eq(1) span.len';
const SECOND_BASIC_ERROR_FIELD = '.name-parent-div:eq(1) span.basic';
const SECOND_NAME_INPUT = '.name-parent-div:eq(1) input';

module('Acceptance: Many Array Single Prop Validation', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {
    run(application, 'destroy');
  }
});

test('validateEach will pull named validators when supplied', function(assert) {
  visit('/many');
  andThen(function() {
    assert.equal(find(FIRST_LEN_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_LEN_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FIRST_BASIC_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_BASIC_ERROR_FIELD).hasClass('hidden'), true);
  });
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(find(FIRST_LEN_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_LEN_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_BASIC_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_BASIC_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(SECOND_NAME_INPUT, VALID_NAME);
  andThen(function() {
    assert.equal(find(FIRST_LEN_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_LEN_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_BASIC_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_BASIC_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(FIRST_NAME_INPUT, VALID_NAME);
  andThen(function() {
    assert.equal(find(FIRST_LEN_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_LEN_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_BASIC_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_BASIC_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(SECOND_NAME_INPUT, VALID_NAME_AND_LEN);
  andThen(function() {
    assert.equal(find(FIRST_LEN_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_LEN_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FIRST_BASIC_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_BASIC_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(FIRST_NAME_INPUT, VALID_NAME_AND_LEN);
  andThen(function() {
    assert.equal(find(FIRST_LEN_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_LEN_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FIRST_BASIC_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_BASIC_ERROR_FIELD).hasClass('hidden'), true);
  });
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(currentURL(), '/success');
  });
});
