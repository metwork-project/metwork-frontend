import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('register');

  this.route('metrun', { path: '/:metrun_id' });


  this.route('projects', function() {
    this.route('show', { path: '/:project_id' }, function() {
      this.route('data');
      this.route('info');
      this.route('metabolization');
      this.route('fragmentation');
    });
    this.route('new');
  });

  this.route('fragsamples', function() {
    this.route('show', { path: '/:fragsample_id' }, function() {
      this.route('info');
      this.route('annotations');
      this.route('network');
    });
  });
  this.route('frag-annotations');
  this.route('reactions', function() {
    this.route('show', { path: '/:reaction_id' });
    this.route('new');
  });

  this.route('documentation');

  this.route('users', function() {
    this.route('show', { path: '/:user_id' });
  });
});

export default Router;
