import Ember from 'ember';
import startApp from '../helpers/start-app';
import { test, module } from 'qunit';

var application;

const SAVE_BUTTON = 'button.save';
const NAME_ERROR_FIELD = '.name-parent-div span';
const TOS_ERROR_FIELD = '.tos-parent-div span';

const NAME_INPUT = '.name-parent-div input';
const TOS_CHECKBOX = '.tos-parent-div input';

const VALID_NAME = 'x';

module('Acceptance: RSVP Hash Form Validation', {
    setup: function() {
        application = startApp();
    },
    teardown: function() {
        Ember.run(application, 'destroy');
    }
});

test('clicking save will transition to success when each field is valid', function(assert) {
    visit('/hash');
    fillIn(NAME_INPUT, VALID_NAME);
    click(TOS_CHECKBOX);
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/success');
    });
});

test('rsvp hash with 2 bound models will validate correctly', function(assert) {
    visit('/hash');
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(NAME_INPUT, VALID_NAME);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(NAME_INPUT, '');
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
    fillIn(NAME_INPUT, VALID_NAME);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
    click(TOS_CHECKBOX);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), true);
    });
    click(TOS_CHECKBOX);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
    click(TOS_CHECKBOX);
    andThen(function() {
        assert.equal(find(NAME_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), true);
    });
});
