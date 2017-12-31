import { run } from '@ember/runloop';
import startApp from '../helpers/start-app';
import { test, module } from 'qunit';

var application;

const RADEO_BUTTON_ONE = '.radio-button-one input';
const RADEO_BUTTON_TWO = '.radio-button-two input';
const RADEO_ERROR_FIELD = '.radeo-parent-div span';
const TOS_CHECKBOX = '.tos-parent-div input';
const TOS_ERROR_FIELD = '.tos-parent-div span';
const SAVE_BUTTON = 'button.save';

module('Acceptance: Complex Form Test', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {
    run(application, 'destroy');
  }
});

test('form is valid when checkbox two is selected and tos not checked', function(assert) {
    visit('/complex');
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/complex');
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
    click(RADEO_BUTTON_TWO);
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/success');
    });
});

test('form is valid when checkbox one is selected and tos checked', function(assert) {
    visit('/complex');
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/complex');
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
    click(RADEO_BUTTON_ONE);
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
    click(TOS_CHECKBOX);
    andThen(function() {
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), true);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), true);
    });
    click(TOS_CHECKBOX);
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/complex');
        assert.equal(find(RADEO_ERROR_FIELD).hasClass('hidden'), false);
        assert.equal(find(TOS_ERROR_FIELD).hasClass('hidden'), false);
    });
    click(TOS_CHECKBOX);
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/success');
    });
});
