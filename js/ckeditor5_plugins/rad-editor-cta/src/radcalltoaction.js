import { Plugin } from 'ckeditor5/src/core';
import RadCallToActionEditing from './radcalltoactionediting';
import RadCallToActionUI from './radcalltoactionui';

export default class RadCallToAction extends Plugin {
    static get requires() {
        return [RadCallToActionEditing, RadCallToActionUI];
    }

    static get pluginName() {
        return 'RadCallToAction';
    }
}


