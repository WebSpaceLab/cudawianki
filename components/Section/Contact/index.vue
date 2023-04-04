<script setup>
  import { useSocialStore } from '@/stores/social'

  const social = useSocialStore()
</script>

<template>
   <section id="contact" class=" min-h-screen relative z-10 ">
      
      <div class="container mx-auto h-full relative ">
         <!--
            <img src="/images/jpg/kwiaty-doniczkowe.jpg" alt="Kwiaty cięte" class="absolute top-0 left-0 w-full h-full object-cover rounded-lg -z-2 transition-all delay-400" />
         -->

         <img src="/images/vector/flowers.webp" alt="Kwiaty" class="absolute -top-40 -left-40 w-150 z-[-1]">

         <div  class="h-full flex flex-wrap  space-y-20 text-black dark:text-white lg:justify-between items-center p-8 rounded-lg bg-gradient-to-r from-second-light/30 to-prime-light/40 dark:from-second-dark/30 dark:to-prime-dark/40 backdrop-blur-sm">
            <div class="w-full lg:w-1/2 xl:w-6/12 h-full flex flex-col justify-center px-4">
               <div data-aos-delay="400"  data-aos="fade-left" data-aos-duration="1000" class="relative max-w-[570px] mb-12 lg:mb-0">

                  <h1 class="text-4xl lg:text-5xl  uppercase font-bold  mt-8 mb-8 lg:mb-2 p-3 dark:text-white ">
                     Cuda Wianki
                  </h1>
               
                  <div class="w-full flex flex-col space-y-3 mb-10 p-8">
                     <div class="flex items-center justify-start space-x-6 mb-5">

                           <p class="w-full h-full text-base  mb-7">
                           Sed ut perspiciatis undmnis is iste natus error sit amet
                           voluptatem totam rem aperiam.
                           </p>
                     </div>

                     <div class="w-full flex items-start justify-start text-sm font-medium">

                           <span class="w-full flex items-start justify-start space-x-2">
                              <span class="w-1/3 flex items-start justify-start space-x-2">
                                 <Icon name="entypo:address" class="text-xl" /> 
                                 <strong>Adres: </strong>
                              </span>

                              <span class="flex flex-col items-start justify-start">
                                 <span>
                                 ul. Emilii Plater 15
                                 </span>

                                 <span>
                                       16-400 Suwałki
                                 </span>
                              </span>
                           </span>
                     </div>

                     <div class="w-full flex items-start justify-start text-sm font-medium">

                           <span class="w-full flex items-start justify-start space-x-2">
                              <span class="w-1/3 flex items-start justify-start space-x-2">
                                 <Icon name="eos-icons:hourglass" class="text-xl" /> 
                                 <strong>Godziny otwarcia: </strong>
                              </span>

                              <span class="flex flex-col items-start justify-start">
                                 <span>Pon. - Pt.: 08:00-17:00</span>
                                 <span>Sob.: 08-15:00</span> 
                                 <span>Nd.: Zamknięte</span>  
                              </span>
                           </span>
                     </div>

                  <div class="w-full flex items-start justify-start text-sm font-medium">
                     <span class="w-full flex items-start justify-start space-x-2">
                              <span class=" w-1/3 flex items-start justify-start space-x-2">
                                 <Icon name="bytesize:telephone" class="text-xl " /> 
                                 <strong>Telefon: </strong>
                              </span>

                              <span>
                                 663 609 824
                              </span>
                           </span>

                     </div>
                     <div>
                           <h4 class="text-lg font-semibold mb-4">Śledź nas na:</h4>
         
                           <div class="flex items-center">
                              <template v-for="(item, index) in social.$state.data" :key="index">
                                 <x-link
                                    :to="item.to"
                                    class="w-8 h-8 flex items-center justify-center rounded-full text-basic-light dark:text-basic-dark mr-3 sm:mr-4 lg:mr-3 xl:mr-4"
                                    target="_blank"
                                 >
                                    <Icon :name="item.icon" class="text-2xl" />
                                 </x-link>
                              </template>
                           </div>
                     </div>

                  </div>

                  
               </div>

               <div data-aos-delay="400"  data-aos="fade-down-left" data-aos-duration="1000" class="w-full h-100">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11126.627250986201!2d22.90157878164677!3d54.10769236501687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e1023717183eab%3A0xb87a06db05bda594!2sKwiaciarnia%20Cuda%20Wianki!5e0!3m2!1spl!2spl!4v1675163525305!5m2!1spl!2spl" class="w-full h-full rounded-lg" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
               </div>
            </div>

            <div data-aos-delay="400"  data-aos="fade-down-right" data-aos-duration="1000" class="w-full lg:w-1/2 xl:w-5/12 px-4">
               <div class="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
                  <form>
                     <div class="mb-6">
                        <input
                           type="text"
                           placeholder="Your Name"
                           class="
                           w-full
                           rounded
                           py-3
                           px-[14px]
                           text-body-color text-base
                           border border-[f0f0f0]
                           outline-none
                           focus-visible:shadow-none
                           focus:border-primary
                           "
                           />
                     </div>

                     <div class="mb-6">
                        <input
                           type="email"
                           placeholder="Your Email"
                           class="
                           w-full
                           rounded
                           py-3
                           px-[14px]
                           text-body-color text-base
                           border border-[f0f0f0]
                           outline-none
                           focus-visible:shadow-none
                           focus:border-primary
                           "
                           />
                     </div>
                     <div class="mb-6">
                        <input
                           type="text"
                           placeholder="Your Phone"
                           class="
                           w-full
                           rounded
                           py-3
                           px-[14px]
                           text-body-color text-base
                           border border-[f0f0f0]
                           outline-none
                           focus-visible:shadow-none
                           focus:border-primary
                           "
                           />
                     </div>
                     <div class="mb-6">
                        <textarea
                           rows="6"
                           placeholder="Your Message"
                           class="
                           w-full
                           rounded
                           py-3
                           px-[14px]
                           text-body-color text-base
                           border border-[f0f0f0]
                           resize-none
                           outline-none
                           focus-visible:shadow-none
                           focus:border-primary
                           "
                           ></textarea>
                     </div>
                     <div>
                        <x-btn type="submit" class="w-full" color="primary" shadow rounded uppercase >Wyślij widomość</x-btn>
                     </div>
                  </form>

                  <div>
                     <span class="absolute top-0 right-0 ">
                        <img src="/images/png/remka.png" alt="Ramka" class="absolute -top-15 -right-10 rotate-90 z-10">
                     </span>

                     <span class="absolute -right-10 top-[90px] z-[-1]">

                     </span>
                     
                     <span class="absolute -left-7 -bottom-7 z-[-1]">

                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
<!-- ====== Contact Section End -->
</template>