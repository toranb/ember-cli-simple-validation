import Ember from 'ember';
import startApp from '../helpers/start-app';

var application;

const SAVE_BUTTON = 'button.save';
const NAME_ERROR_FIELD = '.name-parent-div span';
const ZIPCODE_ERROR_FIELD = '.zipcode-parent-div span';
const EMAIL_ERROR_FIELD = '.email-parent-div span';

const NAME_INPUT = '.name-parent-div input';
const ZIPCODE_INPUT = '.zipcode-parent-div input';
const EMAIL_INPUT = '.email-parent-div input';

const VALID_NAME = 'x';
const VALID_ZIPCODE = '52601';
const VALID_EMAIL = 'hi@hi.com';

module('Acceptance: Form Validation', {
  setup: function() {
    application = startApp();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('clicking save will transition to success when each field is valid', function() {
  visit('/');
  fillIn(NAME_INPUT, VALID_NAME);
  fillIn(ZIPCODE_INPUT, VALID_ZIPCODE);
  fillIn(EMAIL_INPUT, VALID_EMAIL);
  click(SAVE_BUTTON);
  andThen(function() {
    equal(currentURL(), '/success');
  });
});

test('clicking save will not transition to success when only the last field is valid', function() {
  visit('/');
  fillIn(EMAIL_INPUT, VALID_EMAIL);
  click(SAVE_BUTTON);
  andThen(function() {
    equal(currentURL(), '/');
  });
  fillIn(NAME_INPUT, VALID_NAME);
  fillIn(ZIPCODE_INPUT, VALID_ZIPCODE);
  click(SAVE_BUTTON);
  andThen(function() {
    equal(currentURL(), '/success');
  });
});

test('inputs with default validation will not accept empty string as valid', function() {
  visit('/');
  fillIn(NAME_INPUT, ' ');
  fillIn(ZIPCODE_INPUT, VALID_ZIPCODE);
  fillIn(EMAIL_INPUT, VALID_EMAIL);
  click(SAVE_BUTTON);
  andThen(function() {
    equal(currentURL(), '/');
    equal(find(NAME_ERROR_FIELD).hasClass('hidden'), false);
    equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
    equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
  });
});

test('clicking save will fire each validation', function() {
  visit('/');
  andThen(function() {
    equal(currentURL(), '/');
    equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
    equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
    equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
  });
  click(SAVE_BUTTON);
  andThen(function() {
    equal(currentURL(), '/');
    equal(find(NAME_ERROR_FIELD).hasClass('hidden'), false);
    equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), false);
    equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), false);
  });
});

test('component will render with the correct text and css class', function() {
  visit('/');
  click(SAVE_BUTTON);
  andThen(function() {
    equal(currentURL(), '/');
    equal(find(NAME_ERROR_FIELD).hasClass('red'), true);
    equal(find(EMAIL_ERROR_FIELD).hasClass('blue'), true);
    equal(find(NAME_ERROR_FIELD).text(), 'invalid name');
    equal(find(ZIPCODE_ERROR_FIELD).text(), 'invalid zipcode');
    equal(find(EMAIL_ERROR_FIELD).text(), 'invalid email');
  });
});

test('when inputs are showing errors they turn hidden when field is correctly entered', function() {
  visit('/');
  andThen(function() {
    equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
    equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
    equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
  });
  click(SAVE_BUTTON);
  fillIn(NAME_INPUT, VALID_NAME);
  andThen(function() {
    equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
    equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), false);
    equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(ZIPCODE_INPUT, VALID_ZIPCODE);
  andThen(function() {
    equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
    equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
    equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(EMAIL_INPUT, VALID_EMAIL);
  andThen(function() {
    equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
    equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
    equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
  });
});

test('inputs with default validation start working without submit firing', function() {
  visit('/');
  andThen(function() {
    equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(NAME_INPUT, VALID_NAME);
  andThen(function() {
    equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(NAME_INPUT, '');
  andThen(function() {
    equal(find(NAME_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(NAME_INPUT, VALID_NAME);
  andThen(function() {
    equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
  });
});

test('inputs with regex validation start working without submit firing', function() {
  visit('/');
  andThen(function() {
    equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(ZIPCODE_INPUT, VALID_ZIPCODE);
  andThen(function() {
    equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(ZIPCODE_INPUT, '');
  andThen(function() {
    equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(ZIPCODE_INPUT, VALID_ZIPCODE);
  andThen(function() {
    equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
  });
});

test('inputs with regex validation will not work without submit when delay option set', function() {
  visit('/');
  andThen(function() {
    equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(EMAIL_INPUT, VALID_EMAIL);
  andThen(function() {
    equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(EMAIL_INPUT, '');
  andThen(function() {
    equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
  });
  click(SAVE_BUTTON);
  andThen(function() {
    equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(EMAIL_INPUT, VALID_EMAIL);
  andThen(function() {
    equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(EMAIL_INPUT, 'hi');
  andThen(function() {
    equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(EMAIL_INPUT, VALID_EMAIL);
  andThen(function() {
    equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
  });
});

test('inputs with default validation will not trip validation when they are tabbed into', function() {
  visit('/');
  andThen(function() {
    equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
  });
  triggerEvent(ZIPCODE_INPUT, 'dblclick');
  triggerEvent(ZIPCODE_INPUT, 'blur');
  andThen(function() {
    equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
  });
  fillIn(ZIPCODE_INPUT, '5003');
  triggerEvent(ZIPCODE_INPUT, 'blur');
  andThen(function() {
    equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), false);
  });
  fillIn(ZIPCODE_INPUT, '12345');
  triggerEvent(ZIPCODE_INPUT, 'blur');
  andThen(function() {
    equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
  });
});
