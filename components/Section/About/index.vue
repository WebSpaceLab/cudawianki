<script setup>
let isSwitchFirstText = ref(false)
let isSwitchSecondText = ref(true)
let isSwitchLastText = ref(false)
let count = ref(1)

function switchText(key) {
    switch (key) {
        case 1:
            isSwitchFirstText.value = false
            isSwitchSecondText.value = true
            isSwitchLastText.value = false
            break;

        case 2:
            isSwitchFirstText.value = false
            isSwitchSecondText.value = false
            isSwitchLastText.value = true
            break;

        default:
            isSwitchFirstText.value = true
            isSwitchSecondText.value = false
            isSwitchLastText.value = false
            break;
    }
}

function switchToMousemoveTarget(key) {
    if(key) {
        count.value = key
        switchText(key)
    }
}

onMounted(() => {

    setInterval(() => {
        count.value ++

        if(count.value > 3) {
            count.value = 1
        }

        switchText(count.value)

    }, 3000)

})

</script>

<template>
    <section id="o-nas" class="w-full min-h-screen relative scroll-mt-50 snap-start ">
         <header class="relative w-full my-4 flex justify-center">
            <h2 style="background-image: url('/images/jpg/wiazanki.jpg')"  class="relative w-[50%]  bg-fixed  bg-no-repeat bg-cover bg-center text-center  py-10 text-white text-3xl text-bold uppercase rounded-lg">
                <span class="bg-black/30 px-5 py-3 rounded-lg">
                    O nas 
                </span>

                <img src="/images/png/tribal-flower.png" alt="tribal flower" class="absolute -top-20 rotate-60 -left-5 w-30">
                <img src="/images/png/tribal-flower.png" alt="tribal flower" class="absolute -bottom-20 rotate-240  -right-5 w-30">
            </h2>
        </header>

        <div class="w-full relative px-8 md:py-50 box-border z-10  rounded-lg " >
            <div class="w-full h-full flex flex-col md:flex-row justify-center items-center ">
                <div class="w-full md:w-1/2 scale-50 md:scale-100 flex justify-center items-center ">
                    <div class="relative w-100 h-100 flex justify-center items-center -space-x-20">
                        <div class="flex flex-col space-y-20">
                            <div :class="isSwitchLastText ? 'scale-100 z-10 animated-2' : 'scale-90  -z-1'" class="relative flex flex-col justify-center items-end duration-500">
                                <img src="/images/jpg/about-2.jpg" alt="About 2" data-aos="fade-down-right" data-aos-duration="1000" class="w-75 h-75 z-10 object-cover rounded-lg">
    
    
                            </div>
    
                            <div :class="isSwitchFirstText ? 'scale-100 z-10 animated-2' : 'scale-90 -z-1'"   class=" flex flex-col justify-center items-start duration-500">
                                <img src="/images/jpg/about-3.jpg" alt="About 3" data-aos="fade-up-left" data-aos-duration="1000" class="w-75 h-75 object-cover rounded-lg">
                            </div>
                        </div>
    
                        <div :class=" isSwitchSecondText  ? 'sale-100 z-10 animated-1' : 'scale-90 -z-1'"  class="duration-500">
                            <img src="/images/jpg/about-1.jpg" alt="About 1" class=" h-100 h-100 object-cover rounded-lg" data-aos="zoom-in" data-aos-delay="500" data-aos-duration="1000">
                        </div>
                    </div>
                </div>
                
                <div class="w-full md:w-1/2 flex flex-col justify-center items-center space-y-2 md:space-y-10 gap-8 group " data-aos="zoom-in" data-aos-delay="500" data-aos-duration="1000">
                    <div 
                        @mousemove="switchToMousemoveTarget(0)"
                        :class="isSwitchFirstText ? 'scale-100 shadow-xl shadow-black' : 'scale-85 blur-sm'"
                        class="px-7 py-4 box-border  z-10 bg-gradient-to-r from-prime-light to-second-light dark:from-prime-dark dark:to-second-dark rounded-lg group-hover:blur-sm hover:!blur-none group-hover:scale-85 hover:!scale-100  duration-500"
                    >
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo odio aliquid eaque deleniti cupiditate ipsam ducimus eius? Necessitatibus consectetur maiores, neque laborum quibusdam, ab voluptatum officiis dolore commodi ad in.</p>
                    </div>

                    <div 
                        @mousemove="switchToMousemoveTarget(1)"
                        :class="isSwitchSecondText ? 'scale-100 shadow-xl shadow-black z-20' : 'scale-85 blur-sm'"
                        class="px-7 py-4 box-border text-bold z-10 bg-gradient-to-r from-prime-light to-second-light dark:from-prime-dark dark:to-second-dark  rounded-lg group-hover:blur-sm hover:!blur-none group-hover:scale-85 hover:!scale-100 duration-500"
                    >
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo odio aliquid eaque deleniti cupiditate ipsam ducimus eius? Necessitatibus consectetur maiores, neque laborum quibusdam, ab voluptatum officiis dolore commodi ad in.</p>

                    </div>

                    <div
                        @mousemove="switchToMousemoveTarget(2)"
                        :class="isSwitchLastText ? 'scale-100 shadow-xl shadow-black' : 'scale-85 blur-sm'"    
                        class="px-7 py-4 box-border text-bold z-10 bg-gradient-to-r from-prime-light to-second-light dark:from-prime-dark dark:to-second-dark rounded-lg group-hover:blur-sm hover:!blur-none group-hover:scale-85 hover:!scale-100  duration-500"
                    >
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo odio aliquid eaque deleniti cupiditate ipsam ducimus eius? Necessitatibus consectetur maiores, neque laborum quibusdam, ab voluptatum officiis dolore commodi ad in.</p>
                    </div>
                </div>



            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.animated-1 {
animation: animated-first 0.5s linear;
}

.animated-2 {
    
animation: animated-second 0.5s linear;
}

@keyframes animated-first {
    0% {
        transform: translateX(0px) scale(.9);
    }

    25% {
        transform: translateX(75px) scale(1);
    }

    50% {
        transform: translateX(150px) scale(1.1);

    }

    75% {
        transform: translateX(75px) scale(1.05);
    }

    100% {
        transform: translateX(0px) scale(1);

    }
}

@keyframes animated-second {
    0% {
        transform: translateX(0px) scale(.9);
    }

    25% {
        transform: translateX(-75px) scale(1);
    }

    50% {
        transform: translateX(-150px) scale(1.1);

    }

    75% {
        transform: translateX(-75px) scale(1.05);
    }

    100% {
        transform: translateX(0px) scale(1);

    }
}
</style>