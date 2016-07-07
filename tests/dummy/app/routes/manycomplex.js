import Ember from "ember";
import Person from 'dummy/models/person';

var ManyComplexRoute = Ember.Route.extend({
    model: function() {
        var one = Person.create();
        var two = Person.create();
        return Ember.A([one, two]);
    }
});

export default ManyComplexRoute;
