import Ember from "ember";
import {ValidationMixin, validate} from "ember-cli-simple-validation/mixins/validate";
import ChildValidationComponent from 'dummy/components/child-validation';

export default ChildValidationComponent.extend(ValidationMixin, {
    nameValidation: validate("model.name")
});
