import DS from 'ember-data';
//import {memberAction, collectionAction} from 'ember-api-actions';
import { computed } from '@ember/object';
import { later } from '@ember/runloop'
import _ from 'underscore';

export default DS.Model.extend({
	name: DS.attr(),
	file_name: DS.attr(),
	description: DS.attr(),
	//project: DS.belongsTo('project'),
	ions_count: DS.attr('number'),
	ions_total: DS.attr('number'),
	annotations_count: DS.attr(),
	//annotations: DS.hasMany('frag-annotation', { async: true }),
	has_no_project: DS.attr(),
	status_code: DS.attr('number',
			{defaultValue: 0}),

	didLoad: function(){
		this.poll();
	},

	poll: function() {
			var _this = this;
		if (!this.get('importFinish')) {
			later( function() {
				_this.reload(); 
				_this.poll();
			}, 1000);
		}
	},

	statusRef: function() {
		return {
			0: 'INIT',
			1: 'READY',
			2: 'RUNNING',
			3: 'DONE',
			99: 'ERROR',
		}
	},

	annotationFileFormats: computed( function() {
		return [
			{label: 'default', description: '.csv file with format : nodeId,name,smiles,source,sourceId'},
			{label: 'GNPS', description: '.tsv file in "result_specnets_DB" folder of cytoscape data from GNPS'},
			];
	}),

	allStatusInfo: function() {
		return {
			INIT:	 {libelle: 'Initalized', class: 'secondary'},
			READY:	{libelle: 'Ready to import' , class: 'info'},
			RUNNING: {libelle: 'Import on-going', class: 'warning'},
			DONE:		{libelle: 'Import finished', class: 'primary'},
			ERROR:	 {libelle: 'Error', class: 'danger'},
		}
	},

	importFinish: computed('status_code', function() {
			return this.get('status_code') == (_.invert(this.statusRef())).DONE;
	}),

	loadingRatio: computed('ions_count', function() {
	let value = Math.round( this.get('ions_count') / this.get('ions_total') * 100 );
	return {
		valueNow: value,
		style: ("width: " + value + "%").htmlSafe()
	}
	}),


});
