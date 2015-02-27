import Ember from 'ember';
import startApp from '../helpers/start-app';
import { test, module } from 'qunit';

var application;

const SAVE_BUTTON = 'button.save';
const NAME_ERROR_FIELD = '.name-parent-div span';
const ZIPCODE_ERROR_FIELD = '.zipcode-parent-div span';
const EMAIL_ERROR_FIELD = '.email-parent-div span';
const RANDO_ERROR_FIELD = '.rando-parent-div span';
const RADEO_ERROR_FIELD = '.radeo-parent-div span';
const THING_ERROR_FIELD = '.thing-parent-div span';
const TOS_ERROR_FIELD = '.tos-parent-div span';

const NAME_INPUT = '.name-parent-div input';
const ZIPCODE_INPUT = '.zipcode-parent-div input';
const EMAIL_INPUT = '.email-parent-div input';
const RANDO_INPUT = '.rando-parent-div input';
const RADEO_BUTTON_ONE = '.radio-button-one input';
const RADEO_BUTTON_TWO = '.radio-button-two input';
const THING_SELECTBOX = '.thing-parent-div select';
const TOS_CHECKBOX = '.tos-parent-div input';

const VALID_NAME = 'x';
const VALID_ZIPCODE = '52601';
const VALID_EMAIL = 'hi@hi.com';
const VALID_RANDO = '1';
const VALID_THING = 1;

module('Acceptance: Form Validation', {
    setup: function() {
        application = startApp();
    },
    teardown: function() {
        Ember.run(application, 'destroy');
    }
});

test('clicking save will transition to success when each field is valid', function(assert) {
    visit('/');
    fillIn(NAME_INPUT, VALID_NAME);
    fillIn(ZIPCODE_INPUT, VALID_ZIPCODE);
    fillIn(EMAIL_INPUT, VALID_EMAIL);
    fillIn(RANDO_INPUT, VALID_RANDO);
    fillIn(THING_SELECTBOX, VALID_THING);
    click(TOS_CHECKBOX);
    click(RADEO_BUTTON_ONE);
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/success');
    });
});

test('clicking save will not transition to success when only the last field is valid', function(assert) {
    visit('/');
    click(TOS_CHECKBOX);
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/');
    });
    fillIn(NAME_INPUT, VALID_NAME);
    fillIn(ZIPCODE_INPUT, VALID_ZIPCODE);
    fillIn(EMAIL_INPUT, VALID_EMAIL);
    fillIn(RANDO_INPUT, VALID_RANDO);
    fillIn(THING_SELECTBOX, VALID_THING);
    click(RADEO_BUTTON_ONE);
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/success');
    });
});

test('string based inputs with default validation will not accept empty string as valid', function(assert) {
    visit('/');
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
    });
    fillIn(NAME_INPUT, ' ');
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(NAME_INPUT, VALID_NAME);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
    });
});

