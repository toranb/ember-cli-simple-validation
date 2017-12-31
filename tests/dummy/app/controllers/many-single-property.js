import Controller from '@ember/controller';
import {ValidationMixin, validateEach} from "ember-cli-simple-validation/mixins/validate";

var ManySinglePropertyController = Controller.extend(ValidationMixin, {
    uniqueName: validateEach("name", function (name) {
        var filtered = this.get("model").filter(function (person) {
            return person.get("name") === name;
        });
        return filtered.length === 1;
    }),
    actions: {
        save: function() {
            this.set("submitted", true);
            if(this.get("valid")) {
                this.transitionToRoute("success");
            }
        }
    }
});

export default ManySinglePropertyController;
