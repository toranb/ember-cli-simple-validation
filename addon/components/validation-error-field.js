import Ember from "ember";

var ValidationErrorField = Ember.Component.extend({
    tagName: "span",
    classNameBindings: ["visible"],
    attributeBindings: ["className", "model", "field", "validation", "submitted", "delayed", "index"],
    visible: function() {
        var field = this.get("field");
        var index = this.get("index");
        var isDirty = this.get("isDirty");
        var delayed = this.get("delayed");
        var submitted = this.get("submitted");
        var className = this.get("className");
        var validationIndex = this.get("targetObject.%@1%@2Validation".fmt(field, index));
        var validation = validationIndex || this.get("validation");
        var condition = delayed === true ? !validation && submitted : !validation && (isDirty || submitted);
        if(condition) {
            return className;
        }
        return className ? "hidden %@".fmt(className) : "hidden";
    }.property("validation", "isDirty", "submitted", "fieldName"),
    initialize: function() {
        var field = this.get("field");
        var index = this.get("index");
        if(index >= 0) {
            var fieldName = "model.%@".fmt(field);
            Ember.Binding.from(fieldName).to("fieldName").connect(this);
        }
        var isDirty = "model.%@IsDirty".fmt(field);
        Ember.Binding.from(isDirty).to("isDirty").connect(this);
    }.on("init")
});

export default ValidationErrorField;
