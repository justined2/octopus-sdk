import{d as C,O as y,m as n,u as d,a as l,s as b,n as c,p as w,_ as $,r as k,o as r,c as a,f as h,F as u,b as f,t as p,y as I,A as _,g as v,w as L,i as O}from"./index.js";const F=C({name:"CategoryList",components:{ClassicPopover:y},props:{isFilter:{default:!1,type:Boolean},isDisplay:{default:!1,type:Boolean}},emits:["categoriesLength"],data(){return{hidenCategories:[]}},computed:{...n(d,["storedCategories","storedCategoriesOrga"]),...n(l,["filterOrgaId"]),isPodcastmaker(){return b.generalParameters.podcastmaker},categories(){let e=[];return this.filterOrgaId?e=this.storedCategoriesOrga.filter(t=>t.podcastOrganisationCount):e=this.storedCategories.filter(t=>this.isPodcastmaker?t.podcastOrganisationCount:t.podcastCount),this.$emit("categoriesLength",e.length),e},watchVariable(){return`${this.isDisplay}|${this.categories}`},reloadVariable(){return`${this.filterOrgaId}|${this.storedCategories}`}},watch:{watchVariable:{deep:!0,immediate:!0,handler(){this.$nextTick(()=>{this.resizeWindow()})}},reloadVariable:{deep:!0,immediate:!0,handler(){this.filterOrgaId&&this.fetchCategories(this.filterOrgaId)}}},mounted(){window.addEventListener("resize",this.resizeWindow)},beforeUnmount(){window.removeEventListener("resize",this.resizeWindow)},methods:{...c(l,["filterUpdateIab"]),...c(d,["storedUpdateCategoriesOrga"]),checkIfFilter(e){if(!this.isFilter){this.$router.push({name:"category",params:{iabId:e.id.toString()},query:{productor:this.filterOrgaId}});return}const t=this.$route.query;(!t.iabId||typeof t.iabId=="string"&&parseInt(t.iabId,10)!==e.id)&&this.$router.replace({query:{...t,iabId:e.id.toString()}}),this.filterUpdateIab(e)},resizeWindow(){const e=this.$refs.categoryListContainer;e===null||!e||(e.style.justifyContent="flex-start",this.hidenCategories.length=0,this.categories.forEach(t=>{const i=this.$refs["category"+t.id][0];i&&i.classList.contains("hid")&&i.classList.remove("hid")}),this.categories.forEach(t=>{const i=this.$refs["category"+t.id][0];if(!i)return;const o=i.parentElement;o&&i.offsetLeft+i.clientWidth<=o.clientWidth-20||(this.hidenCategories.push(t),i.classList.contains("hid")||(i.className+=" hid"))}),this.hidenCategories.length||(e.style.justifyContent="center"))},async fetchCategories(e){const t=await w.fetchData({api:0,path:`iab/list/${e}`,parameters:{lang:this.$i18n.locale}});this.storedUpdateCategoriesOrga(t)}}}),S={key:0,class:"d-inline-flex w-100 mb-3 ps-3 pe-3 category-list hide-phone"},V={ref:"categoryListContainer",class:"category-list-container"},z=["onClick"],E=["title"],P=["onMousedown"];function W(e,t,i,o,B,D){const g=k("ClassicPopover");return e.categories.length?(r(),a("div",S,[h("div",V,[(r(!0),a(u,null,f(e.categories,s=>(r(),a("button",{ref_for:!0,ref:"category"+s.id,key:s.id,class:"btn btn-primary btn-on-dark m-1",onClick:m=>e.checkIfFilter(s)},p(s.name),9,z))),128))],512),I(h("button",{id:"categories-dropdown",class:"btn btn-primary btn-on-dark m-1 saooti-more",title:e.$t("See more")},null,8,E),[[_,e.hidenCategories.length]]),v(g,{target:"categories-dropdown","only-click":!0,"is-fixed":!0,"left-pos":!0},{default:L(()=>[(r(!0),a(u,null,f(e.hidenCategories,s=>(r(),a("button",{key:s.id,class:"me-3 octopus-dropdown-item",onMousedown:m=>e.checkIfFilter(s)},p(s.name),41,P))),128))]),_:1})])):O("",!0)}const q=$(F,[["render",W]]);export{q as default};
