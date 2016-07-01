import Ember from 'ember';
import {ValidationMixin} from 'ember-cli-simple-validation/mixins/validate';

var ParentValidationComponent = Ember.Component.extend(ValidationMixin, {
    eventbus: Ember.inject.service(),
    init() {
        this.child_validators = {};
        this.get('child_components').forEach((child) => {
            this.get('eventbus').subscribe('dummy@component:' + child + ':', this, 'onValidation');
        }.bind(this));
        this._super(...arguments);
    },
    willDestroy() {
        this.get('child_components').forEach((child) => {
            this.get('eventbus').unsubscribe('dummy@component:' + child + ':');
        }.bind(this));
        this._super(...arguments);
    },
    onValidation(child, eventName, valid) {
        var unique_validation = child.get('elementId');
        this.child_validators[unique_validation] = valid;
    }
});

export default ParentValidationComponent;
