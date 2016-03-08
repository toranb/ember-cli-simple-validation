import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var store = this.get('store');
        store.push('person', {
            id: 1
        });
        return store.findOne('person');
    }
});
