import { on } from "ember-addons/ember-computed-decorators";

export default Ember.Component.extend({
  tagName: 'label',

  didInsertElement() {
    this._super();

    const checked = this.get('checked');
    if (checked && checked !== "false") {
      this.$('input').prop('checked', true);
    }

    // In Ember 13.3 we can use action on the checkbox `{{input}}` but not in 1.11
    this.$('input').on('click.d-checkbox', () => {
      Ember.run.scheduleOnce('afterRender', () => this.sendAction('change', this.$('input').prop('checked')));
    });
  },

  @on('willDestroyElement')
  willDestroyElement() {
    this._super();
    this.$('input').off('click.d-checkbox');
  }
});
