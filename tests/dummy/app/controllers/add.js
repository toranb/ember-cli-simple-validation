import { A } from '@ember/array';
import Controller from '@ember/controller';
import {ValidationMixin, validate} from "ember-cli-simple-validation/mixins/validate";

var customFunc = function() {
    var value = this.get("model.rando");
    return value === "1";
};

export default Controller.extend(ValidationMixin, {
    nameValidation: validate("model.name"),
    zipcodeValidation: validate("model.zipcode", /\d{5}/),
    emailValidation: validate("model.email", /\S+@\S+\.\S+/),
    randoValidation: validate("model.rando", customFunc),
    radeoValidation: validate("model.radeo"),
    tosValidation: validate("model.tos"),
    thingValidation: validate("model.thing"),
    things: A([{id: 1}, {id: 2}, {id: 3}, {id: 4}]),
    actions: {
        save: function() {
            this.set("submitted", true);
            if(this.get("valid")) {
                this.transitionToRoute("success");
            }
        }
    }
});
