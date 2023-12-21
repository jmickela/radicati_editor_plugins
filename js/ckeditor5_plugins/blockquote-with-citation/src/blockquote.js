import { Plugin } from 'ckeditor5/src/core';
import BlockquoteWithCitationEditing from './blockquoteediting.js';
import BlockquoteWithCitationUI from './blockquoteui.js';

export default class BlockquoteWithCitation extends Plugin {
  static get requires() {
    return [BlockquoteWithCitationEditing, BlockquoteWithCitationUI];
  }

  static get pluginName() {
    return 'BlockquoteWithCitation';
  }
}


