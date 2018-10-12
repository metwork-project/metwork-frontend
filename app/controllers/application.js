import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  session: service('session'),
  currentUser: service('current-user'),
  apiStatus: service('api-status'),

  apiAvailable: computed(
    'apiStatus.status',
    function() {
      return this.get('apiStatus.status').available
  }),

  userFirstLetter: computed('currentUser.user', function() {
    let currentUser = this.get('currentUser');
    if(currentUser.user){
      return currentUser.user.get('username').charAt(0).toUpperCase();
    }
  }),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
  },

});
