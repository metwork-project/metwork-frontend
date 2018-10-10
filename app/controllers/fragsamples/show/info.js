import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    save_fragsample () {
        this.model.save();
    },
  }

});
