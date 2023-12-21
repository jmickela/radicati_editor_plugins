import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';

import InsertBlockquoteWithCitationCommand from './insertblockquotecommand.js';

export default class BlockquoteWithCitationEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
        'insertBlockquoteWithCitation', new InsertBlockquoteWithCitationCommand( this.editor ) );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register( 'blockquoteWithCitation', {
      inheritAllFrom: '$blockObject'
    } );

    schema.register('blockquoteWithCitationQuote', {
      isLimit: true,
      allowIn: 'blockquoteWithCitation',
      allowContentOf: '$block',
    });

    schema.register('blockquoteWithCitationCitation', {
      isLimit: true,
      allowIn: 'blockquoteWithCitation',
      allowContentOf: '$block',
    });

    schema.addChildCheck( ( context, childDefinition ) => {
      if ( context.startsWith( 'blockquoteWithCitation' ) && childDefinition.name === 'blockquoteWithCitation' ) {
        return false;
      }
    } );
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    // The CTA Parent
    conversion.for('upcast').elementToElement({
      model: 'blockquoteWithCitation',
      view: {
        name: 'blockquote',
        classes: 'blockquote-with-citation',
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'blockquoteWithCitation',
      view: {
        name: 'blockquote',
        classes: 'blockquote-with-citation',
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'blockquoteWithCitation',
      view: (modelElement, { writer }) => {
        const section = writer.createContainerElement('blockquote', {
          class: 'blockquote-with-citation',
        });

        return toWidget(section, writer, { label: 'Blockquote with Citation' });
      }
    });

    // The Quote -=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    conversion.for('upcast').elementToElement({
      model: 'blockquoteWithCitationQuote',
      view: {
        name: 'p',
        classes: 'blockquote-with-citation__quote',
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'blockquoteWithCitationQuote',
      view: {
        name: 'p',
        classes: 'blockquote-with-citation__quote',
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'blockquoteWithCitationQuote',
      view: (modelElement, { writer }) => {
        const h2 = writer.createEditableElement('p', {
          class: 'blockquote-with-citation__quote',
        });
        return toWidgetEditable(h2, writer);
      }
    });

    // The Citation -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=

    conversion.for('upcast').elementToElement({
      model: 'blockquoteWithCitationCitation',
      view: {
        name: 'footer',
        classes: 'blockquote-with-citation__citation',
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'blockquoteWithCitationCitation',
      view: {
        name: 'footer',
        classes: 'blockquote-with-citation__citation',
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'blockquoteWithCitationCitation',
      view: (modelElement, { writer }) => {
        const div = writer.createEditableElement('footer', {
          class: 'blockquote-with-citation__citation',
        });

        return toWidgetEditable(div, writer);
      }
    });
  }
}