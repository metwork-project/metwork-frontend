import Mixin from '@ember/object/mixin';

export default Mixin.create({

  activateOption: function(cy, option) {

    let getAllConnections = function(nodeTarget, graphStyle) {
      switch (graphStyle) {
        case 'molecular':
          return nodeTarget.union(nodeTarget.incomers()).union(nodeTarget.outgoers());
        default:
          return nodeTarget.union(nodeTarget.predecessors()).union(nodeTarget.successors());

      }
    };

    switch (option) {
      case 'filter':
        cy.nodes().on('taphold', function(evt) {
          cy.onHold = true;
          cy.nodes('.node-select').removeClass('node-select');
          let nodeTarget = evt.target;
          let nodeTargetPosBegin = nodeTarget.position();
          nodeTarget.addClass('node-select');
          if (nodeTarget.hasTippy) {
              nodeTarget.tippy.hide();
          }

          cy.elements('.shown-init').removeClass('shown-init');
          cy.elements(':visible').addClass('shown-init');

          cy.elements('.hidden-init').removeClass('hidden-init');
          cy.elements(':hidden').addClass('hidden-init');

          cy.elements().addClass('to-hide');
          cy.elements('.to-show').removeClass('to-show');
          nodeTarget.addClass('to-show');
          nodeTarget.predecessors().addClass('to-show');
          nodeTarget.successors().addClass('to-show');
          cy.elements('.to-show').removeClass('to-hide');

          var elementsToShow =  cy.elements('.to-show')

          var nodes = cy.nodes();
          // var nodesShownBegin = cy.nodes(':visible');
          var posBegin = {};
          var posEnd = {};
          var opacity = {};
          for( var i = 0; i < nodes.length; i++ ) {
            var n = nodes[i];
            var p = n.position();
            posBegin[ n.id() ] = { x: p.x, y: p.y };
          }

          var animateNode = function(positions) {

            cy.edges('.to-show').animate({
              style: {opacity: 1},
              duration: 1000,
            });

            var nodesToShow = cy.nodes('.to-show')
            for( var i = 0; i < nodesToShow.length; i++ ) {
              var n = nodesToShow[i];
              n.animate({
                style: {opacity: 1},
                position: positions[ n.id() ],
                duration: 1000,
              }).delay(1000, function(){
                cy.onHold = false;
                cy.elements().style('opacity', null)
              });
            }

          }
           cy.startBatch();

            cy.elements('.to-show').show();

            var l = elementsToShow.layout({
                    name: 'cose',
                    nodeRepulsion: 400000,
                    animate: true,
            })

            l.on('layoutstop', function() {
              for( var i = 0; i < nodes.length; i++ ){
                var n = nodes[i];
                var p = n.position();
                posEnd[ n.id() ] = { x: p.x, y: p.y };
                if (n.hasClass('to-show')) {
                  opacity[ n.id() ] = 1;
                } else {
                  opacity[ n.id() ] = 0;
                }
              }

              cy.animate({
                fit: {
                  eles: elementsToShow,
                  padding: 20
                }
                }, {
                duration: 1000,
              });

              nodes.positions( function (n/*, i*/) {
                return posBegin[ n.id() ];
              });

              cy.nodes('.hidden-init').positions( function() {
                return nodeTargetPosBegin;
              })

              cy.fit(cy.elements('.shown-init'),20)

              cy.elements('.to-hide').hide();

              animateNode( posEnd );
            })

            cy.elements('.hidden-init').style('opacity',0.001);
            cy.elements('.to-hide').style('opacity',0.001);

            l.run();


           cy.endBatch();

        });
          break;
      case 'highlight':
        cy.nodes().on('mouseover', function(evt) {
          cy.startBatch()
            let nodeTarget = evt.target;
            let allConnections = getAllConnections(nodeTarget, cy.graphStyle);
            // .addClass('highlight');
            cy.elements().difference(allConnections).addClass('downlight');
          cy.endBatch();
        });

        cy.nodes().on('mouseout', function(evt) {
          // cy.elements().removeClass('highlight');
          cy.elements().removeClass('downlight');
        });
        break;
      case 'tippy':
        cy.tippyActivated = true;
    }
  }

  // },

});
