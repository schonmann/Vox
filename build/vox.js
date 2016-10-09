var VoxAjax=function(){var t={},n=null,e=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],r=function(){for(var t=!1,n=e.length,r=0;r<n;r++){try{t=e[r]()}catch(t){continue}break}return t},c=function(t){var n;try{n=JSON.parse(t.responseText)}catch(e){n=t.responseText}return[n,t]};return t.checkXHR=function(){return null==n&&(n=r()),n},t.http=function(n){var e=t.checkXHR();if(e){var r={success:function(){},error:function(){},then:function(){}};e.open(n.method,n.url,!0),e.setRequestHeader("Content-type",n.contentType),e.onreadystatechange=function(){var t;4===e.readyState&&(t=c(e),e.status>=200&&e.status<300?r.success.apply(r,t):r.error.apply(r,t),r.then.apply(r,t))},e.send(n.data);var o={success:function(t){return r.success=t,o},error:function(t){return r.error=t,o},then:function(t){return r.then=t,o}};return o}},t.post=function(n,e){return t.http({method:"POST",url:n,data:e,contentType:"application/json"})},t.get=function(n,e){return t.http({method:"GET",url:n,data:e,contentType:"application/json"})},t.put=function(n,e){return t.http({method:"PUT",url:n,data:e,contentType:"application/json"})},t.delete=function(n,e){return t.http({method:"DELETE",url:n,data:e,contentType:"application/json"})},t}();
var VoxBinder=function(){var t={};return t.mapping={arr:{}},t.init=function(e){null==e&&(t.ctx=window);for(var n=Vox.getAllElementsByAttr(Vox.attrBind),r=0;r<n.length;r++){var i=n[r].getAttribute(Vox.attrBind).split(".");t.bindElement(n[r],i)}},t.bindGetterSetter=function(e,n,r,i,o){if("undefined"==typeof e)return!1;var a=n.indexOf(".");return a>-1?t.bindGetterSetter(e[n.substring(0,a)],n.substr(a+1),r,i):void Object.defineProperty(e,n,{get:function(){return t.mapping[r]},set:function(e){i[o]=e,t.mapping[r]=e}})},t.bindElement=function(e,n){var r=e.getAttribute(Vox.attrBind),i=r.split(/[\.\[\]\"\']{1,2}/),o=i.shift(),a=t.ctx[o],s=e.tagName.toLowerCase(),u=e.type.toLowerCase(),l="",c="";"input"==s||"textarea"==s?"text"==u||"textarea"==u?(l="value",c="keyup"):"checkbox"==u&&(l="checked",c="change"):"select"==s&&(l="value",c="change");var p=Vox.elementValue(a,i.join("."));t.mapping[r]=p,t.bindGetterSetter(a,i.join("."),r,e,l),""!==l&&""!==c&&(e[l]=p,e.addEventListener(c,function(){var n=e[l],i=e.getAttribute(Vox.attrValueType);if(i)switch(i.toLowerCase()){case"int":n=parseInt(n);break;case"float":n=parseFloat(n);break;case"string":default:n=n.toString()}t.mapping[r]=n},!1))},function(){var t=Array.prototype.push;Array.prototype.push=function(){if(ins=t.apply(this,arguments),this._vox_observe){var e=this._vox_observe,n=this._vox_values;Vox.binder.insertRow(this[this.length-1],e,n)}return ins}}(),t.insertRow=function(e,n,r){for(var i=t.ctx.document.getElementById(n),o=i.rows.length,a=r.length,s=i.insertRow(o),u=0;u<a;u++){var l=s.insertCell(u),c=Vox.getValuePath(e,r[u]);l.innerHTML=c}},t.bindTable=function(e,n,r){e._vox_observe=n,e._vox_values=r,Vox.forEach(e,function(e){t.insertRow(e,n,r)})},t}();
var VoxLocale=function(){var t={},e={};return t.ctx=null,t.getLabelValue=function(e,a,n){if("undefined"==typeof e)return!1;var r=a.indexOf(".");return r>-1?t.getLabelValue(e[a.substring(0,r)],a.substr(r+1),n):e[a]},t.setLabel=function(a){var n=a.getAttribute(Vox.attrLabel),r=n.split(/[\.\[\]\"\']{1,2}/);if(n&&0!=n.trim().legth){var l=t.getLabelValue(e.data,r.join("."),n),u=a.tagName.toLowerCase();"input"==u||"textarea"==u?a.placeholder=l:a.innerHTML=l}},t.update=function(){var e=Vox.getAllElementsByAttr(Vox.attrLabel);Vox.forEach(e,function(e){t.setLabel(e)})},t.setLanguage=function(a,n){null==n&&(t.ctx=window),e=a,t.update()},t}();
var VoxValidation=function(){var t={};return t.ctx=null,t.invalids=[],t.init=function(e){null==e&&(t.ctx=window)},t.getVoxdElements=function(){var e=t.ctx.document.getElementsByTagName("*");t.invalids=[],Vox.forEach(e,function(e){e.getAttribute(Vox.attrPattern)&&t.invalids.push(e);var a=e.getAttribute(Vox.attrRequired);"true"==a&&t.invalids.push(e)})},t.validateRegex=function(t,e){var a=new RegExp(e);return a.test(t)},t.validateRequired=function(){var e=[];return Vox.forEach(t.invalids,function(a){var i=a.tagName.toLowerCase();if("input"==i||"textarea"==i){var n=a.value.trim(),r=a.getAttribute(Vox.attrRequired),u=a.getAttribute(Vox.attrPattern),o=r?"^.{0}$":u;if(1==t.validateRegex(n,o)){var l={element:a};l.message=a.getAttribute(Vox.attrInvalidMessage),e.push(l)}}}),e},t.validateAll=function(e){t.getVoxdElements(),e(t.validateRequired())},t}();
var Vox=function(){var t={};return t.ctx=null,t.binder=VoxBinder,t.attrBind="vox-bind",t.attrValueType="vox-value-type",t.validation=VoxValidation,t.attrPattern="vox-pattern",t.attrRequired="vox-required",t.attrInvalidMessage="vox-message",t.ajax=VoxAjax,t.locale=VoxLocale,t.attrLabel="vox-label",t.bootstrap=function(){},t.forEach=function(t,e){for(var n=t.length,r=0;r<n;r++)e(t[r],r,t)},t.getAllElementsByAttr=function(t){for(var e=[],n=document.getElementsByTagName("*"),r=0;r<n.length;r++)null!==n[r].getAttribute(t)&&e.push(n[r]);return e},t.elementValue=function(e,n){if("undefined"==typeof e)return!1;var r=n.indexOf(".");return r>-1?t.elementValue(e[n.substring(0,r)],n.substr(r+1)):e[n]},t.getObjectAttr=function(t,e){if("undefined"!=typeof e&&null!==e){t=t.split(/[\.\[\]\"\']{1,2}/);for(var n=0,r=t.length;n<r;n++)if(""!==t[n]&&(e=e[t[n]],"undefined"==typeof e||null===e))return;return e}},t.getValuePath=function(e,n){if("undefined"==typeof e)return!1;var r=n.indexOf(".");return r>-1?t.getValuePath(e[n.substring(0,r)],n.substr(r+1)):e[n]},t}();