import Ember from 'ember';
import Person from 'dummy/models/person';

export default Ember.Route.extend({
    model: function() {
        return Person.create();
    }
});
