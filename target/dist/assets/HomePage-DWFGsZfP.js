import{P as c}from"./PodcastInlineList-jdw8YJzC.js";import{d as I,C,m as h,u as D,a as k,s as F,_ as R,r as b,o as i,c as a,F as n,b as q,e as l,w as s,f as g,g as m,h as $,t as L,i as y}from"./index.js";const P=I({name:"HomePage",components:{PodcastInlineList:c,ClassicLazy:C},props:{displayWithoutRubriques:{default:!0,type:Boolean}},emits:["categoriesLength"],data(){return{rubriqueId:[],rubriqueMaxDisplay:20}},computed:{...h(D,["storedCategories","storedCategoriesOrga"]),...h(k,["filterRubriquage","filterOrgaId","filterRubrique","filterRubriqueDisplay","filterIab"]),rubriqueQueryParam(){if(this.filterRubrique?.length)return this.filterRubrique.map(e=>e.rubriquageId+":"+e.rubriqueId).join()},rubriqueDisplay(){return this.filterRubriqueDisplay.filter(e=>e.podcastCount!==0)},rubriqueToShow(){return!this.rubriqueDisplay||this.rubriqueDisplay.length<this.rubriqueMaxDisplay?this.rubriqueDisplay??[]:this.rubriqueDisplay.slice(0,this.rubriqueMaxDisplay)},rubriquageFilter(){return this.filterOrgaId?this.filterRubriquage:[]},rubriqueFilter(){return this.filterRubrique},categories(){let e=[];return this.filterIab?[this.filterIab]:(this.filterOrgaId?e=this.storedCategoriesOrga.filter(r=>r.podcastOrganisationCount):e=this.storedCategories.filter(r=>F.generalParameters.podcastmaker?r.podcastOrganisationCount:r.podcastCount),this.$emit("categoriesLength",e.length),e)}},watch:{rubriqueFilter:{deep:!0,immediate:!0,handler(){this.updateRubriquageFilter()}}},methods:{updateRubriquageFilter(){const e=this.rubriqueFilter.length,r=[];for(let u=0;u<e;u++)0<this.rubriqueFilter[u].rubriqueId&&r.push(this.rubriqueFilter[u].rubriqueId);this.rubriqueId=r}}}),w={class:"page-box"};function O(e,r,u,S,v,B){const o=b("PodcastInlineList"),p=b("ClassicLazy"),f=b("router-link");return i(),a("div",w,[e.rubriquageFilter.length===0?(i(!0),a(n,{key:0},q(e.categories,(t,d)=>(i(),l(p,{key:t.id,"min-height":0,"init-render-delay":2<d?1e3:0},{preview:s(()=>r[0]||(r[0]=[g("div",{style:{"min-height":"650px"}},null,-1)])),default:s(()=>[m(o,{style:{"min-height":"650px"},"iab-id":t.id,title:t.name,"button-text":e.$t("All podcast button",{name:t.name})},null,8,["iab-id","title","button-text"])]),_:2},1032,["init-render-delay"]))),128)):(i(),a(n,{key:1},[(i(!0),a(n,null,q(e.rubriqueToShow,(t,d)=>(i(),l(p,{key:t.rubriqueId,"min-height":0,"init-render-delay":2<d?1e3:0},{preview:s(()=>r[1]||(r[1]=[g("div",{style:{"min-height":"650px"}},null,-1)])),default:s(()=>[m(o,{style:{"min-height":"650px"},"rubrique-id":e.rubriqueId.concat(t.rubriqueId),title:t.name,"button-text":e.$t("All podcast button",{name:t.name})},null,8,["rubrique-id","title","button-text"])]),_:2},1032,["init-render-delay"]))),128)),e.rubriqueDisplay&&e.rubriqueDisplay.length>0?(i(),a(n,{key:0},[e.rubriqueDisplay.length>=e.rubriqueMaxDisplay?(i(),l(f,{key:0,to:{name:"podcasts",query:{productor:e.filterOrgaId,iabId:e.filterIab?.id,rubriquesId:e.rubriqueQueryParam}},class:"btn btn-primary align-self-center width-fit-content mt-5 m-auto"},{default:s(()=>[$(L(e.$t("See more")),1)]),_:1},8,["to"])):e.displayWithoutRubriques?(i(),l(o,{key:1,"no-rubriquage-id":[e.rubriqueDisplay[0].rubriquageId],"rubrique-id":e.rubriqueId,title:e.$t("Without rubric"),"button-text":e.$t("All podcast button",{name:e.$t("Without rubric")})},null,8,["no-rubriquage-id","rubrique-id","title","button-text"])):y("",!0)],64)):y("",!0)],64))])}const V=R(P,[["render",O]]);export{V as default};
