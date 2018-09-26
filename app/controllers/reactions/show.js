import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { computed } from '@ember/object';

export default Controller.extend({

    image: "",
    currentUser: service('current-user'),
    editReaction: false,
    chemDoodleJSONStatus: 'stop',

    editMode: computed('model.status_code', 'editReaction', function() {
      return this.model.get('isReadyToActive') && this.get('editReaction')
        || this.model.get('isEditable') && ! this.model.get('isReadyToActive')
    }),

    editInfo: computed('model.status_code', 'editReaction', function() {
      if (this.get('editReaction')) {
        return { btnType: 'secondary', label: 'Cancel Edit' }
      } else {
        return { btnType: 'warning', label: 'Edit Reaction' }
      }
    }),

    mainBtnInfo: computed('model.status_code', 'editReaction', function() {
      if (this.model.get('isNew')) {
        return {
          btnType: 'success',
          label: 'Create Reaction',
          action: this.saveReaction}
      } else if ( this.model.get('isEditing') || this.model.get('isActive') ) {
        return {
          btnType: 'primary',
          label: 'Save Reaction',
          action: 'saveReaction'}
      } else if ( this.model.get('isReadyToActive') ) {
        return {
          btnType: 'warning',
          label: 'Edit Reaction',
          action: this.editReaction}
      }
    }),

    actions: {
      saveReaction () {
        let this_ = this;
        let isNew = this.model.get('isNew');
        this_.model.save().then(function() {
          this_.set('chemDoodleJSONStatus', 'requested');
          if (isNew) {
            this_.model.set('user', this_.get('currentUser').user)
            let id = this_.model.get('id');
            this_.get('target').transitionTo('/reactions/'+ id);
          }
          this_.getImage();
        });
      },
      updateChemDoodleJSON(molJson) {
        let this_ = this;
        this_.model.evaluateJson( molJson ).then(function() {
          this_.set('chemDoodleJSONStatus', 'stop');
          this_.model.reload();
        })
      },
      editReaction() {
        this.model.set('status_code', this.model.statusRef().EDIT.code)
      },
      runReaction() {
          let self = this;
          this.model.runReaction({smiles: this.reactants})
              .then(function(response) {
              let display = response.data.products.reduce(
                  function (disp, value, ind) {
                      if (ind === 0) {
                          return value;
                      } else {
                          return disp + '\n' +  value;
                      }
                  }, '')
              self.set('products',display);

          });
      },
    },
    getImage: function() {
        let self = this;
        self.set('image', '');
        if(this.model.get('is_reactor')) {
          this.model.getImage()
              .then(function(response) {
                  self.set('image', response.data.image);
              });
        }
    },

});
