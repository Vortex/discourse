import { registerHelpers } from 'discourse-common/lib/helpers';

export default {
  name: 'load-helpers',

  initialize(application) {
    Object.keys(requirejs.entries).forEach(entry => {
      if ((/\/helpers\//).test(entry)) {
        require(entry, null, null, true);
      }
    });
    registerHelpers(application);
  }
};
