<script setup></script>

<template>
    <div class="w-full relative min-h-screen  text-basic-light dark:text-basic-dark bg-background-light/60 dark:bg-background-dark/60">
        <div v-if="$generalStore.loading" class="w-screen h-screen flex justify-center items-center  bg-background-light dark:bg-background-dark">
            <Spinner :loading="$generalStore.loading" />
        </div>
        
        <div v-else class="flex flex-col justify-start items-center">
            <header id="main-header" class="relative z-50 lg:relative transition-all duration-[0.4s] ease bg-background-light/80 dark:bg-background-dark/80">
                <slot name="header" />
            </header>
    
            <main class="w-full md:p-8 relative flex justify-center items-center duration-300">
                <slot name="main" />
            </main>
    
            <footer class="relative w-full">
                <slot name="footer" />
            </footer>
        </div>
    </div>
</template>