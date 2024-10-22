const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/EmissionItem-WvccQ6uQ.js","assets/orgaComputed-ovvKvHgW.js","assets/index.js","assets/index.css","assets/displayMethods-CzaGbBDz.js","assets/EmissionPlayerItem-QQDFpPgW.js","assets/EmissionPlayerItem-TAlfrGLz.css","assets/ProductorSearch-jhMN6ObQ.js","assets/ClassicSearch-DeffNtC6.js","assets/ClassicSearch-Cp4jKxP3.css","assets/ProductorSearch-CG21NfRk.css"])))=>i.map(i=>d[i]);
import{d as C,C as D,j as A,m as $,a as v,s as I,p as R,q as y,v as c,_ as S,r as u,o as n,e as h,w as m,c as l,F as q,b as E,g as b,h as L,t as w,i as P,y as k,A as T,z as F,B as U}from"./index.js";import{o as N}from"./orgaComputed-ovvKvHgW.js";import{L as O}from"./ListPaginate-edBLm_Ig.js";import{e as H}from"./emission-DCe5Xe3w.js";import{A as M}from"./AdvancedSearch-H4knw74s.js";import"./dom-BVfCmWpy.js";import"./ClassicLoading-Bf3Fy18F.js";import"./ClassicSpinner-CcbqjM9h.js";const B=y(()=>c(()=>import("./EmissionItem-WvccQ6uQ.js"),__vite__mapDeps([0,1,2,3,4]))),V=y(()=>c(()=>import("./EmissionPlayerItem-QQDFpPgW.js"),__vite__mapDeps([5,2,3,1,4,6]))),j=C({name:"EmissionList",components:{EmissionItem:B,EmissionPlayerItem:V,ListPaginate:O,ClassicLazy:D},mixins:[A],props:{first:{default:0,type:Number},size:{default:30,type:Number},query:{default:void 0,type:String},iabId:{default:void 0,type:Number},organisationId:{default:void 0,type:String},monetization:{default:"UNDEFINED",type:String},before:{default:void 0,type:String},after:{default:void 0,type:String},sort:{default:"DATE",type:String},showCount:{default:!1,type:Boolean},includeHidden:{default:!1,type:Boolean},rubriqueId:{default:()=>[],type:Array},rubriquageId:{default:()=>[],type:Array},noRubriquageId:{default:()=>[],type:Array},nbPodcasts:{default:void 0,type:Number}},data(){return{loading:!0,dfirst:this.first,dsize:this.size,totalCount:0,displayCount:0,emissions:[],rubriques:void 0,isMobile:!1}},computed:{...$(v,["filterOrgaId"]),displayArray(){return this.isMobile?this.emissions:this.emissions.slice(this.dfirst,Math.min(this.dfirst+this.dsize,this.totalCount))},itemPlayer(){return I.emissionsPage.itemPlayer},displayRubriquage(){return I.emissionsPage.rubriquage},changed(){return`${this.first}|${this.size}|${this.organisationId}|${this.query}|${this.monetization}|${this.includeHidden}
      ${this.iabId}|${this.rubriqueId}|${this.rubriquageId}|${this.before}|${this.after}|${this.sort}|${this.noRubriquageId}`},sortText(){let i="";switch(this.sort){case"SCORE":i=" "+this.$t("sort by score");break;case"LAST_PODCAST_DESC":i=" "+this.$t("sort by date");break;case"NAME":i=" "+this.$t("sort by alphabetical");break;default:i=" "+this.$t("sort by date");break}return i.replace("triés","triées")},organisation(){return this.organisationId?this.organisationId:this.filterOrgaId}},watch:{changed(){this.reloadList()},dsize(){this.reloadList()},dfirst(){(!this.emissions[this.dfirst]||this.emissions[this.dfirst].emissionId===0)&&this.fetchContent(!1)}},mounted(){this.fetchContent(!0),this.displayRubriquage&&this.fetchRubriques()},methods:{reloadList(){this.dfirst=0,this.fetchContent(!0)},async fetchContent(i){this.loading=!0;const t={first:this.dfirst,size:this.dsize,query:this.query,organisationId:this.organisation,monetisable:this.monetization,iabId:this.iabId,before:this.before,after:this.after,sort:this.sort,noRubriquageId:this.noRubriquageId.length?this.noRubriquageId:void 0,rubriqueId:this.rubriqueId.length?this.rubriqueId:void 0,rubriquageId:this.rubriquageId.length?this.rubriquageId:void 0,includeHidden:this.includeHidden};try{const r=await R.fetchData({api:0,path:"emission/search",parameters:t,specialTreatement:!0});this.afterFetching(i,r)}catch(r){this.handle403(r)}},afterFetching(i,t){if(i&&(this.emissions.length=0),this.dfirst>this.emissions.length)for(let o=this.emissions.length-1,d=this.dfirst+this.dsize;o<d;o++)this.emissions.push(H());this.displayCount=t.count;const r=t.result.filter(o=>(o===null&&this.displayCount--,o!==null));this.emissions=this.emissions.slice(0,this.dfirst).concat(r).concat(this.emissions.slice(this.dfirst+this.dsize,this.emissions.length)),this.totalCount=t.count,this.loading=!1},async fetchRubriques(){const i=await R.fetchData({api:0,path:"rubriquage/"+this.displayRubriquage});this.rubriques=i.rubriques},mainRubriquage(i){return i.rubriqueIds?.[0]===I.emissionsPage.mainRubrique?"partenaireRubrique":""},rubriquesId(i){if(!this.displayRubriquage||!i.rubriqueIds||i.rubriqueIds.length===0||!this.rubriques||!this.rubriques.length)return;const t=this.rubriques.find(r=>r.rubriqueId===i.rubriqueIds[0]);if(t)return t.name}}}),G={key:0,class:"emission-list two-emissions"},J={key:1,class:"d-flex flex-wrap justify-content-around"};function K(i,t,r,o,d,a){const g=u("EmissionItem"),p=u("router-link"),f=u("ClassicLazy"),e=u("EmissionPlayerItem"),z=u("ListPaginate");return n(),h(z,{id:"emissionListPaginate",first:i.dfirst,"onUpdate:first":t[0]||(t[0]=s=>i.dfirst=s),rowsPerPage:i.dsize,"onUpdate:rowsPerPage":t[1]||(t[1]=s=>i.dsize=s),isMobile:i.isMobile,"onUpdate:isMobile":t[2]||(t[2]=s=>i.isMobile=s),"text-count":i.showCount&&i.emissions.length>1?i.$t("Number emissions",{nb:i.displayCount})+i.sortText:void 0,"total-count":i.totalCount,loading:i.loading,"loading-text":i.loading?i.$t("Loading emissions ..."):void 0,"player-responsive":!0},{list:m(()=>[i.itemPlayer?k((n(),l("div",J,[(n(!0),l(q,null,E(i.displayArray,s=>(n(),l(q,{key:s.emissionId},[s.emissionId!==0?(n(),h(e,{key:0,emission:s,class:F(["m-3 flex-shrink-0",i.mainRubriquage(s)]),"nb-podcasts":i.nbPodcasts,"rubrique-name":i.rubriquesId(s)},null,8,["emission","class","nb-podcasts","rubrique-name"])):P("",!0)],64))),128))],512)),[[T,i.displayRubriquage&&i.rubriques||!i.displayRubriquage]]):(n(),l("div",G,[(n(!0),l(q,null,E(i.displayArray,s=>(n(),h(f,{key:s.emissionId,"min-height":250},{preview:m(()=>[b(p,{to:{name:"emission",params:{emissionId:s.emissionId}}},{default:m(()=>[L(w(s.name),1)]),_:2},1032,["to"])]),default:m(()=>[s.emissionId!==0?(n(),h(g,{key:0,emission:s},null,8,["emission"])):P("",!0)]),_:2},1024))),128))]))]),_:1},8,["first","rowsPerPage","isMobile","text-count","total-count","loading","loading-text"])}const Q=S(j,[["render",K]]),W=y(()=>c(()=>import("./ProductorSearch-jhMN6ObQ.js"),__vite__mapDeps([7,2,3,8,9,10]))),X=C({components:{ProductorSearch:W,EmissionList:Q,AdvancedSearch:M},mixins:[N],props:{productor:{default:void 0,type:String},isEducation:{default:!1,type:Boolean}},data(){return{isInit:!1,searchPattern:"",organisationId:void 0,monetization:"UNDEFINED",emissionId:void 0,iabId:void 0,fromDate:void 0,toDate:void 0,resetRubriquage:!1,includeHidden:!1,sortEmission:"LAST_PODCAST_DESC",noRubriquageId:[],rubriquageId:[],rubriqueId:[]}},computed:{...$(v,["filterIab","filterRubrique"]),organisationRight(){return this.isEditRights(this.organisationId)},organisation(){return this.organisationId?this.organisationId:this.filterOrgaId}},watch:{organisationId(){this.isInit&&(this.resetRubriquage=!this.resetRubriquage,this.rubriquageId=[],this.rubriqueId=[],this.noRubriquageId=[])},searchPattern(i){this.sortEmission=i!==""?"SCORE":"DATE"},filterRubrique:{deep:!0,handler(){this.updateRubriquageFilter(this.filterRubrique)}},filterIab:{deep:!0,handler(){this.iabId=this.filterIab?.id}}},created(){this.initComponent()},methods:{initComponent(){this.iabId=this.filterIab?.id,this.organisationId=this.productor?this.productor:this.filterOrgaId,this.organisation&&this.organisationRight&&(this.includeHidden=!0),this.filterRubrique.length&&this.updateRubriquageFilter(this.filterRubrique),this.$nextTick(()=>{this.isInit=!0})},updateRubriquageFilter(i){const t=i.length,r=[],o=[],d=[];for(let a=0;a<t;a++)i[a].rubriqueId===-1?o.push(i[a].rubriquageId):i[a].rubriqueId===0?r.push(i[a].rubriquageId):d.push(i[a].rubriqueId);this.rubriquageId=r,this.rubriqueId=d,this.noRubriquageId=o}}}),Y={class:"page-box"};function Z(i,t,r,o,d,a){const g=u("ProductorSearch"),p=u("AdvancedSearch"),f=u("EmissionList");return n(),l("div",Y,[U(i.$slots,"new-emission"),b(g,{organisationId:i.organisationId,"onUpdate:organisationId":t[0]||(t[0]=e=>i.organisationId=e),"search-pattern":i.searchPattern,"onUpdate:searchPattern":t[1]||(t[1]=e=>i.searchPattern=e),type:"emission"},null,8,["organisationId","search-pattern"]),b(p,{"is-education":i.isEducation,"reset-rubriquage":i.resetRubriquage,"is-emission":!0,"sort-criteria":i.sortEmission,"organisation-id":i.organisationId,"include-hidden":i.includeHidden,onUpdateCategory:t[2]||(t[2]=e=>i.iabId=e),onUpdateRubriquageFilter:i.updateRubriquageFilter,onUpdateMonetization:t[3]||(t[3]=e=>i.monetization=e),onUpdateFromDate:t[4]||(t[4]=e=>i.fromDate=e),onUpdateToDate:t[5]||(t[5]=e=>i.toDate=e),onUpdateSortCriteria:t[6]||(t[6]=e=>i.sortEmission=e),onIncludeHidden:t[7]||(t[7]=e=>i.includeHidden=e)},null,8,["is-education","reset-rubriquage","sort-criteria","organisation-id","include-hidden","onUpdateRubriquageFilter"]),b(f,{"show-count":!0,first:0,size:30,query:i.searchPattern,"organisation-id":i.organisationId,monetization:i.monetization,before:i.toDate,after:i.fromDate,sort:i.sortEmission,"include-hidden":i.includeHidden,"iab-id":i.iabId,"rubrique-id":i.rubriqueId,"rubriquage-id":i.rubriquageId,"no-rubriquage-id":i.noRubriquageId},null,8,["query","organisation-id","monetization","before","after","sort","include-hidden","iab-id","rubrique-id","rubriquage-id","no-rubriquage-id"])])}const ni=S(X,[["render",Z]]);export{ni as default};
