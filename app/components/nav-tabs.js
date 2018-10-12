import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  navDisplays: computed('model.status_code', function() {
    let self = this;
    return this.get('navParams').reduce(
            function (navD, navParam) {
                let display = true;
                if (navParam.display) {
                    display = self.get('model.'+ navParam.display) }
                if (display) {
                    navD.push(navParam);
                }
                return navD
            },
            [] );
  }),

  actions: {
    navigateTo(navToggle) {
      this.model.set('activeNav', navToggle);
      this.get('navigateTo')(navToggle)
    }

  }

});
