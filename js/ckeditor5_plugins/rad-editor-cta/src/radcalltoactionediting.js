import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';

import InsertRadCtaCommand from './insertradctacommand';
import InsertRadCtaBackgroundCommand from './insertradctabackgroundcommand';
import RemoveRadCtaBackgroundCommand from './removeradctabackgroundcommand';

export default class RadCallToActionEditing extends Plugin {
    static get requires() {
        return [Widget];
    }

    init() {
      this._defineSchema();
      this._defineConverters();

      this.editor.commands.add(
        'insertRadCallToAction', new InsertRadCtaCommand( this.editor ) );

      this.editor.commands.add(
        'insertRadCallToActionBackground', new InsertRadCtaBackgroundCommand( this.editor ) );

      this.editor.commands.add(
        'removeRadCallToActionBackground', new RemoveRadCtaBackgroundCommand( this.editor ) );
    }

    _defineSchema() {
      const schema = this.editor.model.schema;

      schema.register( 'radCallToAction', {
        isObject: true,
        allowWhere: '$block',
        allowAttributes: ['hasBackground' ]
      } );

      schema.register( 'radCallToActionBackground', {
        allowContentOf: '$root',
        inheritAllFrom: '$block',
        allowIn: 'radCallToAction',
      } );

      schema.register( 'radCallToActionBackgroundPlaceholder', {
        allowContentOf: '$root',
        inheritAllFrom: '$block',
        allowIn: 'radCallToActionBackground',
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
        view: {
          name: 'section',
          classes: 'rad-call-to-action',
        },
        model: ( viewElement, { writer } ) => {
          const cta = writer.createElement( 'radCallToAction', {
            hasBackground: viewElement.hasClass('rad-call-to-action--has-bg-image'),
          } );
          return cta;
        }
      });

      conversion.for('downcast').elementToElement({
        model: 'radCallToAction',
        view: (modelElement, { writer }) => {
          const hasBackground = modelElement.getAttribute('hasBackground');
          const section = writer.createContainerElement('section', {
            class: `rad-call-to-action ${hasBackground ? 'rad-call-to-action--has-bg-image' : ''}`,
          });
          return toWidget(section, writer, { label: 'rad call to action widget' });
        }
      });

      // Add an attributetoAttribute downcast converter for the hasBackground attribute.
      // this is needed to it updates when the attribute changes.
      conversion.for('downcast').attributeToAttribute({
        model: 'hasBackground',
        view: modelAttributeValue => ( {
          key: 'class',
          value: 'rad-call-to-action--has-bg-image'
        } )
      });

      // now the upcast
      conversion.for('upcast').attributeToAttribute({
        view: {
          name: "radCallToAction",
          key: "class",
          classes: "rad-call-to-action--has-bg-image"
        },
        model: "hasBackground"
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

      // The background container -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
      conversion.for('upcast').elementToElement({
        model: 'radCallToActionBackground',
        view: {
          name: 'div',
          classes: 'rad-call-to-action__background',
        }
      });
      conversion.for('dataDowncast').elementToElement({
        model: 'radCallToActionBackground',
        view: {
          name: 'div',
          classes: 'rad-call-to-action__background',
        }
      });
      conversion.for('editingDowncast').elementToElement({
        model: 'radCallToActionBackground',
        view: (modelElement, { writer }) => {
          const section = writer.createContainerElement('div', {
            class: 'rad-call-to-action__background',
          });

          return toWidget(section, writer, { label: 'rad call to action background' });
        }
      });

      conversion.for('upcast').elementToElement({
        model: 'radCallToActionBackgroundPlaceholder',
        view: {
          name: 'div',
          classes: 'rad-call-to-action__background_placeholder',
        }
      });
      conversion.for('dataDowncast').elementToElement({
        model: 'radCallToActionBackgroundPlaceholder',
        view: {
          name: 'div',
          classes: 'rad-call-to-action__background_placeholder',
        }
      });
      conversion.for('editingDowncast').elementToElement({
        model: 'radCallToActionBackgroundPlaceholder',
        view: (modelElement, { writer }) => {
          const section = writer.createContainerElement('div', {
            class: 'rad-call-to-action__background_placeholder',
          });

          return toWidget(section, writer, { label: 'rad call to action background placeholder' });
        }
      });

    }
}