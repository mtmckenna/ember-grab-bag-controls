import Ember from 'ember';

export default Ember.Controller.extend({
  controls: [
    {
      name: 'period',
      displayName: 'Period',
      value: 4.0,
      step: 0.1,
      min: 1.0,
      max: 10.0
    },
    {
      name: 'scale',
      displayName: 'Scale',
      value: 2.0,
      step: 0.1,
      min:0.1,
      max: 3.0
    }
  ],

  actions: {
    updateGrabBag: function(name, event) {
      let controls = this.get('controls');
      let controlIndex = controls.findIndex(function(element) {
        return element.name === name;
      });
      let value = event.target.value;
      let control = controls[controlIndex];
      Ember.set(control, 'value', value);
    }
  }
});
