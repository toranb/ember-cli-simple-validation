import Ember from "ember";

export default Ember.Component.extend({
    tagName: "input",
    type: "radio",
    attributeBindings: ["id", "checked", "name", "type", "value"],
    checked: function() {
        return this.get("groupValue") === this.get("value");
    }.property("groupValue", "value"),
    change: function(event) {
        var groupValue = this.get("groupValue");
        var value = event.target.checked ? this.get("value") : undefined;
        this.set("groupValue", value);
        if (groupValue !== value) {
            Ember.run.schedule("actions", this, function() {
                this.sendAction("changed", this.get("value"));
            });
        }
    }
});
