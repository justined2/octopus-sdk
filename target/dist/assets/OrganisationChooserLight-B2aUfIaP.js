import{d as o,n,a7 as r,_ as l,o as d,c as h,y as g,ad as u,f as a,t as s,G as c,i as p}from"./index.js";const f=o({props:{width:{default:"100%",type:String},value:{default:void 0,type:String},reset:{default:!1,type:Boolean},page:{default:"",type:String}},emits:["selected"],data(){return{actual:-1,organisation:void 0,init:!1}},watch:{value(){(!this.init||this.value)&&this.fetchOrganisation()},reset(){this.actual=-1}},created(){this.value&&this.fetchOrganisation()},methods:{...n(r,["getOrgaData"]),onOrganisationSelected(){this.$emit("selected",this.actual===-1?void 0:this.organisation)},async fetchOrganisation(){this.value&&(this.organisation=await this.getOrgaData(this.value),this.actual=this.organisation.id,this.init=!0)}}}),m=["id"],v=["value"],S={value:-1},y=["for","title"];function O(t,e,w,$,B,C){return(!t.value||t.init)&&t.organisation?(d(),h("div",{key:0,class:"default-multiselect-width organisation-chooser-light mb-1 ms-1",style:c({width:t.width})},[g(a("select",{id:"organisation_chooser_light"+t.page,"onUpdate:modelValue":e[0]||(e[0]=i=>t.actual=i),class:"c-hand w-100 transparent",onChange:e[1]||(e[1]=(...i)=>t.onOrganisationSelected&&t.onOrganisationSelected(...i))},[a("option",{value:t.organisation.id},s(t.organisation.name),9,v),a("option",S,s(t.$t("No organisation filter")),1)],40,m),[[u,t.actual]]),a("label",{for:"organisation_chooser_light"+t.page,class:"d-inline",title:t.$t("select productor")},null,8,y)],4)):p("",!0)}const k=l(f,[["render",O]]);export{k as default};
