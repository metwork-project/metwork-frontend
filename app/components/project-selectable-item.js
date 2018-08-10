import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  buttonType: computed( 'frame', function() {
    if (this.get('frame') == "selected") {
      return "btn-primary"
    } else {
      return "btn-secondary"
    }
  }),

  actions: {
    toggleItem: function() {
      if (this.project.get('editable')) {
        let self = this;
        let itemId = this.item.get('id');
        this.project
          .toggleItem({field: this.field ,id: parseInt(itemId)})
            .then(function(/*response*/) {
							self.updateDataComponentItem(self.dataLabel1);
							self.updateDataComponentItem(self.dataLabel2);
              self.project.reload();
            });
      }
    },
  }

});
