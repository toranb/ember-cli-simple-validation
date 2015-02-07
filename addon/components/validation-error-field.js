import Ember from "ember";

var ValidationErrorField = Ember.Component.extend({
    tagName: "span",
    classNameBindings: ["visible"],
    attributeBindings: ["className", "model", "field", "validation", "submitted", "delayed"],
    visible: function() {
        var className = this.get("className");
        var isDirty = this.get("isDirty");
        var validation = this.get("validation");
        var submitted = this.get("submitted");
        var delayed = this.get("delayed");
        var condition = delayed === true ? !validation && submitted : !validation && (isDirty || submitted);
        if(condition) {
            return className;
        }
        return className ? "hidden %@".fmt(className) : "hidden";
    }.property("validation", "isDirty", "submitted"),
    initialize: function() {
        var isDirty = "model.%@IsDirty".fmt(this.get("field"));
        Ember.Binding.from(isDirty).to("isDirty").connect(this);
    }.on("init")
});

export default ValidationErrorField;
