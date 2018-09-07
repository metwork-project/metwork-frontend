import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  currentUser: service('current-user'),

  model(params) {
      return this.get('store').findRecord('user', params.user_id, { reload: true });
  },

});
