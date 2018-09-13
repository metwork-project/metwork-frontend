import Controller from '@ember/controller';
import $ from 'jquery';
import { computed } from '@ember/object';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';
import CytoscapeMixin from 'metwork-frontend/mixins/cytoscape';
import CytoscapeFilterMixin from 'metwork-frontend/mixins/cytoscape-filter';

export default Controller.extend(
  PaginatedControllerMixin,
  CytoscapeMixin,
  CytoscapeFilterMixin, {

    activeNav: 'info',
    dataToDelete: false,
    spinnerStatus: 'waiting',

    init() {
        this._super(...arguments);
        this.navParams = [
          {toggle: 'info', libelle: 'Info'},
          {toggle: 'annotations', libelle: 'Annotations'},
          {toggle: 'network', libelle: 'Network'},
        ];
    },

    genDataComponents:  function () {
        this.dataComponents['frag-annotation'] =
            { params : {page: 1, page_size: 5, frag_sample_id: this.model.id} };
    },

    annotationCount: computed('frag-annotations.meta.pagination.{last.page,self.page}', function() {
        const total = this.get('frag-annotations.meta.pagination.last.page') || this.get('frag-annotations.meta.pagination.self.page');
        if (!total) return [];
        return new Array(total+1).join('x').split('').map((e,i) => i+1);
    }),

    actions: {
        annotationPage(page) {
            this.set('page', page);
            this.send('annotationPageQuery', this, this.model.id);
        },
        save_fragsample () {
            this.model.save();
        },
        openAddAnnotModal() {
            //this.set("fileReady",false);
            //this.toggleModal(true);
            this.set("modalAddAnnot",true);
        },
        addAnnotation() {
            let form_target = $('form.add_annotation');
            let params = {
                ionId: form_target.find('input.ion-id').val(),
                smiles: form_target.find('input.smiles').val(),
                dbSource: form_target.find('input.db-source').val(),
                dbId: form_target.find('input.db-id').val(),
                fragsample_id: this.model.id,
            }
            //this.toggleModal(false);
            this.send('addAnnotationQuery', params, this);
        },

        loadMolecularNetwork() {
          this.set('spinnerStatus', 'loading');
          let _this = this
          this.model.molecularNetwork().then( function(response) {
            _this.send(
              'startCytoscape',
              response,
              'molecular',
              ['highlight', 'tip'] );
              // ['filter', 'highlight', 'tippy'] );
          }) ;
        },

        stopLoading() {
          this.set('spinnerStatus', 'stop');
        }
    },


  startMolecularNetwork: computed('activeNav', function() {
    this.loadMolecularNetwork();
  }),

});
