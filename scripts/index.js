import {$} from './std-js/functions.js';
import wysiwyg from './std-js/wysiwyg.js';
import shortcuts from './std-js/kbd_shortcuts.js';

$(window).load(() => {
	$('menu[type="context"]').each(wysiwyg);
	$('[contenteditable="true"]').keypress(shortcuts);
});
