import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('grab-bag-controls', 'Integration | Component | grab bag controls', {
  integration: true
});

test('inputs are displayed', function(assert) {
  this.on('updateGrabBag', function() {});
  this.set('controls',
    [
      { name: 'period',
        displayName: 'Period',
        value: 4.0,
        step: 1.0,
        min: 2.0,
        max: 10.0
      },
      { name: 'scale',
        displayName: 'Scale',
        value: 2.0,
        step: 0.1,
        min:0.1,
        max: 3.0
      }
    ]
  );

  this.render(hbs`{{
    grab-bag-controls
    controls=controls
    updateGrabBag=(action "updateGrabBag")
  }}`);

  let periodInput = $("input[name='period']");
  let scaleInput = $("input[name='scale']");
  let periodLabel = $("label[for='period']");
  let scaleLabel = $("label[for='scale']");

  assert.equal(periodInput.attr('value'), 4.0);
  assert.equal(periodInput.attr('step'), 1.0);
  assert.equal(periodInput.attr('min'), 2.0);
  assert.equal(periodInput.attr('max'), 10.0);
  assert.equal(periodLabel.text(), 'Period');

  assert.equal(scaleInput.attr('value'), 2.0);
  assert.equal(scaleInput.attr('step'), 0.1);
  assert.equal(scaleInput.attr('min'), 0.1);
  assert.equal(scaleInput.attr('max'), 3.0);
  assert.equal(scaleLabel.text(), 'Scale');
});

test('updating input calls action', function(assert) {
  assert.expect(2);

  this.on('updateGrabBag', (name, event) => {
    assert.equal(name, 'period');
    assert.equal(event.target.value, 8.0);
  });

  this.set('controls',
    [
      { name: 'period',
        displayName: 'Period',
        value: 4.0,
        step: 1.0,
        min: 2.0,
        max: 10.0
      }
    ]
  );

  this.render(hbs`{{
    grab-bag-controls
    controls=controls
    updateGrabBag=(action "updateGrabBag")
  }}`);

  let input = this.$('input').first();

  input.val(8.0);
  input.trigger('input');
});
