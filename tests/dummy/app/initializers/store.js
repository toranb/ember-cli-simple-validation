import Store from 'ember-cli-simple-store/store';

export function initialize() {
  var application = arguments[1] || arguments[0];
  application.register('store:main', Store);
  application.inject('controller', 'store', 'store:main');
  application.inject('route', 'store', 'store:main');
}

export default {
  name: 'simple-store',
  initialize: initialize
};
