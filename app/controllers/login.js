import Controller from '@ember/controller';
import ENV from 'metwork-frontend/config/environment';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { run } from '@ember/runloop';
import { computed } from '@ember/object';

export default Controller.extend({
  session: service('session'),
  success: false,
  error: false,
  guestError: false,
  apiStatus: service('api-status'),

  apiAvailable: computed(
    'apiStatus.status',
    function() {
      return this.get('apiStatus.status') === 'available'
  }),

	authenticate_ : function(email, password) {
    this.get('session').authenticate('authenticator:drf-token-authenticator', email, password).catch((reason) => {
      if (reason == '{"non_field_errors":["Unable to log in with provided credentials."]}') {
          this.set('error', 'Wrong email or password');
      } else {
        this.set('error', reason);
      }
    });
	},

  actions: {
    authenticate({ email, password }) {
      if (this.model.get('email')) {
        this.authenticate_(email, password)
      } else {
        this.set(
          'error',
          'Please provide your email to login');
      }
    },

    authenticateGuest() {

      if (this.get('certifyCheck')) {
        let email = ENV.guestUser.email
        let password = ENV.guestUser.password

        this.authenticate_(email, password)

      } else {
        this.set(
          'guestError',
          'You must certify that you will use MetWork for non-commercial activity '
          + 'either directly or as a means of promoting or soliciting business ');
      }
    },

    resetPassword() {
      this.set('success', false);
      this.set('error', false);
      let {email} = this.get('model').getProperties(
        'email',
      );
      let this_ = this
      //let email = "mail@yannbeauxis.net"
      let base_url = ENV.host;
        if(ENV.APInameSpace != '') {
            base_url += '/' + ENV.APInameSpace
        }
      $.ajax({
        url: base_url + '/api-password-reset/',
        type: 'POST',
        data: JSON.stringify({
          email: email,
        }),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json'
      }).then( (response) => {
        run(function() {
          // this.set('signupComplete', true);
          this_.set('success', response.success);
        });
      }, (xhr/*, status, error*/) => {
        run(function() {
          let response = JSON.parse(xhr.responseText) ;
          if (response.email) {
            this_.set('error', 'Please provide a valid email');
          } else {
            this_.set('error', xhr.responseText);
          }
        });
      });
    },
  }
});
