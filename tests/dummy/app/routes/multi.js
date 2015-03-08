import Ember from "ember";
import Person from 'dummy/models/person';

var MultiRoute = Ember.Route.extend({
    model: function() {
        var one = Person.create();
        var two = Person.create();
        var three = Person.create();
        return [one, two, three];
    }
});

export default MultiRoute;
