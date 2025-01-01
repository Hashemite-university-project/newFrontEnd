import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function Feedback() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/feedback');
        setFeedback(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <>
      <section class="py-10 bg-gray-100 sm:py-16 lg:py-24">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="grid items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 sm:gap-x-12 gap-y-12">
                <div class="lg:col-span-2">
                    <h2 class="text-3xl font-bold leading-tight text-gray-800 sm:text-4xl lg:text-5xl lg:leading-tight">
                        1 team.<br />
                        7+ years.<br />
                        300+ projects.<br />
                    </h2>
                    <p class="mt-6 text-base text-gray-600">At ScepHub, we partner with clients to deliver custom software solutions tailored to their needs. From project inception to completion, our team ensures high-quality, timely delivery. We use the latest technologies to create scalable, efficient, and robust solutions that drive success for our clients.</p>
                </div>
                <div class="lg:col-span-3 xl:col-span-4">
                    <div class="grid items-center max-w-4xl grid-cols-2 mx-auto lg:grid-cols-4 gap-x-10 gap-y-16">
                        <motion.div
                            initial={{ opacity: 0, x: 150 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                        <div>
                            <img class="object-contain w-full h-6 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-1.png" alt="" />
                        </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 150 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                        <div>
                            <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-2.png" alt="" />
                        </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 150 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                        <div>
                            <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-3.png" alt="" />
                        </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 150 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                        <div>
                            <img class="object-contain w-full mx-auto h-7" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-4.png" alt="" />
                        </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 150 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.0 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                        <div class="hidden lg:block">
                            <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-5.png" alt="" />
                        </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 150 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                        <div class="hidden lg:block">
                            <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-6.png" alt="" />
                        </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 150 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.4 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                        <div class="hidden lg:block">
                            <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-7.png" alt="" />
                        </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 150 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.6 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                        <div class="hidden lg:block">
                            <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-8.png" alt="" />
                        </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 150 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.8 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                        <div class="hidden lg:block">
                            <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-9.png" alt="" />
                        </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 150 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 2.0 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                        <div class="hidden lg:block">
                            <img class="object-contain w-full mx-auto h-7" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-10.png" alt="" />
                        </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 150 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 2.2 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                        <div class="hidden lg:block">
                            <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-11.png" alt="" />
                        </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 150 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 2.4 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                        <div class="hidden lg:block">
                            <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-12.png" alt="" />
                        </div>
                        </motion.div>
                    </div>
                    <div class="flex items-center justify-start mt-10 space-x-3 lg:hidden">
                        <div class="w-2.5 h-2.5 rounded-full bg-blue-600 block"></div>
                        <div class="w-2.5 h-2.5 rounded-full bg-gray-300 block"></div>
                        <div class="w-2.5 h-2.5 rounded-full bg-gray-300 block"></div>
                    </div>
                </div>
            </div>
        </div>
     </section>


     <section class="py-10 bg-gray-800 lg:py-0">
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div class="grid items-stretch grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 xl:gap-x-24">
                <div class="h-full pr-12 lg:order-2 lg:mb-40">
                    <div class="relative h-full lg:h-auto">
                        <div class="absolute w-full h-full -mb-12 overflow-hidden bg-gradient-to-r from-fuchsia-600 to-blue-600 top-12 left-12 xl:left-16 lg:top-0 lg:scale-y-105 lg:origin-top">
                            <img class="object-cover object-right w-full h-full scale-150" src="https://cdn.rareblocks.xyz/collection/celebration/images/content/2/lines.svg" alt="" />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.0 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                        <div class="relative lg:-top-12">
                            <img class="" src="https://images.unsplash.com/photo-1521898284481-a5ec348cb555?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        </motion.div>
                    </div>
                </div>
                <div class="flex items-center justify-start py-10 lg:order-1 sm:py-16 lg:py-24 xl:py-48">
                    <div>
                        <p class="text-sm font-semibold tracking-widest text-gray-500 uppercase">Why Should your choose?</p>
                        <h2 class="mt-8 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">Get work done, fast!</h2>
                        <p class="text-xl leading-relaxed text-gray-200 mt-9">At ScepHub, we bring your ideas to life with efficiency and precision. Our team of experienced professionals works collaboratively to deliver high-quality software solutions that meet your unique needs. We pride ourselves on delivering fast, reliable, and scalable results.</p>
                        <p class="mt-6 text-xl leading-relaxed text-gray-200">From startups to enterprises, we help clients achieve their goals through innovative technology and seamless project execution. Let us accelerate your success with solutions that are built to last.</p>
                        {/* <a href="#" title="" class="inline-flex items-center justify-center px-10 py-4 mt-12 text-base font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700" role="button"> Explore more </a> */}
                    </div>
                </div>
            </div>
        </div>
    </section>


    <div className='flex justify-center align-middle items-center mt-10 bg-gray-50 pt-10'>
        <div className="flex items-end justify-between mb-10">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Feedback</h2>
          </div>
        </div>
      </div>
      <section className="py-10 sm:pb-16 lg:pb-24 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:gap-10 sm:grid-cols-2 md:grid-cols-3">
            {feedback.map((feedback, index) => (
              <div key={index} className="flex flex-col bg-white border border-gray-200 rounded-md">
                <motion.div
                initial={{ opacity: 0, x: 150 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="flex flex-col justify-between flex-1 p-8">
                    <div className="flex-1">
                      <blockquote>
                      <p className="text-base text-gray-800 break-words">
                        {feedback.feedbackParagraph.length > 180 
                            ? feedback.feedbackParagraph.slice(0, 180) + '...' 
                            : feedback.feedbackParagraph}
                    </p>
                      </blockquote>
                    </div>
                    <div className="mt-8">
                      <div className="w-full h-0 mb-8 border-t-2 border-gray-200 border-dotted"></div>
                      <div className="flex items-center">
                        <img
                          className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                          src={feedback.user.user_img}
                          alt={feedback.user.user_name}
                        />
                        <div className="ml-3">
                          <p className="text-base font-semibold text-gray-800 truncate">{feedback.user.user_name}</p>
                          <p className="text-base text-gray-500 truncate">{feedback.user.major}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

export default Feedback;
