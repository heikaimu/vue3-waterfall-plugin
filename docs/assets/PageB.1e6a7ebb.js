import{l as C,e as L,L as P,W as x,g as z}from"./api.ddc1e152.js";import{_ as S}from"./index.5c4ccb44.js";import{g as B,y as D,m as E,c as l,b as g,w as M,u as e,a as t,F as V,z as A,l as c,o as d,t as p,M as j}from"./vendor.705dcf8c.js";const F={class:"page-b-content"},I={class:"bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group"},G={class:"overflow-hidden"},K={class:"px-4 pt-2 pb-4 border-t border-t-gray-800"},N={class:"pb-4 text-gray-50 group-hover:text-yellow-300"},W={class:"page-menus"},$=["onClick"],O=B({setup(U){const _=function(){const r=c([1,2,3,4,5]),s=c(1),a=c([]);function n(i){s.value=i,u()}function u(){z({page:s.value,pageSize:40}).then(i=>{a.value=i})}return{list:a,page:s,pages:r,handleLoadMore:u,handleChangePage:n}},o=D({rowKey:"id",gutter:10,hasAroundGutter:!0,width:320,breakpoints:{1200:{rowPerView:4},800:{rowPerView:3},500:{rowPerView:2}},animationEffect:"animate__fadeInUp",animationDuration:1e3,animationDelay:300,backgroundColor:"#2C2E3A",imgSelector:"src.original",loadProps:{loading:C,error:L},lazyload:!0,crossOrigin:!0}),{list:h,page:m,pages:v,handleLoadMore:f,handleChangePage:w}=_();E(()=>{f()});function y(r){}function b(r){console.error(`${r}: \u52A0\u8F7D\u5931\u8D25`)}function k(r){}return(r,s)=>(d(),l("div",F,[g(e(x),{list:e(h),"row-key":e(o).rowKey,gutter:e(o).gutter,"has-around-gutter":e(o).hasAroundGutter,width:e(o).width,breakpoints:e(o).breakpoints,"img-selector":e(o).imgSelector,"background-color":e(o).backgroundColor,lazyload:e(o).lazyload,"load-props":e(o).loadProps},{item:M(({item:a,url:n})=>[t("div",I,[t("div",G,[g(e(P),{url:n,class:"cursor-pointer transition-all duration-300 ease-linear group-hover:scale-105",onLoad:y,onError:b,onSuccess:k},null,8,["url"])]),t("div",K,[t("h2",N,p(a.name),1)])])]),_:1},8,["list","row-key","gutter","has-around-gutter","width","breakpoints","img-selector","background-color","lazyload","load-props"]),t("div",W,[(d(!0),l(V,null,A(e(v),a=>(d(),l("p",{key:a,class:j(["page-menus__item",{active:a===e(m)}]),onClick:n=>e(w)(a)},p(a),11,$))),128))])]))}});var Q=S(O,[["__scopeId","data-v-2cbce89c"]]);export{Q as default};