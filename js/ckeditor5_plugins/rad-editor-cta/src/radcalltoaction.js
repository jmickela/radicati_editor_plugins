import { Plugin } from 'ckeditor5/src/core';
import RadCallToActionEditing from './radcalltoactionediting';
import RadCallToActionUI from './radcalltoactionui';
import RadCallToActionToolbar from "./radcalltoactiontoolbar";

export default class RadCallToAction extends Plugin {
    static get requires() {
        return [RadCallToActionEditing, RadCallToActionUI, RadCallToActionToolbar];
    }

    static get pluginName() {
        return 'RadCallToAction';
    }
}