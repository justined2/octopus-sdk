import{d as n,m as o,u,a as i,_ as s,r as l,o as d,c as m,f as t,t as r,g as c,w as p,h as b,G as f}from"./index.js";const g=n({name:"PageNotFound",computed:{...o(u,["metaTitle"]),...o(i,["filterRubrique","filterIab","filterOrgaId"]),rubriqueQueryParam(){if(this.filterRubrique?.length)return this.filterRubrique.map(e=>e.rubriquageId+":"+e.rubriqueId).join()},backgroundStyle(){return"background-image: url('/img/404.svg');"}},mounted(){document.title=this.metaTitle}}),h={class:"position-absolute module-box"};function y(e,k,q,I,_,S){const a=l("router-link");return d(),m("div",{class:"page-box page-box-absolute page-not-found",style:f(e.backgroundStyle)},[t("div",h,[t("h1",null,r(e.$t("Oops")),1),t("h2",null,r(e.$t("The page you are looking for cannot be found")),1),c(a,{class:"btn btn-primary",to:{name:"home",query:{productor:e.filterOrgaId,iabId:e.filterIab?.id,rubriquesId:e.rubriqueQueryParam}}},{default:p(()=>[b(r(e.$t("Back to home")),1)]),_:1},8,["to"])])],4)}const N=s(g,[["render",y]]);export{N as default};
