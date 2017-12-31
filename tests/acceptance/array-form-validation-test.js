import { run } from '@ember/runloop';
import startApp from '../helpers/start-app';
import { test, module } from 'qunit';

var application;

const SAVE_BUTTON = 'button.save';
const ADD_BUTTON = 'button.add';
const VALID_NAME = 'x';
const VALID_RANDO = '2';
const INVALID_NAME = '';
const INVALID_RANDO = '1';

const FIRST_NAME_ERROR_FIELD = '.name-parent-div:eq(0) span';
const FIRST_RANDO_ERROR_FIELD = '.rando-parent-div:eq(0) span';
const FIRST_NAME_INPUT = '.name-parent-div:eq(0) input';
const FIRST_RANDO_INPUT = '.rando-parent-div:eq(0) input';

const SECOND_NAME_ERROR_FIELD = '.name-parent-div:eq(1) span';
const SECOND_RANDO_ERROR_FIELD = '.rando-parent-div:eq(1) span';
const SECOND_NAME_INPUT = '.name-parent-div:eq(1) input';
const SECOND_RANDO_INPUT = '.rando-parent-div:eq(1) input';

const THIRD_NAME_ERROR_FIELD = '.name-parent-div:eq(2) span';
const THIRD_RANDO_ERROR_FIELD = '.rando-parent-div:eq(2) span';
const THIRD_NAME_INPUT = '.name-parent-div:eq(2) input';
const THIRD_RANDO_INPUT = '.rando-parent-div:eq(2) input';

const FOURTH_NAME_ERROR_FIELD = '.name-parent-div:eq(3) span';
const FOURTH_RANDO_ERROR_FIELD = '.rando-parent-div:eq(3) span';
const FOURTH_NAME_INPUT = '.name-parent-div:eq(3) input';
const FOURTH_RANDO_INPUT = '.rando-parent-div:eq(3) input';

module('Acceptance: Array Form Validation', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {
    run(application, 'destroy');
  }
});

test('clicking save will transition to success when each field is valid', function(assert) {
  visit('/multi');
  fillIn(FIRST_NAME_INPUT, VALID_NAME);
  fillIn(SECOND_NAME_INPUT, VALID_NAME);
  fillIn(THIRD_NAME_INPUT, VALID_NAME);
  fillIn(FIRST_RANDO_INPUT, VALID_RANDO);
  fillIn(SECOND_RANDO_INPUT, VALID_RANDO);
  fillIn(THIRD_RANDO_INPUT, VALID_RANDO);
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(currentURL(), '/success');
  });
});

test('clicking save will not transition to success when only the last field is valid', function(assert) {
  visit('/multi');
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(currentURL(), '/multi');
  });
  fillIn(THIRD_RANDO_INPUT, VALID_RANDO);
  andThen(function() {
    assert.equal(currentURL(), '/multi');
  });
  fillIn(THIRD_NAME_INPUT, VALID_NAME);
  andThen(function() {
    assert.equal(currentURL(), '/multi');
  });
  fillIn(FIRST_NAME_INPUT, VALID_NAME);
  fillIn(SECOND_NAME_INPUT, VALID_NAME);
  fillIn(FIRST_RANDO_INPUT, VALID_RANDO);
  fillIn(SECOND_RANDO_INPUT, VALID_RANDO);
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(currentURL(), '/success');
  });
});

test('string based inputs with default validation will not accept empty string as valid', function(assert) {
  visit('/multi');
  andThen(function() {
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(FIRST_NAME_INPUT, ' ');
  andThen(function() {
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(FIRST_NAME_INPUT, VALID_NAME);
  fillIn(SECOND_NAME_INPUT, ' ');
  andThen(function() {
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(FIRST_NAME_INPUT, VALID_NAME);
  fillIn(SECOND_NAME_INPUT, VALID_NAME);
  fillIn(THIRD_NAME_INPUT, ' ');
  andThen(function() {
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(THIRD_NAME_INPUT, VALID_NAME);
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FIRST_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_RANDO_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(FIRST_RANDO_INPUT, VALID_RANDO);
  fillIn(SECOND_RANDO_INPUT, VALID_RANDO);
  fillIn(THIRD_RANDO_INPUT, VALID_RANDO);
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(currentURL(), '/success');
  });
});

test('clicking save will fire each validation', function(assert) {
  visit('/multi');
  andThen(function() {
    assert.equal(currentURL(), '/multi');
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FIRST_RANDO_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_RANDO_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_RANDO_ERROR_FIELD).hasClass('hidden'), true);
  });
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(currentURL(), '/multi');
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_RANDO_ERROR_FIELD).hasClass('hidden'), false);
  });
});

