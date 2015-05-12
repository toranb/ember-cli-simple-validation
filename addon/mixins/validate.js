import Ember from "ember";

var dynamicEachAttrs = [];

function factory(mixin) {
    return mixin.get("constructor.ClassMixin.ownerConstructor");
}

function eachAttrs(mixin) {
    var attributes = [];
    dynamicEachAttrs = [];
    factory(mixin).eachComputedProperty(function(field, meta) {
        if (meta.validateEach) {
            dynamicEachAttrs.push(field);
            attributes.push({field: field, options: meta.options, fieldName: meta.fieldName});
        }
    });
    return attributes;
}

function attrs(mixin) {
    var attributes = [];
    factory(mixin).eachComputedProperty(function(field) {
        if (field.indexOf("Validation") > 0) {
            attributes.push(field);
        }
    });
    dynamicEachAttrs.forEach(function(field) {
        mixin.get("model").forEach(function(model, index) {
            attributes.push(field + index + "Validation");
        });
    });
    return attributes;
}

function run(value, options, context) {
    context.notifyPropertyChange("valid");
    if (options instanceof RegExp) {
        return options.test(value);
    }
    if (options instanceof Function) {
        return options.apply(context, arguments);
    }
    if (typeof value === "boolean") {
        return value;
    }
    if (typeof value === "string") {
        return value.trim().length > 0;
    }
    return value;
}

var ValidationMixin = Ember.Mixin.create({
    valid: Ember.computed(function() {
        var self = this;
        var result = true;
        attrs(this).forEach(function(attr) {
            result = self.get(attr) && result;
        });
        return result;
    }),
    each: Ember.observer("model.@each.isDone", function() {
        var self = this;
        this.notifyPropertyChange("valid");
        eachAttrs(this).forEach(function(attr) {
            self.get("model").forEach(function(obj, index) {
                Ember.defineProperty(self, attr.field + index + "Validation", Ember.computed(function() {
                    if(self.get("model").objectAt(index)) {
                        var value = self.get("model").objectAt(index).getWithDefault(attr.fieldName, "");
                        return run(value, attr.options, self, index);
                    }
                }).property("model.@each." + attr.fieldName));
            });
        });
    })
});

var validate = function(field, options) {
    return Ember.computed(field, function() {
        var value = this.getWithDefault(field, "");
        return run(value, options, this);
    });
};

var validateEach = function(fieldName, options) {
    return Ember.computed(function() {
        return true;
    }).meta({validateEach: true, options: options, fieldName: fieldName});
};

export { ValidationMixin, validate, validateEach };
