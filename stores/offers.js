import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import { useFlashStore } from './flash'

const $axios = axios().provide.axios

export const useOffersStore = defineStore('offers', {
    state: () => {
        return {
            offers : [
                // {
                //     id: 0,
                //     transition: 'fade-down-right',
                //     color: 'violet',
                //     title: 'Balony',
                //     description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami.',
                //     path: '/oferta/balony',
                //     status: 1,
                //     preview_image: {
                //         preview_url: '/images/jpg/balony.jpg',
                //         name: 'Balony'
                //     },
                //     categories: [
                //         {
                //             id: 0,
                //             transition: 'flip-left',
                //             title: 'Imprezy okolicznościowe',
                //             description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami imprezy-okolicznosciowe.',
                //             path: '/oferta/balony/imprezy-okolicznosciowe',
                //             preview_image: {
                //                 preview_url: '/images/jpg/balony.jpg',
                //                 name: 'Balony imprezy okolicznosciowe'
                //             },
                //         },
                //         {
                //             id: 1,
                //             transition: 'flip-right',
                //             title: 'Ścianki do zdjęc',
                //             description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami Ścianki do zdjęc.',
                //             path: '/oferta/balony/scianki-do-zdjec',
                //             preview_image: {
                //                 preview_url: '/images/jpg/balony_tło.jpg',
                //                 name: 'Ozdoban scianka do zdjęć'
                //             },
                //         },
                //     ]
                    
                // },

                // {
                //     id: 1,
                //     transition: 'flip-left',
                //     color: 'green',
                //     title: 'Kwiaty',
                //     description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z kwiatami.',
                //     path: '/oferta/kwiaty',
                //     status: 1,
                //     preview_image: {
                //         preview_url: '/images/jpg/kwiaty.jpg',
                //         name: 'Kwiaty'
                //     },
                //     categories: [
                //         {
                //             id: 0,
                //             transition: 'flip-left',
                //             title: 'Kwiaty cięte',
                //             description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami imprezy-okolicznosciowe.',
                //             path: '/oferta/kwiaty/ciete',
                //             preview_image: {
                //                 preview_url: '/images/jpg/kwiaty-ciete.jpg',
                //                 name: 'Kwiaty ciete'
                //             },
                //         },
                //         {
                //             id: 1,
                //             transition: 'flip-right',
                //             title: 'Kwiaty doniczkowe',
                //             description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami Ścianki do zdjęc.',
                //             path: '/oferta/kwiaty/doniczkowe',
                //             preview_image: {
                //                 preview_url: '/images/jpg/kwiaty-doniczkowe.jpg',
                //                 name: 'Kwiaty doniczkowe'
                //             },
                //         },
                //     ]

                // },

                // {
                //     id: 2,
                //     transition: 'fade-down-left',
                //     title: 'Strojenia',
                //     description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z strojeniami.',
                //     path: '/oferta/strojenia',
                //     status: 1,
                //     preview_image: {
                //         preview_url: '/images/jpg/strojenia.jpg',
                //         name: 'Strojenia'
                //     },
                //     categories: [
                //         {
                //             id: 0,
                //             transition: 'flip-left',
                //             title: 'Strojenie kościołów',
                //             description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami imprezy-okolicznosciowe.',
                //             path: '/oferta/strojenia/koscioly',
                //             preview_image: {
                //                 preview_url: '/images/jpg/strojenia-kościoły.jpg',
                //                 name: 'Strojenie kościołów'
                //             },
                //         },
                //         {
                //             id: 1,
                //             transition: 'flip-up',
                //             title: 'Strojenie sal bankietowych',
                //             description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami Ścianki do zdjęc.',
                //             path: '/oferta/strojenia/sale-bankietowe',
                //             preview_image: {
                //                 preview_url: '/images/jpg/strojenia-sale-bankietowe.jpg',
                //                 name: 'Strojenie sal bankietowych'
                //             },
                //         },
                //         {
                //             id: 2,
                //             transition: 'flip-right',
                //             title: 'Strojenie samochodów',
                //             description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami Ścianki do zdjęc.',
                //             path: '/oferta/strojenia/samochody',
                //             preview_image: {
                //                 preview_url: '/images/jpg/strojenia-aut.jpg',
                //                 name: 'Strojenie samochodów'
                //             },
                //         },
                //     ]
                // },

                // {
                //     id: 3,
                //     transition: 'fade-up-right',
                //     color: 'blue',
                //     title: 'Wianki',
                //     description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z wiankami.',
                //     path: '/oferta/wianki',
                //     status: 1,
                //     preview_image: {
                //         preview_url: '/images/jpg/wianki.jpg',
                //         name: 'Wianki'
                //     }

                // },
                
                // {
                //     id: 4,
                //     transition: 'flip-right',
                //     color: 'blue',
                //     title: 'Wiązanki',
                //     description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z wiązankami.',
                //     path: '/oferta/wiazanki',
                //     status: 1,
                //     preview_image: {
                //         preview_url: '/images/jpg/wiazanki.jpg',
                //         name: 'Wiązanki'
                //     },
                //     categories: [
                //         {
                //             id: 0,
                //             transition: 'flip-left',
                //             title: 'Wiązanki pogrzebowe',
                //             description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami imprezy-okolicznosciowe.',
                //             path: '/oferta/wiazanki/pogrzebowe',
                //             preview_image: {
                //                 preview_url: '/images/jpg/wiazanki-pogrzebowe.jpg',
                //                 name: 'Wiązanki pogrzebowe'
                //             },
                //         },
                //         {
                //             id: 1,
                //             transition: 'flip-right',
                //             title: 'Wiązanki ślubne',
                //             description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami Ścianki do zdjęc.',
                //             path: '/oferta/wiazanki/slubne',
                //             preview_image: {
                //                 preview_url: '/images/jpg/wiazanki-slubne.jpg',
                //                 name: 'Wiązanki ślubne'
                //             },
                //         },
                //     ]

                // },

                // {
                //     id: 5,
                //     transition: 'flip-right',
                //     color: 'blue',
                //     title: 'Akcesoria',
                //     description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z wiązankami.',
                //     path: '/oferta/akcesoria',
                //     status: 1,
                //     preview_image: {
                //         preview_url: '/images/jpg/akcesoria.jpg',
                //         name: 'Akcesoria'
                //     },
                // },
            ],

            allOffers: [],

            pagination: {
                total: null,
                current_page: null,
                per_page: null,
                first_page: 1,
            },

            months: [],
            queryParams: {},
            status: []
        }
    },

    actions: {
        async get() {
            let res = await $axios.get(`/api/offers`)
         
            this.$state.offers = res.data.offers
        },

        async getOffers(query, perPage) {
            let res = await $axios.get(`/api/dashboard/offers`, {
                params: {
                    term: query.term,
                    status: query.status,
                    month: query.month,
                    orderBy: query.orderBy,
                    orderDir: query.orderDir,
                    per_page: perPage
                }
            })
         
            this.$state.allOffers = res.data.offers

            this.$state.pagination.total = res.data.pagination.total
            this.$state.pagination.current_page = res.data.pagination.current_page
            this.$state.pagination.per_page = res.data.pagination.per_page

            this.$state.months = res.data.months
            this.$state.status = res.data.status
            this.$state.queryParams = res.data.queryParams   
        },

        async addOffer(form) {
            return await $axios.post(`/api/dashboard/offers`, form).then(({data}) => {
                useFlashStore().success(data.flash.message)
       
            }).catch((err) => {
                console.error(err)
            })
        },
        
        async updatedOffer(offerId, form) {
            const res = await $axios.put(`/api/dashboard/offer/${offerId}/update`, form)

            useFlashStore().success(res.data.flash.message)

            return res.data
        },

        async addPhotosToOffer(offerId, form) {
            const res = await $axios.put(`/api/dashboard/offer/${offerId}/add-photos`, form)

            useFlashStore().success(res.data.flash.message)

            return  res.data
        },

        async deletedOffer(offerId,  categoriesId, mediaId) {
            const res = await $axios.delete(`/api/dashboard/offer/${offerId}/deleted`, {
                preserveState: false,
                data: {
                    categoriesId, mediaId
                },
            })

            useFlashStore().success(res.data.flash.message)

            return res.data
        },

        async deletedPhotosFromOffer(offerId, mediaId) {
            const res = await $axios.delete(`/api/dashboard/offer/${offerId}/deleted-photo-from-offer`, {
                preserveState: false,
                data: {
                    mediaIds: [mediaId],
                },
            })

            useFlashStore().success(res.data.flash.message)

            return res.data
        }
    },

    persist: true
  })