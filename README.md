# HTML5 WYSIWYG-Editor

> An all HTML, CSS, &amp; JavaScript HTML5 WYSIWYG Editor  
*Uses `<menu type="context">` and `contenteditable` to write HTML*

## Requirements

* Firefox or ~~Chrome~~ (IE = :poop:)
* `document.execCommand` support
* SVG, including `<use>`

## Features

* WYSIWYG Editor written in HTML & JavaScript using [`execCommand`][Midas]
* Offline access using `ApplicationCache`
* Full-Screen editing
* Drag-n-Drop images to add them (*base64 encoded data-URI*)
* Drag-n-Drop HTML files to import (*currently overwrites existing content*)
* Save and restore work using `localStorage`
* Save work as file using `download` attribute


## :coffee: Contributing :godmode:

### Helpful Tools
* [GitHub Atom][Atom]
* [Firefox Developer Edition][Firefox-dev]
* [Myth][Myth] -- *CSS preprocessor using pure CSS*
* [Node.js][Node] -- *Required for Myth*

### Installation

__From source using Git__  
1. Fork from [GitHub][GitHub]
```shell
cd {/path/to/clone/to}
git clone git://github.com/{your-username}/WYSIWYG-Editor.git
cd WYSIWYG-Editor
git submodule init
git submodule update
```
2. Edit, stage, commit, push
3. Send [pull request][Pull-req]
### Editing Stylesheets

> Rather than use LESS, SASS, or whatever the "cool kids" are doing these
days, I decided to use `@import` along with [--css-vars][CSS-vars]

**Requires**
* [Firefox][Firefox-dev]
* [Myth][Myth]
* [Node.js][Node]
* Comment out `stylesheets/css/style.css` and uncomment `stylesheets/css/import.css`

**To update `style.css`**
```shell
myth -c stylesheets/css/import.css stylesheets/css/style.css
```

### Editing JavaScript

I have written a bash script for concatenating `.js` files.  
You may either set executable permissions and run it from a GUI
or execute it from command line with
```shell
bash scripts/combine.bash
```
You will have to comment out `scripts/combined.js` and uncomment
all of the rest of the `<script>` tags.

## Submodules used

* [github/octicons][octicons]
* [shgysk8zer0/core-css][core-css]
* [shgysk8zer0/std-js][std-js]
* [shgysk8zer0/fonts][fonts]
* [shgysk8zer0/cursors][cursors]

## Contact

* [:octocat: GitHub][GitHub]
* [:bug: Report Issues, request features, etc][Issues]
* [:page_facing_up: View README][README]
* [:book: View wiki][wiki]
* [:link: Live Demo][Demo]
* [:globe_with_meridians: Developer website][website]
* [:e-mail: Email Developer][email]

[GitHub]: <https://github.com/shgysk8zer0/WYSIWYG-Editor>
[Issues]: <https://github.com/shgysk8zer0/WYSIWYG-Editor/issues/new>
[Pull-req]: <https://github.com/shgysk8zer0/WYSIWYG-Editor/compare/>
[README]: <https://github.com/shgysk8zer0/WYSIWYG-Editor/blob/master/README.md>
[Demo]: <https://chriszuber.com/demos/wysiwyg-editor/>
[email]: <mailto:shgysk8zer0@gmail.com>
[website]: <https://chriszuber.com>
[wiki]: <https://github.com/shgysk8zer0/WYSIWYG-Editor/wiki>
[license]: <https://github.com/shgysk8zer0/WYSIWYG-Editor/blob/master/LICENSE> "Licensed under GPL v2"
[Midas]: <https://developer.mozilla.org/en-US/docs/Midas> "Midas | MDN"
[Node]: <https://nodejs.org/> "Node.js"
[Myth]: <http://www.myth.io/> "Myth - CSS the way it was imagined"
[Atom]: <https://atom.io/> "Atom"
[Firefox-dev]: <https://www.mozilla.org/en-US/firefox/channel/#developer> "Firefox Developer Edition"
[CSS-vars]: <https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables> "Using CSS variables - CSS |MDN"
[octicons]: <https://github.com/github/octicons>
[core-css]: <https://github.com/shgysk8zer0/core-css>
[std-js]: <https://github.com/shgysk8zer0/std-js>
[fonts]: <https://github.com/shgysk8zer0/fonts>
[cursors]: <https://github.com/shgysk8zer0/cursors>
