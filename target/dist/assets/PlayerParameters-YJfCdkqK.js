import y from"./ClassicCheckbox-ChwDZ1Xu.js";import{d as f,_ as c,r as h,o as s,c as o,f as t,t as p,F as m,y as d,ar as b,i as r,as as k,z as N,g as n,e as u}from"./index.js";const v=f({components:{ClassicCheckbox:y},props:{isVisible:{default:!1,type:Boolean},choseNumberEpisode:{default:!1,type:Boolean},displayWaveParam:{default:!0,type:Boolean},displayChoiceAllEpisodes:{default:!1,type:Boolean},displayTranscriptParam:{default:!1,type:Boolean},displayArticleParam:{default:!1,type:Boolean},proceedReading:{default:!0,type:Boolean},displayArticle:{default:!0,type:Boolean},displayTranscript:{default:!0,type:Boolean},displayWave:{default:!0,type:Boolean},playerAutoPlay:{default:!1,type:Boolean}},emits:["episodeNumbers","update:proceedReading","update:isVisible","iFrameNumber","update:displayArticle","update:displayTranscript","update:displayWave","update:playerAutoPlay"],data(){return{episodeNumbers:"number",iFrameNumberPriv:"3"}},computed:{iFrameNumber:{get(){return this.iFrameNumberPriv},set(e){const a=parseInt(e,10);!isNaN(a)&&a>=1&&a<=50&&(this.iFrameNumberPriv=e)}}},watch:{episodeNumbers(){this.$emit("episodeNumbers",this.episodeNumbers)},iFrameNumberPriv(){this.$emit("iFrameNumber",this.iFrameNumberPriv)}}}),$={class:"h4 mb-2 mt-3"},P={key:0,class:"d-flex align-items-center flex-wrap mt-1"},g={class:"flex-shrink-0"},B={class:"flex-shrink-0"},A=["title"],C={class:"flex-shrink-0"};function F(e,a,w,x,V,U){const l=h("ClassicCheckbox");return s(),o(m,null,[t("div",$,p(e.$t("player parameters")),1),e.choseNumberEpisode?(s(),o(m,{key:0},[e.displayChoiceAllEpisodes?(s(),o("div",P,[d(t("input",{"onUpdate:modelValue":a[0]||(a[0]=i=>e.episodeNumbers=i),class:"form-check-input",type:"radio",name:"episodeNumbers",value:"all"},null,512),[[b,e.episodeNumbers]]),t("span",g,p(e.$t("Show every episode")),1)])):r("",!0),t("div",{class:N(["d-flex align-items-center flex-wrap",e.displayChoiceAllEpisodes?"":"mt-3"])},[e.displayChoiceAllEpisodes?d((s(),o("input",{key:0,"onUpdate:modelValue":a[1]||(a[1]=i=>e.episodeNumbers=i),class:"form-check-input",type:"radio",name:"episodeNumbers",value:"number"},null,512)),[[b,e.episodeNumbers]]):r("",!0),t("span",B,p(e.$t("Show")),1),d(t("input",{id:"number-input","onUpdate:modelValue":a[2]||(a[2]=i=>e.iFrameNumber=i),type:"number",min:"1",max:"50",class:"input-share-player text-center m-2"},null,512),[[k,e.iFrameNumber]]),t("label",{for:"number-input",title:e.$t("Number of player podcasts")},null,8,A),t("span",C,p(e.$t("Last podcasts")),1)],2),n(l,{"text-init":e.proceedReading,"id-checkbox":"proceed-reading-checkbox",label:e.$t("Proceed reading"),"onUpdate:textInit":a[3]||(a[3]=i=>e.$emit("update:proceedReading",i))},null,8,["text-init","label"]),n(l,{"text-init":e.isVisible,"id-checkbox":"is-visible-checkbox",label:e.$t("Podcasts still available"),"onUpdate:textInit":a[4]||(a[4]=i=>e.$emit("update:isVisible",i))},null,8,["text-init","label"])],64)):r("",!0),e.displayArticleParam?(s(),u(l,{key:1,"text-init":e.displayArticle,"id-checkbox":"display-article-checkbox",label:e.$t("Display associated article"),"onUpdate:textInit":a[5]||(a[5]=i=>e.$emit("update:displayArticle",i))},null,8,["text-init","label"])):r("",!0),e.displayTranscriptParam?(s(),u(l,{key:2,"text-init":e.displayTranscript,"id-checkbox":"display-transcript-checkbox",label:e.$t("If the transcript is available, show it"),"onUpdate:textInit":a[6]||(a[6]=i=>e.$emit("update:displayTranscript",i))},null,8,["text-init","label"])):r("",!0),e.displayWaveParam?(s(),u(l,{key:3,"text-init":e.displayWave,"id-checkbox":"display-wave-checkbox",label:e.$t("Show animated wave"),"onUpdate:textInit":a[7]||(a[7]=i=>e.$emit("update:displayWave",i))},null,8,["text-init","label"])):r("",!0),n(l,{"text-init":e.playerAutoPlay,"id-checkbox":"player-autoplay-checkbox",label:e.$t("Trigger automatic reading if this is possible"),"onUpdate:textInit":a[8]||(a[8]=i=>e.$emit("update:playerAutoPlay",i))},null,8,["text-init","label"])],64)}const E=c(v,[["render",F]]);export{E as default};
