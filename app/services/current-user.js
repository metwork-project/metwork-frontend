import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  session: service('session'),
  store: service(),

  init() {
    if (this.get('session.isAuthenticated')) {
      return this.get('store').query('user', { me: true }).then((user) => {
        this.set('user', user.get('firstObject'));
      });
    } else {
      return RSVP.resolve();
    }
}
});
