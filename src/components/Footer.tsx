import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-[#4169E1]">toda</span>
              <span>gente</span>
            </h3>
            <p className="text-gray-400">
              O Seu Médico de Confiança em Portugal!
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Events</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">About</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Shop</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Patterns</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Authors</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Themes</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contacto</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +351937097574
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>Twenty Twenty-Five</p>
          <p className="mt-2">
            Designed with <a href="https://wordpress.org" className="text-[#4169E1] hover:underline">WordPress</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
