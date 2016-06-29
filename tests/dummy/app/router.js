import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route("add", {path: "/"});
    this.route("edit", {path: "/edit"});
    this.route("success", {path: "/success"});
    this.route("multi", {path: "/multi"});
    this.route("many", {path: "/many"});
    this.route("many-single-property", {path: "/many-single-property"});
    this.route("other", {path: "/other"});
    this.route("hash", {path: "/hash"});
    this.route("edits", {path: "/edits"});
    this.route("dry", {path: "/dry"});
});

export default Router;
