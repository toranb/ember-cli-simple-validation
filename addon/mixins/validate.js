import Ember from "ember";

function factory(mixin) {
    return mixin.get("constructor.ClassMixin.ownerConstructor");
}

function eachAttrs(mixin) {
    var attributes = [];
    factory(mixin).eachComputedProperty(function(field, meta) {
        if (meta.validateEach) {
            attributes.push({field: field, options: meta.options, fieldName: meta.fieldName});
        }
    });
    return attributes;
}

function attrs(mixin) {
    var attributes = [];
    factory(mixin).eachComputedProperty(function(field, meta) {
        if (field.indexOf("Validation") > 0) {
            attributes.push(field);
        }
        if (meta.validateEach) {
            mixin.get("model").forEach(function(model, index) {
                attributes.push(field + index + "Validation");
            });
        }
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
                var cpStringForExpansion = "model.@each.{" + attr.fieldName.join(",") + "}";
                Ember.defineProperty(self, attr.field + index + "Validation", Ember.computed(cpStringForExpansion, function() {
                    if(self.get("model").objectAt(index)) {
                        var value = self.get("model").objectAt(index).getWithDefault(attr.fieldName[0], "");
                        return run(value, attr.options, self, index);
                    }
                }));
            });
        });
    })
});

var validate = (...args) => {
    var options;

    if (typeof args[args.length - 1] !== 'string') {
        options = args.pop();
    }

    var computedProperty = Ember.computed(function() {
        var value = this.getWithDefault(args[0], '');
        return run(value, options, this);
    });

    return computedProperty.property.apply(computedProperty, args);
};

var validateEach = (...args) => {
    var options;

    if (typeof args[args.length - 1] !== 'string') {
        options = args.pop();
    }

    var computedProperty = Ember.computed(function() {
        return true;
    }).meta({validateEach: true, options: options, fieldName: args});

    return computedProperty.property.apply(computedProperty, args);
};

export { ValidationMixin, validate, validateEach };
