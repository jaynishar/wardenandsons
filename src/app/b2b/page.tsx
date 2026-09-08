import React from 'react';

export default function B2BPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 md:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 pt-12">
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wide">B2B & Customization</h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Partner with Warden & Sons for premium quality school uniforms, sports kits, and corporate event apparel. 
            We offer bulk quantity pricing and bespoke design services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form 1: School Uniforms & Sports */}
          <div className="bg-white p-8 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold uppercase mb-6 border-b border-gray-100 pb-4">School & Sports Kits</h2>
            <form className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Institution Name</label>
                <input type="text" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors" placeholder="e.g. Bombay Scottish School" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Contact Name</label>
                  <input type="text" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Phone</label>
                  <input type="tel" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black" required />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Requirement Type</label>
                <select className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black">
                  <option>School Uniforms</option>
                  <option>Sports/Cricket Whites</option>
                  <option>House T-Shirts</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Estimated Quantity</label>
                <input type="number" min="50" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black" placeholder="Min. 50 pcs" required />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Additional Details</label>
                <textarea className="w-full border border-gray-300 p-3 h-24 resize-none focus:outline-none focus:border-black" placeholder="Describe fabric preferences, sizes needed..."></textarea>
              </div>
              <button type="submit" className="w-full bg-black text-white font-bold uppercase tracking-wider py-4 mt-2 hover:bg-gray-800 transition-colors">
                Submit Inquiry
              </button>
            </form>
          </div>

          {/* Form 2: Corporate & Events */}
          <div className="bg-white p-8 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold uppercase mb-6 border-b border-gray-100 pb-4">Corporate & Events</h2>
            <form className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Company / Event Name</label>
                <input type="text" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black" placeholder="e.g. TechCorp Offsite 2024" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Contact Name</label>
                  <input type="text" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Email</label>
                  <input type="email" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black" required />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Product Type</label>
                <select className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black">
                  <option>Polo T-Shirts</option>
                  <option>Round Neck T-Shirts</option>
                  <option>Hoodies / Sweatshirts</option>
                  <option>Custom Merchandise</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Upload Logo / Design Artwork</label>
                <input type="file" className="w-full border border-gray-300 p-2 text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-bold file:bg-gray-100 file:text-black hover:file:bg-gray-200 cursor-pointer" accept="image/*,.pdf,.ai,.eps" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Event Date (Deadline)</label>
                <input type="date" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black" />
              </div>
              <button type="submit" className="w-full bg-black text-white font-bold uppercase tracking-wider py-4 mt-2 hover:bg-gray-800 transition-colors">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
