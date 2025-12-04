// import React from 'react';

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-gray-900 text-white py-12">
//       <div className="container mx-auto px-4">
//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Brand */}
//           <div className="space-y-4">
//             <h3 className="text-2xl font-bold">
//               <span className="text-[#4169E1]">toda</span>
//               <span>gente</span>
//             </h3>
//             <p className="text-gray-400">
//               O Seu Médico de Confiança em Portugal!
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h4 className="font-semibold text-lg">Links Rápidos</h4>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="text-gray-400 hover:text-white transition">Blog</a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-400 hover:text-white transition">Events</a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-400 hover:text-white transition">About</a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-400 hover:text-white transition">Shop</a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-400 hover:text-white transition">FAQs</a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-400 hover:text-white transition">Patterns</a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-400 hover:text-white transition">Authors</a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-400 hover:text-white transition">Themes</a>
//               </li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div className="space-y-4">
//             <h4 className="font-semibold text-lg">Contacto</h4>
//             <div className="space-y-2 text-gray-400">
//               <p className="flex items-center gap-2">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 +351937097574
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Bottom */}
//         <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
//           <p>Twenty Twenty-Five</p>
//           <p className="mt-2">
//             Designed with <a href="https://wordpress.org" className="text-[#4169E1] hover:underline">WordPress</a>
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Box, Container, Grid, Heading, Text, VStack, HStack, Link, Image } from '@chakra-ui/react'
import { Instagram, Youtube } from 'lucide-react'
import AnimatedSection from '../components/ui/animatedFooter'

 const Footer: React.FC = () => {
   return (
<>
      <Box
        bg="white"
        py={{ base: 8, md: 10 }}
        borderTop="1px solid #e0e0e0"
        position="relative"  
        zIndex={10}          
      >
        <Container maxW="1400px" px={{ base: 4, md: 6, lg: 8 }}>
          <Grid
            templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }}
            gap={{ base: 8, md: 10 }}
            alignItems="start"
          >
            {/* Coluna 1 - Logo e Descrição */}
            <AnimatedSection direction="left" delay={0.1}>
              <VStack align="flex-start" gap={4}>
                <Image alt="Norte 2020, Portugal 2030, União Europeia" w="2560" h="911" src="https://todagentetelemedicina.com/wp-content/uploads/2025/05/TODAGENTE-LOGO-scaled.png" />
                <Text fontSize="sm" color="#555" lineHeight="1.7">
                  Nosso objetivo é transformar o acesso à saúde, ao oferecer serviços médicos acessíveis ao alcance de todos.
                </Text>
              </VStack>
            </AnimatedSection>

            {/* Coluna 2 - Logos Institucionais */}
            <AnimatedSection direction="up" delay={0.2}>
              <VStack align="center" gap={4} justify="center">
                <Box
                  bg="white"
                  px={{ base: 5, md: 2 }}
                  py={{ base: 2.5, md: 2.5 }}
                  borderRadius="25px"
                  boxShadow="0 2px 8px rgba(0,0,0,0.1)"
                >
                  {/* <Image
              src="/images/logos-institucionais.jpg"
              alt="Norte 2020, Portugal 2030, União Europeia"
              h={{ base: '30px', md: '62px' }}
              objectFit="contain"
            /> */}
                  <Link
                    href='https://todagentetelemedicina.com/wp-content/uploads/2025/08/SantosLotti_Ficha-de-Operacao.pdf'
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/logos-institucionais.jpg"
                      alt="Norte 2020, Portugal 2030, União Europeia"
                      h={{ base: '30px', md: '62px' }}
                      w={{ base: '100%', md: '100%' }}
                      objectFit="contain"
                      borderRadius="25px"
                    />
                  </Link>
                </Box>

                {/* Redes Sociais */}
                <HStack gap={3} mt={2}>
                  <Link
                    href="https://www.instagram.com/todagentetelemedicina/"
                    target="_blank"
                    rel="noopener noreferrer"
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    bg="#3d5a9c"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    fontSize="20px"
                    transition="all 0.3s"
                    _hover={{ bg: '#2e4392', transform: 'scale(1.1)' }}
                  >
                    <Instagram />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@TodaGenteTelemedicina"
                    target="_blank"
                    rel="noopener noreferrer"
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    bg="#ff0000"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    fontSize="20px"
                    transition="all 0.3s"
                    _hover={{ transform: 'scale(1.1)' }}
                  >
                    <Youtube />
                  </Link>
                </HStack>
              </VStack>
            </AnimatedSection>

            {/* Coluna 3 - Contacto */}
            <AnimatedSection direction="right" delay={0.3}>
              <VStack align="flex-start" gap={3}>
                <Heading as="h4" fontSize="lg" fontWeight="700" color="#2e4392">
                  Contacto
                </Heading>
                <VStack align="flex-start" gap={2} fontSize="sm" color="#555">
                  <Text>
                    <Box as="span" fontWeight="600">Nº de Registo:</Box> 517741792
                  </Text>
                  <Text lineHeight="1.6">
                    ERS – Entidade Reguladora da Saúde Registo: 41567
                  </Text>
                  <Text lineHeight="1.6">
                    Lagradouro Lake Towers – Edifício D, R. Daciano Baptista Marques 245,
                    4400-617 Vila Nova de Gaia, Portugal
                  </Text>
                  <Link
                    href="mailto:atendimento@todagentetelemedicina.com"
                    color="#2e4392"
                    fontWeight="600"
                    textDecoration="underline"
                    _hover={{ color: '#11a2d7' }}
                  >
                    atendimento@todagentetelemedicina.com
                  </Link>
                </VStack>
              </VStack>
            </AnimatedSection>
          </Grid>

          {/* Copyright */}
          <Box
            bg="#2e4392"
            py={6}
            borderTop="1px solid rgba(255,255,255,0.2)"
            borderRadius="10px"
          >
            <Container borderRadius="10px" maxW="1400px" px={{ base: 4, md: 6, lg: 8 }}>
              <HStack
                justify="space-between"
                flexDirection={{ base: 'column', md: 'row' }}
                gap={{ base: 3, md: 0 }}
              >
                <Text fontSize="xs" color="white" textAlign={{ base: 'center', md: 'left' }}>
                  Desenvolvido: LT Cloud 2025 © Todos os direitos reservados
                </Text>
                <HStack gap={4} fontSize="xs">
                  <Link href="#" color="white" fontWeight="600" _hover={{ textDecoration: 'underline' }}>
                    Política De Privacidade
                  </Link>
                  <Link href="#" color="white" fontWeight="600" _hover={{ textDecoration: 'underline' }}>
                    Termos De Uso
                  </Link>
                </HStack>
              </HStack>
            </Container>
          </Box>
        </Container>
      </Box>

      {/* Botão WhatsApp Flutuante */}
      {/* <Link
        href="https://wa.me/351937097574"
        target="_blank"
        rel="noopener noreferrer"
        position="fixed"
        bottom={{ base: '24px', md: '32px' }}
        right={{ base: '24px', md: '32px' }}
        w={{ base: '60px', md: '68px' }}
        h={{ base: '60px', md: '68px' }}
        bg="#25D366"
        borderRadius="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="0 4px 16px rgba(37, 211, 102, 0.4)"
        transition="all 0.3s"
        zIndex={1000}
        textDecoration="none"
        _hover={{
          transform: 'scale(1.1)',
          boxShadow: '0 6px 24px rgba(37, 211, 102, 0.5)',
          textDecoration: 'none'
        }}
      >
        <Box fontSize={{ base: '32px', md: '36px' }}>💬</Box>
      </Link> */}

    </>
   )
 }

 export default Footer;