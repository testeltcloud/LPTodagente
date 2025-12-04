import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaStar, FaPlus, FaClock, FaMoneyBillWave, FaNewspaper, FaHeart, FaUserPlus, FaDesktop, FaUser} from 'react-icons/fa';
import { Check } from 'lucide-react';
// import { listPlansWithouToken } from '../services/plan.service'; // COMENTADO: usando dados mock
import type { ClinicPlan } from '../types/plan.types';
import PurchaseModal from './PurchaseModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// @ts-expect-error - Swiper CSS imports
import 'swiper/css';
// @ts-expect-error - Swiper CSS imports
import 'swiper/css/navigation';
// @ts-expect-error - Swiper CSS imports
import 'swiper/css/pagination';
import '../styles/swiper-custom.css';
import Footer from './Footer';
import YouTubeCarousel from './YouTubeCarousel';

const Hero = () => {
    return (
        <section
            data-aos="fade-in"
            data-aos-duration="1000"
            className="relative pt-1 md:pt-2 pb-4 md:pb-0 overflow-hidden mx-2 my-2 md:mx-5 md:my-5 xl:mx-auto xl:my-5 rounded-xl md:rounded-2xl xl:max-w-[95vw] min-h-screen lg:min-h-[90vh]"
            style={{
                backgroundImage: 'url(https://themes.muffingroup.com/be/doctor/wp-content/uploads/2022/10/bedoctor-section-bg1.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-[1600px] h-full flex flex-col">

                {/* --- TOPO: Logótipos e Contacto --- */}
                <div className="md:flex-row justify-between items-center md:items-center pt-1 md:pt-2 pb-3 md:pb-4 lg:pb-2 flex-shrink-0">
                    {/* Lado Esquerdo: Logos */}
                    <div className="flex flex-col md:flex-row gap-3 md:gap-1 mb-2 md:mb-3 lg:mb-0 items-center md:items-end md:justify-evenly">
                        {/* Logo Principal */}
                        <img
                            className="object-contain w-auto h-[120px] md:h-[170px] md:w-[250px] xl:w-[300px]"
                            src="https://api.todagentesaude.com/images/todagente/clinic/clinicLogo1729186149170.png"
                            alt="Toda Gente Telemedicina"
                        />
                        {/* Parceiros (Norte 2030 + EU) */}
                        <div className="flex items-center justify-center lg:justify-start gap-3 md:mb-4 md:-ml-4">
                            <a
                                href="https://todagentetelemedicina.com/wp-content/uploads/2025/08/SantosLotti_Ficha-de-Operacao.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <img
                                    src="https://todagentetelemedicina.com/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-15-at-15.47.55.jpeg"
                                    alt="Norte 2030"
                                    className="w-full max-w-[200px] md:max-w-[400px] xl:max-w-[500px] h-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
                                    style={{ borderRadius: "20px" }}
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* --- CONTEÚDO PRINCIPAL --- */}
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] xl:grid-cols-[1.3fr_0.7fr] gap-4 md:gap-8 lg:gap-6 xl:gap-8 items-stretch flex-grow mt-4 lg:mt-0">

                    {/* Coluna Esquerda: Texto e Botões */}
                    <div className="lg:order-1 pb-4 md:pb-8 lg:pb-0 text-center lg:text-left flex flex-col justify-center">
                        <h1
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5rem] 2xl:text-[5.0rem] font-bold leading-[1.15] mb-2 md:mb-4">
                            O Seu <span className="text-[#3B5CCC]">Médico de<br />Confiança</span> em<br />Portugal!
                        </h1>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="400"
                            className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-3 md:mb-5 leading-relaxed max-w-md xl:max-w-xl 2xl:max-w-2xl mx-auto lg:mx-0">
                            Telemedicina 24h por dia, com clínicos gerais registrados pelo SNS e consultas ilimitadas. Receitas válidas em todo Portugal.
                        </p>

                        {/* Botões */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="600"
                            className="flex flex-col sm:flex-row gap-3 md:gap-4 xl:gap-6 mb-4 md:mb-6 justify-center lg:justify-start">
                            <a href="#planos" className="bg-[#3B5CCC] text-white font-bold py-3 md:py-4 xl:py-5 px-6 md:px-7 xl:px-9 rounded-full text-center transition-all hover:bg-[#2E4AA3] shadow-lg hover:shadow-xl text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">
                                Aderir agora desde 6,99€/mês
                            </a>
                            <a href="#beneficios" className="bg-white text-[#3B5CCC] border-2 border-[#3B5CCC]/20 font-semibold py-3 md:py-4 xl:py-5 px-6 md:px-7 xl:px-9 rounded-full text-center transition-all hover:border-[#3B5CCC] hover:bg-gray-50 shadow-sm text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">
                                Ver Benefícios
                            </a>
                        </div>

                        {/* Lista de Benefícios */}
                        <ul
                            data-aos="fade-up"
                            data-aos-delay="800"
                            className="space-y-2 md:space-y-3 xl:space-y-4 text-gray-800 mb-4 md:mb-6 text-sm md:text-base lg:text-lg xl:text-xl inline-block text-center lg:text-left mx-auto lg:mx-0">
                            <li className="flex items-start">
                                <span className="text-green-500 text-lg md:text-xl xl:text-2xl mr-3 mt-0.5">●</span>
                                <span>Médicos Certificados em Portugal pelo SNS.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 text-lg md:text-xl xl:text-2xl mr-3 mt-0.5">●</span>
                                <span>Receitas via SMS e E-mail válidas em todo o país</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 text-lg md:text-xl xl:text-2xl mr-3 mt-0.5">●</span>
                                <span>Atendimentos em até 15 minutos</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 text-lg md:text-xl xl:text-2xl mr-3 mt-0.5">●</span>
                                <span>+3500 pessoas já atendidas</span>
                            </li>
                        </ul>

                        {/* Ícones de Pagamento/Segurança */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="1000"
                            style={{ justifyContent: "revert-layer" }}
                            className="flex items-center gap-5 xl:gap-7 justify-center lg:justify-start">
                            <img src="/images/2025/10/stripe.webp" alt="Stripe" className="h-10 md:h-15 xl:h-20 w-auto  transition-all" />
                            <img src="/images/2025/10/rgpd.webp" alt="RGPD" className="h-10 md:h-15 xl:h-20 w-auto  transition-all" />
                        </div>
                    </div>

                    {/* Coluna Direita: Imagem da Médica - SEM CORTES E RESPONSIVA */}
                    <div
                        data-aos="fade-left"
                        data-aos-delay="400"
                        className="hidden lg:block order-1 lg:order-2 relative">
                        <div className="relative w-full h-full flex items-end justify-end">
                            <img
                                src="/images/2025/10/medicaaa-768x1200.webp"
                                alt="Médica com telemóvel"
                                className="w-auto h-[100%] max-h-[1000px] object-contain object-bottom"
                                style={{
                                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))',
                                }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

const HowItWorks = () => {
    const steps = [
      
        {
            number: 1,
            title: 'Acesso a Plataforma de Pronto Atendimento',
            description: 'Após aderir e finalizar o pagamento, você receberá por <b>e-mail seus dados</b> de acesso.<br/><br/>Você poderá acessar via Web com seu login e senha ou pelo App. Após seguir as orientações de acesso, você poderá realizar atendimento no mesmo instante, sem carência alguma.',
            buttonText: 'Ver Planos',
            buttonLink: '#planos'
        },
        {
            number: 2,
            title: 'Receber orientação e receita quando necessário',
            description: 'Nossos médicos avaliarão você e se necessário, sua receita é enviada por <b>e-mail</b>, <b>SMS</b>, e ficam disponíveis também no <b>app SNS24</b>.<br/><br/>As receitas são válidas em todo Portugal.',
            buttonText: 'Ver Planos',
            buttonLink: '#planos'
        },
          {
            number: 3,
            title: 'Adere ao Plano',
            description: '<b>Mensal</b> ou <b>Anual</b>.<br/><b>Individual</b> ou <b>Familiar</b>.<br/><br/>Você escolhe.<br/><br/>Planos a partir de <b>6,99€</b><br/><b>Consultas ilimitadas.</b>',
            buttonText: 'Ver Planos',
            buttonLink: '#planos'
        },
    ];

    return (
        <React.Fragment>
            <div
                data-aos="fade-down"
                className="py-2 md:py-3" style={{ background: '#0089F7' }}>
                <h2 className="text-white text-center text-2xl md:text-3xl lg:text-4xl font-bold py-4 md:py-6">
                    Como Funciona?
                </h2>
            </div>
            <section id="comofunciona" className="py-12 md:py-16 lg:py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                data-aos="flip-up"
                                data-aos-delay={index * 200}
                                className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow flex flex-col items-center text-center">
                                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0089F7] mb-3 md:mb-4">{step.number}</div>
                                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-3 md:mb-4">{step.title}</h3>
                                <p className="text-gray-600 mb-4 md:mb-6 flex-grow leading-relaxed text-sm md:text-base" dangerouslySetInnerHTML={{ __html: step.description }}></p>
                                <a href={step.buttonLink} className="mt-auto bg-white text-[#3B5CCC] border-2 border-[#3B5CCC]/20 font-semibold py-2.5 md:py-3 px-6 md:px-8 rounded-full transition-all hover:bg-[#3B5CCC] hover:text-white hover:border-[#3B5CCC] text-sm md:text-base">
                                    {step.buttonText}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

const Benefits = () => {
    const benefitsList = [
        {
            icon: <FaClock className="text-4xl" />,
            title: 'Acesso Rápido',
            description: 'Consultas em até 15 minutos!',
            bgColor: 'bg-blue-500'
        },
        {
            icon: <FaMoneyBillWave className="text-4xl" />,
            title: 'Preço acessível',
            description: 'Abaixo da concorrência',
            bgColor: 'bg-blue-500'
        },
        {
            icon: <FaNewspaper className="text-4xl" />,
            title: 'Receitas enviadas por e-mail e SMS',
            description: 'Válidas em todo Portugal',
            bgColor: 'bg-blue-500'
        },
        {
            icon: <FaHeart className="text-4xl" />,
            title: 'Atendimento humanizado',
            description: 'Amamos cuidar de pessoas',
            bgColor: 'bg-blue-500'
        },
        {
            icon: <FaUserPlus className="text-4xl" />,
            title: 'Médicos com registros válidos em Portugal',
            description: 'Nossos profissionais têm registro válido e autorizado pelo SNS',
            bgColor: 'bg-blue-500'
        },
        {
            icon: <FaDesktop className="text-4xl" />,
            title: '100% online, no seu telemóvel',
            description: 'Quando e onde você estiver. Sem filas, sem esperas.',
            bgColor: 'bg-blue-500'
        },
    ];

    return (
        <section id="beneficios" className="py-16 md:py-20" style={{ background: '#3B5CCC' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2
                    data-aos="fade-up"
                    className="text-3xl md:text-4xl font-bold text-white mb-4">Benefícios</h2>
                <p
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="text-base md:text-lg text-white/90 mb-12 max-w-2xl mx-auto">
                    Conheça aqui alguns benefícios de utilizar o Toda Gente
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {benefitsList.map((benefit, index) => (
                        <div
                            key={index}
                            data-aos="zoom-in"
                            data-aos-delay={index * 100}
                            className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl text-white flex-shrink-0">
                                {benefit.icon}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg text-white mb-2">{benefit.title}</h4>
                                <p className="text-white/80 text-sm">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
interface AnimatedCounterProps {
    end: number;
    duration?: number;
}
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 10000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 } // Começa quando 50% do elemento estiver visível
        );

        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let current = 0;
        const timer = setInterval(() => {
            // Aceleração para chegar em 3500 suavemente
            current += Math.ceil(end / (duration / 20));

            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, 20);

        return () => clearInterval(timer);
    }, [end, duration, isVisible]);

    return <span ref={ref}>{count}</span>;
};

// 2. Componente Principal
const AboutCare = () => {
    // Representa o número total de estrelas
    const totalStars = 5;
    // Representa as 4 estrelas preenchidas
    const filledStars = 4;
    // Array para iterar
    const stars = Array.from({ length: totalStars }, (_, i) => i);

    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                    <div
                        data-aos="fade-right"
                        className="lg:col-span-2">
                        <img
                            // Certifique-se de que este caminho de imagem está correto
                            src="/images/2025/11/LEK1876-1.png"
                            alt="Médica Toda Gente"
                            className="rounded-2xl shadow-xl w-full h-auto"
                        />
                    </div>
                    <div className="lg:col-span-3">
                        <h2
                            data-aos="fade-left"
                            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                            Cuidado para todos
                        </h2>
                        <p
                            data-aos="fade-left"
                            data-aos-delay="200"
                            className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                            Estamos aqui para cuidar de você e da sua família com todo carinho e responsabilidade. Nosso atendimento é focado em saúde primária de baixa complexidade, com clínicos gerais [generalistas], que atendem desde crianças à idosos.

                            Todos nossos médicos fazem avaliações com total atenção aos seus sintomas, oferecem orientações claras e cuidadosas e, sempre que necessário, emitem pedidos e receitas de forma segura e personalizada.
                            Porque a sua saúde — e a de quem você ama — merece atenção de verdade.
                        </p>
                        <div
                            data-aos="fade-left"
                            data-aos-delay="400"
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">

                            {/* Seção Pessoas Atendidas */}
                            <div className="flex items-center gap-4">
                                {/* Ícone de Usuário - Estilizado para se parecer com a imagem (ícone simples, azul) */}
                                {/* Removido o bg-blue-50 e animate-pulse para maior fidelidade à imagem, mas mantive o FaUser como um ícone simples e azul como na imagem */}
                                <div className="text-[#3B5CCC] text-3xl">
                                    <FaUser />
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-gray-800 flex items-center">
                                        {/* Implementação do Contador */}
                                        <AnimatedCounter end={3500} duration={1500} />
                                        <span className="text-gray-800 ml-1">+</span> {/* Cor do '+' alterada para gray-800 para corresponder à imagem */}
                                    </div>
                                    <p className="text-gray-600 text-sm">Pessoas atendidas</p>
                                </div>
                            </div>

                            {/* Seção Estrelas e Soluções */}
                            <div className="ml-0 sm:ml-8"> {/* Adicionado margem para separação em telas maiores */}
                                <p className="font-medium text-gray-700 mb-2 text-sm">+ de 95% de atendimentos solucionados</p>
                                <div className="flex gap-1 items-center">
                                    {/* Animação sequencial nas estrelas */}
                                    {stars.map((index) => (
                                        <div
                                            key={index}
                                            data-aos="zoom-in"
                                            data-aos-delay={500 + (index * 100)}
                                            data-aos-anchor-placement="top-bottom"
                                            // Estilização condicional da cor para 4 preenchidas e 1 vazia (cinza)
                                            className={`text-xl ${index < filledStars ? 'text-blue-500' : 'text-gray-300'}`}
                                        // A imagem usa estrelas azuis e não amarelas, e a estrela vazia é cinza.
                                        // Removido o estilo inline complexo de fundo e borderRadius
                                        >
                                            <FaStar className="w-6 h-6" /> {/* Ajustado tamanho do ícone, removido hover */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Botão Ver Planos */}
                        <a
                            data-aos="fade-left"
                            data-aos-delay="800"
                            href="#planos"
                            // Cor do botão verde e arredondamento total
                            className="bg-[#4CAF50] text-white font-bold py-3 px-8 rounded-full transition-all hover:bg-[#45a049] shadow-lg hover:shadow-xl inline-block text-lg"
                        >
                            Ver Planos
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

// const Testimonials = () => {
//     const testimonialsList = [
//         { videoUrl: 'https://www.youtube.com/shorts/43Uu94OlG1g', thumb: '/images/2025/11/FERNANDA-2.webp' },
//         { videoUrl: 'https://www.youtube.com/shorts/kR5dCwicp6c', thumb: '/images/2025/11/MARINA-2.webp' },
//         { videoUrl: 'https://www.youtube.com/shorts/sSstdtnF61k', thumb: '/images/2025/11/NICOLLY-2.webp' },
//     ];
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const goToNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsList.length);
//     const goToPrev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsList.length) % testimonialsList.length);

//     return (
//         <section className="py-20 bg-white">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
//                 <h2 
//                   data-aos="fade-up"
//                   className="text-3xl font-bold text-gray-800 mb-2">Experiências reais de quem confia no Toda Gente</h2>
//                 <p 
//                   data-aos="fade-up"
//                   data-aos-delay="200"
//                   className="text-gray-600 mb-8">CLIQUE E ASSISTA!</p>
//                 <div 
//                   data-aos="zoom-in"
//                   data-aos-delay="400"
//                   className="relative max-w-4xl mx-auto">
//                     <button onClick={goToPrev} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10">
//                         <FaChevronLeft />
//                     </button>
//                     <div className="overflow-hidden">
//                         <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//                             {testimonialsList.map((testimonial, index) => (
//                                 <div key={index} className="w-full flex-shrink-0">
//                                     <a href={testimonial.videoUrl} target="_blank" rel="noopener noreferrer">
//                                         <img src={testimonial.thumb} alt={`Testimonial ${index + 1}`} className="w-full rounded-lg shadow-lg" />
//                                     </a>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <button onClick={goToNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10">
//                         <FaChevronRight />
//                     </button>
//                      <div className="flex justify-center mt-4 space-x-2">
//                         {testimonialsList.map((_, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => setCurrentIndex(index)}
//                                 className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
//                             ></button>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// Componente de Planos Dinâmicos
const DynamicPricing = () => {
    const [plans, setPlans] = useState<ClinicPlan[]>([]);
    const [selectedCycle, setSelectedCycle] = useState<'mensal' | 'anual'>('mensal');
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlanForPurchase, setSelectedPlanForPurchase] = useState<ClinicPlan | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setIsLoading(true);

                // ===== COMENTADO: Chamada real da API =====
                // const response = await listPlansWithouToken() as { data: { plans: ClinicPlan[] } };
                // console.log('✅ Resposta da API:', response);
                // console.log('📋 Planos recebidos:', response.data.plans);
                // setPlans(response.data.plans || []);

                // ===== MOCK: Dados de teste =====
                const mockPlans: ClinicPlan[] = [
                    // 20 Planos Mensais
                    ...Array.from({ length: 20 }, (_, i) => ({
                        idClinicPlan: i + 1,
                        active: true,
                        plan: {
                            id: i + 1,
                            description: `Plano Mensal ${i + 1}`,
                            price: 9.99 + (i * 2),
                            cycle: 'mensal' as const,
                            active: true,
                            external_id: `price_mensal_${i + 1}`,
                            category: 'outdoorenvironment',
                            descriptionText: `Plano mensal com consultas ilimitadas - Opção ${i + 1}`
                        }
                    })),
                    // 20 Planos Anuais
                    ...Array.from({ length: 20 }, (_, i) => ({
                        idClinicPlan: i + 21,
                        active: true,
                        plan: {
                            id: i + 21,
                            description: `Plano Anual ${i + 1}`,
                            price: 99.99 + (i * 10),
                            cycle: 'anual' as const,
                            active: true,
                            external_id: `price_anual_${i + 1}`,
                            category: 'outdoorenvironment',
                            descriptionText: `Economize 2 meses - Plano anual ${i + 1}`
                        }
                    }))
                ];

                // console.log('✅ Dados MOCK carregados:', mockPlans);
                // console.log('📋 Total de planos mock:', mockPlans.length);
                setPlans(mockPlans);

            } catch (error) {
                console.error('❌ Erro ao buscar planos:', error);
                setPlans([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const filteredPlans = useMemo(() => {
        // console.log('🔎 Filtrando planos...', { totalPlans: plans.length, selectedCycle });
        const filtered = plans?.filter((item) => {
            const isActive = Boolean(item?.active) === true;
            const isPlanActive = Boolean(item?.plan?.active) === true;
            const isExternalId = item?.plan?.external_id && item.plan.external_id?.trim() !== '';
            const isOutdoorEnvironment = (item?.plan?.category || '').toLowerCase() === 'outdoorenvironment';
            const isCycleMatch = item?.plan?.cycle === selectedCycle;

            // console.log(`Plano ${item?.plan?.description}:`, {
            //     isActive,
            //     isPlanActive,
            //     isExternalId,
            //     isOutdoorEnvironment,
            //     isCycleMatch,
            //     category: item?.plan?.category,
            //     cycle: item?.plan?.cycle
            // });

            return isActive && isPlanActive && isExternalId && isCycleMatch && isOutdoorEnvironment;
        }) || [];

        // console.log('✅ Planos filtrados:', filtered.length, filtered);
        return filtered;
    }, [plans, selectedCycle]);

    const handleOpenModal = useCallback((plan: ClinicPlan) => {
        // console.log('🔔 Abrindo modal para plano:', plan);
        setSelectedPlanForPurchase(plan);
        setIsModalOpen(true);
    }, []);

    // console.log('🎨 Renderizando DynamicPricing:', { isLoading, plansCount: filteredPlans.length });

    return (
        <>
            <PurchaseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedPlan={selectedPlanForPurchase}
            />

            <section id="planos" className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2
                        data-aos="fade-up"
                        className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Planos
                    </h2>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Cuide da sua saúde com planos simples, acessíveis e sem burocracia.<br />
                        Escolha a melhor opção para si e para a sua família.
                    </p>

                    {/* Tabs de seleção */}
                    <div className="flex justify-center mb-8 gap-3 md:gap-4 px-4">
                        <button
                            onClick={() => {
                                // console.log('📱 Selecionando ciclo: mensal');
                                setSelectedCycle('mensal');
                            }}
                            className={`flex-1 md:flex-none px-6 md:px-8 py-3 md:py-3 font-bold text-base md:text-lg rounded-full transition-all max-w-[180px] md:max-w-none ${selectedCycle === 'mensal'
                                    ? 'bg-[#3B5CCC] text-white shadow-lg'
                                    : 'bg-white text-[#3B5CCC] border-2 border-[#3B5CCC]/20'
                                }`}
                        >
                            Plano Mensal
                        </button>
                        <button
                            onClick={() => {
                                // console.log('📱 Selecionando ciclo: anual');
                                setSelectedCycle('anual');
                            }}
                            className={`flex-1 md:flex-none px-6 md:px-8 py-3 md:py-3 font-bold text-base md:text-lg rounded-full transition-all max-w-[180px] md:max-w-none ${selectedCycle === 'anual'
                                    ? 'bg-[#3B5CCC] text-white shadow-lg'
                                    : 'bg-white text-[#3B5CCC] border-2 border-[#3B5CCC]/20'
                                }`}
                        >
                            Plano Anual
                        </button>
                    </div>

                    {/* Conteúdo dos Planos */}
                    {isLoading ? (
                        <div className="py-10">
                            <p className="text-[#3B5CCC] text-lg">Carregando planos...</p>
                        </div>
                    ) : filteredPlans.length === 0 ? (
                        <div className="py-10">
                            <p className="text-gray-600 text-md">
                                Nenhum plano {selectedCycle} disponível no momento.
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Total de planos recebidos: {plans.length}
                            </p>
                        </div>
                    ) : (
                        <div className="relative px-2 md:px-4 lg:px-6 overflow-hidden">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={30}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 1,
                                        spaceBetween: 20,
                                    },
                                    900: {
                                        slidesPerView: 2,
                                        spaceBetween: 30,
                                    },
                                    1280: {
                                        slidesPerView: 3,
                                        spaceBetween: 40,
                                    },
                                }}
                                className="plans-swiper pb-12"
                            >
                                {filteredPlans.map((clinicPlan) => {
                                    const { plan } = clinicPlan;
                                    const isAnnual = plan.cycle === 'anual';

                                    return (
                                        <SwiperSlide key={clinicPlan.idClinicPlan}>
                                            <div className="rounded-3xl shadow-xl p-8 md:p-10 w-full h-full flex flex-col text-center bg-white mx-auto max-w-sm">
                                                <h3 className="text-2xl md:text-3xl font-bold text-[#3B5CCC] mb-2">
                                                    {plan.description}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-6">
                                                    {isAnnual ? 'Pagamento Único' : 'Recorrente No Cartão'}
                                                </p>
                                                <div className="mb-6">
                                                    <span className="text-[#3B5CCC] text-xl">€</span>
                                                    <span className="text-5xl md:text-6xl font-bold text-[#3B5CCC]">
                                                        {plan.price.toFixed(2).replace('.', ',')}
                                                    </span>
                                                    <span className="text-gray-600 text-lg">
                                                        {isAnnual ? '/ano' : '/mês'}
                                                    </span>
                                                </div>
                                                {isAnnual && plan.descriptionText && (
                                                    <p className="font-semibold text-[#3B5CCC] mb-8 text-sm">
                                                        {plan.descriptionText}
                                                    </p>
                                                )}
                                                <ul className="space-y-3 text-gray-700 mb-10 text-left flex-grow text-sm md:text-base">
                                                    <li className="flex items-start">
                                                        <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                                                        <span>Consultas ilimitadas</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                                                        <span>Valor referente a 1 pessoa</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                                                        <span>Sem carência</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                                                        <span>Fidelidade de 12 meses</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                                                        <span>Sem restrições de idade</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                                                        <span>24 horas por dia</span>
                                                    </li>
                                                </ul>
                                                <button
                                                    onClick={() => handleOpenModal(clinicPlan)}
                                                    className="mt-auto bg-[#4CAF50] text-white font-bold py-4 px-8 rounded-full transition-all hover:bg-[#45a049] shadow-lg hover:shadow-xl"
                                                >
                                                    Contratar Plano
                                                </button>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

const AboutUs = () => (
    <section className="py-16 md:py-20" style={{ background: '#4A4A4A' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                <div>
                    <h2
                        data-aos="fade-right"
                        className="text-3xl md:text-4xl font-bold text-white mb-6">Sobre nós!</h2>
                    <p
                        data-aos="fade-right"
                        data-aos-delay="200"
                        className="text-lg md:text-xl text-white font-semibold mb-6">
                        Gostamos de cuidar das pessoas
                    </p>
                    <p
                        data-aos="fade-right"
                        data-aos-delay="400"
                        className="text-white/90 mb-6 leading-relaxed">
                        Somos uma plataforma portuguesa que une a confiança de um médico 24h online com rapidez exigida no dia a dia.
                    </p>
                    <p
                        data-aos="fade-right"
                        data-aos-delay="600"
                        className="text-white/90 leading-relaxed">
                        Nosso corpo clínico é formado por médicos que valorizam a escuta e o atendimento humanizado com o paciente.
                    </p>
                </div>
                <div className="flex items-center">
                    <p
                        data-aos="fade-left"
                        data-aos-delay="400"
                        className="text-white/90 leading-relaxed">
                        Nossas teleconsultas contam com 90% de índice de resolutividade e satisfação.<br /><br />
                        Com médicos legalmente registados em Portugal, equipe estável e atendimento humanizado, nós cuidamos de tua saúde com <strong className="text-white">verdade, tecnologia e presença.</strong>
                    </p>
                </div>
            </div>
        </div>
    </section>
);

const FAQ = () => {
    const faqs = [
        {
            number: "1",
            question: "Como funcionam as consultas online?",
            answer: "Após aderir a um plano, pode solicitar uma consulta online a qualquer momento através do nosso app.<br/><br/>O processo é simples:<br/>1) Escolhe o motivo da consulta.<br/>2) Preenche os seus dados essenciais.<br/>3) Passará pelo atendimento inicial em até 10 minutos.<br/>4) Será encaminhado ao corpo clínico no mesmo instante na mesma vídeo chamada, é só aguardar. <br/>O tempo médio de espera é até 10 minutos, variando conforme a procura."
        },
        {
            number: "2",
            question: "O Atendimento é 24h por dia?",
            answer: "Sim! 24h por dia, 7 dias por semana."
        },
        {
            number: "3",
            question: "Que tipo de profissionais atendem?",
            answer: "As consultas são realizadas por médicos com registo válido no SNS (Serviço Nacional de Saúde), experientes em Clínica Geral [Generalistas] com atendimentos para qualquer idade, desde criança até idosos. Todos os profissionais passam por verificação documental e validação ética, garantindo segurança e confiança no atendimento."
        },
        {
            number: "4",
            question: "Posso ser atendido(a) mesmo sem UTENTE?",
            answer: "Sim. Será solicitado apenas o NIF."
        },
        {
            number: "5",
            question: "Emitem receitas médicas válidas em Portugal?",
            answer: "Sim. Os nossos médicos podem emitir receitas médicas digitais, enviadas por e-mail e SMS, válidas em todas as farmácias de Portugal. As prescrições seguem critérios clínicos e as normas de saúde portuguesas."
        },
        {
            number: "6",
            question: "Posso marcar consultas para familiares?",
            answer: "Sim. Com os planos familiares, pode adicionar até 5 pessoas à mesma adesão — ideal para casais, filhos ou pais. Cada membro tem acesso a consultas ilimitadas com o clínico geral, conforme o plano escolhido."
        },
        {
            number: "7",
            question: "É um plano de saúde tradicional?",
            answer: "Não. A Toda Gente não é um seguro ou plano de saúde tradicional — é uma plataforma digital de acesso rápido a consultas médicas online, sem carências, sem fidelização e com adesão imediata.<br/><br/>👉 Precisa agora? <a href='#planos' class='text-blue-600 hover:underline'>Aderir em 1 minuto</a>"
        },
        {
            number: "8",
            question: "A Toda Gente atende urgências ou emergências médicas?",
            answer: "Não. A plataforma é voltada para consultas de rotina e acompanhamento clínico. Em caso de urgência médica, deve ligar 112 ou dirigir-se ao hospital mais próximo."
        },
        {
            number: "9",
            question: "Como funciona o pagamento e a renovação?",
            answer: "Os pagamentos são feitos de forma segura via Stripe, com renovação automática (mensal ou anual, conforme o plano escolhido). Pode gerir ou cancelar a subscrição a qualquer momento entrando em contato pelo e-mail oficial. Atenção: caso o cancelamento ocorra antes do prazo de 06 meses de fidelidade, o valor proporcional é cobrado. Pode gerir ou cancelar a subscrição a qualquer momento através da Área do Cliente."
        },
        {
            number: "10",
            question: "Os meus dados estão protegidos?",
            answer: "Sim. A Toda Gente cumpre integralmente o Regulamento Geral de Proteção de Dados (RGPD) da União Europeia. Recolhemos apenas os dados mínimos necessários para realizar as consultas e processar pagamentos, com criptografia e controlo de acesso seguro. Pode gerir os seus consentimentos e preferências de privacidade a qualquer momento na Política de Privacidade."
        },
        {
            number: "11",
            question: "O Serviço de Teleconsulta oferece prescrição para Mounjaro?",
            answer: "Não realizamos prescrição inicial. Renovamos a receita somente se houver uma receita recente e acompanhamento com um especialista."
        },
        {
            number: "12",
            question: "Posso cancelar a qualquer momento?",
            answer: "Sim. O cancelamento poderá ser solicitado a qualquer momento, porém, se fizer antes dos 06 meses iniciais a data de contratação, haverá uma multa, cujo valor será os meses restantes para completar este prazo. Atenção ao procedimento para cancelamento. Deverá ser formalizado por e-mail para: cancelamento@todagentetelemedicina.com ."
        },
        {
            number: "13",
            question: "Como funciona o método de cobrança?",
            answer: "No momento o método é somente via cartão de crédito e débito. Ao contratar o plano mensal ou anual, será debitado do seu cartão todos os meses o valor da mensalidade, correspondente ao plano contratado. Caso tenha interesse em cancelar, deverá realizar a solicitação formal para o e-mail: cancelamento@todagentetelemedicina.com . Caso não faça a solicitação formal, o valor será debitado automaticamente do cartão todos os meses."
        },
        // {
        //     number: "14",
        //     question: "Haverá estorno caso solicitar o cancelamento?",
        //     answer: "Não. Não fazemos estorno de valores após contratação, exceto por motivos técnicos da plataforma, impossibilitando a utilização da mesma. Toda solicitação de cancelamento e estorno deverá ser realizada pelo e-mail: cancelamento@todagentetelemedicina.com."
        // },
        {
            number: "15",
            question: "Haverá estorno caso solicitar o cancelamento?",
            answer: "Não. Não fazemos estorno de valores após contratação, exceto por motivos técnicos da plataforma, impossibilitando a utilização da mesma. Toda solicitação de cancelamento e estorno deverá ser realizada pelo e-mail: cancelamento@todagentetelemedicina.com."
        },
        {
            number: "16",
            question: "Os médicos podem recusar algum tipo de receita ou prescrição médica?",
            answer: "Sim. Quem vai definir será o próprio médico em atendimento, seguindo todos os protocolos de saúde e legislação portuguesa, visando a segurança e bem estar do paciente sempre."
        }
    ];

    return (
        <section id="faq" className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2
                        data-aos="fade-up"
                        className="text-3xl md:text-4xl font-bold text-[#3B5CCC] mb-4 text-center">
                        Perguntas Frequentes
                    </h2>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="text-base md:text-lg text-gray-600 mb-10 text-center">
                        Ainda tem dúvidas?<br />
                        A gente esclarece tudo aqui:
                    </p>
                    <div className="space-y-0">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 50}
                                className="border-b border-gray-200 last:border-b-0"
                            >
                                <button
                                    className="w-full py-5 px-6 flex items-center justify-between text-left bg-[#0089F7] text-white font-semibold hover:bg-[#0077D6] transition-colors rounded-2xl "
                                    onClick={() => {
                                        const content = document.getElementById(`faq-${index}`);
                                        if (content) {
                                            content.classList.toggle('hidden');
                                        }
                                    }}
                                >
                                    <span className="flex items-center gap-4">
                                        <span className="font-bold">{faq.number}</span>
                                        <span>{faq.question}</span>
                                    </span>
                                    <FaPlus className="text-white flex-shrink-0" />
                                </button>
                                <div id={`faq-${index}`} className="hidden px-6 py-4 bg-gray-50">
                                    <div
                                        className="text-gray-700 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


// const Footer = () => (
//     <footer className="bg-[#004f9e] text-gray-300">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
//             <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
//                 {/* Column 1: Logo and Social */}
//                 <div 
//                   data-aos="fade-up"
//                   data-aos-delay="0"
//                   className="lg:col-span-2">
//                     <img src="/images/2025/11/logo-branca.png" alt="Toda Gente Logo" className="h-12 mb-6" />
//                     <div className="flex space-x-4">
//                         <a href="https://www.facebook.com/todagentetelemedicina"
//                         target="_blank"
//                         rel="noopener noreferrer"

//                         className="hover:text-white"><FaFacebook size={24} /></a>
//                         <a href="https://www.instagram.com/stories/todagentetelemedicina/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="hover:text-white"><FaInstagram size={24} /></a>
//                         <a href="https://www.youtube.com/@TodaGenteTelemedicina" 
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="hover:text-white">
//                         <FaYoutube size={24} /></a>
//                     </div>
//                 </div>

//                 {/* Column 2: Menu */}
//                 <div
//                   data-aos="fade-up"
//                   data-aos-delay="200">
//                     <h6 className="font-bold text-white mb-4">Menu</h6>
//                     <ul className="space-y-2">
//                         <li><a href="#" className="hover:text-white">Home</a></li>
//                         <li><a href="#planos" className="hover:text-white">Planos</a></li>
//                         <li><a href="/politica-de-privacidade" className="hover:text-white">Política de Privacidade</a></li>
//                         <li><a href="/politica-de-cookies" className="hover:text-white">Política de Cookies</a></li>
//                     </ul>
//                 </div>

//                 {/* Column 3: About Us */}
//                 <div
//                   data-aos="fade-up"
//                   data-aos-delay="400">
//                     <h6 className="font-bold text-white mb-4">Sobre Nós</h6>
//                     <p className="text-sm"><strong>Nº de Registo:</strong> 517741792</p>
//                     <p className="text-sm"><strong>ERS – Entidade Reguladora da Saúde Registro:</strong> 41567</p>
//                     <p className="text-sm mt-2">Lake Towers – Edifício D, R. Daciano Baptista Marques 245, 4400-617 - Vila Nova de Gaia, Portugal</p>
//                     <p className="text-sm mt-2">
//                         <a href="mailto:atendimento@todagentetelemedicina.com" className="hover:text-white">atendimento@todagentetelemedicina.com</a>
//                     </p>
//                 </div>
//             </div>
//         </div>
//         <div className="bg-black text-center py-4">
//             <p className="text-sm text-gray-400">© 2025 Toda Gente Telemedicina | Todos os Direitos Reservados</p>
//         </div>
//     </footer>
// );


// const CookieBanner = () => {
//     const [isVisible, setIsVisible] = useState(true);

//     if (!isVisible) return null;

//     return (
//         <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-xl bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-4 z-50">
//             {/* <img src="wp-content/themes/betheme/images/cookies.png" alt="Cookies" className="w-12 h-12 hidden md:block" /> */}
//             <Cookie   width="150px" height="150px" />
//             <div className="text-sm text-gray-700 text-center md:text-left">
//                 Este site usa cookies para melhorar a sua experiência. Ao clicar em 'Aceitar', você concorda com a nossa <a href="/politica-de-cookies" className="underline font-semibold">Política de Cookies</a> e com o uso de cookies que garantem a melhor navegação e personalizam o conteúdo.
//             </div>
//             <button 
//                 onClick={() => setIsVisible(false)}
//                 className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full whitespace-nowrap"
//             >
//                 Aceitar
//             </button>
//         </div>
//     );
// }


export default function HomePage() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-cubic',
        });
    }, []);

    return (
        <div className="bg-white font-sans">
            {/* <Header /> */}
            <main>
                <Hero />
                <HowItWorks />
                <Benefits />
                <AboutCare />
                <YouTubeCarousel />
                {/* <Testimonials /> */}
                <DynamicPricing />
                <AboutUs />
                <FAQ />
            </main>
            {/* <Footer /> */}
            < Footer />
            {/* <CookieBanner /> */}
        </div>
    );
}