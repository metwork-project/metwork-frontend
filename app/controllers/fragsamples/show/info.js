import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    save_fragsample () {
        this.model.save();
    },
    getFile(request) {
        this.send(
          'downloadFile',
          this.model,
          request,
          "text/plain;charset=utf-8",
          this.model.get('file_name'));
      },
  }

});
