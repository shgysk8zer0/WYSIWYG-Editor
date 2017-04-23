export function downloadHtml(click) {
	const doc = document.implementation.createHTMLDocument();
	const charset = doc.head.appendChild(doc.createElement('meta'));
	const el = document.querySelector(this.dataset.downloadHtml);
	const length = el.childNodes.length;
	charset.setAttribute('charset', document.characterSet);

	for (let i = 0; i < length; i++) {
		doc.body.appendChild(doc.importNode(el.childNodes.item(i).cloneNode(true)));
	}

	this.href = `data:text/html,${encodeURIComponent(doc.documentElement.outerHTML)}`;
}

export function fullScreen() {
	document.querySelector(this.dataset.fullscreen).requestFullscreen();
}
