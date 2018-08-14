# ember-cli-simple-validation

[![Build Status][]](https://travis-ci.org/toranb/ember-cli-simple-validation)

This project is no longer actively maintained because other great addons like [ember-changeset-validations][] do a much better job :)

## Description

[ember-cli][] addon that provides simple validation for [ember.js][] web applications

The goals of this project are simple:

```
1) form validation for controllers/components that are bound to a persisted model
2) consistent user experience that will validate right away as the user starts typing
3) optional delay for complex input validation rules like password or email
4) submit button friendly including a computed property to verify EACH input is valid
5) support for regex and function based validation
6) avoid auto generating all the form html/inputs/etc
7) extracted from a real software project
```

## Demo

https://ember-twiddle.com/eba8fbbd3948e2e8e0cb7759a4dcc2c0

## Installation with ember-data (or vanilla ember object)

```
1) npm install ember-cli-simple-validation --save-dev
2) add isPrimed computed for the field you validate (username example below)
```

```js
Ember.Object.extend({
    username: null,
    usernameIsPrimed: false,
    usernameChanged: Ember.observer("username", function () {
        this.set("usernameIsPrimed", true);
    })
});
```

## Installation with ember-cli-simple-store

```
1) remove ember-data from your package.json file
2) remove ember-data from your bower.json file
3) rm -rf node_modules/ember-data
4) rm -rf bower_components/ember-data
5) npm install ember-cli-simple-store --save-dev
6) npm install ember-cli-simple-validation --save-dev
```

## How to use this library

First add the mixin to your controller and add a validate attribute for any field you want to have validated.

The validation attribute itself is simple. Without a second argument it will trim the value and return true/false (ie- the field will be required). If you need a more complex validation add a regex or custom function as the second argument.

```js
import Ember from "ember";
import {ValidationMixin, validate} from "ember-cli-simple-validation/mixins/validate";

var isEven = function() {
  var value = this.get("model.even");
  var number = parseInt(value, 10);
  return number && number % 2 === 0;
};

export default Ember.Controller.extend(ValidationMixin, {
    nameValidation: validate("model.name"),
    emailValidation: validate("model.emailAddress", /\S+@\S+\.\S+/),
    evenValidation: validate("model.even", isEven),
    actions: {
        save: function() {
            this.set("submitted", true);
            if(this.get("valid")) {
                //executed when all fields are valid
            }
        }
    }
});
```

Next add the component that will show/hide the error message in your template. This project assumes you are doing rich model based validation so you need to have a model backed controller or component.

```js
{{input value=model.name placeholder="name"}}
{{#validation-error-field submitted=submitted field="name" model=model validation=nameValidation}}invalid name{{/validation-error-field}}
<button {{action "save"}}>Save</button>
```

The last step is to add a true model object and declare each field

```js
import { attr, Model } from "ember-cli-simple-store/model";

var Person = Model.extend({
    name: attr(),
    email: attr()
});

export default Person;
```

The user experience by default is that as the user starts typing the field with auto validate and warn the user if they have completed it correctly (before the submit button is clicked). If you have a more complex field like email and you prefer not to fire the validation right away you can use the delay option.

```js
{{#validation-error-field delayed=true submitted=submitted field="email" model=model validation=emailValidation}}invalid email{{/validation-error-field}}
```

The conventions that are required to use this library.

```
1) The validation attributes you declare in the controller must have the suffix "Validation" (ie- nameValidation, emailValidation)
2) The controller action must set a property called submitted/and you must pass this into each component as shown above
3) The mixin will add a computed property called "valid" that you can use to confirm each field is valid
4) The model needs to support primed tracking at the field level (ember-cli-simple-store provides the model and prime aware attribute but ember-data and ember object will work if you add the isPrimed computed)
5) The css class that is added to the span is "hidden"
```

## What about ArrayControllers?

To validate each field on your ArrayController first declare the controller with a validateEach attribute for each property

```js
import Ember from "ember";
import {ValidationMixin, validateEach} from "ember-cli-simple-validation/mixins/validate";

export default Ember.ArrayController.extend(ValidationMixin, {
    name: validateEach("name"),
    actions: {
        save: function() {
            this.set("submitted", true);
            if(this.get("valid")) {
                //executed when all fields are valid
            }
        }
    }
});
```

Next add the validation-error-field component to the template

```js
{{#each model as |person index|}}
    {{input value=person.name placeholder="name"}}
    {{#validation-error-field submitted=submitted field="name" model=person index=index validation="name"}}invalid name{{/validation-error-field}}
{{/each}}
```

The array based validation also supports the ability to re-compute each field when any model in the array has the specific field updated. To opt-in pass the array property like you see in the example below.

```js
{{#each model as |person index|}}
    {{input value=person.name placeholder="name"}}
    {{#validation-error-field array=model submitted=submitted field="name" model=person index=index validation="name"}}invalid name{{/validation-error-field}}
{{/each}}
```

