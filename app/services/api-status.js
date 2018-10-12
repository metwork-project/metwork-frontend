import Service from '@ember/service';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import ENV from 'metwork-frontend/config/environment';

export default Service.extend({
  store: service(),
  status: 'waiting',

  init() {
    this._super(...arguments);
    var this_=this
    this.get('store').findRecord('api-status', 1).then( function(response) {
      this_.set('status', response)
    })
    // this.set('status', {available: true})

    // let this_ = this;
    // let base_url = ENV.host;
    //   if(ENV.APInameSpace != '') {
    //       base_url += '/' + ENV.APInameSpace
    //   }
    // $.ajax({
    //   url: base_url + '/api-status/',
    //   type: 'GET',
    //   // data: JSON.stringify({
    //   //   email: email,
    //   // }),
    //   contentType: 'application/json;charset=utf-8',
    //   dataType: 'json'
    // }).then( function () {
    //     this_.set('status','available')
    //   }, function () {
    //     this_.set('status','error')
    //   })
  },

});
