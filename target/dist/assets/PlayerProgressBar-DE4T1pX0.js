const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/RadioProgressBar-BYyppSYX.js","assets/index.js","assets/index.css","assets/RadioProgressBar-CUP27mF7.css","assets/AdsProgressBar-DL-A3beB.js","assets/PodcastProgressBar-BEQrFc02.js","assets/ProgressBar-Du9DcDQS.js","assets/ProgressBar-c6qSncaO.css"])))=>i.map(i=>d[i]);
import{d as m,m as n,W as c,H as P,q as a,v as t,_ as u,r as s,o as r,e as o,z as l}from"./index.js";const g=a(()=>t(()=>import("./RadioProgressBar-BYyppSYX.js"),__vite__mapDeps([0,1,2,3]))),y=a(()=>t(()=>import("./AdsProgressBar-DL-A3beB.js"),__vite__mapDeps([4,1,2,3]))),_=a(()=>t(()=>import("./PodcastProgressBar-BEQrFc02.js"),__vite__mapDeps([5,1,2,6,7]))),f=m({name:"PlayerProgressBar",components:{PodcastProgressBar:_,RadioProgressBar:g,AdsProgressBar:y},props:{classProgress:{default:"",type:String},playerError:{default:!1,type:Boolean},showComments:{default:!1,type:Boolean},displayAlertBar:{default:!1,type:Boolean},percentLiveProgress:{default:0,type:Number},durationLivePosition:{default:0,type:Number},listenTime:{default:0,type:Number}},data(){return{}},computed:{...n(c,["isAdPlaying"]),...n(P,["radioUrl"])}});function B(e,v,A,E,L,C){const i=s("AdsProgressBar"),p=s("RadioProgressBar"),d=s("PodcastProgressBar");return e.isAdPlaying?(r(),o(i,{key:0,class:l(e.classProgress)},null,8,["class"])):e.radioUrl?(r(),o(p,{key:1,class:l(e.classProgress)},null,8,["class"])):(r(),o(d,{key:2,"show-comments":e.showComments,"display-alert-bar":e.displayAlertBar,"percent-live-progress":e.percentLiveProgress,"duration-live-position":e.durationLivePosition,"player-error":e.playerError,"listen-time":e.listenTime,"class-progress":e.classProgress},null,8,["show-comments","display-alert-bar","percent-live-progress","duration-live-position","player-error","listen-time","class-progress"]))}const b=u(f,[["render",B]]);export{b as default};
