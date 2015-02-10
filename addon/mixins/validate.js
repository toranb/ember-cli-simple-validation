import Ember from "ember";

function attrs(mixin) {
    var attributes = [];
    var factory = mixin.get("constructor.ClassMixin.ownerConstructor");
    factory.eachComputedProperty(function (key) {
        if (key.indexOf("Validation") > 0) {
            attributes.push(key);
        }
    });
    return attributes;
}

var ValidationMixin = Ember.Mixin.create({
    validate: function() {
        var self = this;
        var attributes = attrs(this);
        Ember.defineProperty(this, "valid", Ember.computed(function() {
            var result;
            attributes.forEach(function(attr, index) {
                result = index === 0 ? self.get(attr) : self.get(attr) && result;
            });
            return result;
        }).property("" + attributes));
    }.on("init")
});

var validate = function(field, options) {
    return function() {
        var value = this.getWithDefault(field, "");
        if (options instanceof RegExp) {
            return options.test(value);
        }
        if (options instanceof Function) {
            return options.apply(this, arguments);
        }
        if (typeof value === "boolean") {
            return value;
        }
        if (typeof value === "string") {
            return value.trim().length > 0;
        }
        return value;
    }.property(field);
};

export { ValidationMixin, validate };
