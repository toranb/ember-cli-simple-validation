import Ember from "ember";
import { attr, Model } from "ember-cli-simple-store/model";
import { ValidationMixin, validate } from "ember-cli-simple-validation/mixins/validate";

var Person = Model.extend({
    name: attr(),
    email: attr()
});

var controller, model = Person.create({name: 'x', email: 'hi@hi.com'});

var FakeController = Ember.Controller.extend(ValidationMixin, {
    nameValidation: validate("model.name"),
    emailValidation: validate("model.email", /\S+@\S+\.\S+/),
    model: model
});

module('Unit: Validation Mixin', {
  setup: function() {
    controller = new FakeController();
  },
  teardown: function() {
    controller = null;
  }
});

test('validation will fire when computed validation value is update', function() {
    equal(controller.get('nameValidation'), true);
    model.set('name', '');
    equal(controller.get('nameValidation'), false);
    model.set('name', 'x');
    equal(controller.get('nameValidation'), true);
});

test('validate attr without regex option will trim the value by default', function() {
    equal(controller.get('nameValidation'), true);
    model.set('name', '');
    equal(controller.get('nameValidation'), false);
    model.set('name', ' ');
    equal(controller.get('nameValidation'), false);
    model.set('name', 'x');
    equal(controller.get('nameValidation'), true);
});

test('validate attr with regex will validate using the given pattern', function() {
    equal(controller.get('emailValidation'), true);
    model.set('email', '');
    equal(controller.get('emailValidation'), false);
    model.set('email', 'hi@h');
    equal(controller.get('emailValidation'), false);
    model.set('email', 'hi@hi.com');
    equal(controller.get('emailValidation'), true);
});

test('valid property defined on controller when mixin used', function() {
    equal(controller.get('emailValidation'), true);
    equal(controller.get('nameValidation'), true);
    equal(controller.get('valid'), true);
    model.set('email', '');
    equal(controller.get('valid'), false);
    model.set('email', 'hi@hi.com');
    equal(controller.get('valid'), true);
    model.set('name', '');
    equal(controller.get('valid'), false);
    model.set('name', 'x');
    equal(controller.get('valid'), true);
});
