import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),
  status: 'waiting',

  init() {
    this._super(...arguments);
    var this_=this
      this_.set('loading', true)
    this.get('store').findRecord('api-status', 1)
      .then( function(response) {
        this_.set('status', response)
        this_.set('loading', false)
      }, function() {
        this_.set('status', {available: false})
        this_.set('loading', false)
      })
  },

});
