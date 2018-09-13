import Controller from '@ember/controller';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';
import CytoscapeMixin from 'metwork-frontend/mixins/cytoscape';
import CytoscapeFilterMixin from 'metwork-frontend/mixins/cytoscape-filter';
import { computed } from '@ember/object';

export default Controller.extend(
  PaginatedControllerMixin,
  CytoscapeMixin,
  CytoscapeFilterMixin, {

  activeNav: 'info',

  didReceiveAttrs: function() {
      this.activeNav = 'info';
  },

  init() {
      this._super(...arguments);
      this.navParams = [
          {toggle: 'info', libelle: 'Info'},
          {toggle: 'data', libelle: 'Data', display:'saved'},
          {toggle: 'metabolization', libelle: 'Metabolization', display:'saved'},
          {toggle: 'fragmentation', libelle: 'Fragmentation', display:'saved'},
      ];
  },

  genDataComponents:  function () {
      this.dataComponents['fragsample'] =
          { params : {page: 1, page_size: 10} };
      //this.dataComponents['frag-annotation'] =
      //    { params : {page: 1, page_size: 10, frag_sample_id: this.model.get('frag_sample.id')} };
      this.dataComponents['annotations-available'] =
          { routeLabel: 'frag-annotation', params : {project_id: this.model.get('id'), page: 1, page_size: 10, selected: false} };
      this.dataComponents['annotations-selected'] =
          { routeLabel: 'frag-annotation', params : {project_id: this.model.get('id'), page: 1, page_size: 10, selected: true} };
      this.dataComponents['reactions-available'] =
          { routeLabel: 'reaction', params : {project_id: this.model.get('id'), page: 1, page_size: 10, selected: false} };
      this.dataComponents['reactions-selected'] =
          { routeLabel: 'reaction', params : {project_id: this.model.get('id'), page: 1, page_size: 10, selected: true} };
  },

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
      startRun() {
          let self = this;
          this.model
              .startRun()
              .then(function(/*response*/) {
                //console.log(response.data.status_code);
                //self.model.set('status_code', response.data.status_code);
                self.model.reload().then(function(/*response*/) {
									self.model.poll()
								});
							});
      },
      cloneProject() {
          let self = this;
          this.model
              .cloneProject()
              .then(function(response) {
									//if (response.data.error) {
									//	console.log('error');
									//} else {
									if (response.data.clone_id) {
										self.send('redirectToProject', response.data.clone_id);
									}
              });
      },
      getFile(request, fileName) {
         this.send('downloadFile', request, "text/plain;charset=utf-8", fileName);
      },
      fragCompareConfSave() {
        let params = {}
        $('.frag-compare-conf-field > input').each(function( /*index*/ ) {
            params[ $( this ).attr('name') ] = $( this ).val() ;
          })
        this.model.updateFragCompareConf(params);
      },
      reloadMetabolizationNetwork() {
        this.loadMetabolizationNetwork();
      }
  },

  loadMetabolizationNetwork: function() {
    let _this = this
    this.model.metabolizationNetwork().then( function(response) {
      _this.send(
        'startCytoscape',
        response,
        'metabolization',
        ['filter', 'highlight', 'tip'] );
    }) ;
  },

  hasReaction: function(reactionId) {
      return reactionId in this.get('model.reactions_ids');
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

  startMetabolizationNetwork: computed('activeNav', function() {
    this.loadMetabolizationNetwork();
  }),

});
