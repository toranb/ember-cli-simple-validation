import Ember from "ember";
import {validate} from "ember-cli-simple-validation/mixins/validate";
import ParentValidationComponent from "dummy/components/parent-validation";
import StrictMixin from "dummy/mixins/strict";

var MultiSingleComponent = ParentValidationComponent.extend(StrictMixin, {
    child_components: ["list-validation"],
    extraValidation: validate("model.extra"),
    actions: {
        save: function() {
            this.set("submitted", true);
            if (this.all_components_valid()) {
                console.log('yay! all valid here!');
            }
        }
    }
});

export default MultiSingleComponent;
