import DS from 'ember-data';
import ENV from 'metwork-frontend/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { inject as service } from '@ember/service';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {

    host: ENV.host,
    namespace: ENV.APInameSpace,
    session: service('session'), 

    authorize(xhr) {
        let access_token = this.get('session.data.authenticated.token');
        xhr.setRequestHeader('Authorization', `Token ${access_token}`);
    }

});
