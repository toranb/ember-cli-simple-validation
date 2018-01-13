import Controller from '@ember/controller';
import {ValidationMixin, validate} from "ember-cli-simple-validation/mixins/validate";

export default Controller.extend(ValidationMixin, {
    nameValidation: validate("model.first.name"),
    tosValidation: validate("model.last.tos"),
    actions: {
        save: function() {
            this.set("submitted", true);
            if(this.get("valid")) {
                this.transitionToRoute("success");
            }
        }
    }
});
