import Base from 'ember-simple-auth/authenticators/base';
import ENV from 'metwork-frontend/config/environment';
import { Promise } from 'rsvp';
import { isEmpty } from '@ember/utils'; 
import $ from 'jquery';
import { run } from '@ember/runloop';

export default Base.extend({
  restore(data) {
    return new Promise((resolve, reject) => {
      if (!isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(username, password) {
    return new Promise((resolve, reject) => {
      let base_url = ENV.host;
        if(ENV.APInameSpace != '') {
            base_url += '/' + ENV.APInameSpace
        }
      $.ajax({
        url: base_url + '/api-auth-token/',
        type: 'POST',
        data: JSON.stringify({
          username: username,
          password: password
        }),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        /*beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRFToken', Cookies.get('csrftoken'))
        },*/
      }).then((response) => {
        run(function() {
          resolve({
            token: response.token
          });
        });
      }, (xhr/*, status, error*/) => {
        var response = xhr.responseText;
        run(function() {
          reject(response);
        });
      });
    });
  },
});
