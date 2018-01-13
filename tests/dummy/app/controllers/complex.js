import Controller from '@ember/controller';
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

export default Controller.extend(ValidationMixin, {
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
