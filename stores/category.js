import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', {
  state: () => {
    return { 
        data: [
            {
                name: 'Kwiaty Cięte',
                description: 'Opis dla kwiatów ciętych w tym miejscu by się przydał.',
                preview_image: '',
                images: [
                    {
                        id: 0,
                        index: 0,
                        name: 'Wiązanki pogrzebowe',
                        filePath: '/images/jpg/wiazanki-pogrzebowe.jpg',
                        alt: 'Wiązanki pogrzebowe'
                    },
                    {
                        id: 1,
                        index: 1,
                        name: 'Wiązanki ślubne',
                        filePath: '/images/jpg/wiazanki-slubne.jpg',
                        alt: 'Wiązanki ślubne'
                    },
                    {
                        id: 2,
                        index: 2,
                        name: 'Wianki',
                        filePath: '/images/jpg/wianki.jpg',
                        alt: 'Wianki'
                    },
                    {
                        id: 3,
                        index: 3,
                        name: 'Strojenie samochodów',
                        filePath: '/images/jpg/strojenia-aut.jpg',
                        alt: 'Strojenie samochodów'
                    },
                    {
                        id: 4,
                        index: 4,
                        name: 'Strojenie sal bankietowych',
                        filePath: '/images/jpg/strojenia-sale-bankietowe.jpg',
                        alt: 'Strojenie sal bankietowych'
                    },
                    {
                        id: 5,
                        index: 5,
                        name: 'Strojenie kościołów',
                        filePath: '/images/jpg/strojenia-kościoły.jpg',
                        alt: 'Strojenie kościołów'
                    },
                    {
                        id: 6,
                        index: 6,
                        name: 'Strojenia',
                        filePath: '/images/jpg/strojenia.jpg',
                        alt: 'Strojenia'
                    },
                    {
                        id: 7,
                        index: 7,
                        name: 'Kwiaty doniczkowe',
                        filePath: '/images/jpg/kwiaty-doniczkowe.jpg',
                        alt: 'Kwiaty doniczkowe'
                    },
                    {
                        id: 8,
                        index: 8,
                        name: 'Kwiaty cięte',
                        filePath: '/images/jpg/kwiaty-ciete.jpg',
                        alt: 'Kwiaty ciete'
                    },
                    {
                        id: 9,
                        index: 9,
                        name: 'Kwiaty',
                        filePath: '/images/jpg/kwiaty.jpg',
                        alt: 'Kwiaty'
                    }
        
                ]
            },
            {
                name: 'Imprezy okolicznościowe',
                description: 'Opis dla kwiatów ciętych w tym miejscu by się przydał.',
                preview_image: '',
                images: [
                    {
                        id: 0,
                        index: 0,
                        name: 'Wiązanki pogrzebowe',
                        filePath: '/images/jpg/wiazanki-pogrzebowe.jpg',
                        alt: 'Wiązanki pogrzebowe'
                    },
                    {
                        id: 1,
                        index: 1,
                        name: 'Wiązanki ślubne',
                        filePath: '/images/jpg/wiazanki-slubne.jpg',
                        alt: 'Wiązanki ślubne'
                    },
                    {
                        id: 2,
                        index: 2,
                        name: 'Wianki',
                        filePath: '/images/jpg/wianki.jpg',
                        alt: 'Wianki'
                    },
                    {
                        id: 3,
                        index: 3,
                        name: 'Strojenie samochodów',
                        filePath: '/images/jpg/strojenia-aut.jpg',
                        alt: 'Strojenie samochodów'
                    },
                    {
                        id: 4,
                        index: 4,
                        name: 'Strojenie sal bankietowych',
                        filePath: '/images/jpg/strojenia-sale-bankietowe.jpg',
                        alt: 'Strojenie sal bankietowych'
                    },
                    {
                        id: 5,
                        index: 5,
                        name: 'Strojenie kościołów',
                        filePath: '/images/jpg/strojenia-kościoły.jpg',
                        alt: 'Strojenie kościołów'
                    },
                    {
                        id: 6,
                        index: 6,
                        name: 'Strojenia',
                        filePath: '/images/jpg/strojenia.jpg',
                        alt: 'Strojenia'
                    },
                    {
                        id: 7,
                        index: 7,
                        name: 'Kwiaty doniczkowe',
                        filePath: '/images/jpg/kwiaty-doniczkowe.jpg',
                        alt: 'Kwiaty doniczkowe'
                    },
                    {
                        id: 8,
                        index: 8,
                        name: 'Kwiaty cięte',
                        filePath: '/images/jpg/kwiaty-ciete.jpg',
                        alt: 'Kwiaty ciete'
                    },
                    {
                        id: 9,
                        index: 9,
                        name: 'Kwiaty',
                        filePath: '/images/jpg/kwiaty.jpg',
                        alt: 'Kwiaty'
                    }
        
                ]
            }
        ]
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})