import Component from '@ember/component';
import { computed } from '@ember/object';
export default Component.extend({

  actions: {
      updateDataComponentAction(dataLabel) {
        this.updateDataComponent(dataLabel);
      },
      addAll() {
        if (this.project.get('editable')) {
          let this_ = this;
          this.project
            .addAll({field: this.field })
              .then(function(/*response*/) {
                this_.reloadLists()
              });
        }
      },
      removeAll() {
        if (this.project.get('editable')) {
          let this_ = this;
          this.project
            .removeAll({field: this.field })
              .then(function(/*response*/) {
                this_.reloadLists()
              });
        }
      },
      displayAvailable() {
        this.project.set('toAddList', [])
        this.set('toAddCount', 0)
        this.set('selectAnotModal', true)
      },
      toggleItemList(itemId) {
        if (! this.project.get('toAddList')) {
          this.project.set('toAddList', [])
        }
        var list = this.project.get('toAddList')
        var selectedPos = list.indexOf(itemId)
        if (selectedPos > -1) {
          list.splice(selectedPos, 1)
        } else {
          list.push(itemId)
        }
        this.set('toAddCount', list.length)
      },
      addItems() {
        var this_ = this
        this.project.addItems({
          field: this.field,
          item_ids: this.project.get('toAddList')})
          .then(function(/*response*/) {
            this_.project.set('toAddList', [])
            this_.set('toAddCount', 0)
            this_.reloadLists()
            this_.set('selectAnotModal', false)
          });
      },
  },

  reloadLists: function() {
    this.updateDataComponent(this.dataLabel1);
    this.updateDataComponent(this.dataLabel2);
    this.project.reload();
  },

});
