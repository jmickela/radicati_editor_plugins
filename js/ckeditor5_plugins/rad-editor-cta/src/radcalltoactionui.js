import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../icon/cta.svg';

export default class RadCallToActionUI extends Plugin {
  init() {
    const { editor } = this;

    editor.ui.componentFactory.add('radCallToAction', locale => {
      const view = new ButtonView(locale);

      view.set({
        label: 'Insert Call to Action',
        icon,
        tooltip: true,
      });

      this.listenTo( view, 'execute', () => editor.execute('insertRadCallToAction'));

      return view;
    });
  }
}