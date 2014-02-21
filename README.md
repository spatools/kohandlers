# KoHandlers [![Build Status](https://travis-ci.org/spatools/kohandlers.png)](https://travis-ci.org/spatools/kohandlers) [![Bower version](https://badge.fury.io/bo/kohandlers.png)](http://badge.fury.io/bo/kohandlers) [![NuGet version](https://badge.fury.io/nu/kohandlers.png)](http://badge.fury.io/nu/kohandlers)

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

## Usage

You could use kohandlers in different context.

### Browser (AMD from source)

#### Configure RequireJS.

```javascript
requirejs.config({
    paths: {
        knockout: 'path/to/knockout',
        underscore: 'path/to/underscore',
        koutils: 'path/to/koutils',
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
<script type="text/javascript" src="path/to/underscore.js"></script>
<script type="text/javascript" src="path/to/koutils.min.js"></script>
<script type="text/javascript" src="path/to/kohandlers.min.js"></script>
```

## Documentation

For now documentation can be found in code.