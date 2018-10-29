!function(t){var e={};function o(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=e,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(i,n,function(e){return t[e]}.bind(null,n));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";o.r(e);var i={DEFAULT_GAME_FIELD_SIZE:4,DEFAULT_GAME_ITEM_SIZE:100,GAME_ITEM_MOVE_DURATION:400,GAME_FIELD_REFRESH_DURATION:420,MINIMAL_MOUSE_SHIFT:50},n=0;function r(t,e){this.value=t,this.position={vertical:e.vertical,horizontal:e.horizontal},this.htmlElement,this.id=n,n+=1}r.prototype.move=function(t){this.htmlElemnt=document.getElementById(this.id),this.position.horizontal=t.horizontal,this.position.vertical=t.vertical;$(this.htmlElemnt).animate({left:this.position.horizontal+"px",top:this.position.vertical+"px"},i.GAME_ITEM_MOVE_DURATION)},r.prototype.setValue=function(t){this.value=t};var l=r,a={randomInt:function(t,e){var o=t-.5+Math.random()*(e-t+1);return o=Math.round(o)}};function s(t){this.htmlElemnt=document.getElementById("playfield"),this.size=t,this.elements=[]}s.prototype.refresh=function(){var t=this,e="";setTimeout(function(){for(var o=t.htmlElemnt.getElementsByClassName("thing");o[0];)o[0].parentNode.removeChild(o[0]);t.elements.forEach(function(t){e+='<div class="thing t'+t.value+'" id="'+t.id+'" style="top: '+t.position.vertical+"px; left: "+t.position.horizontal+'px;"></div>'}),t.htmlElemnt.innerHTML+=e},i.GAME_FIELD_REFRESH_DURATION)},s.prototype.insertElement=function(t){this.elements.push(t)},s.prototype.getRandomFreeCell=function(){for(var t=[],e=i.DEFAULT_GAME_ITEM_SIZE,o=0;o<this.size;o++)for(var n=0;n<this.size;n++){var r={vertical:o*e,horizontal:n*e};this.isCellFree(r)&&t.push(r)}return t[a.randomInt(0,t.length-1)]},s.prototype.isFreeCells=function(){return this.elements.length!==Math.pow(this.size,2)},s.prototype.addElement=function(){this.isFreeCells()&&(Math.random()<.9?this.insertElement(new l(2,this.getRandomFreeCell())):this.insertElement(new l(4,this.getRandomFreeCell())),this.refresh())},s.prototype.isCellFree=function(t){var e=!0;return this.getElementByPosition(t)&&(e=!1),e},s.prototype.getElementByPosition=function(t){return this.elements.find(function(e){return!e.merged&&e.position.vertical==t.vertical&&e.position.horizontal==t.horizontal})};var c=s;function h(t){this.field=new c(t),this.moveVector={x:0,y:0,compareFunc:void 0}}h.prototype.validatePosition=function(t){var e={vertical:0,horizontal:0};return t.vertical>(this.field.size-1)*i.DEFAULT_GAME_ITEM_SIZE?e.vertical=(this.field.size-1)*i.DEFAULT_GAME_ITEM_SIZE:t.vertical<0?e.vertical=0:e.vertical=t.vertical,t.horizontal>(this.field.size-1)*i.DEFAULT_GAME_ITEM_SIZE?e.horizontal=(this.field.size-1)*i.DEFAULT_GAME_ITEM_SIZE:t.horizontal<0?e.horizontal=0:e.horizontal=t.horizontal,e},h.prototype.isMoveAvalible=function(t){var e=this.validatePosition(t);return this.field.isCellFree(t)&&t.vertical==e.vertical&&t.horizontal==e.horizontal},h.prototype.moveElements=function(){var t=this,e=t.moveVector.y*i.DEFAULT_GAME_ITEM_SIZE,o=t.moveVector.x*i.DEFAULT_GAME_ITEM_SIZE,n=0;t.field.elements.sort(t.moveVector.compareFunc),t.field.elements.forEach(function(r,l,a){for(var s={vertical:r.position.vertical,horizontal:r.position.horizontal},c={vertical:r.position.vertical+e,horizontal:r.position.horizontal+o};t.isMoveAvalible(c);)n+=1,s.horizontal=c.horizontal,s.vertical=c.vertical,c.vertical+=e,c.horizontal+=o;var h=t.field.getElementByPosition(t.validatePosition(c));if(h&&r.value==h.value&&r.id!=h.id){h.setValue(2*r.value);var v=0==t.moveVector.y?0:i.DEFAULT_GAME_ITEM_SIZE/2,u=0==t.moveVector.x?0:i.DEFAULT_GAME_ITEM_SIZE/2,m={vertical:t.validatePosition(c).vertical-v,horizontal:t.validatePosition(c).horizontal-u};r.move(m),a[l].merged=!0,n+=1}else r.move(t.validatePosition(s))}),t.field.elements=t.field.elements.filter(function(t){return!t.merged}),0!==n?t.field.addElement():this.field.isFreeCells()||alert("Game Over!")},h.prototype.init=function(){var t=this,e=0,o=0,n=0,r=0;window.onmousedown=function(t){e=t.clientX,o=t.clientY},window.onmouseup=function(l){n=l.clientX,r=l.clientY,(Math.abs(e-n)>i.MINIMAL_MOUSE_SHIFT||Math.abs(o-r)>i.MINIMAL_MOUSE_SHIFT)&&(t.setMoveVector(e,n,o,r),t.moveElements())},t.field.addElement()},h.prototype.setMoveVector=function(t,e,o,i){Math.abs(e-t)>Math.abs(i-o)?t<e?(this.moveVector.x=1,this.moveVector.y=0,this.moveVector.compareFunc=function(t,e){return e.position.horizontal-t.position.horizontal}):(this.moveVector.x=-1,this.moveVector.y=0,this.moveVector.compareFunc=function(t,e){return t.position.horizontal-e.position.horizontal}):o<i?(this.moveVector.x=0,this.moveVector.y=1,this.moveVector.compareFunc=function(t,e){return e.position.vertical-t.position.vertical}):(this.moveVector.x=0,this.moveVector.y=-1,this.moveVector.compareFunc=function(t,e){return t.position.vertical-e.position.vertical})},new h(i.DEFAULT_GAME_FIELD_SIZE).init()}]);