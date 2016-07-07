import Ember from 'ember';
import startApp from '../helpers/start-app';
import { test, module } from 'qunit';

var application;

const RADEO_BTN_ONE_MODEL_ONE = '.radio-button-one input:eq(0)';
const RADEO_BTN_TWO_MODEL_ONE = '.radio-button-two input:eq(0)';
const RADEO_BTN_ONE_MODEL_TWO = '.radio-button-one input:eq(1)';
const RADEO_BTN_TWO_MODEL_TWO = '.radio-button-two input:eq(1)';

const RADEO_ERROR_FIELD_MODEL_ONE = '.radeo-parent-div span:eq(0)';
const RADEO_ERROR_FIELD_MODEL_TWO = '.radeo-parent-div span:eq(1)';

const TOS_CHECKBOX_MODEL_ONE = '.tos-parent-div input:eq(0)';
const TOS_CHECKBOX_MODEL_TWO = '.tos-parent-div input:eq(1)';

const TOS_ERROR_FIELD_MODEL_ONE = '.tos-parent-div span:eq(0)';
const TOS_ERROR_FIELD_MODEL_TWO = '.tos-parent-div span:eq(1)';

const SAVE_BUTTON = 'button.save';

module('Acceptance: Complex Array Form Test', {
    setup: function() {
        application = startApp();
    },
    teardown: function() {
        Ember.run(application, 'destroy');
    }
});

test('form is valid when checkbox two is selected and tos not checked', function(assert) {
    visit('/manycomplex');
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/manycomplex');
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), false);
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), false);
    });
    click(RADEO_BTN_TWO_MODEL_ONE);
    click(RADEO_BTN_TWO_MODEL_TWO);
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/success');
    });
});

test('form is valid when checkbox one is selected and tos checked', function(assert) {
    visit('/manycomplex');
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/manycomplex');
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), false);
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), false);
    });
    click(RADEO_BTN_ONE_MODEL_ONE);
    click(RADEO_BTN_ONE_MODEL_TWO);
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), false);
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), false);
    });
    click(TOS_CHECKBOX_MODEL_ONE);
    click(TOS_CHECKBOX_MODEL_TWO);
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), true);
    });
    click(TOS_CHECKBOX_MODEL_ONE);
    click(TOS_CHECKBOX_MODEL_TWO);
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/manycomplex');
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), false);
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), false);
    });
    click(TOS_CHECKBOX_MODEL_ONE);
    click(TOS_CHECKBOX_MODEL_TWO);
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/success');
    });
});

test('multiple models can be validated independently', function(assert) {
    visit('/manycomplex');
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/manycomplex');
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), false);
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), false);
    });
    click(RADEO_BTN_ONE_MODEL_ONE);
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), false);
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), false);
    });
    click(TOS_CHECKBOX_MODEL_ONE);
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), false);
    });
    click(RADEO_BTN_ONE_MODEL_TWO);
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/manycomplex');
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), false);
    });
    click(TOS_CHECKBOX_MODEL_TWO);
    andThen(function() {
        assert.equal(currentURL(), '/manycomplex');
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_ONE).hasClass('hidden'), true);
        assert.equal(find(RADEO_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD_MODEL_TWO).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/success');
    });
});
