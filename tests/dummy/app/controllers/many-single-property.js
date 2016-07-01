import Ember from "ember";

export default Ember.Controller.extend({
    actions: {
        save: function() {
            console.log('transition or something fun');
        }
    }
});
