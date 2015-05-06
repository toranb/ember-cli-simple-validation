import Ember from 'ember';
import Person from 'dummy/models/person';
import Other from 'dummy/models/other';

export default Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({
            first: Person.create(),
            last: Other.create()
        });
    }
});
