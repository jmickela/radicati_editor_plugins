import { Plugin, icons } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';

export default class BlockquoteWithCitationUI extends Plugin {
  init() {
    const { editor } = this;

    editor.ui.componentFactory.add('blockquoteWithCitation', locale => {
      const view = new ButtonView(locale);

      view.set({
        label: 'Insert Call to Action',
        icon: icons.quote,
        tooltip: true,
      });

      this.listenTo( view, 'execute', () => editor.execute('insertBlockquoteWithCitation'));
      return view;
    });
  }
}