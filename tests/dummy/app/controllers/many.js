import Ember from "ember";
import {ValidationMixin, validateEach} from "ember-cli-simple-validation/mixins/validate";

var longEnough = function(value) {
    return value.trim().length > 3;
};

var ManyController = Ember.ArrayController.extend(ValidationMixin, {
    basic: validateEach("name"),
    len: validateEach("name", longEnough),
    actions: {
        save: function() {
            this.set("submitted", true);
            if(this.get("valid")) {
                this.transitionToRoute("success");
            }
        }
    }
});

export default ManyController;
