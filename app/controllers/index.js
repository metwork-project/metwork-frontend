import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import CytoscapeMixin from 'metwork-frontend/mixins/cytoscape';
import ENV from '../config/environment'
import { computed } from '@ember/object';
import $ from 'jquery';

export default Controller.extend( CytoscapeMixin, {
  session: service('session'),
  apiStatus: service('api-status'),
  version: ENV.version,
  allNews: null,

  getAllNews: computed('', function() {
    let self = this
    $.getJSON("assets/news.json").then(function(data) {
      self.set('allNews', data);
    })
  }),

  statusColor: computed( 'apiStatus.{loading,status.available}', function() {
    if (this.get('apiStatus').loading) {
      return 'primary'
    } else if (this.get('apiStatus.status.available')) {
      return 'success'
    } else {
      return 'danger'
    }
  })

});
