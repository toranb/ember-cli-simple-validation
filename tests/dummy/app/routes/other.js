import Ember from "ember";
import Other from 'dummy/models/other';

var OtherRoute = Ember.Route.extend({
    model: function() {
        var one = Other.create();
        var two = Other.create();
        var three = Other.create();
        return [one, two, three];
    }
});

export default OtherRoute;
