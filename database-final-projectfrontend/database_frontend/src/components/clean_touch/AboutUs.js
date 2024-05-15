import React from 'react';
import CleanTouchHeader from './Header';
import CleanTouchFooter from './Footer';
function AboutUs () {
    return (
        <div>
            <CleanTouchHeader />
            <section class="pt-10 overflow-hidden bg-gray-50 dark:bg-gray-800 md:pt-0 sm:pt-16 2xl:pt-16">
    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="grid items-center grid-cols-1 md:grid-cols-2">

            <div>
                <h2 class="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">Hey there! 👋 I'm 
                    <br class="block sm:hidden" />CleanTouch,
                </h2>
                <p class="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:mt-8">
                a team of CCNY students dedicated to crafting user-friendly solutions.  </p>

                <p class="mt-4 text-xl text-gray-600 dark:text-gray-300 md:mt-8">
                    <span class="relative inline-block">
                        <span class="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300 dark:bg-gray-900"></span>
                    <span class="relative">Have questions or ideas?  </span>
                    </span>
                    <br class="block sm:hidden" />Ask us on <a href="https://github.com/SajedAtwa/database-final-projectfrontend" title=""
                        class="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline">Github</a>
                </p>
            </div>

            <div class="relative">
                <img class="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg" alt="" />

                <img class="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src="https://www.ccny.cuny.edu/sites/default/files/2023-05/Group%20128.png" alt="" />
            </div>

        </div>
    </div>
</section>
        



<section class="relative overflow-hidden bg-gray-50 dark:bg-gray-900">
    <div class="mt-2 md:mt-0 py-12 pb-6 sm:py-16 lg:pb-24 overflow-hidden">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
            <div class="relative mt-12 lg:mt-20">
                <h2 class="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8">Site's easy to navigate!</h2>
                <div class="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                <div className="white-space"></div>
                <div className="white-space"></div>
                <div className="white-space"></div>
                <div className="white-space"></div>
            <div className="white-space"></div>

                    <svg class="w-full" xmlns="http://www.w3.org/2000/svg" width="875" height="48" viewBox="0 0 875 48"
                        fill="none">
                            
                        <path
                            d="M2 29C20.2154 33.6961 38.9915 35.1324 57.6111 37.5555C80.2065 40.496 102.791 43.3231 125.556 44.5555C163.184 46.5927 201.26 45 238.944 45C312.75 45 385.368 30.7371 458.278 20.6666C495.231 15.5627 532.399 11.6429 569.278 6.11109C589.515 3.07551 609.767 2.09927 630.222 1.99998C655.606 1.87676 681.208 1.11809 706.556 2.44442C739.552 4.17096 772.539 6.75565 805.222 11.5C828 14.8064 850.34 20.2233 873 24"
                            stroke="#D4D4D8" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 12" />
                    </svg>
                </div>
                <div
                    class="relative grid grid-cols-1 text-center gap-y-8 sm:gap-y-10 md:gap-y-12 md:grid-cols-3 gap-x-12">
                    <div>
                        <div
                            class="flex items-center justify-center w-16 h-16 mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow">
                            <span class="text-xl font-semibold text-gray-700 dark:text-gray-200">1</span>
                        </div>
                        <h3
                            class="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 dark:text-white md:mt-10">
                            Register
                        </h3>
                        <p class="mt-3 sm:mt-4 text-base text-gray-600 dark:text-gray-400">
                        Sign up with your username and password.
                        </p>
                    </div>
                    <div>
                        <div
                            class="flex items-center justify-center w-16 h-16 mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow">
                            <span class="text-xl font-semibold text-gray-700 dark:text-gray-200">2</span>
                        </div>
                        <h3
                            class="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 dark:text-white md:mt-10">
                            Choose a service
                        </h3>
                        <p class="mt-3 sm:mt-4 text-base text-gray-600 dark:text-gray-400">
                        Pick your service, provide vehicle details, and select a date and time.
                        </p>
                    </div>
                    <div>
                        <div
                            class="flex items-center justify-center w-16 h-16 mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow">
                            <span class="text-xl font-semibold text-gray-700 dark:text-gray-200">3</span>
                        </div>
                        <h3
                            class="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 dark:text-white md:mt-10">
                            Make appoitment
                        </h3>
                        <p class="mt-3 sm:mt-4 text-base text-gray-600 dark:text-gray-400">
                        Just click to book!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

        
        <CleanTouchFooter />

    </div>
    );
}

export default AboutUs;
