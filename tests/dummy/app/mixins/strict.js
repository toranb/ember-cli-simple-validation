import Ember from 'ember';

var StrictMixin = Ember.Mixin.create({
    all_components_valid() {
        var value = true;
        Object.keys(this.child_validators).forEach((key) => {
            value = this.child_validators[key] && value;
        });
        var legit = this.get('valid') && value === true;
        var children = this.get('child_components').length;
        var verified = Object.keys(this.child_validators).length;
        return legit && children === verified;
    }
});

export default StrictMixin;
