import { defineStore } from 'pinia'

export const usePackagesStore = defineStore('packages', {
    state: () => {
        return {
            offer : [
                {
                    id: 0,
                    transition: 'fade-down-right',
                    color: 'violet',
                    title: 'Balony',
                    description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami.',
                    path: '/oferta/balony',
                    image: {
                        src: '/images/jpg/balony.jpg',
                        alt: 'Balony'
                    },
                    content: [
                        {
                            id: 0,
                            transition: 'flip-left',
                            title: 'Imprezy okolicznościowe',
                            description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami imprezy-okolicznosciowe.',
                            path: '/oferta/balony/imprezy-okolicznosciowe',
                            image: {
                                src: '/images/jpg/balony.jpg',
                                alt: 'Balony imprezy okolicznosciowe'
                            },
                        },
                        {
                            id: 1,
                            transition: 'flip-right',
                            title: 'Ścianki do zdjęc',
                            description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami Ścianki do zdjęc.',
                            path: '/oferta/balony/scianki-do-zdjec',
                            image: {
                                src: '/images/jpg/balony_tło.jpg',
                                alt: 'Ozdoban scianka do zdjęć'
                            },
                        },
                    ]
                    
                },

                {
                    id: 1,
                    transition: 'flip-left',
                    color: 'green',
                    title: 'Kwiaty',
                    description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z kwiatami.',
                    path: '/oferta/kwiaty',
                    image: {
                        src: '/images/jpg/kwiaty.jpg',
                        alt: 'Kwiaty'
                    },
                    content: [
                        {
                            id: 0,
                            transition: 'flip-left',
                            title: 'Kwiaty cięte',
                            description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami imprezy-okolicznosciowe.',
                            path: '/oferta/kwiaty/ciete',
                            image: {
                                src: '/images/jpg/kwiaty-ciete.jpg',
                                alt: 'Kwiaty ciete'
                            },
                        },
                        {
                            id: 1,
                            transition: 'flip-right',
                            title: 'Kwiaty doniczkowe',
                            description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami Ścianki do zdjęc.',
                            path: '/oferta/kwiaty/doniczkowe',
                            image: {
                                src: '/images/jpg/kwiaty-doniczkowe.jpg',
                                alt: 'Kwiaty doniczkowe'
                            },
                        },
                    ]

                },

                {
                    id: 2,
                    transition: 'fade-down-left',
                    title: 'Strojenia',
                    description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z strojeniami.',
                    path: '/oferta/strojenia',
                    image: {
                        src: '/images/jpg/strojenia.jpg',
                        alt: 'Strojenia'
                    },
                    content: [
                        {
                            id: 0,
                            transition: 'flip-left',
                            title: 'Strojenie kościołów',
                            description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami imprezy-okolicznosciowe.',
                            path: '/oferta/strojenia/koscioly',
                            image: {
                                src: '/images/jpg/strojenia-kościoły.jpg',
                                alt: 'Strojenie kościołów'
                            },
                        },
                        {
                            id: 1,
                            transition: 'flip-up',
                            title: 'Strojenie sal bankietowych',
                            description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami Ścianki do zdjęc.',
                            path: '/oferta/strojenia/sale-bankietowe',
                            image: {
                                src: '/images/jpg/strojenia-sale-bankietowe.jpg',
                                alt: 'Strojenie sal bankietowych'
                            },
                        },
                        {
                            id: 2,
                            transition: 'flip-right',
                            title: 'Strojenie samochodów',
                            description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami Ścianki do zdjęc.',
                            path: '/oferta/strojenia/samochody',
                            image: {
                                src: '/images/jpg/strojenia-aut.jpg',
                                alt: 'Strojenie samochodów'
                            },
                        },
                    ]
                },

                {
                    id: 3,
                    transition: 'fade-up-right',
                    color: 'blue',
                    title: 'Wianki',
                    description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z wiankami.',
                    path: '/oferta/wianki',
                    image: {
                        src: '/images/jpg/wianki.jpg',
                        alt: 'Wianki'
                    }

                },
                
                {
                    id: 4,
                    transition: 'flip-right',
                    color: 'blue',
                    title: 'Wiązanki',
                    description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z wiązankami.',
                    path: '/oferta/wiazanki',
                    image: {
                        src: '/images/jpg/wiazanki.jpg',
                        alt: 'Wiązanki'
                    },
                    content: [
                        {
                            id: 0,
                            transition: 'flip-left',
                            title: 'Wiązanki pogrzebowe',
                            description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami imprezy-okolicznosciowe.',
                            path: '/oferta/wiazanki/pogrzebowe',
                            image: {
                                src: '/images/jpg/wiazanki-pogrzebowe.jpg',
                                alt: 'Wiązanki pogrzebowe'
                            },
                        },
                        {
                            id: 1,
                            transition: 'flip-right',
                            title: 'Wiązanki ślubne',
                            description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z balonami Ścianki do zdjęc.',
                            path: '/oferta/wiazanki/slubne',
                            image: {
                                src: '/images/jpg/wiazanki-slubne.jpg',
                                alt: 'Wiązanki ślubne'
                            },
                        },
                    ]

                },
                {
                    id: 5,
                    transition: 'flip-right',
                    color: 'blue',
                    title: 'Akcesoria',
                    description: 'Tu powinien być opis danego działu.  Przypomnienie napisz do Adriana, żeby przysłał Ci opis działu z wiązankami.',
                    path: '/oferta/akcesoria',
                    image: {
                        src: '/images/jpg/akcesoria.jpg',
                        alt: 'Akcesoria'
                    },
                },
            ]
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {

    },
  })