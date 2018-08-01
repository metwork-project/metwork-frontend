import Component from '@ember/component';

export default Component.extend({

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
