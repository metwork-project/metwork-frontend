import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import PaginatedRouteMixin from 'metwork-frontend/mixins/paginated-route';
import FileDownloadMixin from 'metwork-frontend/mixins/file-download';

export default Route.extend(
	AuthenticatedRouteMixin,
	PaginatedRouteMixin,
	FileDownloadMixin, {

    model(params) {
        return this.get('store').findRecord('project', params.project_id, { reload: true });

    },

    setupController(controller, model) {
        this._super(...arguments);
        controller.set('activeNav', 'info');
				let fragCompareConfId = model.get('frag_compare_conf_id');
				controller.set('fragCompareConf', this.get('store').findRecord(
					'frag_compare_conf',fragCompareConfId, { reload: true }) );
    },

    actions: {
        save_p(model) {
            let self=this;
            let isNew = model.get('isNew');

            model.save().then(function() {
                if (isNew) {
                  let id = model.get('id');
									self.controller.genDataComponents();
									self.transitionTo('/projects/'+ id);
								}
            }, function() {
            });
        },
        cancel_create(model) {
            if(!model.get('id')){
                model.deleteRecord();
                this.transitionTo('projects');
            }
        },
        redirectToProject(clone_id) {
					this.transitionTo('/projects/' + clone_id);
        },
        delete_p(model) {
            let self=this;
            model.destroyRecord().then(function() {
                self.transitionTo('projects');
            }, function() {
              alert('error')
            });
        },
    },
});
