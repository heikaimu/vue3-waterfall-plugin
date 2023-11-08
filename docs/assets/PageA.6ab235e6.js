import{g as S,L as B,W as E,l as I,e as L}from"./api.0757e940.js";import{d as C,r as w,o as M,c as b,a as t,w as s,u as h,b as i,e as c,t as $,f as j,g as O,h as m,i as y,_ as F,j as D,k as z,l as G,F as H,m as P}from"./index.d70a9e6c.js";const N={style:{width:"100%"}},T=["onClick"],W={class:"overflow-hidden"},K={class:"px-4 pt-2 pb-4 border-t border-t-gray-800"},Z={class:"pb-4 text-gray-50 group-hover:text-yellow-300"},q={class:"pt-3 flex justify-between items-center border-t border-t-gray-600 border-opacity-50"},J={class:"text-gray-50"},Q=["onClick"],A=C({__name:"WaterfallList",props:{list:{type:Array},options:{type:Object},pageSize:{type:Number,default:100}},emits:{cardClick:null},setup(a,{emit:g}){const o=a,r=w([]),p=w(1);M(()=>{e()});function e(){S({page:p.value,pageSize:o.pageSize}).then(d=>{r.value.push(...d),p.value+=1})}function f(d,k){r.value.splice(k,1)}function l(d){g("cardClick",d)}function u(d){}function _(d){console.error(`${d}: \u52A0\u8F7D\u5931\u8D25`)}function V(d){}return(d,k)=>(c(),b("div",N,[t(h(E),{list:r.value,"row-key":a.options.rowKey,gutter:a.options.gutter,"has-around-gutter":a.options.hasAroundGutter,width:a.options.width,breakpoints:a.options.breakpoints,"img-selector":a.options.imgSelector,"background-color":a.options.backgroundColor,"animation-effect":a.options.animationEffect,"animation-duration":a.options.animationDuration,"animation-delay":a.options.animationDelay,lazyload:a.options.lazyload,"load-props":a.options.loadProps,"cross-origin":a.options.crossOrigin},{item:s(({item:v,url:x,index:n})=>[i("div",{class:"bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group",onClick:U=>l(v)},[i("div",W,[t(h(B),{url:x,class:"cursor-pointer transition-all duration-300 ease-linear group-hover:scale-105",onLoad:u,onError:_,onSuccess:V},null,8,["url"])]),i("div",K,[i("h2",Z,$(v.name),1),i("div",q,[i("div",J," $ "+$(v.price),1),i("div",null,[i("button",{class:"px-3 h-7 rounded-full bg-red-500 text-sm text-white shadow-lg transition-all duration-300 hover:bg-red-600",onClick:j(U=>f(v,n),["stop"])}," \u5220\u9664 ",8,Q)])])])],8,T)]),_:1},8,["list","row-key","gutter","has-around-gutter","width","breakpoints","img-selector","background-color","animation-effect","animation-duration","animation-delay","lazyload","load-props","cross-origin"]),i("div",{class:"flex justify-center py-10 bg-gray-900"},[i("button",{class:"px-5 py-2 rounded-full bg-gray-700 text-md text-white cursor-pointer hover:bg-gray-800 transition-all duration-300",onClick:e}," \u52A0\u8F7D\u66F4\u591A ")])]))}});const R=C({__name:"DialogList",props:{visible:{type:Boolean},options:{type:Object}},emits:{"update:visible":null},setup(a,{emit:g}){const o=a,r=O({get(){return o.visible},set(p){g("update:visible",p)}});return(p,e)=>{const f=m("el-drawer");return c(),y(f,{modelValue:r.value,"onUpdate:modelValue":e[0]||(e[0]=l=>r.value=l),size:"50%","with-header":!1},{default:s(()=>[t(A,{"page-size":20,options:a.options},null,8,["options"])]),_:1},8,["modelValue"])}}}),X={},Y={class:"pb-4 pt-4 flex justify-center bg-gray-900 group",href:"https://github.com/heikaimu/vue3-waterfall-plugin"},ee=i("svg",{class:"h-7 w-7 fill-gray-400 transition-all duration-300 group-hover:fill-gray-200",viewBox:"0 0 16 16",version:"1.1","aria-hidden":"true"},[i("path",{d:"M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"})],-1),oe=[ee];function te(a,g){return c(),b("a",Y,oe)}var le=F(X,[["render",te]]);const ae=C({__name:"Form",props:{form:{type:Object,default:()=>{}}},setup(a){const o=D(a.form),r=w([{label:"fadeIn",value:"fadeIn"},{label:"fadeInUp",value:"animate__fadeInUp"},{label:"fadeInDown",value:"animate__fadeInDown"},{label:"zoomIn",value:"animate__zoomIn"}]);return(p,e)=>{const f=m("el-input"),l=m("el-form-item"),u=m("el-divider"),_=m("el-input-number"),V=m("el-switch"),d=m("el-option"),k=m("el-select"),v=m("el-color-picker"),x=m("el-form");return c(),y(x,{size:"small","label-position":"top"},{default:s(()=>[t(l,{label:"imgSelector"},{default:s(()=>[t(f,{modelValue:o.imgSelector,"onUpdate:modelValue":e[0]||(e[0]=n=>o.imgSelector=n),disabled:""},null,8,["modelValue"])]),_:1}),t(u,{"content-position":"left"},{default:s(()=>[z(" \u6392\u7248 ")]),_:1}),t(l,{label:"width"},{default:s(()=>[t(_,{modelValue:o.width,"onUpdate:modelValue":e[1]||(e[1]=n=>o.width=n),min:0,step:10,style:{width:"100%"}},null,8,["modelValue"])]),_:1}),t(l,{label:"gutter"},{default:s(()=>[t(_,{modelValue:o.gutter,"onUpdate:modelValue":e[2]||(e[2]=n=>o.gutter=n),min:0,step:2,style:{width:"100%"}},null,8,["modelValue"])]),_:1}),t(l,{label:"hasAroundGutter"},{default:s(()=>[t(V,{modelValue:o.hasAroundGutter,"onUpdate:modelValue":e[3]||(e[3]=n=>o.hasAroundGutter=n)},null,8,["modelValue"])]),_:1}),t(u,{"content-position":"left"},{default:s(()=>[z(" \u52A8\u753B ")]),_:1}),t(l,{label:"animationEffect"},{default:s(()=>[t(k,{modelValue:o.animationEffect,"onUpdate:modelValue":e[4]||(e[4]=n=>o.animationEffect=n),placeholder:"\u8BF7\u9009\u62E9",style:{width:"100%"}},{default:s(()=>[(c(!0),b(H,null,G(r.value,n=>(c(),y(d,{key:n.value,label:n.label,value:n.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(l,{label:"animationDuration"},{default:s(()=>[t(_,{modelValue:o.animationDuration,"onUpdate:modelValue":e[5]||(e[5]=n=>o.animationDuration=n),min:0,step:100,style:{width:"100%"}},null,8,["modelValue"])]),_:1}),t(l,{label:"animationDelay"},{default:s(()=>[t(_,{modelValue:o.animationDelay,"onUpdate:modelValue":e[6]||(e[6]=n=>o.animationDelay=n),min:0,step:100,style:{width:"100%"}},null,8,["modelValue"])]),_:1}),t(l,{label:"backgroundColor"},{default:s(()=>[t(v,{modelValue:o.backgroundColor,"onUpdate:modelValue":e[7]||(e[7]=n=>o.backgroundColor=n)},null,8,["modelValue"])]),_:1})]),_:1})}}}),ne={class:"h-screen flex overflow-hidden"},ie={class:"flex-auto overflow-y-auto"},se={class:"h-full flex flex-col justify-between"},re={class:"p-4 border-b border-b-gray-100 shadow-md"},ue=i("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[i("path",{"fill-rule":"evenodd",d:"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z","clip-rule":"evenodd"})],-1),de=[ue],ce=i("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[i("path",{"fill-rule":"evenodd",d:"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z","clip-rule":"evenodd"})],-1),pe=[ce],me={class:"p-4 flex-auto overflow-y-auto"},fe=C({__name:"WaterfallApp",setup(a){function g(){const f=w(!0);function l(u){f.value=u}return{isOpen:f,handleToggleController:l}}const{isOpen:o,handleToggleController:r}=g(),p=D({rowKey:"id",gutter:10,hasAroundGutter:!0,width:320,breakpoints:{1200:{rowPerView:4},800:{rowPerView:3},500:{rowPerView:2}},animationEffect:"animate__fadeInUp",animationDuration:1e3,animationDelay:300,backgroundColor:"#2C2E3A",imgSelector:"src.original",loadProps:{loading:I,error:L},lazyload:!0}),e=w(!1);return(f,l)=>(c(),b("div",ne,[t(R,{visible:e.value,"onUpdate:visible":l[0]||(l[0]=u=>e.value=u),options:p},null,8,["visible","options"]),i("div",ie,[t(A,{options:p,onCardClick:l[1]||(l[1]=u=>e.value=!0)},null,8,["options"])]),i("div",se,[i("div",re,[h(o)?(c(),b("span",{key:0,onClick:l[2]||(l[2]=u=>h(r)(!1))},de)):(c(),b("span",{key:1,onClick:l[3]||(l[3]=u=>h(r)(!0))},pe))]),i("div",me,[h(o)?(c(),y(ae,{key:0,form:p},null,8,["form"])):P("",!0)]),t(le)])]))}}),ve=C({__name:"PageA",setup(a){return(g,o)=>(c(),y(fe))}});export{ve as default};