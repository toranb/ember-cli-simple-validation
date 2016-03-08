export var min = function(value) {
    return value && value.length > 3;
};

export var max = function(value) {
    return value && value.length < 9;
};

export var other = function(value) {
    return value && value.length > 4 && typeof value === "string";
};
