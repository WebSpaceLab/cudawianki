import { defineStore } from 'pinia'

export const useImagesStore = defineStore('images', {
  state: () => {
    return { 
        data: [
            {
                id: 0,
                index: 0,
                name: 'Wiązanki pogrzebowe',
                src: '/images/jpg/wiazanki-pogrzebowe.jpg',
                alt: 'Wiązanki pogrzebowe'
            },
            {
                id: 1,
                index: 1,
                name: 'Wiązanki ślubne',
                src: '/images/jpg/wiazanki-slubne.jpg',
                alt: 'Wiązanki ślubne'
            },
            {
                id: 2,
                index: 2,
                name: 'Wianki',
                src: '/images/jpg/wianki.jpg',
                alt: 'Wianki'
            },
            {
                id: 3,
                index: 3,
                name: 'Strojenie samochodów',
                src: '/images/jpg/strojenia-aut.jpg',
                alt: 'Strojenie samochodów'
            },
            {
                id: 4,
                index: 4,
                name: 'Strojenie sal bankietowych',
                src: '/images/jpg/strojenia-sale-bankietowe.jpg',
                alt: 'Strojenie sal bankietowych'
            },
            {
                id: 5,
                index: 5,
                name: 'Strojenie kościołów',
                src: '/images/jpg/strojenia-kościoły.jpg',
                alt: 'Strojenie kościołów'
            },
            {
                id: 6,
                index: 6,
                name: 'Strojenia',
                src: '/images/jpg/strojenia.jpg',
                alt: 'Strojenia'
            },
            {
                id: 7,
                index: 7,
                name: 'Kwiaty doniczkowe',
                src: '/images/jpg/kwiaty-doniczkowe.jpg',
                alt: 'Kwiaty doniczkowe'
            },
            {
                id: 8,
                index: 8,
                name: 'Kwiaty cięte',
                src: '/images/jpg/kwiaty-ciete.jpg',
                alt: 'Kwiaty ciete'
            },
            {
                id: 9,
                index: 9,
                name: 'Kwiaty',
                src: '/images/jpg/kwiaty.jpg',
                alt: 'Kwiaty'
            }

        ]
     }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {

  },
})