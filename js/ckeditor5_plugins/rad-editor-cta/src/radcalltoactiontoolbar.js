import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import { isWidget } from 'ckeditor5/src/widget';


export default class RadCallToActionToolbar extends Plugin {
  /**
   * @inheritDoc
   */
  static get requires() {
    return [ WidgetToolbarRepository ];
  }

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'RadCallToActionToolbar';
  }

  /**
   * @inheritDoc
   */
  afterInit() {
    const editor = this.editor;
    const t = editor.t;
    const widgetToolbarRepository = editor.plugins.get( WidgetToolbarRepository );

    const ctaToolbarItems = editor.config.get( 'radcalltoaction.contentToolbar' );

    if ( ctaToolbarItems ) {
      widgetToolbarRepository.register( 'radCtaContent', {
        ariaLabel: t( 'Call to Action Toolbar' ),
        items: ctaToolbarItems,
        getRelatedElement: (selection) => {
          const selectedElement = selection.getSelectedElement();
          if(selectedElement &&
             selectedElement.hasClass('rad-call-to-action') &&
             isWidget(selectedElement)) {

            return selectedElement;
          }
          return null;
        }
      } );
    }
  }
}
