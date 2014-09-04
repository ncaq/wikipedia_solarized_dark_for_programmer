// ==UserScript==
// @name           blockPixivUser
// @namespace      https://www.ncaq.net/
// @description    pixivの指定ユーザをブロックします
// @include        *www.pixiv.net/*
// ==/UserScript==

// jshint browser: true
// jshint globalstrict: true
"use strict";

var blackList = new Array
(
    "1086026",
    "11609542",
    "1681171",
    "2036519",
    "2301870",
    "332924",
    "5306348",
    "6040862"
);

function searchAndDestroy(doc)
{
    Array.prototype.map.call(Array.prototype.filter.call(doc.querySelectorAll(".image-item > a.user"),
                                                         function(x)
                                                         {
                                                             return -1 != blackList.indexOf(x.getAttribute("data-user_id"));
                                                         }),
                             function(x)
                             {
                                 var imageItem = x.parentNode;
                                 imageItem.parentNode.removeChild(imageItem);
                             });
}

window.addEventListener('load',
                        function()
                        {
                            searchAndDestroy(document);
                        },false);

document.body.addEventListener('AutoPagerize_DOMNodeInserted',
                               function(evt)
                               {
                                   var node = evt.target;
                                   searchAndDestroy(node);
                               }, false);
