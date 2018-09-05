import Controller from '@ember/controller';
import ENV from 'metwork-frontend/config/environment';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { run } from '@ember/runloop';

export default Controller.extend({
  session: service('session'),
  success: false,
  error: false,

	authenticate_ : function(email, password) {
      this.get('session').authenticate('authenticator:drf-token-authenticator', email, password).catch((reason) => {
        console.log(reason);
        if (reason == '{"non_field_errors":["Unable to log in with provided credentials."]}') {
            this.set('error', 'Wrong email or password');
        } else {
          this.set('error', reason);
        }
      });
	},

  actions: {
    authenticate({ email, password }) {
      this.authenticate_(email, password)
    },

    authenticateGuest() {
      let email = 'metwork.dev@gmail.com'
      let password = 'AYL6jGBm6R'
      this.authenticate_(email, password)
    },

    resetPassword() {
      this.set('success', false);
      this.set('error', false);
      let {email} = this.getProperties(
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
          console.log(response);
          // this.set('signupComplete', true);
          this_.set('success', response.success);
        });
      }, (xhr/*, status, error*/) => {
        run(function() {
          this_.set('error', xhr.responseText);
        });
      });
    },
  }
});
