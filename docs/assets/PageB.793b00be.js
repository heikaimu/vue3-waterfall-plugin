import{l as C,e as P,L,W as x,g as z}from"./api.1488392e.js";import{_ as B,d as D,j as E,o as S,c as l,a as g,w as V,u as t,b as r,F as A,l as M,r as d,e as c,t as p,B as F}from"./index.4c4bbffe.js";const I={class:"page-b-content"},G={class:"bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group"},K={class:"overflow-hidden"},N={class:"px-4 pt-2 pb-4 border-t border-t-gray-800"},O={class:"pb-4 text-gray-50 group-hover:text-yellow-300"},W={class:"page-menus"},$=["onClick"],j=D({__name:"PageB",setup(U){const _=function(){const o=d([1,2,3,4,5]),n=d(1),a=d([]);function s(i){n.value=i,u()}function u(){z({page:n.value,pageSize:40}).then(i=>{a.value=i})}return{list:a,page:n,pages:o,handleLoadMore:u,handleChangePage:s}},e=E({rowKey:"id",gutter:10,hasAroundGutter:!0,width:320,breakpoints:{1200:{rowPerView:4},800:{rowPerView:3},500:{rowPerView:2}},animationEffect:"animate__fadeInUp",animationDuration:1e3,animationDelay:300,backgroundColor:"#2C2E3A",imgSelector:"src.original",loadProps:{loading:C,error:P},lazyload:!0,crossOrigin:!0}),{list:h,page:m,pages:f,handleLoadMore:v,handleChangePage:w}=_();S(()=>{v()});function y(o){}function b(o){console.error(`${o}: \u52A0\u8F7D\u5931\u8D25`)}function k(o){}return(o,n)=>(c(),l("div",I,[g(t(x),{list:t(h),"row-key":e.rowKey,gutter:e.gutter,"has-around-gutter":e.hasAroundGutter,width:e.width,breakpoints:e.breakpoints,"img-selector":e.imgSelector,"background-color":e.backgroundColor,"animation-effect":e.animationEffect,"animation-duration":e.animationDuration,"animation-delay":e.animationDelay,lazyload:e.lazyload,"load-props":e.loadProps,"cross-origin":e.crossOrigin},{item:V(({item:a,url:s})=>[r("div",G,[r("div",K,[g(t(L),{url:s,class:"cursor-pointer transition-all duration-300 ease-linear group-hover:scale-105",onLoad:y,onError:b,onSuccess:k},null,8,["url"])]),r("div",N,[r("h2",O,p(a.name),1)])])]),_:1},8,["list","row-key","gutter","has-around-gutter","width","breakpoints","img-selector","background-color","animation-effect","animation-duration","animation-delay","lazyload","load-props","cross-origin"]),r("div",W,[(c(!0),l(A,null,M(t(f),a=>(c(),l("p",{key:a,class:F(["page-menus__item",{active:a===t(m)}]),onClick:s=>t(w)(a)},p(a),11,$))),128))])]))}});var J=B(j,[["__scopeId","data-v-7aa33dc3"]]);export{J as default};
