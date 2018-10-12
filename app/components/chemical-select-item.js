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

  canvasIdRoot: computed('dataLabel', function() {
    return 'select-' + this.dataLabel
  }),

  isSelected: computed('toggleAction', function() {
    return this.selectedPos() > -1
  }),

  routeToItem: computed('dataLabel', function() {
    return this.dataLabel + '.show'
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
        let this_ = this;
        let itemId = this.item.get('id');
        this.project
          .removeItem({
            dataLabel: this.dataLabel,
            item_ids: [ parseInt(itemId) ]})
            .then(function(/*response*/) {
              this_.reloadListsAction()
            });
      }
    },
  }

});
