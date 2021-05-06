import Route from '@ember/routing/route';
import $ from 'jquery';
import ENV from 'metwork-frontend/config/environment';
import { run } from '@ember/runloop';
import PaginatedRouteMixin from 'metwork-frontend/mixins/paginated-route';
import FileUploadRouteMixin from 'metwork-frontend/mixins/file-upload-route';
import FileDownloadMixin from 'metwork-frontend/mixins/file-download';


export default Route.extend(
    PaginatedRouteMixin,
    FileDownloadMixin,
    FileUploadRouteMixin, {

    model() {
        return this.modelFor('fragsamples.show')
    },

    setupController(controller, model) {
        this._super(...arguments);
        model.set('activeNav', 'annotations')
    },

    actions: {
        addAnnotationQuery: function (params, controller) {
            let self = this;
            let access_token = this.get('session.data.authenticated.token');
            let form_data = new FormData();
            form_data.append('ion_id', params.ionId);
            form_data.append('smiles', params.smiles);
            form_data.append('db_source', params.dbSource);
            form_data.append('db_id', params.dbId);
            $.ajax({
                beforeSend: function (xhr) {
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
                run(function () {
                    self.updateData('frag-annotation');
                    self.refresh();
                    controller.set("modalAddAnnot", false);
                });
            }, (/*xhr, status, error*/) => {
                //var response = xhr.responseText;
                run(function () {
                    //reject(response);
                });
            });
        },
    },

});
