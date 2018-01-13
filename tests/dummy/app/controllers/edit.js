import Controller from '@ember/controller';
import {ValidationMixin, validate} from "ember-cli-simple-validation/mixins/validate";

export default Controller.extend(ValidationMixin, {
    nameValidation: validate("model.name"),
    zipcodeValidation: validate("model.zipcode", /\d{5}/),
    emailValidation: validate("model.email", /\S+@\S+\.\S+/),
    actions: {
        save: function() {
            this.set("submitted", true);
            if(this.get("valid")) {
                this.transitionToRoute("success");
            }
        }
    }
});
