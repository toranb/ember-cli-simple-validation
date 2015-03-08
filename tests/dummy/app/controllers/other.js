import Ember from "ember";
import Other from 'dummy/models/other';
import {ValidationMixin, validateEach} from "ember-cli-simple-validation/mixins/validate";

var OtherController = Ember.ArrayController.extend(ValidationMixin, {
    tos: validateEach("tos"),
    displayName: validateEach("displayName"),
    actions: {
        add: function() {
            this.get("model").pushObject(Other.create());
        },
        remove: function(other) {
            this.get("model").removeObject(other);
        },
        save: function() {
            this.set("submitted", true);
            if(this.get("valid")) {
                this.transitionToRoute("success");
            }
        }
    }
});

export default OtherController;
