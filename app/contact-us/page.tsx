import { Footer } from "@/components/layout/footer";
// import { FooterCta } from "@/components/layout/footer-cta";
import React from "react";

const ContactUs = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto p-8 bg-white">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            We'd love to hear from you!
          </h1>
          <p className="text-gray-600 max-w-2xl mb-8">
            Our team offers free career guidance to help you explore the right
            online or distance education programs. With personalised support
            based on your goals, we make it easier for you to take the next step
            toward a skilled future.
          </p>

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-red-500 text-xl">📞</span>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-500">1800-121-6201</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-500 text-xl">✉️</span>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-500">support@ecampusapp.com</p>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Follow Us</p>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white">
                  in
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  f
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white">
                  in
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map and Location Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Map Placeholder */}
          <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden border">
            {/* Integrate Google Maps iframe here */}
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7006.989929442989!2d77.31512289999999!3d28.5849245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce458ccb0afa5%3A0x6f6a3dc21c831e29!2sSector%202%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1781869959798!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Location Details */}
          <div>
            <h3 className="text-gray-500 uppercase tracking-widest text-sm font-semibold mb-2">
              Our Locations
            </h3>
            <h2 className="text-3xl font-bold mb-6">
              Expanding Across the Globe
            </h2>

            <div className="mb-6">
              <h4 className="font-bold border-b-2 border-red-200 inline-block mb-2">
                HQ - Noida
              </h4>
              <p className="text-gray-600">
                B-46, 2nd Floor, Sector 2, Noida 201301
              </p>
            </div>

            <div>
              <h4 className="font-bold border-b-2 border-red-200 inline-block mb-2">
                Branch Office - Kasganj
              </h4>
              <p className="text-gray-600">
                Bankner Nadrai Gate, Opposite Khusi Restaurant, <br /> Gandhi
                Kunj, Kasganj, Uttar Pradesh, 207123
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
