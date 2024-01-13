import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';

import InsertMediaCollectionCommand from './insertmedia-collectioncommand';
import InsertMediaCollectionItemCommand from './insertmedia-collectionitemcommand';
import RemoveMediaCollectionItemCommand from "./removemedia-collectionitemcommand";

export default class MediaCollectionEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
        'insertMediaCollection', new InsertMediaCollectionCommand( this.editor ) );

    this.editor.commands.add('mediaItemInsertAbove', new InsertMediaCollectionItemCommand(this.editor, {order: 'above'}));
    this.editor.commands.add('mediaItemInsertBelow', new InsertMediaCollectionItemCommand(this.editor, {order: 'below'}));
    this.editor.commands.add('mediaItemRemove', new RemoveMediaCollectionItemCommand(this.editor));

  }


  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register( 'mediaCollection', {
      inheritAllFrom: '$blockObject',
      isContent: false,
      isSelectable: true,
      isObject: true,
      allowChildren: ['drupalMedia'],
    } );

    schema.register('mediaCollectionItem', {
      //inheritAllFrom: '$text',
      isLimit: true,
      isContent: true,
      isSelectable: true,
      isObject: true,
      allowIn: 'mediaCollection',
      allowContentOf: ['drupalMedia', '$block']
      //allowChildren: ['drupalMedia'],
    });

    // schema.addChildCheck( ( context, childDefinition ) => {
    //   if ( context.startsWith( 'blockquoteWithCitation' ) && childDefinition.name === 'blockquoteWithCitation' ) {
    //     return false;
    //   }
    // } );
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    // The CTA Parent
    conversion.for('upcast').elementToElement({
      model: 'mediaCollection',
      view: {
        name: 'section',
        classes: 'media-collection',
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'mediaCollection',
      view: {
        name: 'section',
        classes: 'media-collection',
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'mediaCollection',
      view: (modelElement, { writer }) => {
        const section = writer.createContainerElement('section', {
          class: 'media-collection',
        });
        return toWidget(section, writer);
        // const section = writer.createEditableElement('section', {
        //   class: 'media-collection',
        // });
        //
        // return toWidgetEditable(section, writer, { label: 'Media Collection' });
      }
    });

    // The Quote -=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    conversion.for('upcast').elementToElement({
      model: 'mediaCollectionItem',
      view: {
        name: 'div',
        classes: 'media-collection__item',
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'mediaCollectionItem',
      view: {
        name: 'div',
        classes: 'media-collection__item',
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'mediaCollectionItem',
      view: (modelElement, { writer }) => {
        // const h2 = writer.createContainerElement('div', {
        //   class: 'media-collection__item',
        // });
        // return toWidget(h2, writer);
        const section = writer.createEditableElement('div', {
          class: 'media-collection__item',
        });

        return toWidgetEditable(section, writer, { label: 'Media Collection Item' });
      }
    });
  }
}