import Ember from "ember";

var ValidationErrorField = Ember.Component.extend({
    tagName: "span",
    classNameBindings: ["visible"],
    attributeBindings: ["array", "className", "model", "field", "validation", "submitted", "delayed", "index"],
    initialize: Ember.on("init", function() {
        var field = this.get("field");
        var computedKeys = ["validation", "isPrimed", "submitted", "fieldName"];

        if(this.get("array")) {
            var fields = field.split(",");
            fields.forEach(function(f) {
                computedKeys.push("array.@each." + f);
            });
            Ember.Binding.from("model." + fields[0] + "IsPrimed").to("isPrimed").connect(this);
            Ember.Binding.from("model." + fields[0]).to("fieldName").connect(this);
        }else{
            Ember.Binding.from("model." + field + "IsPrimed").to("isPrimed").connect(this);
            Ember.Binding.from("model." + field).to("fieldName").connect(this);
        }

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
