<template>
    <section class="flex w-screen h-screen">
        <div class="relative w-1/2 flex-1 hidden w-0 lg:block z-1">
            <img src="/images/jpg/kwiaty_tło.jpg" alt="Kwiaty" class="w-full h-full absolute inset-0 object-cover">
        </div>

        <div class="w-1/2 flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="flex items-center w-full h-full max-w-sm mx-auto lg:w-96">
               <slot></slot>
            </div>
        </div>
    </section>
</template>