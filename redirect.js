// ==UserScript==
// @name           Wikipedia printable redirect
// @description    Wikipedia printable redirect
// @author         Denis Gordeev
// @include        *wikipedia.org/wiki/*
// @version        0.0.0.1
// @grant          none
// ==/UserScript==

function test(url){
    return !!(url.match(/^.*wikipedia.org\/wiki.*/)) && !(url.match(/^.*wikipedia.org\/wiki.*?printable=yes/))
}

function getNewPagePlease(url){
    return url + "?printable=yes";
}

function redirectWikipedia(){
    var links = Array.prototype.slice.call(document.links, 0);
    links.filter(function(link){
        if(test(link.href)){
            var greatNewLink = getNewPagePlease(link.href);
            if(link.hasAttribute('data-outbound-url')) link.setAttribute('data-outbound-url', greatNewLink);
            link.setAttribute('href', greatNewLink);
        }
    });
}

if(test(window.location.href)){window.location.assign(getNewPagePlease(window.location.href));}

window.onload = redirectWikipedia;
setInterval(redirectWikipedia, 50);