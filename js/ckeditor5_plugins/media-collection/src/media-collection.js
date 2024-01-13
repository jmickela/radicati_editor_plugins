import { Plugin } from 'ckeditor5/src/core';
import MediaCollectionEditing from './media-collectionediting';
import MediaCollectionUI from './media-collectionui';
import MediaCollectionToolbar from "./media-collectiontoolbar";

export default class MediaCollection extends Plugin {
  static get requires() {
    return [MediaCollectionEditing, MediaCollectionUI, MediaCollectionToolbar];
  }

  static get pluginName() {
    return 'MediaCollection';
  }
}


