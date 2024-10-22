import w from"./ClassicModal-mpJgF1dy.js";import y from"./SnackBar-BYGi5e7s.js";import{J as g}from"./style-sAP9lhUx.js";import{d as $}from"./displayMethods-CzaGbBDz.js";import{d as u,m as x,D as v,n as C,a7 as b,s as l,_ as T,r as a,o as r,e as k,w as d,f as s,t as i,c as n,F as H,b as M,g as c,i as U,h as S}from"./index.js";const O=u({name:"NewsletterModal",components:{SnackBar:y,VSwatches:g,ClassicModal:w},mixins:[$],props:{podcast:{default:void 0,type:Object},emission:{default:void 0,type:Object},playlist:{default:void 0,type:Object}},emits:["close"],data(){return{arrayColors:[{color:"#40a372",mainText:this.$t("Choose main color"),secondText:this.$t("Newsletter elements")},{color:"#000000",mainText:this.$t("Choose text color")},{color:"#FFFFFF",mainText:this.$t("Choose background color")}],shareUrl:window.location.href}},computed:{...x(v,["authOrgaId"]),newsletterInfo(){return this.podcast?{titleModal:this.$t("Share the episode in your newsletter"),imageUrl:`${this.podcast.imageUrl}" alt="${this.$t("Podcast image")}`,title:this.podcast.title,description:this.podcast.description??"",shareText:this.$t("Listen this episode"),emissionHtml:`<tr><td style="padding:5px 0;">
          <div style="display:flex; margin-top:5px;">
          <div style="font-size:20px; color:${this.arrayColors[1].color}; margin-right:5px;text-wrap: nowrap;">${this.$t("Emission")} :</div>
          <a href="${this.shareUrl}" style="font-size: 18px;color: ${this.arrayColors[0].color};overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">${this.podcast.emission.name}</a>
          </div></td></tr>`,articleHtml:!this.podcast?.article||this.podcast.article?.length===0?"":`<tr><td style="padding:5px 0;">
          <div style="display:flex;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7 17h7v-2H7zm0-4h10v-2H7zm0-4h10V7H7zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z"/></svg>
          <a href="${this.podcast.article}" style="color: ${this.arrayColors[1].color};margin-top:2px">${this.$t("See associated article")}</a>
          </div></td></tr>
          `,colorTitle:`color:${this.arrayColors[1].color};`}:this.emission?{titleModal:this.$t("Share the series in your newsletter"),imageUrl:`${this.emission.imageUrl}" alt="${this.$t("Emission image")}`,title:this.emission.name,description:this.emission.description??"",shareText:this.$t("Listen to all episodes"),emissionHtml:"",articleHtml:"",colorTitle:`color:${this.arrayColors[0].color};`}:{titleModal:this.$t("Share the playlist in your newsletter"),imageUrl:`${this.playlist?.imageUrl}" alt="${this.$t("Playlist image")}`,title:this.playlist?.title,description:this.playlist?.description??"",shareText:this.$t("Listen to all episodes"),emissionHtml:"",articleHtml:"",colorTitle:`color:${this.arrayColors[0].color};`}},newsletterHtml(){return`<table style="background:${this.arrayColors[2].color};color:${this.arrayColors[1].color};table-layout: fixed;width:100%;font-size: 14px;">
<tr>
<td valign="top" width="30%" rowspan="7" style="padding-right:5px;"><img width="100%" src="${this.newsletterInfo.imageUrl}" style="border-radius: 4px;"></td>
<td valign="top" width="70%" style="padding:5px 0;"><div style="margin-top:5px;font-size: 24px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-weight:bold;${this.newsletterInfo.colorTitle}">${this.newsletterInfo.title}</div></td>
</tr>${this.newsletterInfo.emissionHtml}
<tr><td style="padding:5px 0;"><div style="overflow: hidden;display: -webkit-box;-webkit-line-clamp: 6;-webkit-box-orient: vertical;word-break: break-word;">${this.newsletterInfo.description}</div></td></tr>
<tr><td valign="top" style="padding:5px 0;"><a href="${this.shareUrl}" style="color: ${this.arrayColors[0].color};">${this.$t("See more")}</a></td></tr>
<tr>${this.newsletterInfo.articleHtml}
<td width="1" style="padding:5px 0;"><a href="${this.shareUrl}" style="font-size: 18px;color: ${this.arrayColors[0].color};text-decoration: none; display:flex;"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="currentColor" d="m9.5 16.5l7-4.5l-7-4.5zM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/></svg><div style="margin-top: 15px; color:${this.arrayColors[1].color};">${this.newsletterInfo.shareText}</div></a></td>
</tr>
</table>
`}},created(){this.initData()},methods:{...C(b,["getOrgaAttributes"]),closePopup(){this.$emit("close")},afterCopy(){this.$refs.snackbar.open(this.$t("Data in clipboard"))},async initData(){const t=this.authOrgaId;if(!t?.length)return;const e=await this.getOrgaAttributes(t??"");if(Object.hasOwn(e,"podcastmakerUrl")&&e.podcastmakerUrl?.length&&(this.shareUrl=e.podcastmakerUrl+window.location.pathname+window.location.search),l.generalParameters.podcastmaker&&l.generalParameters.podcastmakerColor){this.arrayColors[0].color=l.generalParameters.podcastmakerColor;return}Object.hasOwn(e,"COLOR")&&(this.arrayColors[0].color=e.COLOR)}}}),V={class:"d-flex flex-column"},_={class:"d-flex"},q={class:"d-flex flex-column flex-shrink-0 me-3"},z={class:"mb-3"},I={class:"d-flex flex-column"},B={class:"fw-bold"},F={key:0,class:"descriptionText"},L=["innerHTML"];function P(t,e,N,j,D,A){const h=a("VSwatches"),p=a("SnackBar"),m=a("ClassicModal");return r(),k(m,{"id-modal":"newsletter-modal","title-modal":t.newsletterInfo.titleModal,closable:!1,onClose:t.closePopup},{body:d(()=>[s("div",V,[s("div",_,[s("div",q,[s("h4",z,i(t.$t("Configure your Newsletter tile")),1),(r(!0),n(H,null,M(t.arrayColors,o=>(r(),n("div",{key:o.mainText,class:"d-flex align-items-center mb-3"},[c(h,{modelValue:o.color,"onUpdate:modelValue":f=>o.color=f,class:"c-hand me-2","show-fallback":"","fallback-input-type":"color",colors:"text-advanced","popover-to":"right","data-color":o.color},null,8,["modelValue","onUpdate:modelValue","data-color"]),s("div",I,[s("div",B,i(o.mainText),1),o.secondText?(r(),n("div",F,i(o.secondText),1)):U("",!0)])]))),128))]),s("div",{innerHTML:t.newsletterHtml},null,8,L)]),s("button",{class:"btn flex-grow-1 mt-3 fw-bold",onClick:e[0]||(e[0]=o=>t.onCopyCode(t.newsletterHtml,t.afterCopy))},[e[2]||(e[2]=s("span",{class:"saooti-copy me-2"},null,-1)),S(" "+i(t.$t("Copy and embed the HTML code into your email tool")),1)]),c(p,{ref:"snackbar",position:"bottom-left"},null,512)])]),footer:d(()=>[s("button",{class:"btn btn-primary m-1",onClick:e[1]||(e[1]=(...o)=>t.closePopup&&t.closePopup(...o))},i(t.$t("Close")),1)]),_:1},8,["title-modal","onClose"])}const Q=T(O,[["render",P]]);export{Q as default};
