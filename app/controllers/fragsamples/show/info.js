import FileManagerController from '../../file-manager-controller';

export default FileManagerController.extend({

  actions: {
    save_fragsample() {
      this.model.save();
    },
  }

});
