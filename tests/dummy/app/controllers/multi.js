import Ember from "ember";
import Person from 'dummy/models/person';
import {ValidationMixin, validateEach} from "ember-cli-simple-validation/mixins/validate";

var isEven = function() {
    var index = arguments[3];
    var value = this.get("model").objectAt(index).get("rando");
    var number = parseInt(value, 10);
    return number && number % 2 === 0;
};

var MultiController = Ember.ArrayController.extend(ValidationMixin, {
    name: validateEach("name"),
    rando: validateEach("rando", isEven),
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

export default MultiController;
