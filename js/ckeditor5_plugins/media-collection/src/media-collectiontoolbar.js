import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import { getSelectedMediaCollectionWidget, getMediaCollectionWidgetAncestor } from './utils/ui/widget';

/**
 * The accordion toolbar class. It creates toolbars for the accordion feature and its content (for now only for the accordion cell content).
 *
 * @extends module:core/plugin~Plugin
 */
export default class MediaCollectionToolbar extends Plugin {
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
    return 'MediaCollectionToolbar';
  }

  /**
   * @inheritDoc
   */
  afterInit() {
    const editor = this.editor;
    const t = editor.t;
    const widgetToolbarRepository = editor.plugins.get( WidgetToolbarRepository );

    const mediaCollectionToolbarItems = editor.config.get( 'mediacollection.contentToolbar' );

    if ( mediaCollectionToolbarItems ) {
      widgetToolbarRepository.register( 'mediaCollectionContent', {
        ariaLabel: t( 'Media Collection toolbar' ),
        items: mediaCollectionToolbarItems,
        getRelatedElement: getSelectedMediaCollectionWidget
      } );
    }

    // if ( mediaCollectionToolbarItems ) {
    //   widgetToolbarRepository.register( 'accordion', {
    //     ariaLabel: t( 'Accordion toolbar' ),
    //     items: accordionToolbarItems,
    //     getRelatedElement: getSelectedAccordionWidget
    //   } );
    // }
  }
}
