import Controller from '@ember/controller';

export default Controller.extend({

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
        'projects.show',
        request,
        "text/plain;charset=utf-8",
        fileName);
    },
  }

});
