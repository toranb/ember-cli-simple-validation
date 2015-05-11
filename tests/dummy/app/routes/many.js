import Ember from "ember";
import Many from 'dummy/models/many';

var ManyRoute = Ember.Route.extend({
    model: function() {
        var one = Many.create();
        var two = Many.create();
        return Ember.A([one, two]);
    }
});

export default ManyRoute;
