import Ember from "ember";
import Many from 'dummy/models/many';

export default Ember.Route.extend({
    model: function() {
        var one = Many.create();
        var two = Many.create();
        var three = Many.create();
        return Ember.Object.create({list: [one, two, three], extra: ""});
    }
});
