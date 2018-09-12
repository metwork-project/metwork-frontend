import Mixin from '@ember/object/mixin';

export default Mixin.create({

  loadTipContent: function(node) {
    switch (node.data('nodeType')) {
      case 'molecule':
        this.tipAnnotation(node);
        break;
      case 'reaction':
        this.tipReaction(node);
        break;
    }
  },

  updateTipContent: function(tip, newContent) {
    var tipContent =  $('#' + tip.popper.id + ' .content');
    tip.hide();
    tipContent.html(newContent);
    tip.show();
    return tipContent;
  },

  tipAnnotation: function(node) {
    var nodeId = node.data('id');
    var smiles = node.data('smiles');
    var cosine = node.data('cosine');
    var newContent =
      `<canvas
        class="ChemDoodleWebComponent"
        id="${nodeId}" width="200" height="200"
        alt="ChemDoodle Web Component"
        style="width: 100px; height: 100px; background-color: rgb(255, 255, 255);">
          This browser does not support HTML5/Canvas.
      </canvas>
      <p class='smiles-display'>
        <button type="button" class="btn btn-light btn-sm">Display smiles</button>
        <span class='value m-1'>
          ${smiles}
        <span>
      </p>
      <p class='cosine-display'>
        cosine : ${cosine}
      </p>`;

    var tipContent = this.updateTipContent(node.tip, newContent);

    var viewACS = new ChemDoodle.ViewerCanvas(nodeId, 200, 200);
    viewACS.specs.bonds_width_2D = .6;
    viewACS.specs.bonds_saturationWidthAbs_2D = 2.6;
    viewACS.specs.bonds_hashSpacing_2D = 2.5;
    viewACS.specs.atoms_font_size_2D = 10;
    viewACS.specs.atoms_font_families_2D = ['Helvetica', 'Arial', 'sans-serif'];
    viewACS.specs.atoms_displayTerminalCarbonLabels_2D = true;
    // var molfile =
    var moltarget = ChemDoodle.readMOL(node.data('molFile'));
    moltarget.scaleToAverageBondLength(14.4);
    viewACS.loadMolecule(moltarget);
    tipContent.children('.smiles-display').children('.btn').click( function (event) {
      $(event.target).parent().children().toggle();
    })

  },

  tipReaction: function(node) {
    let this_ = this;
    this_.get('store').findRecord(
      'reaction', node.data('reactionId'), { reload: true })
      .then( function (response) {
        response.getImage().then(function(response) {
           let newContent =`
             <div>
               ${response.data.image}
             </div>
             <p>${ node.data('name')}</p>
           `;
           var tipContent = this_.updateTipContent(node.tip, newContent);
           $('#' + node.tip.popper.id + ' svg').attr('width',200).attr('height',100).attr('viewBox', '0 0 400 200');
        });
      }
    );
  }

});
