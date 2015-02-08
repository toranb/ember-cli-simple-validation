# ember-cli-simple-validation

[![Build Status][]](https://travis-ci.org/toranb/ember-cli-simple-validation)

## Description

[ember-cli][] addon that provides simple validation for [ember.js][] web applications

## Installation

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

The validation attr itself is simple. Without a second argument it will trim the value and return true/false (ie- the field will be required). If you need a more complex validation add a regex as the second argument.

```js
import Ember from "ember";
import {ValidationMixin, validate} from "ember-cli-simple-validation/mixins/validate";

export default Ember.Controller.extend(ValidationMixin, {
    nameValidation: validate("model.name"),
    emailValidation: validate("model.emailAddress", /\S+@\S+\.\S+/),
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

Next add the component that will show/hide the error message in your template. This project assumes you are doing rich model based validation so you need to have a model backed controller.

```js
{{input value=model.name placeholder="name"}}
{{#validation-error-field submitted=submitted field="name" model=model validation=nameValidation}}invalid name{{/validation-error-field}}
<button {{action "save"}}>Save</button>
```

The last step is to add a true model object and declare each field.

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
4) The model needs to support dirty tracking at the field level (ember-cli-simple-store provides the model and dirty tracked attr)
5) The css class that is added to the span is "hidden"
```

## Running the unit tests

    npm install
    ember test

## Example project built in

```
1) npm install
2) bower install
3) ember server
4) localhost:4200
```

## License

Copyright © 2015 Toran Billups http://toranbillups.com

Licensed under the MIT License


[Build Status]: https://travis-ci.org/toranb/ember-cli-simple-validation.svg?branch=master
[ember-cli]: http://www.ember-cli.com/
[ember.js]: http://emberjs.com/
