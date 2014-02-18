# KoHandlers [![Build Status](https://travis-ci.org/spatools/kohandlers.png)](https://travis-ci.org/spatools/kohandlers) [![Bower version](https://badge.fury.io/bo/kohandlers.png)](http://badge.fury.io/bo/kohandlers)

Knockout Binding Handlers to simplify Knockout app development.

## Installation

Using Bower:

```console
$ bower install kohandlers --save
```

Using NuGet: 

```console
$ Install-Package KoHandlers
```

## Usage

You could use geomath in different context.

### Browser (with built file)

Include built script in your HTML file.

```html
<script type="text/javascript" src="path/to/knockout.js"></script>
<script type="text/javascript" src="path/to/kohandlers.min.js"></script>
```

### Browser (AMD from source)

#### Configure RequireJS.

```javascript
requirejs.config({
    paths: {
        knockout: 'path/to/knockout',
        kohandlers: 'path/to/kohandlers'
    }
});
```

Then include promise in your dependencies.

#### Load handlers

```javascript
define(["kohandlers"], function() {
    // Your code
});
```

#### Configure as app dependency

```javascript
requirejs.config({
    deps: ['kohandlers'],

    paths: {
        knockout: 'path/to/knockout',
        kohandlers: 'path/to/kohandlers'
    }
});
```

## Documentation

For now documentation can be found in code.