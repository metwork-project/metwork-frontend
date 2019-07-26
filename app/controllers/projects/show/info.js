import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({

  currentUser: service('current-user'),

  isOwner: computed('currentUser.user.id', function() {
    return this.model.get('user_id') == this.get('currentUser').getId()
  }),

  actions: {
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
                //  console.log('error');
                //} else {
                if (response.data.clone_id) {
                  self.send('redirectToProject', response.data.clone_id);
                }
            });
    },
    getFile(request, fileName) {
       this.send(
        'downloadFile',
        this.model,
        request,
        "text/plain;charset=utf-8",
        fileName);
    },
  }

});
