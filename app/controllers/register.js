import Controller from '@ember/controller';
import ENV from 'metwork-frontend/config/environment';
import $ from 'jquery';
import { run } from '@ember/runloop';

export default Controller.extend({

  error:false,

  actions: {
    register() {
      let self = this;
      let {email, username, organization, password, confirm_password, confirmLicense}
        = this.model.getProperties(
          'email',
          'username',
          'organization',
          'password',
          'confirm_password',
          'confirmLicense'
        );
      if (confirmLicense) {
        let base_url = ENV.host;
          if(ENV.APInameSpace != '') {
              base_url += '/' + ENV.APInameSpace
          }
        $.ajax({
          url: base_url + '/api-register/',
          type: 'POST',
          data: JSON.stringify({
            email: email,
            username: username,
            organization: organization,
            password: password,
            confirm_password: confirm_password
          }),
          contentType: 'application/json;charset=utf-8',
          dataType: 'json'
        }).then((/*response*/) => {
          run(function() {
              self.set('signupComplete', true);
          });
        }, (xhr/*, status, error*/) => {
          run(function() {
              let errorResp = JSON.parse(xhr.responseText);
              if ('email' in errorResp) {
                  self.set('error', errorResp.email[0].message);
              }
          });
        });
      } else {
        self.set(
          'error',
          'You must have your own licence for ChemAxon Reactor product to create a User');
      }
    },
  },
});
