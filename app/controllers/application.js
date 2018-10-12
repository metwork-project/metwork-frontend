import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  session: service('session'),
  currentUser: service('current-user'),
  apiStatus: service('api-status'),

  apiStatusUpdate: computed(
    'apiStatus.status.available', function() {
      if ( ! this.get('apiStatus.status.available') ) {
        this.get('target').transitionTo('index');
      }
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
