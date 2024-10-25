import { defineComponent } from 'vue';
export const paginateParams = defineComponent({
  methods: {
    checkPage(): boolean{
      return ['podcasts', 'emissions'].includes(this.$route.name?.toString()??"");
    },
    updatePaginateSize(ps:number){
      if(this.checkPage()){
        this.$router.replace({query: {...this.$route.query, ...{ps:ps}}});
      }
    },
    updatePaginateRank(pr:number){
      debugger;
      //TODO diviser par size
      if(this.checkPage()){
        this.$router.replace({query: {...this.$route.query, ...{pr:pr}}});
      }
    }
  },
});