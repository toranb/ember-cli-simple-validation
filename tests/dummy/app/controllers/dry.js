import Controller from '@ember/controller';
import MinMaxMixin from "dummy/mixins/min-max";
import { ValidationMixin } from "ember-cli-simple-validation/mixins/validate";

export default Controller.extend(ValidationMixin, MinMaxMixin, {
    actions: {
        save: function() {
            this.set("submitted", true);
            if(this.get("valid")) {
                this.transitionToRoute("success");
            }
        }
    }
});
