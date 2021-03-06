import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    this.route("add", {path: "/"});
    this.route("edit", {path: "/edit"});
    this.route("success", {path: "/success"});
    this.route("multi", {path: "/multi"});
    this.route("many", {path: "/many"});
    this.route("many-single-property", {path: "/many-single-property"});
    this.route("multi-starting-empty", {path: "/multi-starting-empty"});
    this.route("other", {path: "/other"});
    this.route("hash", {path: "/hash"});
    this.route("edits", {path: "/edits"});
    this.route("dry", {path: "/dry"});
    this.route("complex", {path: "/complex"});
    this.route("manycomplex", {path: "/manycomplex"});
});

export default Router;
