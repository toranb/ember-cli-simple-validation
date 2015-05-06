import Ember from "ember";

var ValidationErrorField = Ember.Component.extend({
    tagName: "span",
    classNameBindings: ["visible"],
    attributeBindings: ["className", "model", "field", "validation", "submitted", "delayed", "index"],
    visible: function() {
        var index = this.get("index");
        var isPrimed = this.get("isPrimed");
        var delayed = this.get("delayed");
        var submitted = this.get("submitted");
        var className = this.get("className");
        var validator = this.get("validation");
        var validation = index >= 0 ? this.get("targetObject.%@1%@2Validation".fmt(validator, index)) : validator;
        var condition = delayed === true ? !validation && submitted : !validation && (isPrimed || submitted);
        if(condition) {
            return className;
        }
        return className ? "hidden %@".fmt(className) : "hidden";
    }.property("validation", "isPrimed", "submitted", "fieldName"),
    initialize: function() {
        var field = this.get("field");
        Ember.Binding.from("model.%@".fmt(field)).to("fieldName").connect(this);
        Ember.Binding.from("model.%@IsPrimed".fmt(field)).to("isPrimed").connect(this);
    }.on("init")
});

export default ValidationErrorField;
