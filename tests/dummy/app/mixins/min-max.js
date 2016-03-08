import Ember from "ember";
import { min, max, other } from "dummy/utils/funcs";
import { validate } from "ember-cli-simple-validation/mixins/validate";

export default Ember.Mixin.create({
    minValidation: validate("model.name", min),
    maxValidation: validate("model.name", max),
    otherValidation: validate("model.name", other)
});
