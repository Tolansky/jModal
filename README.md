# jModal

jModal is a small jQuery plugin for customisable modal popups, released freely under the Apache license. 

  - No additional css files etc required
  - Footprint ~5kb when minified
  - Accepts your own custom styles as required.

For full details visit https://tolansky.github.io/jModal


### Installation & Usage
Installation only requires referencing the .js file (along with jQuery):
```sh
<script src="scripts/jquery.jmodal.js"></script>
```

To use, you can pass in text directly:
```sh
$().modal({content:'Pass text in directly'});   
```

OR let it pull in full HTML contents from an existing element:
```sh
$('#hiddenDivYum').modal();   // use the contents from the hidden div
```

### Requirements
jQuery

### License
Apache (see LICENSE file included)
