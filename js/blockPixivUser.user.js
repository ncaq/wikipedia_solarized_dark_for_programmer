// ==UserScript==
// @name           blockPixivUser
// @namespace      https://www.ncaq.net/
// @description    pixivの指定ユーザをブロックします
// @include        *www.pixiv.net/search.php*
// ==/UserScript==

// jshint browser: true
// jshint globalstrict: true
"use strict";

var blackList =
    {
        "1086026"  : true,
        "11609542" : true,
        "1681171"  : true,
        "2036519"  : true,
        "2301870"  : true,
        "332924"   : true,
        "5306348"  : true,
        "6040862"  : true,
        "14272"    : true,
    };

function loadBlackList()
{
    blackList = JSON.parse(localStorage.getItem("blackList"));
}

function saveBlackList()
{
    localStorage.setItem("blackList", JSON.stringify(blackList));
}

function searchAndDestroy(doc)
{
    Array.prototype.map.call(Array.prototype.filter.call(doc.querySelectorAll(".image-item > a.user"),
                                                         function(x)
                                                         {
                                                             return true === blackList[x.getAttribute("data-user_id")];
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
                        }, false);

document.body.addEventListener('AutoPagerize_DOMNodeInserted',
                               function(evt)
                               {
                                   var node = evt.target;
                                   searchAndDestroy(node);
                               }, false);
