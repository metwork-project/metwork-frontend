import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({

  queryParams: ['page', 'page_size'],
  page: 1,
  page_size: 30,

  actions: {
    updateDataController: function (dataLabel) {
      this.send('updateDataPage', dataLabel, this.dataComponents[dataLabel].params.page, this.get('filter'));
    },
  },

});
