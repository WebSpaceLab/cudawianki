import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuid } from "uuid";

const defaultOptions = {
  closable: true,
  html: false,
  timeout: 3000,
  style: "info",
};


export const useFlashStore = defineStore('flash', {
  state: () => {
    return { items: []
    }
  },
 
  actions: {
    add(message , style , options) {
      options = { ...defaultOptions, style, ...options };

      const id = uuid()
      
      this.items.unshift({
        id,
        message,
        ...options,
      })

      if (options.timeout !== false) {
        setTimeout(() => {
          this.remove(id);
        }, options.timeout);
      }
    },

    success(message, options) {
      this.add(message, "success", options);
    },

    error(message, options) {
      this.add(message, "error", options);
    },

    warning(message, options) {
      this.add(message, "warning", options);
    },

    info(message, options) {
      this.add(message, "info", options);
    },

    remove(id) {
      const index = this.items.findIndex((item) => item.id === id);

      if (index > -1) {
        this.items.splice(index, 1);
      }
    }
  },
})

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFlashStore, import.meta.hot))
}