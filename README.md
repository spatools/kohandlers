﻿# KoHandlers [![Build Status](https://travis-ci.org/spatools/kohandlers.png)](https://travis-ci.org/spatools/kohandlers) [![Bower version](https://badge.fury.io/bo/kohandlers.png)](http://badge.fury.io/bo/kohandlers) [![NuGet version](https://badge.fury.io/nu/kohandlers.png)](http://badge.fury.io/nu/kohandlers)

Knockout Utilities Extensions to simplify Knockout app development.

## Installation

Using Bower:

```console
$ bower install kohandlers --save
```

Using NuGet: 

```console
$ Install-Package KoHandlers
```

Using NPM: 

```console
$ npm install kohandlers --save
```

## Usage

You could use kohandlers in different context.

### Browser (AMD from source)

#### Configure RequireJS.

```javascript
requirejs.config({
    paths: {
        knockout: 'path/to/knockout',
        jquery: 'path/to/jquery', // Optional
        kohandlers: 'path/to/kohandlers'
    }
});
```

#### Load modules

```javascript
define(["kohandlers/all"], function() {
    
});
```

### Browser (with built file)

Include built script in your HTML file.

```html
<script type="text/javascript" src="path/to/knockout.js"></script>
<script type="text/javascript" src="path/to/jquery.js"></script> <!-- Optional -->
<script type="text/javascript" src="path/to/kohandlers.min.js"></script>
```

## Documentation

Documentation is hosted on [Github Wiki](https://github.com/spatools/kohandlers/wiki).