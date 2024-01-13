import { Command } from 'ckeditor5/src/core';

export default class InsertMediaCollectionCommand extends Command {
  execute() {
    this.editor.model.change( writer => {

      const wrapper = writer.createElement( 'mediaCollection' );
      // const item1 = writer.createElement('mediaCollectionItem');
      //
      // writer.append(item1, wrapper);
      //
      // const position = writer.createPositionAt(item1, 0);
      //
      // //this.editor.execute('insertDrupalMedia', {});
      // this.insertMedia(this.editor, position);

      //
      // const placeholderQuote = writer.createText('Quote Text');
      // const placeholderCitation = writer.createText('Attribution');
      //
      // writer.append(placeholderQuote, quote);
      // writer.append(placeholderCitation, citation);

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

    const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'mediaCollection' );

    this.isEnabled = allowedIn !== null;
  }


}