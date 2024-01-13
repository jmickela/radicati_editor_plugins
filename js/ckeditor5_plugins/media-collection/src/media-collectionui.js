import { Plugin, icons } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';

export default class MediaCollectionUI extends Plugin {
  init() {
    const { editor } = this;

    editor.ui.componentFactory.add('mediaCollection', locale => {
      const view = new ButtonView(locale);

      view.set({
        label: 'Insert Media Collection',
        icon: icons.quote,
        tooltip: true,
      });

      this.listenTo( view, 'execute', () => editor.execute('insertMediaCollection'));
      return view;
    });

    // TOOLBAR BUTTONS!!

    editor.ui.componentFactory.add( 'mediaItemInsertAbove', (locale) => {
      const command = editor.commands.get('mediaItemInsertAbove');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: 'Insert Media Item Before',
       // iconAddAbove,
        tooltip: false,
        withText: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
          editor.execute( 'mediaItemInsertAbove' ),
      );

      return buttonView;
    } );
  }
}