import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  sketcher: null,
  sketcherReady: false,

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

  udpdateEvaluateJSONStatus: computed('evaluateJSONStatus', function() {
      if ( this.get('sketcher') ) {
        var mols = this.get('sketcher').getMolecules();
        var shapes = this.get('sketcher').shapes;
        // this line converts the Molecule data structure to the JSON protocol Javascript object
        var molJSON = new ChemDoodle.io.JSONInterpreter().contentTo(mols, shapes);
        // this.updateJSON(molJSON)
        this.model.set('chemdoodle_json', molJSON)
        this.sendAction('saveModel', true)
      }
  }),

  loadEditor: function() {
    ChemDoodle.default_atoms_useJMOLColors = true;
    var sketcher = new ChemDoodle.SketcherCanvas(
      this.get('canvasId'), 600, 350, {useServices:false, includeQuery: true})
    // sketcher.checksOnAction()
    this.set('sketcher', sketcher);
    if (! this.get('sketcherReady')) {
      this.model.reload()
      this.set('sketcherReady', true)
    }
    let this_=this
    setTimeout(function(){
      $('#' + this_.elementId + ' .molecule-editor-loader').hide()
      $('#' + this_.elementId + ' .molecule-editor-sketcher').show()
       }, 500);
  },

  loadJSON: computed('model.chemdoodle_json', function() {
    var dataJSON = this.model.get('chemdoodle_json')
    if (dataJSON) {
      var jsi = new ChemDoodle.io.JSONInterpreter();
      var target = jsi.contentFrom(dataJSON);
      var sketcher = this.get('sketcher')
      if (sketcher && target.molecules.length > 0) {
          // sketcher.loadContent(target.molecules, target.shapes);
          sketcher.historyManager.pushUndo(
            new ChemDoodle.uis.actions.SwitchContentAction(
              sketcher, target.molecules, target.shapes) );
      }
    }
  }),

  actions: {
    loadSmarts() {
      var this_ = this
      var smarts = $('.modal.' + this.get('modalId') + ' .smarts-value')[0].value
      this.model.loadSmarts({smarts: smarts})
        .then(function(response) {
          this_.set('smartsModal', false);
          if (response.data.success) {
            this_.model.set('dataJSON', response.data.success);
        }
      })
    },
  },

});
