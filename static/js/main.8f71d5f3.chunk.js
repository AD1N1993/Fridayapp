(this["webpackJsonpfriday-lesson1"]=this["webpackJsonpfriday-lesson1"]||[]).push([[0],{11:function(e,n,t){e.exports={inputText:"InputText_inputText__1ZhLQ",error:"InputText_error__f2mwi"}},19:function(e,n,t){e.exports=t(31)},24:function(e,n,t){},25:function(e,n,t){},31:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),l=t(16),c=t.n(l),o=(t(24),t(25),t(1)),u=t(18),i=t(11),m=t.n(i),E=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("input",{className:"".concat(m.a.inputText," ").concat(e.error&&""!==e.value?m.a.error:""),type:"text",value:e.value,onChange:function(n){var t=n.currentTarget.value;e.onChange(t)},onKeyPress:function(n){"Enter"===n.key&&e.actionEnter()}}),r.a.createElement("span",null))},s=t(8),f=t.n(s),h=function(e){return r.a.createElement("button",{className:"red"===e.mode?"".concat(f.a.btn,"  ").concat(f.a.error):f.a.btn,onClick:e.action},e.value)},p=function(){var e=Object(a.useState)(""),n=Object(u.a)(e,2),t=n[0],l=n[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Profile Page"),r.a.createElement(E,{value:t,onChange:l,actionEnter:function(){alert("enter")}}),r.a.createElement(h,{value:"click",action:function(){alert("click")}}))},g=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Login Page"))},d=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"SignUp Page"))},v=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Recovery Page"))},b=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Initiate Page"))};var _=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(o.d,null,r.a.createElement(o.b,{exact:!0,path:"/",render:function(){return r.a.createElement(p,null)}}),r.a.createElement(o.b,{path:"/login",render:function(){return r.a.createElement(g,null)}}),r.a.createElement(o.b,{path:"/signup",render:function(){return r.a.createElement(d,null)}}),r.a.createElement(o.b,{path:"/recovery",render:function(){return r.a.createElement(v,null)}}),r.a.createElement(o.b,{path:"/initiate",render:function(){return r.a.createElement(b,null)}}),r.a.createElement(o.b,{path:"/404",render:function(){return r.a.createElement("h1",null,"Error 404. Page not found.")}}),r.a.createElement(o.a,{from:"*",to:"/404"})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var x=t(10);c.a.render(r.a.createElement(x.a,null,r.a.createElement(r.a.StrictMode,null,r.a.createElement(_,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,n,t){e.exports={btn:"Button_btn__1nhA4",error:"Button_error__3zTj0"}}},[[19,1,2]]]);
//# sourceMappingURL=main.8f71d5f3.chunk.js.map