import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import Inflector from 'ember-inflector';

export default Mixin.create({

  apiStatus: service('api-status'),

    model(params) {
      return this.store.query(this.routeLabel, {
          page_size: params.page_size,
          page: params.page,
      })
    },

    queryParams: {
        page: {
            refreshModel: true
        },
        size: {
            refreshModel: true
        }
    },

    setupController(controller, model) {
        this._super(...arguments);
        this.set('controller', controller);
        controller.set('dataComponents', {});

        if(controller.genDataComponents) {
            controller.genDataComponents();
        }

        if (controller.dataComponents){
            Object.keys(controller.dataComponents).map(
                function(dataLabel) {
                    this.addData(dataLabel, controller.dataComponents[dataLabel])
                },
                this
            );
        } else {
            controller.dataComponents = {}
        }
        model.dataLabel = 'model';

        controller.dataComponents['model'] = {
            routeLabel: this.routeLabel,
            params : {page: controller.page, page_size: controller.page_size }};
    },

    actions: {
      error(/*error, transition*/) {
        this.set('apiStatus.status','error')
        this.transitionTo('index');
      },
      updateDataPage: function ( dataLabel, page ) {
          this.controller.dataComponents[dataLabel].params.page = page;
          this.updateData(dataLabel);
      },
      refreshCurrentRoute(){
       this.refresh();
      },
      newItem(routeLabel, model) {
        var inflector = new Inflector(Inflector.defaultRules);
        let mr = model.store.createRecord(routeLabel);
        this.transitionTo(inflector.pluralize(routeLabel) + '.show', mr);
      },
    },

    addData: function( dataLabel, values ) {
        let params = {
            page: 1,
            page_size: 5,
        };
        // add specific params
        if (values.params) {
            Object.keys(values.params).map(
                function(param) {
                    params[param] = values.params[param];},
                this);
        }
        if (!values.routeLabel) {
            values.routeLabel = dataLabel}
        this.updateData( dataLabel )
    },

    updateData: function ( dataLabel ) {

        let self = this;
        let routeLabel = this.controller.dataComponents[dataLabel].routeLabel
        let params = this.controller.dataComponents[dataLabel].params;
        this.store.query(routeLabel, params)
          .then(function(data) {
            data.set('dataLabel', dataLabel);
            self.controller.set(dataLabel, data);
          });
    },
});
