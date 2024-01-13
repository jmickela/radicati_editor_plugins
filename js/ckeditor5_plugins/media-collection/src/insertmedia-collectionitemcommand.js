import { Command } from 'ckeditor5/src/core';

/**
 * The insert accordion row command.
 *
 * @extends module:core/command~Command
 */
export default class InsertMediaCollectionItemCommand extends Command {

  constructor( editor, options = {} ) {
    super( editor );
    this.order = options.order || 'below';
  }

  execute() {
    const editor = this.editor;
    const selection = this.editor.model.document.selection;
    const selectedElement = selection.getSelectedElement();
    let commandEl = null;

    selection.getFirstPosition().getAncestors().forEach(ancestor => {
      if(ancestor.name == 'mediaCollection' || ancestor.name == 'mediaCollectionItem') {
        commandEl = ancestor;
      }
    });

    console.log(selectedElement);

    var newItem = undefined;

    editor.model.change((writer) => {
      // For now, just insert one
      //const item = writer.createElement('mediaCollectionItem');
      newItem = writer.createElement('mediaCollectionItem');
      writer.insert(newItem, writer.createPositionAt(selectedElement, 0));

      // const positionInsideItem = writer.createPositionAt(item, 0);
      // writer.setSelection(positionInsideItem);
      //
      //
      // const selection1 = this.editor.model.document.selection;
      // const selectedElement1 = selection1.getSelectedElement();
      //
      // console.log(selectedElement1);

      // Insert a media item into the new item.
      //const mediaPosition = writer.createPositionAt(item, "in");
      //const mediaPosition = item.getFirstPosition();

      //writer.setSelection(mediaPosition);
      this.insertMedia(editor);
    });


    editor.model.change((writer) => {
      const positionInsideItem = writer.createPositionAt(newItem, 0);
      writer.setSelection(positionInsideItem);

      const selection1 = this.editor.model.document.selection;
      const selectedElement1 = selection1.getSelectedElement();

      console.log(positionInsideItem);
    });


    return;




    if(commandEl != null) {
      // Command is being run from a correct context.
      editor.model.change((writer) => {
        let position;
        if(this.order == 'below') {
          let insertAfterIndex = (commandEl.name == 'mediaCollectionItem') ? commandEl.index : commandEl.index + 1;
          if(insertAfterIndex < 0) {
            insertAfterIndex = 0;
          }
          // Add row below this row's accordionTitle.
          position = writer.createPositionAfter(commandEl.parent.getChild(insertAfterIndex));
        }
        else {
          let insertBeforeIndex = (commandEl.name == 'mediaCollectionItem') ? commandEl.index - 1 : commandEl.index;

          if(insertBeforeIndex < 0) {
            insertBeforeIndex = 0;
          }
          // Add row above this row's accordionTitle.
          position = writer.createPositionBefore(commandEl.parent.getChild(insertBeforeIndex));
        }

        const item = writer.createElement('mediaCollectionItem');
        writer.insert(item, position);

        // Insert a media item into the new item.
        const mediaPosition = writer.createPositionAt(item, 0);
        //this.insertMedia(editor, mediaPosition);

        //editor.execute('insertDrupalMedia', {}, mediaPosition);
      });
    }
  }

  insertMedia(editor) {
    const options = editor.config.get('drupalMedia');
    if (!options) {
      return;
    }

    const { libraryURL, openDialog, dialogSettings = {} } = options;
    if (!libraryURL || typeof openDialog !== 'function') {
      return;
    }
    openDialog(
        libraryURL,
        ({ attributes }) => {
          console.log(attributes);
          editor.execute('insertDrupalMedia', attributes);
        },
        dialogSettings,
    );
  }

  refresh() {
    this.isEnabled = true;
  }

}