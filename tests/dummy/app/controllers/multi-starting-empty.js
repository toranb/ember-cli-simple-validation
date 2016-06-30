import Ember from "ember";
import Person from 'dummy/models/person';
import {ValidationMixin, validateEach} from "ember-cli-simple-validation/mixins/validate";

var MultiStartingEmptyController = Ember.ArrayController.extend(ValidationMixin, {
    uniqueName: validateEach("name", function (name) {
        var filtered = this.get("model").filter(function (person) {
            return person.get("name") === name;
        });
        return filtered.length === 1;
    }),
    actions: {
        add: function() {
            this.get("model").pushObject(Person.create());
        },
        remove: function(person) {
            this.get("model").removeObject(person);
        },
        save: function() {
            this.set("submitted", true);
            if(this.get("valid")) {
                this.transitionToRoute("success");
            }
        }
    }
});

export default MultiStartingEmptyController;
