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

    editor.ui.componentFactory.add( 'insertCTABackground', (locale) => {
      const command = editor.commands.get('insertRadCallToActionBackground');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: 'Insert Background Image',
        // iconAddAbove,
        tooltip: false,
        withText: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
          editor.execute( 'insertRadCallToActionBackground' ),
      );

      return buttonView;
    } );

    editor.ui.componentFactory.add( 'removeCTABackground', (locale) => {
      const command = editor.commands.get('removeRadCallToActionBackground');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: 'Remove Background Image',
        // iconAddAbove,
        tooltip: false,
        withText: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
          editor.execute( 'removeRadCallToActionBackground' ),
      );

      return buttonView;
    } );
  }
}