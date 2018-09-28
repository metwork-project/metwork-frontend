import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  canvasDim: function() {
    var dic = {
      molecule: [200, 200],
      reaction: [600,350]
    }
    return dic[this.chemType]
  },

  getCanvasIdIndex: computed('index', function() {
    if (this.get('index')) {
      this.set('canvasId', this.get('canvasId') + this.get('index'))
    }
  }),

  displayChemical: computed('model.chemdoodle_json', 'dataJSON', function() {
    ChemDoodle.default_atoms_useJMOLColors = true;
    if (this.get('model.chemdoodle_json')) {
      var dataJSON = this.get('model.chemdoodle_json')
    } else {
      var dataJSON = this.get('dataJSON')
    }
    if (dataJSON) {
      var jsi = new ChemDoodle.io.JSONInterpreter();
      if (this.chemType === 'reaction') {
        var viewACS = new ChemDoodle.ViewerCanvas(
          this.get('canvasId'),
          this.canvasDim()[0],
          this.canvasDim()[1]);
        if (this.noLabel) {
          let line = {}
          dataJSON.s.map(function(shape, index) {
            if (shape.t === 'Line') {
              line = shape
            }
          });
          dataJSON.s = [line]
        }
        var target = jsi.contentFrom(dataJSON)
        if (! this.noLabel) {
          var l = 0
          target.shapes.map(function(shape, index) {
            shape.label = l
            shape.error = true
            l += 1
          })
        }
        viewACS.loadContent(target.molecules, target.shapes);
      } else if (this.chemType === 'molecule') {
        var viewACS = new ChemDoodle.TransformCanvas(
          this.get('canvasId'),
          this.canvasDim()[0],
          this.canvasDim()[1]);
        var target = jsi.molFrom(dataJSON)
        viewACS.loadMolecule(target);
      }
    }
    this.set('viewACS', viewACS)

  })

});
