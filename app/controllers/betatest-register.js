import Controller from '@ember/controller';
import ENV from 'metwork-frontend/config/environment';
import $ from 'jquery';
import { run } from '@ember/runloop';


export default Controller.extend({
    error:'',
    signupComplete: false,

  actions: {
    register() {
      let self = this;
      let {email, organization, name} = this.getProperties(
        'email',
        'name',
        'organization',
      );
      let base_url = ENV.host;
        if(ENV.APInameSpace != '') {
            base_url += '/' + ENV.APInameSpace
        }
      $.ajax({
        url: base_url + '/betatest-register/',
        type: 'POST',
        data: JSON.stringify({
          email: email,
          organization: organization,
          name: name,
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
    }
  }
});
