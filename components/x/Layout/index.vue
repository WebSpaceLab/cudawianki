<script setup></script>

<template>
    <div class="w-full relative min-h-screen flex flex-col justify-start items-center text-basic-light dark:text-basic-dark bg-background-light dark:bg-background-dark">
        <header class="relative z-50 lg:relative transition-all duration-[0.4s] ease">
            <slot name="header" />
        </header>

        <main class="w-full md:p-8 relative flex justify-center items-center duration-300">
            <slot name="main" />
        </main>

        <footer class="relative w-full">
            <slot name="footer" />
        </footer>
    </div>
</template>