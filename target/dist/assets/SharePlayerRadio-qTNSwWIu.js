const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ShareModalPlayer-DPQuT6R4.js","assets/SnackBar-BYGi5e7s.js","assets/index.js","assets/index.css","assets/SnackBar-BAfrY8QD.css","assets/displayMethods-CzaGbBDz.js","assets/ClassicModal-mpJgF1dy.js","assets/ClassicModal-D0ckngeT.css","assets/ClassicNav-D0TBoB16.js","assets/ClassicNav-DagbBG07.css","assets/QrCode-CaQdB7x0.js","assets/ClassicCheckbox-ChwDZ1Xu.js","assets/ClassicCheckbox-3MIQ8tmA.css","assets/ShareModalPlayer-Co-QiMKE.css","assets/SharePlayerColors-CVZjnTey.js","assets/style-sAP9lhUx.js","assets/style-CR8nY6_o.css","assets/PlayerCommonParameters-CQ30jHZk.js"])))=>i.map(i=>d[i]);
import{d as y,m as d,D as b,l as f,n as g,a7 as C,q as n,v as l,_ as S,r as a,o as i,c as v,f as o,t as s,g as P,e as m,i as h}from"./index.js";const _=n(()=>l(()=>import("./ShareModalPlayer-DPQuT6R4.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13]))),O=n(()=>l(()=>import("./SharePlayerColors-CVZjnTey.js"),__vite__mapDeps([14,15,2,3,16]))),A=n(()=>l(()=>import("./PlayerCommonParameters-CQ30jHZk.js"),__vite__mapDeps([17,11,2,3,12]))),$=y({components:{ShareModalPlayer:_,SharePlayerColors:O,PlayerCommonParameters:A},props:{canal:{default:void 0,type:Object},organisationId:{default:void 0,type:String}},data(){return{isShareModal:!1,color:"#40a372",theme:"#000000",orgaAttributes:void 0,insertCode:!1}},computed:{...d(b,["authOrgaId"]),...d(f,["miniplayerUrl"]),displayInsertCode(){return this.canal?.organisationId===this.authOrgaId},iFrameSrc(){let e=`${this.miniplayerUrl}miniplayer/radio/${this.canal?.id}?distributorId=${this.organisationId}&color=${this.color.substring(1)}&theme=${this.theme.substring(1)}`;return this.insertCode&&(e+="&insertCode=true"),e},iFrame(){return`<iframe src="${this.iFrameSrc}" width="100%" height="140px" scrolling="no" allow="clipboard-read; clipboard-write; autoplay" frameborder="0"></iframe>`}},created(){this.initSharePlayer()},methods:{...g(C,["getOrgaAttributes"]),async initSharePlayer(){this.orgaAttributes=await this.getOrgaAttributes(this.authOrgaId??""),this.initColor()},initColor(){this.orgaAttributes&&(this.color=Object.hasOwn(this.orgaAttributes,"COLOR")?this.orgaAttributes.COLOR:"#40a372",this.theme=Object.hasOwn(this.orgaAttributes,"THEME")?this.orgaAttributes.THEME:"#000000")}}}),w={class:"module-box overflow-visible"},I={class:"mb-3"},E={class:"d-flex"},k=["src"],M={class:"d-flex flex-column"},F={class:"h4 mb-2 mt-3"};function R(e,t,V,D,L,T){const p=a("SharePlayerColors"),u=a("PlayerCommonParameters"),c=a("ShareModalPlayer");return i(),v("div",w,[o("h2",I,s(e.$t("Embed")),1),o("div",E,[o("iframe",{id:"miniplayerIframeRadio",title:"miniplayer",src:e.iFrameSrc,width:"100%",height:"140px",style:{overflow:"hidden"},allow:"clipboard-read; clipboard-write; autoplay",class:"max-iframe mx-3 flex-grow-1"},null,8,k),o("div",M,[P(p,{color:e.color,"onUpdate:color":t[0]||(t[0]=r=>e.color=r),theme:e.theme,"onUpdate:theme":t[1]||(t[1]=r=>e.theme=r)},null,8,["color","theme"]),o("div",F,s(e.$t("player parameters")),1),e.displayInsertCode?(i(),m(u,{key:0,insertCode:e.insertCode,"onUpdate:insertCode":t[2]||(t[2]=r=>e.insertCode=r)},null,8,["insertCode"])):h("",!0),e.isShareModal?(i(),m(c,{key:1,"embed-link":e.iFrame,"embedly-link":e.iFrameSrc,onClose:t[3]||(t[3]=r=>e.isShareModal=!1)},null,8,["embed-link","embedly-link"])):h("",!0),o("button",{class:"btn btn-primary width-fit-content mt-3",onClick:t[4]||(t[4]=r=>e.isShareModal=!0)},s(e.$t("Share the player")),1)])])])}const B=S($,[["render",R]]);export{B as default};
