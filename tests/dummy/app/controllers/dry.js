import Ember from "ember";
import MinMaxMixin from "dummy/mixins/min-max";
import { ValidationMixin } from "ember-cli-simple-validation/mixins/validate";

export default Ember.Controller.extend(ValidationMixin, MinMaxMixin, {
    actions: {
        save: function() {
            this.set("submitted", true);
            if(this.get("valid")) {
                this.transitionToRoute("success");
            }
        }
    }
});
