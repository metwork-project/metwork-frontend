import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import $ from 'jquery';
import ENV from 'metwork-frontend/config/environment';
import { run } from '@ember/runloop';
import PaginatedRouteMixin from 'metwork-frontend/mixins/paginated-route';
import FileUploadRouteMixin from 'metwork-frontend/mixins/file-upload-route';

export default Route.extend(
    AuthenticatedRouteMixin,
    PaginatedRouteMixin,
    FileUploadRouteMixin, {

        model(params) {
            return this.get('store').findRecord('fragsample', params.fragsample_id, { reload: true });
        },

        setupController(controller, model) {
            this._super(...arguments);
            controller.set('uploadAnnotRouteLabel', 'fragsamples/' + model.id + '/uploadfile_annotation');
            controller.set('activeNav', 'info');
            controller.set('spinnerStatus', 'waiting');
        },

        actions: {
            addAnnotationQuery: function(params, controller) {
                let self = this;
                let access_token = this.get('session.data.authenticated.token');
                let form_data = new FormData();
                form_data.append('ion_id', params.ionId);
                form_data.append('smiles', params.smiles);
                form_data.append('db_source', params.dbSource);
                form_data.append('db_id', params.dbId);
                $.ajax({
                    beforeSend: function(xhr){
                        xhr.setRequestHeader('Authorization', `Token ${access_token}`);
                    },
                    url: ENV.host + '/fragsamples/' + params.fragsample_id + '/add_annotation',
                    dataType: 'text',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form_data,
                    type: 'POST',
                    }).then((/*response*/) => {
                        run(function() {
                            self.updateData('frag-annotation');
                            self.refresh();
                            controller.set("modalAddAnnot",false);
                        });
                    }, (/*xhr, status, error*/) => {
                        //var response = xhr.responseText;
                        run(function() {
                          //reject(response);
                    });
                });
            },
        },
});
