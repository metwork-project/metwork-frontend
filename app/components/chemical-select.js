import Component from '@ember/component';

export default Component.extend({

  actions: {
      updateDataComponentAction: function(dataLabel) {
        this.updateDataComponent(dataLabel);
      },
      removeAll: function() {
        if (this.project.get('editable')) {
          let self = this;
          this.project
            .removeAll({field: this.field })
              .then(function(/*response*/) {
  							self.updateDataComponent(self.dataLabel1);
  							self.updateDataComponent(self.dataLabel2);
                self.project.reload();
              });
        }
      },
  },

});
