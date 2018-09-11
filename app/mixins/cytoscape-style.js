import Mixin from '@ember/object/mixin';

export default Mixin.create({

  cyStyle: function() {

    let colors = {
      primary: '#073877',
      secondary: '#636a71',
      success: 'rgb(64,159,64)',
      warning: 'rgb(200,145,17)',
      danger: 'rgb(200,43,17)',
      info: 'rgb(83,139,214)',
    }

    return cytoscape.stylesheet()
      .selector('node')
        .css({
          'background-color': '#666',
          'label': 'data(name)',
          'text-valign':  'center',
          'text-halign':  'center',
          'text-outline-color':  '#666',
          'text-outline-width':  '2px',
          'color': '#fff',
        })
      .selector('node[nodeType = "reaction"]')
        .css({
          'shape': 'roundrectangle',
          'width': '60px',
          'background-color': colors.primary,
          'text-outline-color':  colors.primary,
        })
      .selector('node[nodeType = "molecule"]')
        .css({
          'shape': 'ellipse',
        })
      .selector('node[nodeType = "molecule"][annotation = "init"]')
        .css({
          'background-color': colors.success,
          'text-outline-color':  colors.success,
        })
        .selector('node[nodeType = "molecule"][annotation = "proposal"]')
          .css({
            'background-color': colors.warning,
            'text-outline-color':  colors.warning,
          })
      .selector('.node-select')
        .css({
          'text-outline-color':  colors.info,
          'background-color': colors.info,
        })
      .selector('edge')
        .css({
          'curve-style': 'bezier',
          'width': 4, //6,
          'line-color': '#ccc',
          // 'target-arrow-color': '#ccc',
          // 'target-arrow-shape': 'triangle',
          // 'arrow-scale': 1.5,
        })
      .selector('.highlight')
        .css({
          'line-color':  colors.info,
          'background-color': colors.info,
          'target-arrow-color': colors.info,
          'text-outline-color':  colors.info,
        })
  },

});
