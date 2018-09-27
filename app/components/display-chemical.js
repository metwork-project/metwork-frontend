import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  displayChemical: computed('model.chemdoodle_json', function() {
    ChemDoodle.default_atoms_useJMOLColors = true;
    let viewACS = new ChemDoodle.ViewerCanvas(this.canvasId, 600, 350);
    this.set('viewACS', viewACS)
    var dataJSON = this.get('model.chemdoodle_json')
    if (dataJSON) {
      var jsi = new ChemDoodle.io.JSONInterpreter();
      var target = jsi.contentFrom(dataJSON)
      this.viewACS.loadContent(target.molecules, target.shapes);
    }
  })

});