test('component will render with the correct text and css class', function(assert) {
  visit('/multi');
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(currentURL(), '/multi');
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('red'), true);
    assert.equal(find(FIRST_NAME_ERROR_FIELD).text(), 'invalid name');
    assert.equal(find(FIRST_RANDO_ERROR_FIELD).text(), 'invalid rando');

    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('red'), true);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).text(), 'invalid name');
    assert.equal(find(SECOND_RANDO_ERROR_FIELD).text(), 'invalid rando');

    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('red'), true);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).text(), 'invalid name');
    assert.equal(find(THIRD_RANDO_ERROR_FIELD).text(), 'invalid rando');
  });
});

test('adding and removing elements from the array will keep validations in sync', function(assert) {
  visit('/multi');
  andThen(function() {
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FIRST_RANDO_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_RANDO_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_RANDO_ERROR_FIELD).hasClass('hidden'), true);
  });
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_RANDO_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(THIRD_NAME_INPUT, VALID_NAME);
  fillIn(FIRST_RANDO_INPUT, VALID_RANDO);
  andThen(function() {
    assert.equal(find('.name-parent-div span').length, 3);
    assert.equal(currentURL(), '/multi');
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FIRST_RANDO_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_RANDO_ERROR_FIELD).hasClass('hidden'), false);
  });
  click('.add');
  andThen(function() {
    assert.equal(find('.name-parent-div span').length, 4);
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FOURTH_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_RANDO_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FOURTH_RANDO_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(SECOND_NAME_INPUT, VALID_NAME);
  andThen(function() {
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FOURTH_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_RANDO_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FOURTH_RANDO_ERROR_FIELD).hasClass('hidden'), false);
  });
  click('.remove:eq(2)');
  andThen(function() {
    assert.equal(find('.name-parent-div span').length, 3);
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_RANDO_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_RANDO_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(SECOND_NAME_INPUT, INVALID_NAME);
  fillIn(FIRST_RANDO_INPUT, INVALID_RANDO);
  andThen(function() {
    assert.equal(find('.name-parent-div span').length, 3);
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_RANDO_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(SECOND_NAME_INPUT, VALID_NAME);
  fillIn(FIRST_RANDO_INPUT, VALID_RANDO);
  andThen(function() {
    assert.equal(find('.name-parent-div span').length, 3);
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_RANDO_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_RANDO_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(FIRST_NAME_INPUT, VALID_NAME);
  fillIn(THIRD_NAME_INPUT, VALID_NAME);
  fillIn(SECOND_RANDO_INPUT, VALID_RANDO);
  fillIn(THIRD_RANDO_INPUT, VALID_RANDO);
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(currentURL(), '/success');
  });
});

test('removing invalid models from array will allow success page', function(assert) {
  visit('/multi');
  andThen(function() {
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FIRST_RANDO_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_RANDO_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(THIRD_RANDO_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(FIRST_NAME_INPUT, VALID_NAME);
  fillIn(FIRST_RANDO_INPUT, VALID_RANDO);
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(find('.name-parent-div span').length, 3);
    assert.equal(currentURL(), '/multi');
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_NAME_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(FIRST_RANDO_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(SECOND_RANDO_ERROR_FIELD).hasClass('hidden'), false);
    assert.equal(find(THIRD_RANDO_ERROR_FIELD).hasClass('hidden'), false);
  });
  click('.remove:eq(2)');
  click('.remove:eq(1)');
  andThen(function() {
    assert.equal(find('.name-parent-div span').length, 1);
    assert.equal(find(FIRST_NAME_ERROR_FIELD).hasClass('hidden'), true);
    assert.equal(find(FIRST_RANDO_ERROR_FIELD).hasClass('hidden'), true);
  });
  click(SAVE_BUTTON);
  andThen(function() {
    assert.equal(currentURL(), '/success');
  });
});
