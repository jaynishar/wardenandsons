'use client';

import { useState } from 'react';
import { ShoppingBag, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SlideOutCart() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 md:top-6 md:right-8 z-50 p-2 bg-white rounded-full shadow-md text-black"
        aria-label="Open cart"
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-black rounded-full transform translate-x-1/4 -translate-y-1/4">
          2
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[90vw] md:w-[400px] bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="font-bold text-lg uppercase tracking-wider">Your Bag (2)</h2>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Mock Item 1 */}
                <div className="flex gap-4">
                  <div className="w-24 h-32 bg-gray-100 relative">
                    <img src="/store_front.jpg" alt="Item" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm uppercase">Pure Cotton Basic Tee</h3>
                      <p className="text-gray-500 text-xs mt-1">Color: White | Size: 3-4Y</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button className="px-2 py-1 text-gray-500 hover:text-black">-</button>
                        <span className="px-2 py-1 text-sm font-medium">1</span>
                        <button className="px-2 py-1 text-gray-500 hover:text-black">+</button>
                      </div>
                      <span className="font-bold text-sm">₹499</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between mb-4 text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">₹998</span>
                </div>
                <button className="w-full bg-black text-white py-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
