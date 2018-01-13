import { run } from '@ember/runloop';
import startApp from '../helpers/start-app';
import { test, module } from 'qunit';

var application;

const NAME_MIN_ERROR = '.name-div span:eq(0)';
const NAME_MAX_ERROR = '.name-div span:eq(1)';
const NAME_OTHER_ERROR = '.name-div span:eq(2)';
const NAME_INPUT = '.name-div input';
const SAVE_BUTTON = 'button.save';

module('Acceptance: Reuse Functions Test', {
  beforeEach() {
    application = startApp();
  },
  afterEach() {
    run(application, 'destroy');
  }
});

test('name must validate min, max and other before the form is legit', function(assert) {
    visit('/dry');
    andThen(function() {
        assert.equal(find(NAME_MIN_ERROR).hasClass('hidden'), true);
        assert.equal(find(NAME_MAX_ERROR).hasClass('hidden'), true);
        assert.equal(find(NAME_OTHER_ERROR).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/dry');
        assert.equal(find(NAME_MIN_ERROR).hasClass('hidden'), false);
        assert.equal(find(NAME_MAX_ERROR).hasClass('hidden'), false);
        assert.equal(find(NAME_OTHER_ERROR).hasClass('hidden'), false);
    });
    fillIn(NAME_INPUT, 'a');
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/dry');
        assert.equal(find(NAME_MIN_ERROR).hasClass('hidden'), false);
        assert.equal(find(NAME_MAX_ERROR).hasClass('hidden'), true);
        assert.equal(find(NAME_OTHER_ERROR).hasClass('hidden'), false);
    });
    fillIn(NAME_INPUT, 'abcd');
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/dry');
        assert.equal(find(NAME_MIN_ERROR).hasClass('hidden'), true);
        assert.equal(find(NAME_MAX_ERROR).hasClass('hidden'), true);
        assert.equal(find(NAME_OTHER_ERROR).hasClass('hidden'), false);
    });
    fillIn(NAME_INPUT, 'abcde');
    andThen(function() {
        assert.equal(find(NAME_MIN_ERROR).hasClass('hidden'), true);
        assert.equal(find(NAME_MAX_ERROR).hasClass('hidden'), true);
        assert.equal(find(NAME_OTHER_ERROR).hasClass('hidden'), true);
    });
    click(SAVE_BUTTON);
    andThen(function() {
        assert.equal(currentURL(), '/success');
    });
});
