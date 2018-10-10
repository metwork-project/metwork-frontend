import Controller from '@ember/controller';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Controller.extend({

  actions: {
    setFragSample(fragSample) {
        let self = this;
        this.model.updateFragSample({
                frag_sample_id: fragSample.id ,
            }).then(function(/*response*/)  {

                //self.dataComponents['frag-annotation'].params.frag_sample_id = fragSample.id;
                self.model.reload().then( function() {
									self.genDataComponents();
									self.send('updateDataPage', 'annotations-available', 1);
									self.send('updateDataPage', 'annotations-selected', 1);
									self.set('selectFragModal', false);
								});
        });
    },
    fragCompareConfSave() {
      let params = {}
      $('.frag-compare-conf-field > input').each(function( /*index*/ ) {
          params[ $( this ).attr('name') ] = $( this ).val() ;
        })
      this.model.updateFragCompareConf(params);
    },
  },

  getFragCompareConf: function() {
    let fragCompareConfId = this.get('model.frag_compare_conf_id');
    if (fragCompareConfId)	{
      this.set('fragCompareConf', this.get('store').findRecord(
        'frag_compare_conf',fragCompareConfId, { reload: true }) );
    }
  },

  compareConfFields: computed('fragCompareConf', function() {
    return {
      filter: [
        { label:'Minimum intensity threshold',
          step:'1',
          fieldName:'filter_min_intensity' },
        { label:'filter_parent_filter_tolerance',
          step:'1',
          fieldName:'filter_parent_filter_tolerance'},
        { label:'filter_matched_peaks_window',
          step:'1',
          fieldName:'filter_matched_peaks_window'},
        { label:'filter_min_matched_peaks_search',
          step:'1',
          fieldName:'filter_min_matched_peaks_search' },
      ],
      cosine: [
        { label:'cosine_mz_tolerance',
          step:'0.01',
          fieldName:'cosine_mz_tolerance' },
        { label:'cosine_min_matched_peaks',
          step:'1',
                    fieldName:'cosine_min_matched_peaks' },
        { label:'cosine_threshold',
          step:'0.01',
          fieldName:'cosine_threshold' },
      ]
    }
  }),

});
