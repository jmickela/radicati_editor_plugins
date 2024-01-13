import { Command } from 'ckeditor5/src/core';

export default class InsertRadCtaBackgroundCommand extends Command {

  execute() {

        this.editor.model.change( writer => {
          const selection = this.editor.model.document.selection;
          const selectedElement = selection.getSelectedElement();

          const ctaBackground = writer.createElement( 'radCallToActionBackground' );
          writer.insert( ctaBackground, selectedElement);

          writer.setSelection(ctaBackground, 0);
          writer.setAttribute('hasBackground', true,  selectedElement);

          this.insertMedia(this.editor);
        } );
    }

    refresh() {
      const model = this.editor.model;
      const selection = model.document.selection;
      const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'radCallToAction' );
      let hasBackground = false;

      const selectedElement = selection.getSelectedElement();
      if(selectedElement) {
        const childrenArray = Array.from(selectedElement.getChildren());
        hasBackground = !! childrenArray.find(child => child.name === 'radCallToActionBackground');
      }

      this.isEnabled = allowedIn !== null && !hasBackground;
    }

  insertMedia(editor) {
    const options = editor.config.get('drupalMedia');
    if (!options) {
      return;
    }

    const { libraryURL, openDialog, dialogSettings = {} } = options;
    if (!libraryURL || typeof openDialog !== 'function') {
      return;
    }
    openDialog(
        libraryURL,
        ({ attributes }) => {
          editor.execute('insertDrupalMedia', attributes);
        },
        dialogSettings,
    );
  }


}