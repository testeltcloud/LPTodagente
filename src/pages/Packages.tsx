import React from 'react';

const Packages: React.FC = () => {
  const packages = [
    {
      name: 'Plano Básico',
      price: '6.99',
      period: 'mês',
      features: [
        'Consultas ilimitadas',
        'Atendimento 24/7',
        'Receitas digitais',
        'Médicos certificados SNS',
        'Atendimento em 15min',
      ],
      popular: false,
    },
    {
      name: 'Plano Familiar',
      price: '14.99',
      period: 'mês',
      features: [
        'Tudo do Plano Básico',
        'Até 4 membros da família',
        'Prioridade no atendimento',
        'Histórico médico completo',
        'Suporte prioritário',
      ],
      popular: true,
    },
    {
      name: 'Plano Anual',
      price: '69.99',
      period: 'ano',
      features: [
        'Tudo do Plano Básico',
        '2 meses grátis',
        'Desconto de 17%',
        'Consultas ilimitadas',
        'Sem compromisso',
      ],
      popular: false,
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-gray-800">Escolha Seu </span>
            <span className="text-[#4169E1]">Plano</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Planos flexíveis para atender suas necessidades de saúde e da sua família
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ${
                pkg.popular ? 'ring-4 ring-[#4169E1] transform scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#4169E1] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{pkg.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-5xl font-bold text-[#4169E1]">{pkg.price}€</span>
                  <span className="text-gray-600">/{pkg.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-green-500 mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-lg font-semibold text-lg transition ${
                  pkg.popular
                    ? 'bg-[#4169E1] text-white hover:bg-[#3558C7]'
                    : 'border-2 border-[#4169E1] text-[#4169E1] hover:bg-blue-50'
                }`}
              >
                Escolher Plano
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Perguntas Frequentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                Posso cancelar a qualquer momento?
              </h3>
              <p className="text-gray-600">
                Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                As consultas são ilimitadas?
              </h3>
              <p className="text-gray-600">
                Sim, todos os planos incluem consultas ilimitadas com nossos médicos.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                Os médicos são certificados?
              </h3>
              <p className="text-gray-600">
                Sim, todos os nossos médicos são registrados e certificados pelo SNS de Portugal.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                Como recebo as receitas?
              </h3>
              <p className="text-gray-600">
                As receitas são enviadas digitalmente via SMS e e-mail, válidas em qualquer farmácia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
