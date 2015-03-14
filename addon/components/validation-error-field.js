import Ember from "ember";

var ValidationErrorField = Ember.Component.extend({
    tagName: "span",
    classNameBindings: ["visible"],
    attributeBindings: ["className", "model", "field", "validation", "submitted", "delayed", "index"],
    visible: function() {
        var index = this.get("index");
        var isDirty = this.get("isDirty");
        var delayed = this.get("delayed");
        var submitted = this.get("submitted");
        var className = this.get("className");
        var validator = this.get("validation");
        var validation = index >= 0 ? this.get("targetObject.%@1%@2Validation".fmt(validator, index)) : validator;
        var condition = delayed === true ? !validation && submitted : !validation && (isDirty || submitted);
        if(condition) {
            return className;
        }
        return className ? "hidden %@".fmt(className) : "hidden";
    }.property("validation", "isDirty", "submitted", "fieldName"),
    initialize: function() {
        var field = this.get("field");
        Ember.Binding.from("model.%@".fmt(field)).to("fieldName").connect(this);
        Ember.Binding.from("model.%@IsDirty".fmt(field)).to("isDirty").connect(this);
    }.on("init")
});

export default ValidationErrorField;
