import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route("add", {path: "/"});
    this.route("edit", {path: "/edit"});
    this.route("success", {path: "/success"});
});

export default Router;
