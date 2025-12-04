import { Box, Container, Grid, Heading, Text, Button, VStack, HStack,  Tabs } from '@chakra-ui/react'
import { Check } from 'lucide-react'
import { useState, useEffect, useMemo, useCallback } from 'react'
import AnimatedSection from '../components/AnimatedSection'
import { listPlansWithouToken } from '../services/plan.service'
import type { ClinicPlan } from '../types/plan.types'
import PurchaseModal from '../components/PurchaseModal'
import { Toaster } from '../components/ui/toaster'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
// @ts-expect-error - Swiper CSS imports
import 'swiper/css'
// @ts-expect-error - Swiper CSS imports
import 'swiper/css/navigation'
// @ts-expect-error - Swiper CSS imports
import 'swiper/css/pagination'
import '../styles/swiper-custom.css'

// Componente FAQ Item
// function FAQItem({
//   question,
//   answer,
//   isOpen,
//   onToggle
// }: {
//   question: string;
//   answer?: string;
//   isOpen: boolean;
//   onToggle: () => void
// }) {

//   return (
//     <Box
//       bg="rgba(91, 136, 214, 0.3)"
//       borderRadius="8px"
//       overflow="hidden"
//       border="1px solid rgba(255, 255, 255, 0.2)"
//     >
//       <Button
//         w="100%"
//         h="auto"
//         py={4}
//         px={5}
//         bg="transparent"
//         color="white"
//         fontSize={{ base: 'sm', md: 'md' }}
//         fontWeight="600"
//         textAlign="left"
//         justifyContent="space-between"
//         borderRadius="0"
//         transition="all 0.3s"
//         _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
//         onClick={onToggle}
//         whiteSpace="normal"
//       >
//         <HStack gap={3} flex={1} align="flex-start">
//           <Plus
//             size={20}
//             style={{
//               transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
//               transition: 'transform 0.3s',
//               flexShrink: 0
//             }}
//           />
//           <Text
//             flex={1}
//             wordBreak="break-word"
//             whiteSpace="normal"
//           >
//             {question}
//           </Text>
//         </HStack>
//       </Button>
//       {isOpen && answer && (
//         <Box
//           px={5}
//           py={4}
//           bg="rgba(255, 255, 255, 0.05)"
//           color="white"
//           fontSize={{ base: 'sm', md: 'md' }}
//           lineHeight="1.7"
//           borderTop="1px solid rgba(255, 255, 255, 0.1)"
//           wordBreak="break-word"
//           overflowWrap="break-word"
//         >
//           {answer}
//         </Box>
//       )}
//     </Box>
//   )
// }

