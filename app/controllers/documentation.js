import Controller from '@ember/controller';
import ENV from '../config/environment'

export default Controller.extend({

  envServerName: ENV.serverName,

});
