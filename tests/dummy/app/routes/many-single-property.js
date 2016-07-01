import Ember from "ember";

export default Ember.Route.extend({
    model: function() {
        var store = this.get('store');
        store.push('person', {
            id: 1,
            name: ""
        });
        var nested = store.findOne('person');
        store.push('many', {
            id: 1,
            nested: nested,
            extra: ""
        });
        return store.findOne("many");
    }
});
