const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ShareButtons-9SDHM0bh.js","assets/index.js","assets/index.css","assets/displayMethods-CzaGbBDz.js","assets/ShareButtons--uAtP8TI.css","assets/PodcastFilterList-0x5vpjx3.js","assets/ClassicSearch-DeffNtC6.js","assets/ClassicSearch-Cp4jKxP3.css","assets/PodcastList-BM7kout9.js","assets/ListPaginate-edBLm_Ig.js","assets/dom-BVfCmWpy.js","assets/ClassicLoading-Bf3Fy18F.js","assets/ClassicSpinner-CcbqjM9h.js","assets/ClassicSpinner-DKas6cj3.css","assets/ListPaginate-DD485-De.css","assets/PodcastItem-BYhh4qWG.js","assets/orgaComputed-ovvKvHgW.js","assets/PodcastImage-jptmSDc7.js","assets/PodcastPlayButton-DEKHY6Ml.js","assets/PodcastPlayButton-LzHMKQPS.css","assets/PodcastImage-BS2GsMWv.css","assets/PodcastItem-CPiW5amy.css","assets/podcast-BC8TJPPC.js","assets/emission-DCe5Xe3w.js","assets/EditBox-Et76Rrff.js"])))=>i.map(i=>d[i]);
import{d as _,j as P,k as y,m as v,l as B,s as n,p as E,q as o,v as s,_ as $,r as a,x as L,o as e,c as p,f as i,t as d,y as I,e as c,i as r,g as l}from"./index.js";import{d as A}from"./displayMethods-CzaGbBDz.js";import{o as w}from"./orgaComputed-ovvKvHgW.js";import C from"./ClassicLoading-Bf3Fy18F.js";import"./ClassicSpinner-CcbqjM9h.js";const D=o(()=>s(()=>import("./ShareButtons-9SDHM0bh.js"),__vite__mapDeps([0,1,2,3,4]))),S=o(()=>s(()=>import("./PodcastFilterList-0x5vpjx3.js"),__vite__mapDeps([5,1,2,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]))),k=o(()=>s(()=>import("./EditBox-Et76Rrff.js"),__vite__mapDeps([24,1,2]))),U=_({components:{ShareButtons:D,PodcastFilterList:S,EditBox:k,ClassicLoading:C},mixins:[A,P,w,y],props:{participantId:{default:void 0,type:Number}},emits:["participantTitle"],data(){return{loaded:!1,participant:void 0,error:!1,reload:!1}},computed:{...v(B,["apiUrl"]),pageParameters(){return{isEditBox:!n.generalParameters.podcastmaker,isShareButtons:n.podcastPage.ShareButtons}},rssUrl(){return`${this.apiUrl}rss/participant/${this.participantId}`},description(){return this.participant?.description??""},name(){return`${this.participant?.firstName??""} ${this.participant?.lastName??""}`.trim()},editRight(){return this.isEditRights(this.participant?.orga?.id)}},watch:{participant:{deep:!0,handler(){this.reload=!this.reload}},participantId:{immediate:!0,handler(){this.getParticipantDetails()}}},methods:{initError(){this.error=!0,this.loaded=!0},async getParticipantDetails(){this.loaded=!1;try{const t=await E.fetchData({api:0,path:"participant/"+this.participantId});if(t?.orga?.privacy!=="PUBLIC"&&this.filterOrgaId!==t?.orga?.id&&this.$route.query.productor!==t?.orga?.id){this.initError();return}this.updateParticipant(t),this.loaded=!0}catch(t){this.handle403(t),this.initError()}},updateParticipant(t){this.participant=t,this.$emit("participantTitle",this.name)}}}),T={class:"page-box"},N={key:0},R={class:"d-flex flex-column align-items-center mb-3"},V=["title","alt"],b={class:"text-capitalize"},O=["innerHTML"];function z(t,F,M,j,q,H){const m=a("EditBox"),h=a("ShareButtons"),u=a("PodcastFilterList"),g=a("ClassicLoading"),f=L("lazy");return e(),p("div",T,[t.loaded&&!t.error?(e(),p("div",N,[i("h1",null,d(t.$t("Animator")),1),i("div",R,[I(i("img",{width:"200",height:"200",title:t.$t("Animator image"),alt:t.$t("Animator image"),class:"img-box mb-3"},null,8,V),[[f,t.proxyImageUrl(t.participant.imageUrl,"200")]]),i("h2",b,d(t.name),1),i("div",{class:"participant-desc html-wysiwyg-content",innerHTML:t.urlify(t.description)},null,8,O),t.editRight&&t.pageParameters.isEditBox?(e(),c(m,{key:0,participant:t.participant,class:"w-100 justify-content-center",onParticipantUpdate:t.updateParticipant},null,8,["participant","onParticipantUpdate"])):r("",!0),t.pageParameters.isShareButtons?(e(),c(h,{key:1,class:"w-100","participant-id":t.participantId,"organisation-id":t.participant.orga.id},null,8,["participant-id","organisation-id"])):r("",!0)]),l(u,{"participant-id":t.participantId,name:t.name,"category-filter":!0,"productor-id":[""],reload:t.reload,"show-count":!0},null,8,["participant-id","name","reload"])])):r("",!0),l(g,{"loading-text":t.loaded?void 0:t.$t("Loading content ..."),"error-text":t.error?t.$t("Animator doesn't exist"):void 0},null,8,["loading-text","error-text"])])}const X=$(U,[["render",z]]);export{X as default};
