const a=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}};a();const d="modulepreload",l={},m="/polls/",c=function(n,i){return!i||i.length===0?n():Promise.all(i.map(t=>{if(t=`${m}${t}`,t in l)return;l[t]=!0;const e=t.endsWith(".css"),r=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${r}`))return;const o=document.createElement("link");if(o.rel=e?"stylesheet":d,e||(o.as="script",o.crossOrigin=""),o.href=t,document.head.appendChild(o),e)return new Promise((u,f)=>{o.addEventListener("load",u),o.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>n())};Promise.all([c(()=>import("./Root.ad58ef55.js"),["assets/Root.ad58ef55.js","assets/Root.c51cb4ba.css","assets/react-toastify.esm.40c8d3e9.js"]),c(()=>import("./App.d7cdab74.js"),["assets/App.d7cdab74.js","assets/App.0e03d266.css","assets/react-toastify.esm.40c8d3e9.js"])]).then(([{default:s},{default:n}])=>{s(n)});
