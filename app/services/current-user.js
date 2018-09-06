import Service from '@ember/service';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import ENV from 'metwork-frontend/config/environment';

export default Service.extend({
  session: service('session'),
  store: service(),

  init() {
    this._super(...arguments);
    if (this.get('session.isAuthenticated')) {
      return this.get('store').query('user', { me: true }).then((response) => {
        let user = response.get('firstObject');
        this.set('user', user);
        this.set('isGuest', user.get('email') === ENV.guestUser.email);
      });
    } else {
      return RSVP.resolve();
    }
}
});
