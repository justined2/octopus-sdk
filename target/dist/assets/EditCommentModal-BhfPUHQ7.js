const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ClassicModal-mpJgF1dy.js","assets/index.js","assets/index.css","assets/ClassicModal-D0ckngeT.css","assets/ClassicLoading-Bf3Fy18F.js","assets/ClassicSpinner-CcbqjM9h.js","assets/ClassicSpinner-DKas6cj3.css","assets/ClassicInputText-DAR8Tgsp.js","assets/ClassicInputText-BffzFYCu.css","assets/ClassicSelect-DwrbPu6f.js","assets/ClassicSelect-oA8pbq5n.css"])))=>i.map(i=>d[i]);
import{d as b,p as N,q as i,v as r,_ as I,r as n,o as a,e as l,w as d,g as s,c as f,F as h,i as p,f as u,t as c}from"./index.js";import{C}from"./config-CKXj5qII.js";const A=i(()=>r(()=>import("./ClassicModal-mpJgF1dy.js"),__vite__mapDeps([0,1,2,3]))),P=i(()=>r(()=>import("./ClassicLoading-Bf3Fy18F.js"),__vite__mapDeps([4,5,1,2,6]))),v=i(()=>r(()=>import("./ClassicInputText-DAR8Tgsp.js"),__vite__mapDeps([7,1,2,8]))),M=i(()=>r(()=>import("./ClassicSelect-DwrbPu6f.js"),__vite__mapDeps([9,1,2,10]))),$=b({name:"EditCommentModal",components:{ClassicModal:A,ClassicLoading:P,ClassicInputText:v,ClassicSelect:M},props:{comment:{default:void 0,type:Object},editRight:{default:!1,type:Boolean}},emits:["close","update:comment"],data(){return{MAX_DESCRIPTION:C.MAX_COMMENT,MAX_NAME:C.MAX_COMMENT_NAME,name:void 0,commentText:void 0,errorName:!0,errorCommentText:!0,commentState:"PENDING",errorUpdate:!1,inProcessing:!1}},created(){this.initComment()},methods:{initComment(){this.comment&&(this.name=this.comment.poster.userName,this.commentText=this.comment.content,this.commentState=this.comment.state)},async onEditComment(){if(this.comment){this.inProcessing=!0;try{const e=await N.putData({api:2,path:"comment/",dataToSend:{commentId:this.comment.commentId,content:this.commentText,name:this.name,state:this.commentState},isNotAuth:!this.editRight});this.$emit("update:comment",e),this.closePopup()}catch{this.errorUpdate=!0}this.inProcessing=!1}},closePopup(){this.$emit("close")}}}),V=["disabled"];function S(e,t,D,y,O,U){const E=n("ClassicLoading"),m=n("ClassicInputText"),g=n("ClassicSelect"),T=n("ClassicModal");return a(),l(T,{"id-modal":"edit-comment-modal","title-modal":e.$t("Edit comment"),onClose:e.closePopup},{body:d(()=>[s(E,{"loading-text":e.inProcessing?e.$t("Send in progress"):void 0,"error-text":e.errorUpdate?e.$t("An error occurred"):void 0},null,8,["loading-text","error-text"]),!e.inProcessing&&!e.errorUpdate?(a(),f(h,{key:0},[s(m,{"text-init":e.name,"onUpdate:textInit":t[0]||(t[0]=o=>e.name=o),errorVariable:e.errorName,"onUpdate:errorVariable":t[1]||(t[1]=o=>e.errorName=o),"input-id":"username-input",label:e.$t("Your name"),"max-length":e.MAX_NAME},null,8,["text-init","errorVariable","label","max-length"]),s(m,{"text-init":e.commentText,"onUpdate:textInit":t[2]||(t[2]=o=>e.commentText=o),errorVariable:e.errorCommentText,"onUpdate:errorVariable":t[3]||(t[3]=o=>e.errorCommentText=o),"input-id":"comment-textarea",label:e.$t("Comment"),"max-length":e.MAX_DESCRIPTION,"error-text":e.$t("Please provide a comment"),"is-textarea":!0,"is-emoji-picker":!0,"emoji-relative-class":"octopus-modal-dialog",focus:!0},null,8,["text-init","errorVariable","label","max-length","error-text"]),e.editRight?(a(),l(g,{key:0,"text-init":e.commentState,"onUpdate:textInit":t[4]||(t[4]=o=>e.commentState=o),"id-select":"comment-state-select",label:e.$t("Status"),"display-label":!0,options:[{title:e.$t("pending"),value:"PENDING"},{title:e.$t("Validated"),value:"VALIDATED"},{title:e.$t("Invalid"),value:"NOT_VALID"}]},null,8,["text-init","label","options"])):p("",!0)],64)):p("",!0)]),footer:d(()=>[u("button",{class:"btn m-1",onClick:t[5]||(t[5]=(...o)=>e.closePopup&&e.closePopup(...o))},c(e.$t("No")),1),u("button",{class:"btn btn-primary m-1",disabled:e.errorName||e.errorCommentText,onClick:t[6]||(t[6]=(...o)=>e.onEditComment&&e.onEditComment(...o))},c(e.$t("Yes")),9,V)]),_:1},8,["title-modal","onClose"])}const k=I($,[["render",S]]);export{k as default};
