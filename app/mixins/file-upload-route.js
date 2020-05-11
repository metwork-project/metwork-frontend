import Mixin from '@ember/object/mixin';
import ENV from 'metwork-frontend/config/environment';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Mixin.create({

    session: service('session'),

    actions: {
        uploadFile: function (component) {

            let self = this;
            let access_token = this.get('session.data.authenticated.token');
            let form_data = new FormData();
            let fileData = component.fileData;
            form_data.append('file_data', fileData);
            form_data.append('file_name', fileData.name);
            if (component.fileFormat) {
                form_data.append('file_format', component.fileFormat);
            }
            if (component.metaDatas) {
                let $metaData = component.getModal().find('.meta-data');
                component.metaDatas.map(function (meta) {
                    form_data.append(meta.field, $metaData.find('.' + meta.field).val());
                });
            }
            component.toggleModal(false);
            let base_url = ENV.host;
            if (ENV.APInameSpace != '') {
                base_url += '/' + ENV.APInameSpace
            }
            $.ajax({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', `Token ${access_token}`);
                },
                url: base_url + '/' + component.routeLabel,
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'POST',
            }).then((response) => {
                run(function () {
                    if (component.dataLabel) {
                        self.updateData(component.dataLabel);
                    }
                    self.refresh();
                    let resp = JSON.parse(response);
                    if (resp.data.error) {
                        $('.import-alert').text(resp.data.error).toggle(true);
                        component.set('uploading', false);
                        component.set('editing', true);
                    } else {
                        component.set("modalDisplay", false);
                    }
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
