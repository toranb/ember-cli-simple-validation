import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var store = this.get('store');
        store.push('person', {
            name: 'x'
        });
        store.push('other', {
            tos: true
        });
        return Ember.RSVP.hash({
            first: store.findOne('person'),
            last: store.findOne('other')
        });
    }
});
