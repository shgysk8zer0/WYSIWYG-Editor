import {$} from './std-js/functions.js';
import wysiwyg from './std-js/wysiwyg.js';
import shortcuts from './std-js/kbd_shortcuts.js';
import * as handlers from './handlers.js';

$(window).load(() => {
	$('menu[type="context"]').each(wysiwyg);
	$('[contenteditable="true"]').keypress(shortcuts);
	$('[data-download-html]').click(handlers.downloadHtml);
	$('[data-fullscreen]').click(handlers.fullScreen);
});
