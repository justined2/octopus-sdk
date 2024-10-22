const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CommentItem-C0pl50nA.js","assets/index.js","assets/index.css","assets/selenium-CamdCoc1.js","assets/displayMethods-CzaGbBDz.js","assets/CommentStore-DzAJcgPT.js","assets/CommentItem-84uAyw1-.css"])))=>i.map(i=>d[i]);
import{d as b,j as y,p as w,q as f,v as C,_ as I,r as l,o as s,c as n,f as i,t as r,g as h,w as L,F as u,b as p,i as d,e as $,z as A}from"./index.js";import S from"./ClassicLoading-Bf3Fy18F.js";import"./ClassicSpinner-CcbqjM9h.js";const E=f(()=>C(()=>import("./CommentItem-C0pl50nA.js").then(t=>t.a),__vite__mapDeps([0,1,2,3,4,5,6]))),_=f(()=>C(()=>import("./index.js").then(t=>t.ay),__vite__mapDeps([1,2]))),z=b({name:"CommentsList",components:{ClassicLoading:S,CommentItem:E,ClassicPopover:_},mixins:[y],props:{size:{default:10,type:Number},podcast:{default:void 0,type:Object},reload:{default:!1,type:Boolean},answerToComment:{default:void 0,type:Number},isFlatList:{default:!1,type:Boolean},stateFilter:{default:"",type:String},organisationId:{default:void 0,type:String},nbComments:{default:0,type:Number},config:{default:void 0,type:Object},eventToHandle:{default:void 0,type:Object}},emits:["update:nbComments","commentDeleted"],data(){return{loading:!1,error:!1,dfirst:0,dsize:this.size,totalCount:0,comments:[],scrollableSection:void 0,sortType:"DATE_DESC"}},computed:{changed(){return`${this.size}|${this.reload}|${this.dsize}|${this.stateFilter}|${this.podcast?.podcastId}|${this.organisationId}`},isNotAnAnswerList(){return this.answerToComment===void 0},sortChoice(){return[{title:this.$t("The most recent"),value:"DATE_DESC"},{title:this.$t("Top comments"),value:"LIKE_DESC"}]}},watch:{totalCount(){this.$emit("update:nbComments",this.totalCount)},changed(){this.fetchContent(!0)},eventToHandle:{deep:!0,handler(){if(this.eventToHandle){if(this.answerToComment===this.eventToHandle.comment.answerTo){switch(this.eventToHandle.type){case"CREATE":this.createComment(this.eventToHandle.comment);break;case"UPDATE":this.updateComment(this.eventToHandle.comment);break;case"DELETE":this.deleteComment(this.eventToHandle.comment.commentId);break}return}this.eventToHandle.comment.answerTo!==void 0&&this.$refs["comItem"+this.eventToHandle.comment.answerTo]?.[0]?.receiveEvent(this.eventToHandle)}}}},mounted(){this.fetchContent(!0),this.isNotAnAnswerList&&(this.scrollableSection=this.$refs.scrollComponent,this.scrollableSection.addEventListener("scroll",this.handleScroll))},unmounted(){this.isNotAnAnswerList&&this.scrollableSection?.removeEventListener("scroll",this.handleScroll)},methods:{changeSort(t){this.sortType=t,this.fetchContent(!0)},handleScroll(){this.scrollableSection&&this.totalCount>this.comments.length&&this.scrollableSection.scrollTop+this.scrollableSection.clientHeight>=this.scrollableSection.scrollHeight&&this.fetchContent(!1)},findCommentInCommentsLoaded(t){return this.comments.findIndex(e=>e.commentId===t)},createComment(t){this.comments.unshift(t),this.totalCount+=1},updateComment(t){const e=this.findCommentInCommentsLoaded(t.commentId);e!==-1&&this.comments.splice(e,1,t)},deleteComment(t){const e=this.findCommentInCommentsLoaded(t);e!==-1&&(this.comments.splice(e,1),this.totalCount-=1,this.$emit("commentDeleted",t))},async fetchContent(t){if(this.loading)return;this.loading=!0,t&&(this.dfirst=0,this.comments.length=0);const e={first:this.dfirst,size:this.dsize,podcastId:this.podcast?.podcastId,sort:this.sortType,answerTo:this.answerToComment,hideAnswers:!this.isFlatList,state:this.stateFilter.length?this.stateFilter:void 0,organisationId:this.organisationId};try{const a=await w.fetchData({api:2,path:"comment/list",parameters:e});t&&(this.comments.length=0),this.comments.push(...a.result),this.totalCount=a.count,this.dfirst+=this.dsize,this.loading=!1}catch(a){this.handle403(a),this.error=!0}}}}),D={class:"d-flex flex-column"},N={key:0,class:"d-flex align-items-center mb-2"},H={class:"text-secondary me-3"},k={id:"sort-by-comments",class:"btn btn-transparent d-flex align-items-center"},F={class:"ms-1"},q=["disabled","onMousedown"],B={key:1,class:"text-center"},P=["title"];function V(t,e,a,j,M,R){const v=l("ClassicPopover"),g=l("CommentItem"),T=l("ClassicLoading");return s(),n("div",D,[t.isNotAnAnswerList&&t.totalCount!==0?(s(),n("div",N,[i("div",H,r(t.$t("Number comments",{nb:t.totalCount})),1),i("button",k,[e[0]||(e[0]=i("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 24 24"},[i("path",{fill:"currentColor",d:"M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h4q.425 0 .713.288T9 17t-.288.713T8 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h10q.425 0 .713.288T15 12t-.288.713T14 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"})],-1)),i("p",F,r(t.$t("Sort by")),1)]),h(v,{target:"sort-by-comments","only-click":!0},{default:L(()=>[(s(!0),n(u,null,p(t.sortChoice,o=>(s(),n("button",{key:o,class:"me-3 octopus-dropdown-item",disabled:o.value===t.sortType,onMousedown:m=>t.changeSort(o.value)},r(o.title),41,q))),128))]),_:1})])):d("",!0),!t.loading&&!t.error&&t.totalCount===0?(s(),n("div",B,r(t.$t("No comments")),1)):d("",!0),i("div",{ref:"scrollComponent",class:A(t.isNotAnAnswerList?"scrolling-comments":"")},[(s(!0),n(u,null,p(t.comments,(o,m)=>(s(),$(g,{ref_for:!0,ref:"comItem"+o.commentId,key:o.commentId,comment:t.comments[m],"onUpdate:comment":c=>t.comments[m]=c,podcast:t.podcast,"is-flat-list":t.isFlatList,config:t.config,"organisation-id":t.organisationId,onDeleteComment:c=>t.deleteComment(o.commentId)},null,8,["comment","onUpdate:comment","podcast","is-flat-list","config","organisation-id","onDeleteComment"]))),128)),h(T,{"loading-text":t.loading?t.$t("Loading content ..."):void 0,"error-text":t.error?t.$t("Comments loading error"):void 0},null,8,["loading-text","error-text"]),!t.isNotAnAnswerList&&t.dfirst+t.dsize<t.totalCount?(s(),n("button",{key:0,class:"btn share-btn mx-2 saooti-more",title:t.$t("See more")},null,8,P)):d("",!0)],2)])}const G=I(z,[["render",V]]);export{G as default};
