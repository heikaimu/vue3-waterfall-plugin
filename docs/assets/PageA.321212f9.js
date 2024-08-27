import{g as I,L,W as O,l as G,e as H}from"./api.e101e5da.js";import{g as w,l as _,m as R,n as N,p as A,o as m,c as b,a as s,b as l,w as r,u as t,t as B,q as P,v as T,s as K,r as f,d as C,x as W,y as U,z as q,F as Z,f as S,A as J}from"./vendor.1b483b91.js";import{_ as Q}from"./index.75315142.js";const X={style:{"min-height":"100%",width:"100%"}},Y=["onClick"],ee={class:"overflow-hidden"},oe={class:"px-4 pt-2 pb-4 border-t border-t-gray-800"},te={class:"pb-4 text-gray-50 group-hover:text-yellow-300"},ne={class:"pt-3 flex justify-between items-center border-t border-t-gray-600 border-opacity-50"},le={class:"text-gray-50"},ae=["onClick"],ie={class:"flex justify-center py-10 bg-gray-900"},E=w({props:{list:{type:Array},options:{type:Object},pageSize:{type:Number,default:20}},emits:{cardClick:null},setup(i,{emit:g}){const n=i,d=_([]),p=_(1),o=_(!0);R(()=>{c()});function c(){I({page:p.value,pageSize:n.pageSize}).then(e=>{d.value.push(...e),p.value+=1})}function a(e,z){d.value.splice(z,1)}function u(e){g("cardClick",e)}function v(e){}function y(e){console.error(`${e}: \u52A0\u8F7D\u5931\u8D25`)}function x(e){}function k(){o.value=!1,console.log("\u8BA1\u7B97\u5B8C\u6210")}const V=_(null);function $(){V.value.renderer()}return(e,z)=>{const F=N("loading");return A((m(),b("div",X,[s("button",{onClick:$}," \u5F3A\u5236\u91CD\u7ED8 "),l(t(O),{ref:(h,D)=>{D.waterfall=h,V.value=h},list:d.value,"row-key":i.options.rowKey,gutter:i.options.gutter,"has-around-gutter":i.options.hasAroundGutter,width:i.options.width,breakpoints:i.options.breakpoints,"img-selector":i.options.imgSelector,"background-color":i.options.backgroundColor,"animation-effect":i.options.animationEffect,"animation-duration":i.options.animationDuration,"animation-delay":i.options.animationDelay,"animation-cancel":i.options.animationCancel,lazyload:i.options.lazyload,"load-props":i.options.loadProps,"cross-origin":i.options.crossOrigin,align:i.options.align,onAfterRender:k},{item:r(({item:h,url:D,index:M})=>[s("div",{class:"bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group",onClick:j=>u(h)},[s("div",ee,[l(t(L),{url:D,title:"title",alt:h.name,class:"cursor-pointer transition-all duration-300 ease-linear group-hover:scale-105",onLoad:v,onError:y,onSuccess:x},null,8,["url","alt"])]),s("div",oe,[s("h2",te,B(h.name),1),s("div",ne,[s("div",le," $ "+B(h.price),1),s("div",null,[s("button",{class:"px-3 h-7 rounded-full bg-red-500 text-sm text-white shadow-lg transition-all duration-300 hover:bg-red-600",onClick:P(j=>a(h,M),["stop"])}," \u5220\u9664 ",8,ae)])])])],8,Y)]),_:1},8,["list","row-key","gutter","has-around-gutter","width","breakpoints","img-selector","background-color","animation-effect","animation-duration","animation-delay","animation-cancel","lazyload","load-props","cross-origin","align"]),A(s("div",ie,[s("button",{class:"px-5 py-2 rounded-full bg-gray-700 text-md text-white cursor-pointer hover:bg-gray-800 transition-all duration-300",onClick:c}," \u52A0\u8F7D\u66F4\u591A ")],512),[[T,!o.value]])],512)),[[F,o.value]])}}});const se=w({props:{visible:{type:Boolean},options:{type:Object}},emits:{"update:visible":null},setup(i,{emit:g}){const n=i,d=K({get(){return n.visible},set(p){g("update:visible",p)}});return(p,o)=>{const c=f("el-drawer");return m(),C(c,{modelValue:t(d),"onUpdate:modelValue":o[0]||(o[0]=a=>W(d)?d.value=a:null),size:"50%","with-header":!1},{default:r(()=>[l(E,{"page-size":20,options:i.options},null,8,["options"])]),_:1},8,["modelValue"])}}}),re={},ue={class:"pb-4 pt-4 flex justify-center bg-gray-900 group",href:"https://github.com/heikaimu/vue3-waterfall-plugin"},de=s("svg",{class:"h-7 w-7 fill-gray-400 transition-all duration-300 group-hover:fill-gray-200",viewBox:"0 0 16 16",version:"1.1","aria-hidden":"true"},[s("path",{d:"M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"})],-1),ce=[de];function me(i,g){return m(),b("a",ue,ce)}var pe=Q(re,[["render",me]]);const fe=S(" \u6392\u7248 "),ge=S(" \u52A8\u753B "),ve=w({props:{form:{type:Object,default:()=>{}}},setup(i){const n=U(i.form),d=_([{label:"fadeIn",value:"fadeIn"},{label:"fadeInUp",value:"animate__fadeInUp"},{label:"fadeInDown",value:"animate__fadeInDown"},{label:"zoomIn",value:"animate__zoomIn"}]);return(p,o)=>{const c=f("el-input"),a=f("el-form-item"),u=f("el-divider"),v=f("el-input-number"),y=f("el-switch"),x=f("el-option"),k=f("el-select"),V=f("el-color-picker"),$=f("el-form");return m(),C($,{size:"small","label-position":"top"},{default:r(()=>[l(a,{label:"imgSelector"},{default:r(()=>[l(c,{modelValue:t(n).imgSelector,"onUpdate:modelValue":o[0]||(o[0]=e=>t(n).imgSelector=e),disabled:""},null,8,["modelValue"])]),_:1}),l(u,{"content-position":"left"},{default:r(()=>[fe]),_:1}),l(a,{label:"width"},{default:r(()=>[l(v,{modelValue:t(n).width,"onUpdate:modelValue":o[1]||(o[1]=e=>t(n).width=e),min:0,step:10,style:{width:"100%"}},null,8,["modelValue"])]),_:1}),l(a,{label:"gutter"},{default:r(()=>[l(v,{modelValue:t(n).gutter,"onUpdate:modelValue":o[2]||(o[2]=e=>t(n).gutter=e),min:0,step:2,style:{width:"100%"}},null,8,["modelValue"])]),_:1}),l(a,{label:"hasAroundGutter"},{default:r(()=>[l(y,{modelValue:t(n).hasAroundGutter,"onUpdate:modelValue":o[3]||(o[3]=e=>t(n).hasAroundGutter=e)},null,8,["modelValue"])]),_:1}),l(u,{"content-position":"left"},{default:r(()=>[ge]),_:1}),l(a,{label:"animationCancel\uFF08\u53D6\u6D88\u52A8\u753B\uFF09"},{default:r(()=>[l(y,{modelValue:t(n).animationCancel,"onUpdate:modelValue":o[4]||(o[4]=e=>t(n).animationCancel=e)},null,8,["modelValue"])]),_:1}),l(a,{label:"animationEffect"},{default:r(()=>[l(k,{modelValue:t(n).animationEffect,"onUpdate:modelValue":o[5]||(o[5]=e=>t(n).animationEffect=e),placeholder:"\u8BF7\u9009\u62E9",style:{width:"100%"}},{default:r(()=>[(m(!0),b(Z,null,q(d.value,e=>(m(),C(x,{key:e.value,label:e.label,value:e.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(a,{label:"animationDuration"},{default:r(()=>[l(v,{modelValue:t(n).animationDuration,"onUpdate:modelValue":o[6]||(o[6]=e=>t(n).animationDuration=e),min:0,step:100,style:{width:"100%"}},null,8,["modelValue"])]),_:1}),l(a,{label:"animationDelay"},{default:r(()=>[l(v,{modelValue:t(n).animationDelay,"onUpdate:modelValue":o[7]||(o[7]=e=>t(n).animationDelay=e),min:0,step:100,style:{width:"100%"}},null,8,["modelValue"])]),_:1}),l(a,{label:"backgroundColor"},{default:r(()=>[l(V,{modelValue:t(n).backgroundColor,"onUpdate:modelValue":o[8]||(o[8]=e=>t(n).backgroundColor=e)},null,8,["modelValue"])]),_:1})]),_:1})}}}),he={class:"h-screen flex overflow-hidden"},_e={class:"flex-auto overflow-y-auto"},be={class:"h-full flex flex-col justify-between"},we={class:"p-4 border-b border-b-gray-100 shadow-md"},Ce=s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[s("path",{"fill-rule":"evenodd",d:"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z","clip-rule":"evenodd"})],-1),ye=[Ce],Ve=s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[s("path",{"fill-rule":"evenodd",d:"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z","clip-rule":"evenodd"})],-1),xe=[Ve],ke={class:"p-4 flex-auto overflow-y-auto"},$e=w({setup(i){function g(){const c=_(!0);function a(u){c.value=u}return{isOpen:c,handleToggleController:a}}const{isOpen:n,handleToggleController:d}=g(),p=U({rowKey:"id",gutter:10,hasAroundGutter:!0,width:320,breakpoints:{1200:{rowPerView:4},800:{rowPerView:3},500:{rowPerView:2}},animationEffect:"animate__fadeInUp",animationDuration:1e3,animationDelay:300,animationCancel:!1,backgroundColor:"#2C2E3A",imgSelector:"src.original",loadProps:{loading:G,error:H,ratioCalculator:(c,a)=>{const u=3/4,v=4/3;return Math.random()>.5?u:v}},lazyload:!0,align:"center"}),o=_(!1);return(c,a)=>(m(),b("div",he,[l(se,{visible:o.value,"onUpdate:visible":a[0]||(a[0]=u=>o.value=u),options:t(p)},null,8,["visible","options"]),s("div",_e,[l(E,{options:t(p),onCardClick:a[1]||(a[1]=u=>o.value=!0)},null,8,["options"])]),s("div",be,[s("div",we,[t(n)?(m(),b("span",{key:0,onClick:a[2]||(a[2]=u=>t(d)(!1))},ye)):(m(),b("span",{key:1,onClick:a[3]||(a[3]=u=>t(d)(!0))},xe))]),s("div",ke,[t(n)?(m(),C(ve,{key:0,form:t(p)},null,8,["form"])):J("",!0)]),l(pe)])]))}}),Be=w({setup(i){return(g,n)=>(m(),C($e))}});export{Be as default};