test('clicking save will fire each validation', function(assert) {
    visit('/');
    andThen(function() {
        assert.equal(currentURL(), '/');
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(RANDO_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(THING_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/');
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(RANDO_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(THING_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
});

test('component will render with the correct text and css class', function(assert) {
    visit('/');
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/');
        assert.equal(find(NAME_ERROR_FIELD).hasClass('red'), true);
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('blue'), true);
        assert.equal(find(NAME_ERROR_FIELD).text(), 'invalid name');
        assert.equal(find(ZIPCODE_ERROR_FIELD).text(), 'invalid zipcode');
        assert.equal(find(EMAIL_ERROR_FIELD).text(), 'invalid email');
        assert.equal(find(RANDO_ERROR_FIELD).text(), 'invalid rando');
        assert.equal(find(RADEO_ERROR_FIELD).text(), 'invalid radeo');
        assert.equal(find(THING_ERROR_FIELD).text(), 'invalid thing');
        assert.equal(find(TOS_ERROR_FIELD).text(), 'invalid tos');
    });
});

test('when inputs are showing errors they turn hidden when field is correctly entered', function(assert) {
    visit('/');
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(RANDO_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(THING_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    fillIn(NAME_INPUT, VALID_NAME);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(RANDO_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(THING_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(ZIPCODE_INPUT, VALID_ZIPCODE);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(RANDO_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(THING_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(EMAIL_INPUT, VALID_EMAIL);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(RANDO_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(THING_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(RANDO_INPUT, VALID_RANDO);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(RANDO_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(THING_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
    click(RADEO_BUTTON_ONE);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(RANDO_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(THING_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(THING_SELECTBOX, VALID_THING);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(RANDO_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(THING_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
    click(TOS_CHECKBOX);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(RANDO_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(THING_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), true);
    });
});

test('inputs with default validation start working without submit firing', function(assert) {
    visit('/');
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
    });
    fillIn(NAME_INPUT, VALID_NAME);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
    });
    fillIn(NAME_INPUT, '');
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(NAME_INPUT, VALID_NAME);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
    });
});

test('inputs with regex validation start working without submit firing', function(assert) {
    visit('/');
    andThen(function() {
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
    });
    fillIn(ZIPCODE_INPUT, VALID_ZIPCODE);
    andThen(function() {
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
    });
    fillIn(ZIPCODE_INPUT, '');
    andThen(function() {
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(ZIPCODE_INPUT, '3001');
    andThen(function() {
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(ZIPCODE_INPUT, VALID_ZIPCODE);
    andThen(function() {
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
    });
});

test('inputs with regex validation will not work without submit when delay option set', function(assert) {
    visit('/');
    andThen(function() {
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
    });
    fillIn(EMAIL_INPUT, VALID_EMAIL);
    andThen(function() {
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
    });
    fillIn(EMAIL_INPUT, '');
    andThen(function() {
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(EMAIL_INPUT, VALID_EMAIL);
    andThen(function() {
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
    });
    fillIn(EMAIL_INPUT, 'hi');
    andThen(function() {
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(EMAIL_INPUT, VALID_EMAIL);
    andThen(function() {
        assert.equal(find(EMAIL_ERROR_FIELD).hasClass('hidden'), true);
    });
});

test('inputs with default validation will not trip validation when they are tabbed into', function(assert) {
    visit('/');
    andThen(function() {
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
    });
    triggerEvent(ZIPCODE_INPUT, 'dblclick');
    triggerEvent(ZIPCODE_INPUT, 'blur');
    andThen(function() {
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
    });
    fillIn(ZIPCODE_INPUT, '5003');
    triggerEvent(ZIPCODE_INPUT, 'blur');
    andThen(function() {
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(ZIPCODE_INPUT, '12345');
    triggerEvent(ZIPCODE_INPUT, 'blur');
    andThen(function() {
        assert.equal(find(ZIPCODE_ERROR_FIELD).hasClass('hidden'), true);
    });
});

test('inputs with function validation start working without submit firing', function(assert) {
    visit('/');
    andThen(function() {
        assert.equal(find(RANDO_ERROR_FIELD).hasClass('hidden'), true);
    });
    fillIn(RANDO_INPUT, VALID_RANDO);
    andThen(function() {
        assert.equal(find(RANDO_ERROR_FIELD).hasClass('hidden'), true);
    });
    fillIn(RANDO_INPUT, '7');
    andThen(function() {
        assert.equal(find(RANDO_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(RANDO_INPUT, VALID_RANDO);
    andThen(function() {
        assert.equal(find(RANDO_ERROR_FIELD).hasClass('hidden'), true);
    });
});

test('number based inputs with default validation will validate correctly', function(assert) {
    visit('/');
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), false);
    });
    click(RADEO_BUTTON_ONE);
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), true);
    });
    click(RADEO_BUTTON_TWO);
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), true);
    });
});

test('model bound selectbox with default validation will validate correctly', function(assert) {
    visit('/');
    andThen(function() {
        assert.equal(find(THING_ERROR_FIELD).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(find(THING_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(THING_SELECTBOX, VALID_THING);
    andThen(function() {
        assert.equal(find(THING_ERROR_FIELD).hasClass('hidden'), true);
    });
    fillIn(THING_SELECTBOX, '');
    andThen(function() {
        assert.equal(find(THING_ERROR_FIELD).hasClass('hidden'), false);
    });
});
