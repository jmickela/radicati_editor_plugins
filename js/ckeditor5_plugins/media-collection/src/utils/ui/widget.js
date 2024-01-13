import { isWidget } from 'ckeditor5/src/widget';

export function getSelectedMediaCollectionWidget( selection ) {
  const viewElement = selection.getSelectedElement();

  if ( viewElement && isMediaCollectionWidget( viewElement ) ) {
    return viewElement;
  }

  return null;
}

export function getMediaCollectionWidgetAncestor( selection ) {
  const selectionPosition = selection.getFirstPosition();

  if ( !selectionPosition ) {
    return null;
  }

  let parent = selectionPosition.parent;
  while ( parent ) {
    if ( parent.is( 'element' ) && isMediaCollectionWidget( parent ) ) {

      return parent;
    }

    parent = parent.parent;
  }

  return null;
}


function isMediaCollectionWidget( viewElement ) {
  const ret = (!!viewElement.hasClass( 'media-collection' ) ||
      !!viewElement.hasClass('media-collection__item') ) &&
        isWidget( viewElement );

  return ret;
}
