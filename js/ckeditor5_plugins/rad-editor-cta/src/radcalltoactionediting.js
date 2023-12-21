import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';

import InsertRadCtaCommand from './insertradctacommand';

export default class RadCallToActionEditing extends Plugin {
    static get requires() {
        return [Widget];
    }

    init() {
        console.log( 'RadCallToActionEditing#init() got called' );

        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add(
            'insertRadCallToAction', new InsertRadCtaCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'radCallToAction', {
            inheritAllFrom: '$blockObject'
        } );

        schema.register('radCallToActionTitle', {
          isLimit: true,
          allowIn: 'radCallToAction',
          allowContentOf: '$block',
        });

        schema.register('radCallToActionBlurb', {
          isLimit: true,
          allowIn: 'radCallToAction',
          allowContentOf: '$root',
        });

        schema.register('radCallToActionLink', {
          isLimit: true,
          allowIn: 'radCallToAction',
          allowContentOf: '$root',
        });

        schema.addChildCheck( ( context, childDefinition ) => {
          if ( context.endsWith( 'radCallToActionBlurb' ) && childDefinition.name === 'radCallToAction' ) {
            return false;
          }
        } );
    }

    _defineConverters() {
      const conversion = this.editor.conversion;

      // The CTA Parent
      conversion.for('upcast').elementToElement({
        model: 'radCallToAction',
        view: {
          name: 'section',
          classes: 'rad-call-to-action',
        }
      });
      conversion.for('dataDowncast').elementToElement({
        model: 'radCallToAction',
        view: {
          name: 'section',
          classes: 'rad-call-to-action',
        }
      });
      conversion.for('editingDowncast').elementToElement({
        model: 'radCallToAction',
        view: (modelElement, { writer }) => {
          const section = writer.createContainerElement('section', {
            class: 'rad-call-to-action',
          });

          return toWidget(section, writer, { label: 'rad call to action widget' });
        }
      });

      // The Title -=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      conversion.for('upcast').elementToElement({
        model: 'radCallToActionTitle',
        view: {
          name: 'h2',
          classes: 'rad-call-to-action__title',
        }
      });

      conversion.for('dataDowncast').elementToElement({
        model: 'radCallToActionTitle',
        view: {
          name: 'h2',
          classes: 'rad-call-to-action__title',
        }
      });

      conversion.for('editingDowncast').elementToElement({
        model: 'radCallToActionTitle',
        view: (modelElement, { writer }) => {
          const h2 = writer.createEditableElement('h2', {
            class: 'rad-call-to-action__title',
          });

          return toWidgetEditable(h2, writer);
        }
      });


      // The Blurb -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=

      conversion.for('upcast').elementToElement({
        model: 'radCallToActionBlurb',
        view: {
          name: 'div',
          classes: 'rad-call-to-action__blurb',
        }
      });
      conversion.for('dataDowncast').elementToElement({
        model: 'radCallToActionBlurb',
        view: {
          name: 'div',
          classes: 'rad-call-to-action__blurb',
        }
      });
      conversion.for('editingDowncast').elementToElement({
        model: 'radCallToActionBlurb',
        view: (modelElement, { writer }) => {
          const div = writer.createEditableElement('div', {
            class: 'rad-call-to-action__blurb',
          });

          return toWidgetEditable(div, writer);
        }
      });

      // Button -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=

      conversion.for('upcast').elementToElement({
        model: 'radCallToActionLink',
        view: {
          name: 'div',
          classes: 'rad-call-to-action__link',
        }
      });
      conversion.for('dataDowncast').elementToElement({
        model: 'radCallToActionLink',
        view: {
          name: 'div',
          classes: 'rad-call-to-action__link',
        }
      });
      conversion.for('editingDowncast').elementToElement({
        model: 'radCallToActionLink',
        view: (modelElement, { writer }) => {
          const div = writer.createEditableElement('div', {
            class: 'rad-call-to-action__link',
          });

          return toWidgetEditable(div, writer);
        }
      });



    }
}