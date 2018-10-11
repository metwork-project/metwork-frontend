import Component from '@ember/component';
export default Component.extend({

  itemLink: false,

  actions: {
      updateDataComponentAction(dataLabel) {
        this.updateDataComponent(dataLabel);
      },
      addAll() {
        if (this.project.get('editable')) {
          let this_ = this;
          this.project
            .addAll({dataLabel: this.dataLabel })
              .then(function(/*response*/) {
                this_.reloadLists()
              });
        }
      },
      removeAll() {
        if (this.project.get('editable')) {
          let this_ = this;
          this.project
            .removeAll({dataLabel: this.dataLabel })
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
      selectReactionsByMass() {
        if (this.project.get('editable')) {
          let this_ = this;
          this.project
            .selectReactionsByMass()
              .then(function(/*response*/) {
                this_.reloadLists()
              });
        }
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
          dataLabel: this.dataLabel,
          item_ids: this.project.get('toAddList')})
          .then(function(/*response*/) {
            this_.project.set('toAddList', [])
            this_.set('toAddCount', 0)
            this_.reloadLists()
            this_.set('selectAnotModal', false)
          });
      },
      reloadListsAction() {
        this.reloadLists()
      },
  },
//this.dataComponents['annotations
  reloadLists: function() {
    this.updateDataComponent(this.dataLabel + '-selected');
    this.updateDataComponent(this.dataLabel + '-available');
    this.project.reload();
  },

});
