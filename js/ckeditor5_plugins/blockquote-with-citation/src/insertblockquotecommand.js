import { Command } from 'ckeditor5/src/core';

export default class InsertBlockquoteWithCitationCommand extends Command {
  execute() {
    this.editor.model.change( writer => {

      const wrapper = writer.createElement( 'blockquoteWithCitation' );
      const quote = writer.createElement('blockquoteWithCitationQuote');
      const citation = writer.createElement('blockquoteWithCitationCitation');

      writer.append(quote, wrapper);
      writer.append(citation, wrapper);

      const placeholderQuote = writer.createText('Quote Text');
      const placeholderCitation = writer.createText('Attribution');

      writer.append(placeholderQuote, quote);
      writer.append(placeholderCitation, citation);

      // const button_paragraph = writer.createElement('paragraph');
      // const button = writer.createText('Learn More', {linkHref: '/'});
      // writer.append(button, button_paragraph);
      //
      // writer.append(button_paragraph, cta_button_wrapper);
      //
      // const blurbContent = writer.createElement('paragraph');
      // const placeholderBlurb = writer.createText('Call to Action Blurb');
      // writer.append(placeholderBlurb, blurbContent);
      //
      // writer.append(blurbContent, cta_blurb);


      this.editor.model.insertObject( wrapper );
    } );
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'blockquoteWithCitation' );

    this.isEnabled = allowedIn !== null;
  }


}