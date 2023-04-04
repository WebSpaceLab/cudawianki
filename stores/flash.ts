import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuid } from "uuid";

export type FlashStyle = "error" | "success" | "warning" | "info" | "none";

export interface FlashOptions {
  html?: boolean;
  closable?: boolean;
  timeout?: number | false;
  style?: FlashStyle;
}

export interface Flash extends FlashOptions {
  id: string;
  message: string;
}

export interface Notification extends Flash {
  type: string;
}

const defaultOptions: Required<FlashOptions> = {
  closable: true,
  html: false,
  timeout: 3000,
  style: "info",
};


export const useFlashStore = defineStore('flash', {
  state: () => {
    return { items: []  as Flash[]
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    add(message: string, style: FlashStyle, options?: FlashOptions) {
      options = { ...defaultOptions, style, ...options };
      console.log(options)

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

    success(message: string, options?: FlashOptions) {
      this.add(message, "success", options);
    },

    error(message: string, options?: FlashOptions) {
      this.add(message, "error", options);
    },

    warning(message: string, options?: FlashOptions) {
      this.add(message, "warning", options);
    },

    info(message: string, options?: FlashOptions) {
      this.add(message, "info", options);
    },

    remove(id: string) {
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