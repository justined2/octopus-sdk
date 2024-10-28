import { defineComponent } from 'vue';
export const paginateParamInit = defineComponent({
  props: {
    pr: { default: 0, type: Number },
    ps: { default: 30, type: Number },
  },
  computed:{
    paginateFirst(){
      if(!this.pr){
        return 0;
      }
      return  Math.max((this.pr - 1 ) * this.ps, 0);
    }
  }
});

