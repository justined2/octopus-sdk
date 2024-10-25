import { defineComponent } from 'vue';
export const paginateParams = defineComponent({
  methods: {
    checkPage(): boolean{
      return ['podcasts', 'emissions', 'participants', 'playlists', 'productors'].includes(this.$route.name?.toString()??"");
    },
    updatePaginateSize(ps:number){
      if(this.checkPage()){
        this.$router.push({query: {...this.$route.query, ...{ps:ps, pr:1}}});
      }
    },
    updatePaginateRank(pr:number){
      if(this.checkPage()){
        this.$router.push({query: {...this.$route.query, ...{pr:pr}}});
      }
    }
  },
});