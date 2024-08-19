import{g as F,L,W as O,l as G,e as H}from"./api.184af3a8.js";import{g as w,l as _,m as R,n as N,p as A,o as p,c as b,a as s,b as a,w as r,u as t,t as B,q as P,v as T,s as K,r as f,d as y,x as W,y as S,z as q,F as Z,f as U,A as J}from"./vendor.705dcf8c.js";import{_ as Q}from"./index.12423b84.js";const X={style:{"min-height":"100%",width:"100%"}},Y=["onClick"],ee={class:"overflow-hidden"},oe={class:"px-4 pt-2 pb-4 border-t border-t-gray-800"},te={class:"pb-4 text-gray-50 group-hover:text-yellow-300"},le={class:"pt-3 flex justify-between items-center border-t border-t-gray-600 border-opacity-50"},ne={class:"text-gray-50"},ae=["onClick"],ie={class:"flex justify-center py-10 bg-gray-900"},E=w({props:{list:{type:Array},options:{type:Object},pageSize:{type:Number,default:100}},emits:{cardClick:null},setup(i,{emit:g}){const l=i,d=_([]),m=_(1),o=_(!0);R(()=>{c()});function c(){F({page:m.value,pageSize:l.pageSize}).then(e=>{d.value.push(...e),m.value+=1})}function n(e,z){d.value.splice(z,1)}function u(e){g("cardClick",e)}function v(e){}function x(e){console.error(`${e}: \u52A0\u8F7D\u5931\u8D25`)}function k(e){console.log(`${e}: \u52A0\u8F7D\u6210\u529F`)}function V(){o.value=!1,console.log("\u8BA1\u7B97\u5B8C\u6210")}const C=_(null);function $(){C.value.renderer()}return(e,z)=>{const M=N("loading");return A((p(),b("div",X,[s("button",{onClick:$}," \u5F3A\u5236\u91CD\u7ED8 "),a(t(O),{ref:(h,D)=>{D.waterfall=h,C.value=h},list:d.value,"row-key":i.options.rowKey,gutter:i.options.gutter,"has-around-gutter":i.options.hasAroundGutter,width:i.options.width,breakpoints:i.options.breakpoints,"img-selector":i.options.imgSelector,"background-color":i.options.backgroundColor,"animation-effect":i.options.animationEffect,"animation-duration":i.options.animationDuration,"animation-delay":i.options.animationDelay,"animation-cancel":!0,lazyload:i.options.lazyload,"load-props":i.options.loadProps,"cross-origin":i.options.crossOrigin,align:i.options.align,onAfterRender:V},{item:r(({item:h,url:D,index:j})=>[s("div",{class:"bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group",onClick:I=>u(h)},[s("div",ee,[a(t(L),{url:D,title:"title",alt:h.name,class:"cursor-pointer transition-all duration-300 ease-linear group-hover:scale-105",onLoad:v,onError:x,onSuccess:k},null,8,["url","alt"])]),s("div",oe,[s("h2",te,B(h.name),1),s("div",le,[s("div",ne," $ "+B(h.price),1),s("div",null,[s("button",{class:"px-3 h-7 rounded-full bg-red-500 text-sm text-white shadow-lg transition-all duration-300 hover:bg-red-600",onClick:P(I=>n(h,j),["stop"])}," \u5220\u9664 ",8,ae)])])])],8,Y)]),_:1},8,["list","row-key","gutter","has-around-gutter","width","breakpoints","img-selector","background-color","animation-effect","animation-duration","animation-delay","lazyload","load-props","cross-origin","align"]),A(s("div",ie,[s("button",{class:"px-5 py-2 rounded-full bg-gray-700 text-md text-white cursor-pointer hover:bg-gray-800 transition-all duration-300",onClick:c}," \u52A0\u8F7D\u66F4\u591A ")],512),[[T,!o.value]])],512)),[[M,o.value]])}}});const se=w({props:{visible:{type:Boolean},options:{type:Object}},emits:{"update:visible":null},setup(i,{emit:g}){const l=i,d=K({get(){return l.visible},set(m){g("update:visible",m)}});return(m,o)=>{const c=f("el-drawer");return p(),y(c,{modelValue:t(d),"onUpdate:modelValue":o[0]||(o[0]=n=>W(d)?d.value=n:null),size:"50%","with-header":!1},{default:r(()=>[a(E,{"page-size":20,options:i.options},null,8,["options"])]),_:1},8,["modelValue"])}}}),re={},ue={class:"pb-4 pt-4 flex justify-center bg-gray-900 group",href:"https://github.com/heikaimu/vue3-waterfall-plugin"},de=s("svg",{class:"h-7 w-7 fill-gray-400 transition-all duration-300 group-hover:fill-gray-200",viewBox:"0 0 16 16",version:"1.1","aria-hidden":"true"},[s("path",{d:"M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"})],-1),ce=[de];function pe(i,g){return p(),b("a",ue,ce)}var me=Q(re,[["render",pe]]);const fe=U(" \u6392\u7248 "),ge=U(" \u52A8\u753B "),ve=w({props:{form:{type:Object,default:()=>{}}},setup(i){const l=S(i.form),d=_([{label:"fadeIn",value:"fadeIn"},{label:"fadeInUp",value:"animate__fadeInUp"},{label:"fadeInDown",value:"animate__fadeInDown"},{label:"zoomIn",value:"animate__zoomIn"}]);return(m,o)=>{const c=f("el-input"),n=f("el-form-item"),u=f("el-divider"),v=f("el-input-number"),x=f("el-switch"),k=f("el-option"),V=f("el-select"),C=f("el-color-picker"),$=f("el-form");return p(),y($,{size:"small","label-position":"top"},{default:r(()=>[a(n,{label:"imgSelector"},{default:r(()=>[a(c,{modelValue:t(l).imgSelector,"onUpdate:modelValue":o[0]||(o[0]=e=>t(l).imgSelector=e),disabled:""},null,8,["modelValue"])]),_:1}),a(u,{"content-position":"left"},{default:r(()=>[fe]),_:1}),a(n,{label:"width"},{default:r(()=>[a(v,{modelValue:t(l).width,"onUpdate:modelValue":o[1]||(o[1]=e=>t(l).width=e),min:0,step:10,style:{width:"100%"}},null,8,["modelValue"])]),_:1}),a(n,{label:"gutter"},{default:r(()=>[a(v,{modelValue:t(l).gutter,"onUpdate:modelValue":o[2]||(o[2]=e=>t(l).gutter=e),min:0,step:2,style:{width:"100%"}},null,8,["modelValue"])]),_:1}),a(n,{label:"hasAroundGutter"},{default:r(()=>[a(x,{modelValue:t(l).hasAroundGutter,"onUpdate:modelValue":o[3]||(o[3]=e=>t(l).hasAroundGutter=e)},null,8,["modelValue"])]),_:1}),a(u,{"content-position":"left"},{default:r(()=>[ge]),_:1}),a(n,{label:"animationEffect"},{default:r(()=>[a(V,{modelValue:t(l).animationEffect,"onUpdate:modelValue":o[4]||(o[4]=e=>t(l).animationEffect=e),placeholder:"\u8BF7\u9009\u62E9",style:{width:"100%"}},{default:r(()=>[(p(!0),b(Z,null,q(d.value,e=>(p(),y(k,{key:e.value,label:e.label,value:e.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(n,{label:"animationDuration"},{default:r(()=>[a(v,{modelValue:t(l).animationDuration,"onUpdate:modelValue":o[5]||(o[5]=e=>t(l).animationDuration=e),min:0,step:100,style:{width:"100%"}},null,8,["modelValue"])]),_:1}),a(n,{label:"animationDelay"},{default:r(()=>[a(v,{modelValue:t(l).animationDelay,"onUpdate:modelValue":o[6]||(o[6]=e=>t(l).animationDelay=e),min:0,step:100,style:{width:"100%"}},null,8,["modelValue"])]),_:1}),a(n,{label:"backgroundColor"},{default:r(()=>[a(C,{modelValue:t(l).backgroundColor,"onUpdate:modelValue":o[7]||(o[7]=e=>t(l).backgroundColor=e)},null,8,["modelValue"])]),_:1})]),_:1})}}}),he={class:"h-screen flex overflow-hidden"},_e={class:"flex-auto overflow-y-auto"},be={class:"h-full flex flex-col justify-between"},we={class:"p-4 border-b border-b-gray-100 shadow-md"},ye=s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[s("path",{"fill-rule":"evenodd",d:"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z","clip-rule":"evenodd"})],-1),Ce=[ye],xe=s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[s("path",{"fill-rule":"evenodd",d:"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z","clip-rule":"evenodd"})],-1),ke=[xe],Ve={class:"p-4 flex-auto overflow-y-auto"},$e=w({setup(i){function g(){const c=_(!0);function n(u){c.value=u}return{isOpen:c,handleToggleController:n}}const{isOpen:l,handleToggleController:d}=g(),m=S({rowKey:"id",gutter:10,hasAroundGutter:!0,width:320,breakpoints:{1200:{rowPerView:4},800:{rowPerView:3},500:{rowPerView:2}},animationEffect:"animate__fadeInUp",animationDuration:1e3,animationDelay:300,backgroundColor:"#2C2E3A",imgSelector:"src.original",loadProps:{loading:G,error:H,ratioCalculator:(c,n)=>{const u=3/4,v=4/3;return Math.random()>.5?u:v}},lazyload:!0,align:"center"}),o=_(!1);return(c,n)=>(p(),b("div",he,[a(se,{visible:o.value,"onUpdate:visible":n[0]||(n[0]=u=>o.value=u),options:t(m)},null,8,["visible","options"]),s("div",_e,[a(E,{options:t(m),onCardClick:n[1]||(n[1]=u=>o.value=!0)},null,8,["options"])]),s("div",be,[s("div",we,[t(l)?(p(),b("span",{key:0,onClick:n[2]||(n[2]=u=>t(d)(!1))},Ce)):(p(),b("span",{key:1,onClick:n[3]||(n[3]=u=>t(d)(!0))},ke))]),s("div",Ve,[t(l)?(p(),y(ve,{key:0,form:t(m)},null,8,["form"])):J("",!0)]),a(me)])]))}}),Be=w({setup(i){return(g,l)=>(p(),y($e))}});export{Be as default};
