// ==UserScript==
// @name           blockPixivUser
// @namespace      https://www.ncaq.net/
// @description    pixivの指定ユーザをブロックします
// @include        *www.pixiv.net/*
// ==/UserScript==

blackList = new Array
(
    "1681171",
    "2036519",
    "332924",
    "5306348"
);

function userMain(docu)
{
    console.log("start blockPixivUser");

    Array.prototype.map.call(Array.prototype.filter.call(docu.querySelectorAll(".image-item > a.user"),
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
                            userMain(document);
                        },false);

document.body.addEventListener('AutoPagerize_DOMNodeInserted',
                               function(evt)
                               {
                                   var node = evt.target;
                                   userMain(node);
                               }, false);
