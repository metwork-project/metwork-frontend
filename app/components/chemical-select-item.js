import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  classNames: ['d-inline-block', 'chemical-select-item', 'position-relative'],
  classNameBindings: ['selectedClass'],

  selectedClass: computed('toggleAction', function() {
    if (this.get('isSelected')) {
      return 'selected'
    }
  }),

  isSelected: computed('toggleAction', function() {
    return this.selectedPos() > -1
  }),

  selectedPos: function() {
    if (this.project.toAddList) {
      return this.project.toAddList.indexOf(this.item.id)
    } else {
      return -1
    }
  },

  actions: {
    toggleItem() {
      this.toggleItemComponent(this.item.id)
      this.set('toggleAction', !this.toggleAction)
    },
    removeItem() {
      if (this.project.get('editable')) {
        let self = this;
        let itemId = this.item.get('id');
        this.project
          .removeItem({field: this.field ,id: parseInt(itemId)})
            .then(function(/*response*/) {
							self.updateDataComponentItem(self.dataLabel1);
							self.updateDataComponentItem(self.dataLabel2);
              self.project.reload();
            });
      }
    },
  }

});
