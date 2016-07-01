import Ember from "ember";

var nameComponent = function(component) {
    return component.get("constructor.ClassMixin.ownerConstructor").toString();
};

var ChildValidationComponent = Ember.Component.extend({
    eventbus: Ember.inject.service(),
    observeValid: Ember.observer("valid", function() {
        Ember.run.once(this, "processValid");
    }),
    processValid: function() {
        this.get("eventbus").publish(nameComponent(this), this, "onValidation", this.get("valid"));
    }
});

export default ChildValidationComponent;
