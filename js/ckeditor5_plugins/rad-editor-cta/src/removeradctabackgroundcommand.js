import { Command } from 'ckeditor5/src/core';

export default class RemoveRadCtaBackgroundCommand extends Command {

  execute() {
        this.editor.model.change( writer => {
          const selection = this.editor.model.document.selection;
          const selectedElement = selection.getSelectedElement();

          // find the radCallToActionBackground element under the selected element
          let ctaBackground = null;
          if(selectedElement) {
            const childrenArray = Array.from(selectedElement.getChildren());
            ctaBackground = childrenArray.find(child => child.name === 'radCallToActionBackground');
          }

          // if we found the radCallToActionBackground element, remove it
          if(ctaBackground) {
            writer.remove(ctaBackground);
            writer.removeAttribute('hasBackground', selectedElement);
          }
        });
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

      this.isEnabled = allowedIn !== null && hasBackground;
    }


}