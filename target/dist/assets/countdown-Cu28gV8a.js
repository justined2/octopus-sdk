import{d as i}from"./index.js";const n=i({props:{timeRemaining:{default:void 0,type:Number}},data(){return{seconds:0,countdownTimer:void 0,days:0,hours:0,minutes:0,remainingSeconds:0}},mounted(){!this.timeRemaining||this.timeRemaining<=0||(this.seconds=this.timeRemaining,this.countdownTimer=setInterval(()=>{this.timer()},1e3))},unmounted(){clearInterval(this.countdownTimer)},methods:{timer(){this.days=Math.floor(this.seconds/24/60/60);const t=Math.floor(this.seconds-this.days*86400);this.hours=Math.floor(t/3600);const s=Math.floor(t-this.hours*3600);this.minutes=Math.floor(s/60),this.remainingSeconds=this.seconds%60,this.seconds===0?(clearInterval(this.countdownTimer),this.countdownTimer=void 0):this.seconds--},pad(t){return t.toString()}}});export{n as c};
