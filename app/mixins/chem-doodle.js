import Mixin from '@ember/object/mixin';
import {memberAction/*, collectionAction*/} from 'ember-api-actions';

export default Mixin.create({

  queryJSON: memberAction({ path: 'get_chemdoodle_json', type: 'get' }),

  getJSON: function() {
    let this_ = this
    this.queryJSON().then( function(response) {
      var dataJSON = response.data
      // this_.loadJSON(molJSON)
      this_.set('dataJSON', dataJSON)
      // this_.set('getJSONStatus','wait')
    })
  },

});
