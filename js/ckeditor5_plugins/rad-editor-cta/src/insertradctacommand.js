import { Command } from 'ckeditor5/src/core';

export default class InsertRadCtaCommand extends Command {

  execute() {
        this.editor.model.change( writer => {

            const cta = writer.createElement( 'radCallToAction' );
            const cta_title = writer.createElement('radCallToActionTitle');
            const cta_blurb = writer.createElement('radCallToActionBlurb');
            const cta_button_wrapper = writer.createElement('radCallToActionLink');


            writer.append(cta_title, cta);
            writer.append(cta_blurb, cta);
            writer.append(cta_button_wrapper, cta);

            const placeholderTitle = writer.createText('Call to Action Title');
            writer.append(placeholderTitle, cta_title);


            const button_paragraph = writer.createElement('paragraph');
            const button = writer.createText('Learn More', {linkHref: '/'});
            writer.append(button, button_paragraph);

            writer.append(button_paragraph, cta_button_wrapper);

            const blurbContent = writer.createElement('paragraph');
            const placeholderBlurb = writer.createText('Call to Action Blurb');
            writer.append(placeholderBlurb, blurbContent);

            writer.append(blurbContent, cta_blurb);


            this.editor.model.insertObject( cta );
        } );
    }

    refresh() {
      const model = this.editor.model;
      const selection = model.document.selection;
      const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'radCallToAction' );

      this.isEnabled = allowedIn !== null;
    }


}