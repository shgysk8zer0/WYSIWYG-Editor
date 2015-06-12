window.addEventListener('load', function() {
	"use strict";
	var html = $('html'),
		body = $('body'),
		head = $('head');
		cache = new cache();
		document.documentElement.classList.swap('no-js', 'js');
	['svg', 'audio', 'video', 'picture', 'canvas', 'menuitem', 'details',
	'dialog', 'dataset', 'HTMLimports', 'classList', 'connectivity',
	'visibility','notifications', 'ApplicationCache', 'indexedDB',
	'localStorage','sessionStorage', 'CSSgradients', 'transitions',
	'animations',  'CSSvars','CSSsupports', 'CSSmatches', 'querySelectorAll',
	'workers', 'promises', 'ajax', 'FormData'].forEach(function(feat) {
		document.documentElement.classList.pick(feat, 'no-' + feat, supports(feat));
	});
	document.documentElement.classList.pick('offline', 'online', (supports('connectivity') && !navigator.onLine));
	setTimeout(function() {
			body.results.bootstrap();
		}, 100
	);
	body.watch({
		childList: function() {
			this.addedNodes.bootstrap();
		},
		attributes: function() {
			switch (this.attributeName) {
				case 'contextmenu':
					var menu = this.target.attr('contextmenu');
					if (this.oldValue !== '') {
						$('menu#' + this.oldValue).delete();
					}
					if (menu && menu !== '') {
						if (! $('menu#'+ menu).found) {
							ajax({
								url: document.baseURI,
								request: 'load_menu=' + menu.replace(/\_menu$/ ,''),
								cache: this.target.data('cache')
							}).then(
								handleJSON
							).catch(function(err)
							{
								$('body > progress').delete();
								console.error(err);
							});
						}
					}
					break;

				case 'contextmenu':
					if (this.oldValue !== '') {
						$('menu#' + this.oldValue).delete();
					}
					break;

				case 'open':
					if (
						this.target.hasAttribute('open')
						&& (this.target.offsetTop + this.target.offsetHeight < window.scrollY)
					) {
						this.target.scrollIntoView();
					}
					break;

				case 'data-import':
					if (this.target.hasAttribute('data-import')) {
						this.target.HTMLimport();
					}
					break;

				case 'data-dropzone':
					document.querySelector(this.target.data('dropzone')).DnD(this.target);
					break;

				default:
					console.error('Unhandled attribute in watch', this);
			}
		}
	}, [
		'subtree',
		'attributeOldValue'
	], [
		'contextmenu',
		'list',
		'open',
		'data-request',
		'data-dropzone',
		'data-import'
	]);
	(function(dl) {
		dl.addEventListener('click', function() {
			this.href = document.querySelector('[contenteditable="true"]').dataURI();
			return true;
		});
		dl.hidden = false;
	})(document.querySelector('a[download="index.html"]'));
	(function(btn) {
		if ((typeof btn !== 'undefined') && ('mozApps' in navigator)) {
			var url = new URL(btn.dataset.mozInstall, document.baseURI);
			var test = navigator.mozApps.checkInstalled(url);
			test.addEventListener('success', function(event) {
				if (! this.result) {
					btn.hidden = false;
					btn.addEventListener('click', function() {
						var result = navigator.mozApps.install(url);
						result.addEventListener('success', function(event) {
							console.log(event);
							btn.hidden = true;
						});
						result.addEventListener('error', function(err) {
							console.error(err);
						});
					});
				}
			});
			test.addEventListener('error', function(err) {
				console.error(err);
			})
		}
	})(document.querySelector('[data-moz-install]'));
	$(window).networkChange(function() {
		$('html').toggleClass('online', navigator.onLine).toggleClass('offline', !navigator.onLine);
	}).online(function() {
		$('fieldset').each(function(fieldset) {
			fieldset.removeAttribute('disabled');
		});
		notify({
			title: 'Network:',
			body: 'online',
			icon: 'images/icons/network-server.png'
		});
	}).offline(function() {
		$('fieldset').each(function(fieldset) {
			fieldset.disabled = true;
		});
		notify({
			title: 'Network:',
			body: 'offline',
			icon: 'images/icons/network-server.png'
		});
	});
});
NodeList.prototype.bootstrap = function() {
	"use strict";
	this.filter(function(node) {
		return node.nodeType === 1;
	}).forEach(function(node)
	{
		if (! supports('details')) {
			node.query('details > summary').forEach(function(details) {
				details.addEventListener('click', function() {
					if (this.parentElement.hasAttribute('open')) {
						this.parentElement.removeAttribute('open');
					} else {
						this.parentElement.setAttribute('open', '');
					}
				});
			});
		}
		if (! supports('picture')) {
			node.query('picture').forEach(function(picture) {
				if ('matchMedia' in window) {
					var sources = picture.querySelectorAll('source[media][srcset]');
					for (var n = 0; n < sources.length; n++) {
						if (matchMedia(sources[n].getAttribute('media')).matches) {
							picture.getElementsByTagName('img')[0].src = sources[n].getAttribute('srcset');
							break;
						}
					}
				} else {
					picture.getElementsByTagName('img')[0].src = picture.querySelector('source[media][srcset]').getAttribute('srcset');
				}
			});
		}
		node.query('[autofocus]').forEach(function(input) {
			input.focus();
		});
		node.query('form[name]').forEach(function(form) {
			form.addEventListener('submit', function(event) {
				event.preventDefault();
				if (! this.data('confirm') || confirm(this.data('confirm'))) {
					ajax({
						url: this.action || document.baseURI,
						type: this.method || 'POST',
						contentType: this.enctype,
						form: this
					}).then(
						handleJSON
					).catch(
						function(err)
					{
						$('body > progress').delete();
						console.error(err);
					});
				}
			});
		});
		node.query('[data-show]').forEach(function(el) {
			el.addEventListener('click', function() {
				document.querySelector(this.data('show')).show();
			});
		});
		node.query('[data-show-modal]').forEach(function(el) {
			el.addEventListener('click', function() {
				document.querySelector(this.data('show-modal')).showModal();
			});
		});
		node.query('[data-scroll-to]').forEach(function(el) {
			el.addEventListener('click', function() {
				document.querySelector(this.data('scroll-to')).scrollIntoView();
			});
		});
		node.query('[data-import]').forEach(function(el) {
			el.HTMLimport();
		});
		node.query('[data-close]').forEach(function(el) {
			el.addEventListener('click', function() {
				document.querySelector(this.data('close')).close();
			});
		});
		node.query('fieldset button[type=button].toggle').forEach(function(toggle) {
			toggle.addEventListener('click', function() {
				this.ancestor('fieldset').querySelectorAll('input[type=checkbox]').forEach(function(checkbox) {
					checkbox.checked = ! checkbox.checked;
				});
			});
		});
		node.query('[data-must-match]').forEach(function(match) {
			match.pattern = new RegExp(document.querySelector('[name="' + match.data('must-match') + '"]').value).escape();
			document.querySelector('[name="' + match.data('must-match') + '"]').addEventListener('change', function()
			{
				document.querySelector('[data-must-match="' + this.name + '"]').pattern = new RegExp(this.value).escape();
			});
		});
		node.query('[data-dropzone]').forEach(function (el) {
			document.querySelector(el.data('dropzone')).DnD(el);
		});
		node.query('input[data-equal-input]').forEach(function(input) {
			input.addEventListener('input', function() {
				document.querySelectorAll('input[data-equal-input="' + this.data('equal-input') + '"]').forEach(function(other) {
					if (other !== input) {
						other.value = input.value;
					}
				});
			});
		});
		node.query('menu[type="context"]#wysiwyg_menu, menu[type="toolbar"]').forEach(WYSIWYG);
		node.query('[data-request]').forEach(function(el) {
			el.addEventListener('click', function(event) {
				event.preventDefault();
				if (!this.data('confirm') || confirm(this.data('confirm'))) {
					ajax({
						url: this.data('url')|| document.baseURI,
						request: (this.data('prompt'))
							? this.data('request') + '&prompt_value=' + encodeURIComponent(prompt(this.data('prompt')))
							: this.data('request'),
						history: this.data('history') || null,
						cache: el.data('cache')
					}).then(
						handleJSON
					).catch(function(err) {
						$('body > progress').delete();
						console.error(err);
					});
				}
			});
		});
		node.query('[data-dropzone]').forEach(function (finput) {
			document.querySelector(finput.data('dropzone')).DnD(finput);
		});
		node.query('[data-fullscreen]').forEach(function(el) {
			el.addEventListener('click', function(event) {
				if (document.fullScreen || document.mozFullScreen || document.webkitFullScreen || document.msFullScreen) {
					document.cancelFullScreen();
				} else {
					document.querySelector(this.dataset.fullscreen).requestFullScreen();
				}
			});
		});
		node.query('[data-delete]').forEach(function(el) {
			el.addEventListener('click', function() {
				document.querySelectorAll(this.data('delete')).forEach(function(remove) {
					remove.parentElement.removeChild(remove);
				});
			});
		});
	});
	return this;
};
Element.prototype.DnD = function(sets) {
	"use strict";
	this.ondragover = function(event) {
		this.classList.add('receiving');
		return false;
	};
	this.ondragend = function(event) {
		this.classList.remove('receiving');
		return false;
	};
	this.ondrop = function(e) {
		this.classList.remove('receiving');
		e.preventDefault();
		console.log(e);
		if (e.dataTransfer.files.length) {
			for (var i=0; i < e.dataTransfer.files.length; i++) {
				var file = e.dataTransfer.files[i],
					reader = new FileReader(),
					progress = document.createElement('progress');
				progress.min = 0;
				progress.max = 1;
				progress.value= 0;
				progress.classList.add('uploading');
				sets.appendChild(progress);
				console.log(e, reader);
				if (/image\/*/.test(file.type)) {
					reader.readAsDataURL(file);
				} else if (/text\/*/.test(file.type)) {
					reader.readAsText(file);
				}
				reader.addEventListener('progress', function(event) {
					if (event.lengthComputable) {
						progress.value = event.loaded / event.total;
					}
				});
				reader.onload = function(event) {
					progress.parentElement.removeChild(progress);
					console.log(event);
					if (typeof sets !== 'undefined') {
						switch (sets.tagName.toLowerCase()) {
							case 'input':
							case 'textarea':
								sets.value = event.target.result;
								break;

							case 'img':
								sets.src = event.target.result;
								break;

							default:
								if (/image\/*/.test(file.type)) {
									document.execCommand('insertimage', null, event.target.result);
								} else if (/text\/*/.test(file.type)) {
									sets.innerHTML = event.target.result;
								}
						}
					}
				};
				reader.onerror = function(event) {
					progress.parentElement.removeChild(progress);
					console.error(event);
				};
			console.log(file);
			}
		}
		return false;
	};
};
HTMLElement.prototype.dataURI = function() {
	return 'data:text/html,' + encodeURIComponent(this.innerHTML)
}
