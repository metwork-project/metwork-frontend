import DS from 'ember-data';
//import { computed } from '@ember/object';
import moment from 'moment';
import { computed } from '@ember/object';
import {memberAction/*, collectionAction*/} from 'ember-api-actions';
import _ from 'underscore';
import { later } from '@ember/runloop'

export default DS.Model.extend({

	name: DS.attr('string', {
			defaultValue() {
					return `New project ${moment().format("MMM Do YY, hh:mm:ss")}`
			}
	}),
	description: DS.attr('string'),
	frag_sample: DS.belongsTo('fragsample'),
	status_code: DS.attr('number',
			{defaultValue: 0}),
	reaction_ids: DS.attr(),
	annotation_init_ids: DS.attr(),
	depth_total: DS.attr('number',
			{defaultValue: 0}),
	depth_last_match: DS.attr('number',
			{defaultValue: 0}),
	molecules_matching_count: DS.attr('number'),
	molecules_all_count: DS.attr('number'),
	REACTIONS_LIMIT: DS.attr('number'),
	frag_compare_conf_id: DS.attr('number'),

  reactions: DS.hasMany('reactions', {async: true}),

	didLoad: function(){
		this.poll();
	},

	poll: function() {
			var _this = this;
		if (this.get('runningOrQueue')) {
			later( function() {
				_this.reload();
				_this.poll();
			}, 2000);
		}
	},

	updateFragSample: memberAction({
			path: 'update_frag_sample',
			type: 'patch' }),

	statusRef: function() {
		return {
			0: 'INIT',
			1: 'READY',
			2: 'QUEUE',
			3: 'RUNNING',
			4: 'DONE',
			99: 'ERROR',
		}
	},

	allStatusInfo: function() {
		return {
			INIT:	 {libelle: 'Initialized', class: 'secondary'},
			READY:	{libelle: 'Ready to run' , class: 'info'},
			QUEUE:	{libelle: 'Queued' , class: 'warning'},
			RUNNING: {libelle: 'Running', class: 'warning'},
			DONE:		{libelle: 'Run finished', class: 'primary'},
			ERROR:	 {libelle: 'Error', class: 'danger'},
		}
	},

	depthLimits: function() {
		return {
			depth_total: 10,
			depth_last_match: 0,
		}
	},

	okDepth: computed('depth_total', 'depth_last_match', function() {
			return (0 <= this.get('depth_total'))
					&&
					(this.get('depth_total') <= this.depthLimits().depth_total)
					&&
					(0 <= this.get('depth_last_match'))
					&&
					(this.get('depth_last_match') <= this.depthLimits().depth_last_match);
	}),

	statusInfo: computed('status_code', function() {
			return this.allStatusInfo()[
					this.statusRef()[
							this.get('status_code') ] ];
	}),

	hasSample: computed('frag_sample', function() {
			return this.get('frag_sample') ;
	}),

	editable: computed('status_code', function() {
			return this.get('status_code') < (_.invert(this.statusRef())).RUNNING;
	}),

	saved: computed('isNew', function() {
			return !this.get('isNew');
	}),

	saveOrCreate: computed('isNew', function() {
			if (this.get('isNew')) {
					return {libelle: 'Create Project', class:'success'};
			} else {
					return {libelle: 'Save Info', class:'primary'};
			}
	}),

	readyToRun: computed('status_code', function() {
			return this.get('status_code') == (_.invert( this.statusRef() )).READY;
	}),

	running: computed('status_code', function() {
			return this.get('status_code') == (_.invert( this.statusRef() )).RUNNING
	}),

	runningOrQueue: computed('status_code', function() {
			return this.get('status_code') == (_.invert( this.statusRef() )).RUNNING ||
			this.get('status_code') == (_.invert(this.statusRef())).QUEUE;
	}),

	runFinish: computed('status_code', function() {
			return this.get('status_code') == (_.invert( this.statusRef() )).DONE;
	}),

	runOrFinish: computed('status_code', function() {
			return this.get('status_code') >= (_.invert( this.statusRef() )).RUNNING;
	}),

	cloneProject: memberAction({ path: 'clone_project', type: 'post' }),

	addAll: memberAction({ path: 'add_all', type: 'patch' }),

	addItems: memberAction({ path: 'add_items', type: 'patch' }),

	removeAll: memberAction({ path: 'remove_all', type: 'patch' }),

	removeItem: memberAction({ path: 'remove_item', type: 'patch' }),

	selectReactionsByMass: memberAction({ path: 'select_reactions_by_mass', type: 'patch' }),

	updateFragCompareConf: memberAction({ path: 'update_frag_compare_conf', type: 'patch' }),

	startRun: memberAction({ path: 'start_run', type: 'post' }),

	metabolizationNetwork: memberAction({ path: 'metabolization_network', type: 'get' }),

	downloadFile: memberAction({
		path: 'download_file',
		type: 'get'
	}),

});
