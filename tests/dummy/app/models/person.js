import { attr, Model } from "ember-cli-simple-store/model";

export default Model.extend({
    name: attr(),
    zipcode: attr(),
    email: attr(),
    rando: attr(),
    radeo: attr(),
    thing: attr(),
    tos: attr()
});
