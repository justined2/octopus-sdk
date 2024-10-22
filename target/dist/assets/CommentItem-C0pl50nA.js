const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CommentInput-WkxXdM41.js","assets/index.js","assets/index.css","assets/config-CKXj5qII.js","assets/CommentStore-DzAJcgPT.js","assets/CommentInput-DrWGTqSw.css","assets/CommentParentInfo-Dq4wZ5FZ.js","assets/ClassicLoading-Bf3Fy18F.js","assets/ClassicSpinner-CcbqjM9h.js","assets/ClassicSpinner-DKas6cj3.css","assets/selenium-CamdCoc1.js","assets/displayMethods-CzaGbBDz.js","assets/LikeSection-DK14EKxf.js","assets/CommentMoreActions-CSMa_aSw.js","assets/CommentList-BWhdSQK7.js","assets/CommentList-QF_PSRV9.css"])))=>i.map(i=>d[i]);
import{d as y,O as k,K as b,_ as I,r as a,o as n,c as m,f as s,z as l,t as d,g as f,h as w,i as o,m as v,D as O,n as F,q as c,v as p,F as N,e as C}from"./index.js";import{s as P}from"./selenium-CamdCoc1.js";import{d as T}from"./displayMethods-CzaGbBDz.js";import{r as B,u as A}from"./CommentStore-DzAJcgPT.js";b.extend(B);const S=y({name:"CommentBasicView",components:{ClassicPopover:k},mixins:[T,P],props:{comment:{default:()=>({}),type:Object},editRight:{default:!1,type:Boolean}},data(){return{displayPreview:!0,dateInterval:void 0,date:""}},computed:{commentTooLong(){return this.comment.content.length>300},username(){return this.comment.poster.userName},isValidComment(){return this.comment.state==="VALIDATED"},readMore(){return this.displayPreview?this.$t("Read more"):this.$t("Read less")},contentDisplay(){return!this.displayPreview||!this.commentTooLong?this.comment.content:this.comment.content.substring(0,300)+"..."}},mounted(){this.defineDateFromNow(),this.dateInterval=setInterval(()=>{this.defineDateFromNow()},6e4)},unmounted(){clearInterval(this.dateInterval)},methods:{defineDateFromNow(){this.comment.date||(this.date=""),this.date=b(this.comment.date).fromNow()}}}),M={class:"d-flex flex-column w-100"},j={class:"d-flex align-items-center h6 mb-2"},H=["id"],z={class:"me-2"},U={key:0,class:"d-flex align-items-center text-danger me-2"},q=["innerHTML"];function K(e,t,i,u,$,D){const h=a("ClassicPopover");return n(),m("div",M,[s("div",j,[s("strong",{id:"popover-comment"+e.comment.commentId,role:"button",tabindex:"-1",class:l([e.isValidComment?"c-hand-auto":"text-danger","me-2"])},d(e.username),11,H),f(h,{disable:e.isValidComment,target:"popover-comment"+e.comment.commentId,content:e.$t("Comment waiting")},null,8,["disable","target","content"]),s("div",z,d(e.date),1),e.comment.abuse&&e.editRight?(n(),m("div",U,[t[1]||(t[1]=s("span",{class:"saooti-warning me-1"},null,-1)),w(" "+d(e.$t("abuse denounced",{nb:e.comment.abuse})),1)])):o("",!0),e.editRight?(n(),m("span",{key:1,class:l("status-"+e.comment.state)},null,2)):o("",!0)]),s("pre",{innerHTML:e.urlify(e.contentDisplay)},null,8,q),e.commentTooLong?(n(),m("a",{key:0,class:"c-hand font-italic",onClick:t[0]||(t[0]=g=>e.displayPreview=!e.displayPreview)},d(e.readMore),1)):o("",!0)])}const G=I(S,[["render",K]]),J=c(()=>p(()=>import("./CommentInput-WkxXdM41.js"),__vite__mapDeps([0,1,2,3,4,5]))),Q=c(()=>p(()=>import("./CommentParentInfo-Dq4wZ5FZ.js"),__vite__mapDeps([6,1,2,7,8,9,10,11,4]))),W=c(()=>p(()=>import("./LikeSection-DK14EKxf.js"),__vite__mapDeps([12,1,2,4]))),X=c(()=>p(()=>import("./CommentMoreActions-CSMa_aSw.js"),__vite__mapDeps([13,1,2,10,4]))),Y=c(()=>p(()=>import("./CommentList-BWhdSQK7.js"),__vite__mapDeps([14,1,2,7,8,9,15]))),Z=y({name:"CommentItem",components:{CommentInput:J,CommentList:Y,CommentParentInfo:Q,CommentBasicView:G,LikeSection:W,CommentMoreActions:X},mixins:[T,P],props:{comment:{default:()=>({}),type:Object},podcast:{default:void 0,type:Object},isFlatList:{default:!1,type:Boolean},config:{default:void 0,type:Object},organisationId:{default:void 0,type:String}},emits:["deleteComment","update:comment"],data(){return{isAnsweringComment:!1,showAnswers:!1,focus:!1,showParentComment:!1,eventToHandle:void 0}},computed:{...v(O,["authOrgaId","isRoleComments","isRoleAdmin"]),...v(A,["commentUser"]),commentForVmodel:{get(){return this.comment},set(e){this.eventActive||this.$emit("update:comment",e)}},isAnAnswer(){return this.comment.answerTo!==void 0},editRight(){return this.isRoleComments===!0&&(this.authOrgaId===this.podcast?.organisation.id||this.authOrgaId===this.organisationId)||this.isRoleAdmin===!0},isValidComment(){return this.comment.state==="VALIDATED"},canPostComment(){return this.getCanPostComment(this.config,this.podcast,this.authOrgaId!==void 0)},eventActive(){return this.podcast?.conferenceId!==void 0}},methods:{...F(A,["getCanPostComment"]),answerComment(){this.isAnsweringComment=!0,this.focus=!this.focus},newComment(e){this.modifyAnswerNumber(e.commentId),this.eventActive||(this.eventToHandle={type:"CREATE",comment:e}),this.isAnsweringComment=!1},modifyAnswerNumber(e,t=!0){const i=this.comment;if(i.responses)if(this.isAdd)i.responses.push(e);else{const u=i.responses.indexOf(e);u!==-1&&i.responses.splice(u,1)}else t&&(i.responses=[e]);this.$emit("update:comment",i)},emitDeleteComment(){this.eventActive||this.$emit("deleteComment")},receiveEvent(e){e.type==="CREATE"?this.modifyAnswerNumber(e.comment.commentId):e.type==="DELETE"&&this.modifyAnswerNumber(e.comment.commentId,!1),this.eventToHandle=e},updateForAnswerDeleted(e){this.modifyAnswerNumber(e,!1)}}}),_={class:"d-flex flex-nowrap justify-content-between align-items-center"},x={class:"d-flex align-items-center mt-1"},ee={key:1,class:"ms-4 mt-2 answers-section"};function te(e,t,i,u,$,D){const h=a("CommentBasicView"),g=a("CommentMoreActions"),V=a("LikeSection"),L=a("CommentInput"),E=a("CommentList"),R=a("CommentParentInfo");return n(),m("div",{class:l(["d-flex flex-column flex-grow-1 w-100 really-light-secondary-bg",e.isAnAnswer&&!e.isFlatList?"my-1 p-0":"my-3 p-2"])},[s("div",_,[f(h,{comment:e.comment,"edit-right":e.editRight},null,8,["comment","edit-right"]),f(g,{comment:e.commentForVmodel,"onUpdate:comment":t[0]||(t[0]=r=>e.commentForVmodel=r),"edit-right":e.editRight,podcast:e.podcast,config:e.config,onDeleteComment:e.emitDeleteComment},null,8,["comment","edit-right","podcast","config","onDeleteComment"])]),e.isValidComment?(n(),m(N,{key:0},[s("div",x,[f(V,{comment:e.commentForVmodel,"onUpdate:comment":t[1]||(t[1]=r=>e.commentForVmodel=r),"edit-right":e.editRight,podcast:e.podcast},null,8,["comment","edit-right","podcast"]),!e.comment.answerTo&&e.canPostComment?(n(),m("button",{key:0,class:"btn btn-transparent",onClick:t[2]||(t[2]=(...r)=>e.answerComment&&e.answerComment(...r))},d(e.$t("To answer")),1)):o("",!0),e.isFlatList&&e.comment.answerTo?(n(),m("button",{key:1,class:"btn btn-transparent d-flex align-items-center",onClick:t[3]||(t[3]=r=>e.showParentComment=!e.showParentComment)},[w(d(e.$t("In response to"))+" ",1),s("div",{class:l(["saooti-down ms-1",{"arrow-transform":e.showParentComment}])},null,2)])):o("",!0)]),e.isAnsweringComment&&e.canPostComment?(n(),C(L,{key:0,class:"ms-4",focus:e.focus,podcast:e.podcast,"in-answer-comment":e.comment,onCancelAction:t[4]||(t[4]=r=>e.isAnsweringComment=!1),onNewComment:e.newComment},null,8,["focus","podcast","in-answer-comment","onNewComment"])):o("",!0),e.comment.responses?.length&&!e.isFlatList?(n(),m("div",ee,[s("button",{class:"d-flex align-items-center btn-transparent text-primary",onClick:t[5]||(t[5]=r=>e.showAnswers=!e.showAnswers)},[s("div",{class:l(["saooti-down me-3",{"arrow-transform":e.showAnswers}])},null,2),w(" "+d(e.$t("nb answers",{nb:e.comment.responses.length})),1)]),e.showAnswers?(n(),C(E,{key:0,ref:"commentList",podcast:e.podcast,size:5,"answer-to-comment":e.comment.commentId,config:e.config,"event-to-handle":e.eventToHandle,onCommentDeleted:e.updateForAnswerDeleted},null,8,["podcast","answer-to-comment","config","event-to-handle","onCommentDeleted"])):o("",!0)])):o("",!0)],64)):o("",!0),e.showParentComment?(n(),C(R,{key:1,class:"ms-4","comment-id":e.comment.answerTo,"edit-right":e.editRight},null,8,["comment-id","edit-right"])):o("",!0)],2)}const ne=I(Z,[["render",te]]),re=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"}));export{G as C,re as a};