## What about complex validations involving more than 1 field?

Complex validations that require more than one field look something like the below. In this first example you have a different validation rule based on what radio button is selected.

```js
import Ember from "ember";
import {ValidationMixin, validate} from "ember-cli-simple-validation/mixins/validate";

var customFunc = function() {
    var radeo = this.get("model.radeo");
    var tos = this.get("model.tos");
    if (!radeo) {
        return false;
    }
    //option 1 requires tos be checked
    if (radeo === 1 && tos) {
        return true;
    }
    //option 2 does not require tos be checked
    return radeo === 2;
};

export default Ember.Controller.extend(ValidationMixin, {
    radeoValidation: validate("model.radeo", "model.tos", customFunc),
    tosValidation: validate("model.radeo", "model.tos", customFunc),
    actions: {
        save: function() {
            this.set("submitted", true);
            if(this.get("valid")) {
                this.transitionToRoute("success");
            }
        }
    }
});
```

The hbs template would look something like the below.

```js
<div class="radeo-parent-div">
  <label>select an option</label>
  <div class="the-radio-buttons">
    <div class="radio-button-one">
      {{radio-button groupValue=model.radeo id="radio01" value=1}}
      <label for="radio01">one (will require tos)</label>
    </div>
    <div class="radio-button-two">
      {{radio-button groupValue=model.radeo id="radio02" value=2}}
      <label for="radio02">two (does not require tos)</label>
    </div>
  </div>
  {{#validation-error-field submitted=submitted className="red" field="radeo" model=model validation=radeoValidation}}invalid radeo{{/validation-error-field}}
</div>

<div class="tos-parent-div">
{{input checked=model.tos type="checkbox"}} agree to terms
{{#validation-error-field submitted=submitted className="red" field="tos" model=model validation=tosValidation}}invalid tos{{/validation-error-field}}
</div>

<button class="save" {{action "save"}}>Save</button>
```

For complex array validations you first need to pass in the fields JS side as show below.

```js
import Ember from "ember";
import {ValidationMixin, validateEach} from "ember-cli-simple-validation/mixins/validate";

var customFunc = function(value, options, model, index) {
    var arry = model.objectAt(index);
    var radeo = arry.get("radeo");
    var tos = arry.get("tos");
    if (!radeo) {
        return false;
    }
    //option 1 requires tos be checked
    if (radeo === 1 && tos) {
        return true;
    }
    //option 2 does not require tos be checked
    return radeo === 2;
};

var ManyComplexController = Ember.ArrayController.extend(ValidationMixin, {
    one: validateEach("radeo", "tos", customFunc),
    two: validateEach("tos", "radeo", customFunc),
    actions: {
        save: function() {
            this.set("submitted", true);
            if(this.get("valid")) {
                this.transitionToRoute("success");
            }
        }
    }
});

export default ManyComplexController;
```

In addition you need to push in both fields comma delimited using the `fields` attribute in the hbs file as shown below. And finally make sure you pass in the array of models using the `array` attribute as you see in the example below.

```js
{{#each model as |person index|}}
  <div class="radeo-parent-div">
    <label>select an option</label>
    <div class="the-radio-buttons">
      <div class="radio-button-one">
        {{radio-button groupValue=person.radeo id=(combine-two "radio01" index) value=1}}
        <label for={{combine-two "radio01" index}}>one (will require tos)</label>
      </div>
      <div class="radio-button-two">
        {{radio-button groupValue=person.radeo id=(combine-two "radio02" index) value=2}}
        <label for={{combine-two "radio02" index}}>two (does not require tos)</label>
      </div>
    </div>
    {{#validation-error-field array=model index=index submitted=submitted className="red" field="radeo,tos" model=person validation="one"}}invalid radeo{{/validation-error-field}}
  </div>

  <div class="tos-parent-div">
  {{input checked=person.tos type="checkbox"}} agree to terms
  {{#validation-error-field array=model index=index submitted=submitted className="red" field="tos,radeo" model=person validation="two"}}invalid tos{{/validation-error-field}}
  </div>
{{/each}}

<button class="save" {{action "save"}}>Save</button>
```

## Running the unit tests

    npm install
    bower install
    ember test

## Example project built in

```
1) npm install
2) bower install
3) ember server
4) localhost:4200
```

## Example with components and ember 1.13+

https://github.com/toranb/ember-pure-components-example

## License

Copyright © 2015 Toran Billups http://toranbillups.com

Licensed under the MIT License


[Build Status]: https://travis-ci.org/toranb/ember-cli-simple-validation.svg?branch=master
[ember-cli]: http://www.ember-cli.com/
[ember.js]: http://emberjs.com/
[ember-changeset-validations]: https://github.com/poteto/ember-changeset-validations
