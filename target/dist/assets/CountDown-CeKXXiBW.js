import{c as i}from"./countdown-Cu28gV8a.js";import{d as a,_ as t,o as s,c as n,f as d,t as o}from"./index.js";const r=a({mixins:[i],props:{timeRemaining:{default:void 0,type:Number}}}),m={class:"d-flex flex-column align-items-center bg-warning p-3 mb-3"},p={key:0},u={key:1};function l(e,c,f,h,y,$){return s(),n("div",m,[d("div",null,o(e.$t("This live will start")),1),e.countdownTimer?(s(),n("div",p,o(e.$t("In days hours minutes seconds",{days:e.pad(e.days),hours:e.pad(e.hours),minutes:e.pad(e.minutes),seconds:e.pad(e.remainingSeconds)})),1)):(s(),n("div",u,o(e.$t("In a moment")),1))])}const w=t(r,[["render",l]]);export{w as default};
