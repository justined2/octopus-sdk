import{d as s,m as t,a as r,D as o,s as i}from"./index.js";const m=s({computed:{...t(r,["filterOrgaId"]),...t(o,["isRoleAdmin","authOrgaId"]),isPodcastmaker(){return i.generalParameters.podcastmaker}},methods:{isEditRights(e,a=!0){return a&&this.authOrgaId!==void 0&&this.authOrgaId===e||this.isRoleAdmin}}});export{m as o};
