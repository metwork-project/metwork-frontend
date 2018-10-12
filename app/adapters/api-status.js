import ApplicationAdapter from './application';
import ENV from 'metwork-frontend/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { inject as service } from '@ember/service';

export default ApplicationAdapter.extend(DataAdapterMixin,{

  host: ENV.host,
  namespace: ENV.APInameSpace,
  session: service('session'),

  authorize() {
  }

});
