import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { computed } from '@ember/object';

export default Controller.extend({

    image: "",
    currentUser: service('current-user'),
    editReaction: false,
    saveReactionComponent: 0,
    saveReactantsComponent: 0,
    sketcherReady: false,

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
      this.set('errorReactionMessage', false)
      this.set('products', false)
      if (this.model.get('isNew')) {
        return {
          btnType: 'success',
          label: 'Create Reaction',
          action: 'saveReaction',
          icon: 'save'}
      } else if ( this.model.get('isEditing') /*|| this.model.get('isActive') */) {
        return {
          btnType: 'primary',
          label: 'Save Reaction',
          action: 'saveReaction',
          icon: 'save'}
      } else if ( this.model.get('isReadyToActive') ) {
        return {
          btnType: 'warning',
          label: 'Edit Reaction',
          action: 'editReaction',
          icon: 'create'}
      } else {
        return false
      }
    }),

    actions: {
      saveReaction (JSONUpdated) {
        if (JSONUpdated) {
          this.set('products', false)
          let this_ = this;
          let isNew = this.model.get('isNew');
          if (isNew) {
            this_.model.set('user', this_.get('currentUser').user)
          }
          this_.model.save().then(function() {
            if (isNew) {
              let id = this_.model.get('id');
              this_.get('target').transitionTo('/reactions/'+ id);
            }
            this_.getImage();
            var chemdoodle_json_error = this_.model.get('chemdoodle_json_error')
            if (chemdoodle_json_error) {
              this_.set('errorSaveMessage',
                `Error in drawing reaction : ${chemdoodle_json_error}`)
            } else {
              this_.set('errorSaveMessage',false)
            }
          }, function (echec) {
            this_.set('errorSaveMessage', echec.errors[0].detail)
          });
        } else {
          this.set('saveReactionComponent', this.get('saveReactionComponent') + 1);
        }
      },
      editReaction() {
        this.model.set('status_code', this.model.statusRef().EDIT.code)
        this.model.save()
      },
      runReaction(JSONUpdated) {
        let this_ = this;
        if (JSONUpdated) {
          if (this.reactants.get('chemdoodle_json').m) {
            this.model.runReaction({reactants: this.reactants})
              .then(function(response) {
                var products = response.products
                var reactants = response.reactants
                if (products.length === 0) {
                  this_.set('errorReactionMessage', 'no products with this(those) reactant(s)')
                } else {
                  this_.set('products', products)
                  this_.set('reactantsJSON', reactants)
                  this_.set('errorReactionMessage', false)
                }
            })
          } else {
            this_.set('errorReactionMessage', 'no reactant')
          }

        } else {
          this.set('saveReactantsComponent', this.get('saveReactantsComponent') + 1);
        }
      },
      validateReaction() {
        var this_ = this
        this.model.set('status_code', this.model.statusRef().ACTIVE.code)
        this.model.save().then(function() {
          this_.model.reload()
        })
      },
      obsoleteReaction() {
        var this_ = this
        this.model.set('status_code', this.model.statusRef().OBSOLETE.code)
        this.model.save().then(function() {
          this_.model.reload()
        })
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
