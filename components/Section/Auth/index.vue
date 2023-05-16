<template>
    <section class="flex w-screen h-screen p-6 box-border">
        <div class="absolute w-full h-full  top-0 left-0 hidden w-0 lg:block z-1">
            <img src="/images/vector/background.jpg" alt="Kwiaty" class="w-full h-full absolute inset-0 object-cover">
        </div>

        <div class="w-1/2 flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="flex items-center w-full h-full max-w-sm mx-auto lg:w-96">
               <slot></slot>
            </div>
        </div>
    </section>
</template>