// Componente Plan Card
function PlanCard({ clinicPlan, index, onOpenModal }: { clinicPlan: ClinicPlan; index: number; onOpenModal: (plan: ClinicPlan) => void }) {
  const { plan } = clinicPlan
  const isAnnual = plan.cycle === 'anual'

  return (
    <AnimatedSection direction="up" delay={0.2 + index * 0.1}>
      <Box
        bg="white"
        borderRadius="15px"
        overflow="hidden"
        boxShadow="0 4px 20px rgba(0,0,0,0.15)"
        h={{ base: 'auto', md: '550px' }}
        minH={{ base: '500px', md: '550px' }}
        w="100%"
        maxW="350px"
        mx="auto"
        display="flex"
        flexDirection="column"
      >
        {/* Conteúdo do Card */}
        <VStack align="center" p={{ base: 4, md: 5 }} gap={2.5} flex={1} justify="space-between">
          {/* Título do Plano */}
          <VStack gap={2} w="100%">
            <Heading
              as="h3"
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight="400"
              color="#2e4392"
              textAlign="center"
              minH={{ base: '28px', md: '32px' }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {plan.description}
            </Heading>
            <Text fontSize={{ base: 'xs', md: 'sm' }} color="#555" fontWeight="500">
              {isAnnual ? 'Pagamento Único' : 'Recorrente No Cartão'}
            </Text>
          </VStack>

          {/* Preço */}
          <VStack gap={0} my={1}>
            <Text fontSize="xs" color="#555">
              A partir de €
            </Text>
            <Heading
              as="h4"
              fontSize={{ base: '3rem', md: '2.75rem' }}
              fontWeight="700"
              color="#2e4392"
              lineHeight="1"
            >
              {plan.price.toFixed(2).replace('.', ',')}
              <Box as="span" fontSize={{ base: 'md', md: 'md' }} fontWeight="400" color="#555">
                {isAnnual ? ' /Anual' : ' /mês'}
              </Box>
            </Heading>
          </VStack>

          {/* Destaque Promocional (área fixa para manter alinhamento) */}
          <Box minH="40px" display="flex" alignItems="center" justifyContent="center" w="100%">
            {isAnnual && plan.descriptionText && (
              <Text
                fontSize="2xs"
                color="#2e4392"
                fontWeight="400"
                textAlign="center"
                lineHeight="1.4"
              >
                {plan.descriptionText}
              </Text>
            )}
          </Box>

          {/* Lista de Benefícios */}
          <VStack align="flex-start" gap={1.5} w="100%" fontSize="xs" color="#555" mt={2}>
            <HStack gap={1.5}>
              <Box
                w="14px"
                h="14px"
                borderRadius="full"
                border="2px solid #2e4392"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Check size={8} strokeWidth={3} color="#2e4392" />
              </Box>
              <Text>Valor referente a 1 pessoa</Text>
            </HStack>
            <HStack gap={1.5}>
              <Box
                w="14px"
                h="14px"
                borderRadius="full"
                border="2px solid #2e4392"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Check size={8} strokeWidth={3} color="#2e4392" />
              </Box>
              <Text>Sem carência</Text>
            </HStack>
            <HStack gap={1.5}>
              <Box
                w="14px"
                h="14px"
                borderRadius="full"
                border="2px solid #2e4392"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Check size={8} strokeWidth={3} color="#2e4392" />
              </Box>
              <Text>Fidelidade de 12 meses</Text>
            </HStack>
            <HStack gap={1.5}>
              <Box
                w="14px"
                h="14px"
                borderRadius="full"
                border="2px solid #2e4392"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Check size={8} strokeWidth={3} color="#2e4392" />
              </Box>
              <Text>Sem restrições de idade</Text>
            </HStack>
            <HStack gap={1.5}>
              <Box
                w="14px"
                h="14px"
                borderRadius="full"
                border="2px solid #2e4392"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Check size={8} strokeWidth={3} color="#2e4392" />
              </Box>
              <Text>Sem restrições de doenças pré existentes</Text>
            </HStack>
          </VStack>

          {/* Botão */}
          <Button
            onClick={() => onOpenModal(clinicPlan)}
            bg="#4a7bb7"
            color="white"
            w="100%"
            h="auto"
            py={2.5}
            fontSize={{ base: 'xs', md: 'sm' }}
            fontWeight="700"
            borderRadius="6px"
            mt="auto"
            transition="all 0.3s"
            _hover={{
              bg: '#3d6a9f',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          >
            CONTRATAR PLANO
          </Button>
        </VStack>
      </Box>
    </AnimatedSection>
  )
}

export default function Home() {
  const backgroundImageDesktop = '/images/hero-desktop.jpg'
  const backgroundImageMobile = '/images/hero-mobile.jpg'
  // const backgroundImageCruz = '/images/fundoplano.jpg'

  // Estado para planos
  const [plans, setPlans] = useState<ClinicPlan[]>([])
  const [selectedCycle, setSelectedCycle] = useState<'mensal' | 'anual'>('mensal')
  const [isLoading, setIsLoading] = useState(true)

  // Estado para modal de compra
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlanForPurchase, setSelectedPlanForPurchase] = useState<ClinicPlan | null>(null)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true)
        const response = await listPlansWithouToken() as { data: { plans: ClinicPlan[] } }
        setPlans(response.data.plans || [])
      } catch (error) {
        console.error('Erro ao buscar planos:', error)
        setPlans([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlans()
  }, [])

  const filteredPlans = useMemo(() => {
    return plans?.filter((item) => {
      const isActive = Boolean(item?.active) === true
      const isPlanActive = Boolean(item?.plan?.active) === true
      const isExternalId = item?.plan?.external_id && item.plan.external_id?.trim() !== ''
      const isOutdoorEnvironment = (item?.plan?.category || '').toLowerCase() === 'outdoorenvironment'
      const isCycleMatch = item?.plan?.cycle === selectedCycle

      return isActive && isPlanActive && isExternalId && isCycleMatch && isOutdoorEnvironment
    }) || []
  }, [plans, selectedCycle])

  const handleOpenModal = useCallback((plan: ClinicPlan) => {
    setSelectedPlanForPurchase(plan)
    setIsModalOpen(true)
  }, [])

  return (
    <Box position="relative" overflow="hidden">
      {/* Toaster para notificações */}
      <Toaster />

      {/* Modal de Compra */}
      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlanForPurchase}
      />

      {/* Hero Section */}
      <Box
        bg="linear-gradient(90deg, #2e4392 0%, #11a2d7 100%)"
        h={{ base: '82vh', md: '100vh', lg: 'calc(97vh - 85px)' }}
        mt={{ base: '0', md: '0' }}
        position="relative"
        py={{ base: 6, md: 10 }}
        backgroundImage={{
          base: `url(${backgroundImageMobile})`,
          sm: `url(${backgroundImageDesktop})`
        }}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        overflow="hidden"
        display="flex"
        alignItems="center"
      >
        {/* Overlay do Gradiente sobre a imagem */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1}
        />

        <Container maxW="1400px" px={{ base: 4, md: 6, lg: 8 }} position="relative" zIndex={2} w="100%">
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr' }}
            alignItems="center"
          >
            {/* Conteúdo Principal */}
            <AnimatedSection direction="up" duration={0.8}>
              <VStack
                align="flex-start"
                gap={{ base: 3, md: 4 }}
                color="white"
                mt={{ base: '-50%', md: 0 }}
                maxW={{ base: '100%', md: '700px' }}
              >
                {/* Título Principal */}
                <Heading
                  as="h1"
                  fontSize={{ base: '2rem', md: '3rem', lg: '4rem' }}
                  fontWeight="300"
                  lineHeight="1.15"
                  letterSpacing="-0.02em"
                >
                  O seu{' '}
                  <Box as="span" fontWeight="700">
                    médico online
                  </Box>
                  <br />
                  <Box as="span" fontWeight="700">
                    24h por dia, 7 dias
                  </Box>
                  <br />
                  <Box as="span" fontWeight="700">
                    por semana
                  </Box>{' '}
                  <Box as="span" fontWeight="300">
                    sempre
                  </Box>
                  <br />
                  que precisar.
                </Heading>

                {/* Lista de Benefícios */}
                <VStack align="flex-start" gap={2} fontSize={{ base: 'md', md: 'lg' }} mt={1}>
                  <HStack gap={2.5}>
                    <Box
                      w="20px"
                      h="20px"
                      borderRadius="full"
                      border="2px solid white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Check size={12} strokeWidth={3} color="white" />
                    </Box>
                    <Text fontWeight="400">Sem filas</Text>
                  </HStack>
                  <HStack gap={2.5}>
                    <Box
                      w="20px"
                      h="20px"
                      borderRadius="full"
                      border="2px solid white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Check size={12} strokeWidth={3} color="white" />
                    </Box>
                    <Text fontWeight="400">Sem burocracia</Text>
                  </HStack>
                  <HStack gap={2.5}>
                    <Box
                      w="20px"
                      h="20px"
                      borderRadius="full"
                      border="2px solid white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Check size={12} strokeWidth={3} color="white" />
                    </Box>
                    <Text fontWeight="400">Sem carência</Text>
                  </HStack>
                </VStack>

                {/* Texto do Preço */}
                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  mt={2}
                  maxW="600px"
                  lineHeight="1.6"
                  fontWeight="400"
                >
                  E o melhor: seja atendido em até 10 minutos, a partir de €6,99/mês.
                </Text>

                {/* Botão CTA */}
                <Button
                  onClick={() => {
                    const planosSection = document.getElementById('planos');
                    if (planosSection) {
                      planosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  size="lg"
                  bg="rgba(46, 67, 146, 0.6)"
                  color="white"
                  border="2.5px solid white"
                  px={{ base: 6, md: 10 }}
                  py={{ base: 4, md: 5 }}
                  h="auto"
                  fontSize={{ base: 'sm', md: 'md' }}
                  fontWeight="700"
                  borderRadius="50px"
                  mt={2}
                  transition="all 0.3s"
                  cursor="pointer"
                  _hover={{
                    bg: 'white',
                    color: '#2e4392',
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    textDecoration: 'none'
                  }}
                >
                  Quero Contratar{' '}
                  <Box
                    as="span"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    w="24px"
                    h="24px"
                    borderRadius="full"
                    border="2px solid currentColor"
                    ml={2}
                    fontSize="sm"
                    fontWeight="400"
                  >
                    →
                  </Box>
                </Button>
              </VStack>
            </AnimatedSection>
          </Grid>
        </Container>

        {/* Background Pattern Overlay Sutil */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.05}
          background="radial-gradient(circle at 30% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)"
          pointerEvents="none"
          zIndex={1}
        />
      </Box>

      {/* Seção de Planos */}
      <Box
        id="planos"
        pt={{ base: '120px', md: 28, lg: 52 }}
        pb="120px"
        position="relative"
        mt="2%"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1}
        />

        <Container maxW="1400px" px={{ base: 4, md: 6, lg: 8 }} position="relative" zIndex={2}>
          <Tabs.Root
            value={selectedCycle}
            variant="outline"
            size="lg"
            onValueChange={(e) => setSelectedCycle(e.value as 'mensal' | 'anual')}
          >
            {/* Tabs List */}
            <Tabs.List justifyContent="center" mb={8} borderColor="#2e4392">
              <Tabs.Trigger
                value="mensal"
                color={selectedCycle === 'mensal' ? '#2e4392' : '#666'}
                fontSize={{ base: 'md', md: 'lg' }}
                fontWeight="700"
                px={{ base: 6, md: 10 }}
                py={3}
                _selected={{
                  color: '#2e4392',
                  borderColor: '#2e4392',
                  borderBottomWidth: '3px'
                }}
                _hover={{
                  color: '#2e4392'
                }}
              >
                Plano Mensal
              </Tabs.Trigger>
              <Tabs.Trigger
                value="anual"
                color={selectedCycle === 'anual' ? '#2e4392' : '#666'}
                fontSize={{ base: 'md', md: 'lg' }}
                fontWeight="700"
                px={{ base: 6, md: 10 }}
                py={3}
                _selected={{
                  color: '#2e4392',
                  borderColor: '#2e4392',
                  borderBottomWidth: '3px'
                }}
                _hover={{
                  color: '#2e4392'
                }}
              >
                Plano Anual
              </Tabs.Trigger>
            </Tabs.List>

            {/* Tabs Content */}
            <Tabs.ContentGroup>
              <Tabs.Content value="mensal">
                {isLoading ? (
                  <VStack py={10}>
                    <Text color="#2e4392" fontSize="lg">Carregando planos...</Text>
                  </VStack>
                ) : filteredPlans.length === 0 ? (
                  <VStack py={10}>
                    <Text color="#555" fontSize="md">Nenhum plano mensal disponível no momento.</Text>
                  </VStack>
                ) : filteredPlans.length <= 2 ? (
                  // Layout centralizado para poucos planos (1-2)
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={8}
                    flexWrap="wrap"
                    maxW="900px"
                    mx="auto"
                    py={10}
                  >
                    {filteredPlans.map((clinicPlan, index) => (
                      <Box key={clinicPlan.idClinicPlan} w={{ base: '100%', md: 'auto' }}>
                        <PlanCard
                          clinicPlan={clinicPlan}
                          index={index}
                          onOpenModal={handleOpenModal}
                        />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  // Layout Swiper para muitos planos (3+)
                  <Box position="relative" maxW="100%" mx="auto" overflow="hidden">
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={30}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true }}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }}
                      breakpoints={{
                        640: {
                          slidesPerView: 1,
                          spaceBetween: 20,
                        },
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 24,
                        },
                        1024: {
                          slidesPerView: 3,
                          spaceBetween: 30,
                        },
                        1280: {
                          slidesPerView: 3.5,
                          spaceBetween: 30,
                        },
                        1440: {
                          slidesPerView: 4,
                          spaceBetween: 30,
                        },
                      }}
                      loop={filteredPlans.length > 3}
                    >
                      {filteredPlans.map((clinicPlan, index) => (
                        <SwiperSlide key={clinicPlan.idClinicPlan}>
                          <PlanCard
                            clinicPlan={clinicPlan}
                            index={index}
                            onOpenModal={handleOpenModal}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Box>
                )}
              </Tabs.Content>

              <Tabs.Content value="anual">
                {isLoading ? (
                  <VStack py={10}>
                    <Text color="#2e4392" fontSize="lg">Carregando planos...</Text>
                  </VStack>
                ) : filteredPlans.length === 0 ? (
                  <VStack py={10}>
                    <Text color="#555" fontSize="md">Nenhum plano anual disponível no momento.</Text>
                  </VStack>
                ) : filteredPlans.length <= 2 ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={8}
                    flexWrap="wrap"
                    maxW="900px"
                    mx="auto"
                    py={10}
                  >
                    {filteredPlans.map((clinicPlan, index) => (
                      <Box key={clinicPlan.idClinicPlan} w={{ base: '100%', md: 'auto' }}>
                        <PlanCard
                          clinicPlan={clinicPlan}
                          index={index}
                          onOpenModal={handleOpenModal}
                        />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box position="relative" maxW="100%" mx="auto" overflow="hidden">
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={30}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true }}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }}
                      breakpoints={{
                        640: {
                          slidesPerView: 1,
                          spaceBetween: 20,
                        },
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 24,
                        },
                        1024: {
                          slidesPerView: 3,
                          spaceBetween: 30,
                        },
                        1280: {
                          slidesPerView: 3.5,
                          spaceBetween: 30,
                        },
                        1440: {
                          slidesPerView: 4,
                          spaceBetween: 30,
                        },
                      }}
                      loop={filteredPlans.length > 3}
                    >
                      {filteredPlans.map((clinicPlan, index) => (
                        <SwiperSlide key={clinicPlan.idClinicPlan}>
                          <PlanCard
                            clinicPlan={clinicPlan}
                            index={index}
                            onOpenModal={handleOpenModal}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Box>
                )}
              </Tabs.Content>
            </Tabs.ContentGroup>
          </Tabs.Root>
        </Container>
      </Box>
    </Box>
  )
}
