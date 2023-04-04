export function useIntro() {
    const route = useRoute()


    let isShowIntro = ref(false)
    let isShowIntroLogo = ref(false)
    let isShowMenu = ref(false)
    let isGlitch = ref(false)
    let isScroll = ref(false)

    function setIntroInStorage(isStartIntro, isIntroLogo) {
        localStorage.setItem('Intro', JSON.stringify({ 
            start: isStartIntro,
            introLogo: isIntroLogo
        }))
    }

    function intro() {
        const introLocalStorage = JSON.parse(localStorage.getItem('Intro'))

        if(introLocalStorage) {
            isShowIntro.value = introLocalStorage.start
            isShowIntroLogo.value = introLocalStorage.introLogo
            isShowMenu.value = true
        } else {
            if(route.path === '/') {
                isShowIntro.value = true

                setTimeout(() => {
                    isShowIntro.value = false
                    // isGlitch.value = true

                    setTimeout(() => {
                        // isGlitch.value = false
                        isShowIntroLogo.value = false
                        isShowMenu.value = true
                            
                        setIntroInStorage(false, isShowIntroLogo.value)

                    }, 500)

                   
                }, 3000)

            } else {
                isShowIntro.value = false
                isShowIntroLogo.value = false
            }
        }
    }

    function showMenu() {

        const introLocalStorage = JSON.parse(localStorage.getItem('Intro'))
        
        if(introLocalStorage.introLogo) {
            isShowMenu.value = true

            
            setIntroInStorage(introLocalStorage.start, isShowIntroLogo.value)
        } else {
            isShowMenu.value = !isShowMenu.value
        }
        
    }

    function scrollNavbar() {
        let navbar = document.getElementById('main-nav');

        window.addEventListener('scroll', () => {
            if(window.scrollY > navbar.scrollTop){
                isScroll.value = true
                // isShowMenu.value = false
            } else {
                isScroll.value = false
                // isShowMenu.value = true
            }
        })
    }

    return {
        intro, showMenu, isShowIntro, isShowIntroLogo, isShowMenu, isGlitch, isScroll, scrollNavbar
    }
}