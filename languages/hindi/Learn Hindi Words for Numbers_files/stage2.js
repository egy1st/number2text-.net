var setuptests=function(a){try{jQuery.each(a.tests,function(c,f){try{var d=getversion(f,a);jQuery(f.data).each(function(j,i){var g=i.tag;var h=i.contents[d];if(typeof(h)=="string"){jQuery(g).html(h)}if(typeof(h)=="function"){h(jQuery(g))}if(i.hide){jQuery(g).css("visibility","inherit")}})}catch(e){}})}catch(b){}};