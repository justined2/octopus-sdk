import { defineComponent } from "vue";
export const loadScript = defineComponent({
  methods: {
    loadScript(src: string, async:boolean, callback: any) {
      const firstElement = document.getElementsByTagName('head')[0] || document.documentElement,
        scriptElement = document.createElement('script');
      scriptElement.type = 'text/javascript';
      scriptElement.src = src;
      scriptElement.async = async;
      scriptElement.addEventListener('load', function() {
        if(callback && typeof callback === 'function') {
          callback(true, window);
        }
      }, false);
      scriptElement.addEventListener('error', function(error) {
        firstElement.removeChild(scriptElement);
        if(callback && typeof callback === 'function') {
          callback(false, error);
        }
      }, false);
      firstElement.insertBefore(scriptElement, firstElement.firstChild);
    }
    
  },
});
