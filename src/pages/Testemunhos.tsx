import React from 'react';

const Testemunhos: React.FC = () => {
  const testimonials = [
    {
      name: 'Maria Silva',
      location: 'Lisboa',
      rating: 5,
      text: 'Excelente serviço! Consegui uma consulta em menos de 10 minutos e o médico foi muito atencioso. Recomendo!',
      avatar: '👩',
    },
    {
      name: 'João Santos',
      location: 'Porto',
      rating: 5,
      text: 'A comodidade de ter um médico disponível 24h é incrível. Já usei várias vezes e sempre fui bem atendido.',
      avatar: '👨',
    },
    {
      name: 'Ana Costa',
      location: 'Braga',
      rating: 5,
      text: 'Adorei o serviço! Prático, rápido e com médicos qualificados. As receitas digitais são muito convenientes.',
      avatar: '👩‍⚕️',
    },
    {
      name: 'Pedro Oliveira',
      location: 'Coimbra',
      rating: 5,
      text: 'Serviço de excelência! Atendimento rápido e profissional. Vale cada cêntimo da assinatura.',
      avatar: '👨‍💼',
    },
    {
      name: 'Sofia Ferreira',
      location: 'Faro',
      rating: 5,
      text: 'Maravilhoso poder consultar um médico a qualquer hora. Muito útil para quem tem filhos pequenos!',
      avatar: '👩‍🦰',
    },
    {
      name: 'Carlos Rodrigues',
      location: 'Setúbal',
      rating: 5,
      text: 'Recomendo 100%! Médicos competentes e atendimento humanizado. Sinto-me seguro com a Toda Gente.',
      avatar: '👨‍🦱',
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-gray-800">O Que Dizem Nossos </span>
            <span className="text-[#4169E1]">Pacientes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 3.500 pessoas já confiam na Toda Gente para cuidar da sua saúde
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-5xl font-bold text-[#4169E1] mb-2">3500+</div>
            <div className="text-gray-600">Pacientes Atendidos</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#4169E1] mb-2">4.9/5</div>
            <div className="text-gray-600">Avaliação Média</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#4169E1] mb-2">98%</div>
            <div className="text-gray-600">Satisfação</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#4169E1] mb-2">24/7</div>
            <div className="text-gray-600">Disponibilidade</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-800">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#4169E1] to-blue-600 rounded-2xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">Junte-se a Milhares de Portugueses Satisfeitos!</h2>
            <p className="text-xl mb-8 text-blue-100">
              Comece a cuidar da sua saúde com a melhor telemedicina de Portugal
            </p>
            <button className="bg-white text-[#4169E1] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition shadow-lg">
              Aderir Agora desde 6.99€/mês
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testemunhos;
