import Controller from '@ember/controller';
import { test, module } from "qunit";
import { attr, Model } from "ember-cli-simple-store/model";
import { ValidationMixin, validate } from "ember-cli-simple-validation/mixins/validate";

var Person = Model.extend({
    name: attr(),
    email: attr()
});

var controller, model = Person.create({name: 'x', email: 'hi@hi.com'});

var FakeController = Controller.extend(ValidationMixin, {
    nameValidation: validate("model.name"),
    emailValidation: validate("model.email", /\S+@\S+\.\S+/),
    model: model
});

module('Unit: Validation Mixin', {
  beforeEach() {
    controller = new FakeController();
  },
  afterEach() {
    controller = null;
  }
});

test('validation will fire when computed validation value is update', function(assert) {
    assert.equal(controller.get('nameValidation'), true);
    model.set('name', '');
    assert.equal(controller.get('nameValidation'), false);
    model.set('name', 'x');
    assert.equal(controller.get('nameValidation'), true);
});

test('validate attr without regex option will trim the value by default', function(assert) {
    assert.equal(controller.get('nameValidation'), true);
    model.set('name', '');
    assert.equal(controller.get('nameValidation'), false);
    model.set('name', ' ');
    assert.equal(controller.get('nameValidation'), false);
    model.set('name', 'x');
    assert.equal(controller.get('nameValidation'), true);
});

test('validate attr with regex will validate using the given pattern', function(assert) {
    assert.equal(controller.get('emailValidation'), true);
    model.set('email', '');
    assert.equal(controller.get('emailValidation'), false);
    model.set('email', 'hi@h');
    assert.equal(controller.get('emailValidation'), false);
    model.set('email', 'hi@hi.com');
    assert.equal(controller.get('emailValidation'), true);
});
