import Ember from "ember";

var ValidationErrorField = Ember.Component.extend({
    tagName: "span",
    classNameBindings: ["visible"],
    attributeBindings: ["className", "model", "field", "validation", "submitted", "delayed", "index"],
    initialize: Ember.on("init", function() {
        var field = this.get("field");
        Ember.Binding.from("model." + field).to("fieldName").connect(this);
        Ember.Binding.from("model." + field + "IsPrimed").to("isPrimed").connect(this);

        var computedKeys = ["validation", "isPrimed", "submitted", "fieldName"];

        Ember.defineProperty(this, "visible", Ember.computed(computedKeys.join(","), function() {
            var index = this.get("index");
            var isPrimed = this.get("isPrimed");
            var delayed = this.get("delayed");
            var submitted = this.get("submitted");
            var className = this.get("className");
            var validator = this.get("validation");
            var fieldValidation = this.get("targetObject." + validator + index + "Validation");
            var validation = index >= 0 ? fieldValidation : validator;
            var condition = delayed === true ? !validation && submitted : !validation && (isPrimed || submitted);
            if(condition) {
                return className;
            }
            return className ? "hidden " + className : "hidden";
        }));
    })
});

export default ValidationErrorField;
