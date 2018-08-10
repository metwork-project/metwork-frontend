import Mixin from '@ember/object/mixin';

export default Mixin.create({

    queryParams: ['page', 'page_size'],
    page: 1,
    page_size: 10,

    actions: {
      updateDataController: function ( dataLabel ) {
				this.send('updateDataPage', dataLabel, this.dataComponents[dataLabel].params.page);
      },
    },

});
