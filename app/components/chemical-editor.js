import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({

  sketcher: null,
  sketcherReady: false,

  canvasDim: function() {
    var dic = {
      molecule: [400, 300],
      reaction: [600,350]
    }
    return dic[this.chemType]
  },

  didRender() {
    this._super(...arguments);
    if (! this.get('editorLoaded')) {
      this.loadEditor();
    }
    this.set('editorLoaded', true)
  },

  canvasId: computed('skecthId', function() {
    return this.get('skecthId') + '-canvas'
  }),

  modalId: computed('skecthId', function() {
    return this.get('skecthId') + '-modal'
  }),

  loadEditor: function() {
    ChemDoodle.default_atoms_useJMOLColors = true;
    let includeQuery = this.chemType === 'reaction'
    var sketcher = new ChemDoodle.SketcherCanvas(
      this.get('canvasId'),
        this.canvasDim()[0],
        this.canvasDim()[1],
        {useServices:false, includeQuery: includeQuery})
    this.set('sketcher', sketcher);
    if (! this.get('sketcherReady')) {
      this.model.chemdoodle_json = this.model.chemdoodle_json
      // this.model.reload()
      this.set('sketcherReady', true)
    }
    let this_=this
    setTimeout(function(){
      $('#' + this_.elementId + ' .molecule-editor-loader').hide()
      $('#' + this_.elementId + ' .molecule-editor-sketcher').show()
       }, 500);
  },

  saveModelTrigger: computed('saveModelComponent', function() {
    if ( this.get('sketcher') ) {
      var mols = this.get('sketcher').getMolecules();
      var shapes = this.get('sketcher').shapes;
      // this line converts the Molecule data structure to the JSON protocol Javascript object
      var molJSON = new ChemDoodle.io.JSONInterpreter().contentTo(mols, shapes);
      this.model.set('chemdoodle_json', molJSON)
      this.evaluateAction(true)
    }
  }),

  loadJSON: computed('model.chemdoodle_json', 'sketcherReady', function() {
    var dataJSON = this.model.get('chemdoodle_json')
    if (dataJSON) {
      if ( this.chemType == 'molecule') {
        dataJSON = { m:dataJSON, s:[] }
      }
      var jsi = new ChemDoodle.io.JSONInterpreter();
      var target = jsi.contentFrom(dataJSON);
      var sketcher = this.get('sketcher')
      if (sketcher && target.molecules.length > 0) {
        if ( this.chemType == 'reaction') {
          // sketcher.loadContent(target.molecules, target.shapes);
          sketcher.historyManager.pushUndo(
            new ChemDoodle.uis.actions.SwitchContentAction(
              sketcher, target.molecules, target.shapes) );
        } else if ( this.chemType == 'molecule') {
          sketcher.loadContent(target.molecules, target.shapes);
        }
      }
    }
  }),

  actions: {
    loadSmarts() {
      var this_ = this
      var smarts = $('.modal.' + this.get('modalId') + ' .smarts-value')[0].value
      if (this.chemType === 'molecule') {
        this.model.loadSmiles({smiles: smarts})
          .then(function(response) {
            if (response.success) {
              this_.model.set(
                'chemdoodle_json',
                response.success);
              this_.set('smartsModal', false)
            }
          })
      } else if (this.chemType === 'reaction') {
        this.model.loadSmarts({smarts: smarts})
          .then(function(response) {
            this_.set('smartsModal', false);
            if (response.success) {
              this_.model.set(
                'chemdoodle_json',
                response.success);
              this_.set('smartsModal', false)
              this_.model.reload()
          }
        })
      }
    },
  },

});
