import { Box, Container, Heading, Text } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Play } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'

interface YouTubeVideo {
  id: string
  title: string
}

// Declare YouTube IFrame API types
declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, config: {
        events?: {
          onReady?: (event: { target: YTPlayer }) => void
          onStateChange?: (event: { target: YTPlayer; data: number }) => void
        }
      }) => YTPlayer
      PlayerState: {
        ENDED: number
        PLAYING: number
        PAUSED: number
        BUFFERING: number
        CUED: number
      }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

interface YTPlayer {
  playVideo: () => void
  pauseVideo: () => void
  stopVideo: () => void
}

// Array com os IDs dos vídeos do YouTube Shorts
// Canal: https://www.youtube.com/@TodaGenteTelemedicina/shorts
const youtubeVideos: YouTubeVideo[] = [
  { id: 'LXwTDB-5IR0', title: 'Atendimento 24h' },
  { id: '56ePMEWVs9M', title: 'Todagente Telemedicina' },
  { id: '2WmJwZEb3Eo', title: 'Consulta Online' },
  { id: 'wnavr12fBIA', title: 'Saúde Digital' },
  { id: 'Njtbp1f6dTk', title: 'Cuidados Médicos' },
  { id: 'tfFscH37MLo', title: 'Telemedicina' },
  { id: 'mp2jJqRBKJE', title: 'Especialistas' },
  { id: '5gBZSAEupvA', title: 'Atendimento Rápido' },
  { id: 'kuj_VKsJ6I4', title: 'Saúde Acessível' },
  { id: 'TJTeiMZc2dg', title: 'Cuidado Completo' },
]

function VideoCard({
  video,
  isActive,
  onVideoEnd
}: {
  video: YouTubeVideo
  isActive: boolean
  onVideoEnd: () => void
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef<YTPlayer | null>(null)
  const videoIdRef = useRef(`youtube-player-${video.id}`)
  const containerRef = useRef<HTMLDivElement>(null)

  // Inicia o vídeo automaticamente quando o slide fica ativo
  // useEffect(() => {
  //   if (isActive) {
  //     setIsPlaying(true)
  //   } else {
  //     setIsPlaying(false)
  //   }
  // }, [isActive])

  // Observa se o vídeo está visível na tela
  // useEffect(() => {
  //   const container = containerRef.current
  //   if (!container) return

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         // Se o vídeo sair da visualização, pause
  //         if (!entry.isIntersecting && playerRef.current) {
  //           playerRef.current.pauseVideo()
  //         }
  //         // Se o vídeo voltar para visualização e estiver ativo, retome
  //         else if (entry.isIntersecting && isActive && playerRef.current) {
  //           playerRef.current.playVideo()
  //         }
  //       })
  //     },
  //     {
  //       threshold: 0.5, // 50% do vídeo precisa estar visível
  //       rootMargin: '0px'
  //     }
  //   )

  //   observer.observe(container)

  //   return () => {
  //     observer.unobserve(container)
  //   }
  // }, [isActive])

  // Inicializa o YouTube IFrame API quando o vídeo está tocando
  useEffect(() => {
    if (!isPlaying || !isActive) return

    // Load YouTube IFrame API script if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        initPlayer()
      }
    } else {
      initPlayer()
    }

    function initPlayer() {
      // Wait for iframe to be rendered
      setTimeout(() => {
        const iframe = document.getElementById(videoIdRef.current)
        if (iframe && window.YT && window.YT.Player) {
          playerRef.current = new window.YT.Player(videoIdRef.current, {
            events: {
              onStateChange: (event) => {
                // When video ends (state = 0), advance to next slide
                if (event.data === 0) {
                  onVideoEnd()
                }
              }
            }
          })
        }
      }, 1000)
    }

    return () => {
      if (playerRef.current) {
        playerRef.current = null
      }
    }
  }, [isPlaying, isActive, onVideoEnd, video.id])

  return (
    <Box
      ref={containerRef}
      position="relative"
      borderRadius="15px"
      overflow="hidden"
      boxShadow="0 4px 20px rgba(0,0,0,0.15)"
      bg="black"
      h={{ base: '400px', md: '500px' }}
      maxW="350px"
      mx="auto"
    >
      {!isPlaying ? (
        // Thumbnail com botão de play
        <Box
          position="relative"
          w="100%"
          h="100%"
          cursor="pointer"
          onClick={() => setIsPlaying(true)}
        >
          <Box
            as="img"
            // @ts-expect-error - Chakra UI as prop typing issue
            src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
            alt={video.title}
            w="100%"
            h="100%"
            objectFit="cover"
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="80px"
            h="80px"
            bg="rgba(255, 255, 255, 0.9)"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="all 0.3s"
            _hover={{
              transform: 'translate(-50%, -50%) scale(1.1)',
              bg: 'white',
            }}
          >
            <Play size={40} color="#FF0000" fill="#FF0000" />
          </Box>
        </Box>
      ) : (
        // Player do YouTube com autoplay (sem loop para permitir detecção de fim)
        <Box
          id={videoIdRef.current}
          as="iframe"
          w="100%"
          h="100%"
          // @ts-expect-error - Chakra UI as prop typing issue
          src={`https://www.youtube.com/embed/${video.id}?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      )}
    </Box>
  )
}

export default function YouTubeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const handleVideoEnd = () => {
    if (swiperRef.current) {
      // Check if we're at the last slide
      if (swiperRef.current.activeIndex === youtubeVideos.length - 1) {
        // Loop back to first slide
        swiperRef.current.slideTo(0)
      } else {
        // Go to next slide
        swiperRef.current.slideNext()
      }
    }
  }

  return (
    <Box
      bg="linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)"
      py={{ base: 12, md: 16 }}
      position="relative"
    >
      <Container maxW="1400px" px={{ base: 4, md: 6, lg: 8 }}>
        {/* Título */}
        <Heading
          as="h2"
          fontSize={{ base: '2rem', md: '2.5rem' }}
          fontWeight="700"
          color="#2e4392"
          textAlign="center"
          mb={3}
        >
          Veja Nossos Vídeos
        </Heading>

        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          color="#6b7280"
          textAlign="center"
          mb={{ base: 8, md: 10 }}
          maxW="700px"
          mx="auto"
        >
          Conheça mais sobre a Todagente Telemedicina através dos nossos vídeos
        </Text>

        {/* Carrossel de Vídeos */}
        <Box position="relative" maxW="100%" mx="auto" overflow="visible">
          {youtubeVideos.length <= 2 ? (
            // Layout para poucos vídeos
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={8}
              flexWrap="wrap"
            >
              {youtubeVideos.map((video, index) => (
                <Box key={video.id} w={{ base: '100%', md: 'auto' }}>
                  <VideoCard
                    video={video}
                    isActive={index === activeIndex}
                    onVideoEnd={handleVideoEnd}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            // Swiper para muitos vídeos
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
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
              }}
              style={{
                paddingBottom: '50px',
                paddingLeft: '10px',
                paddingRight: '10px',
              }}
            >
              {youtubeVideos.map((video, index) => (
                <SwiperSlide key={video.id}>
                  <VideoCard
                    video={video}
                    isActive={index === activeIndex}
                    onVideoEnd={handleVideoEnd}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Box>

        {/* Link para o canal */}
        {/* <Box textAlign="center" mt={8}>
          <Text
            as="a"
            href="https://www.youtube.com/@TodaGenteTelemedicina"
            target="_blank"
            rel="noopener noreferrer"
            color="#FF0000"
            fontWeight="600"
            fontSize={{ base: 'md', md: 'lg' }}
            textDecoration="none"
            transition="all 0.3s"
            _hover={{
              textDecoration: 'underline',
              transform: 'scale(1.05)',
            }}
            display="inline-block"
          >
            Ver mais vídeos no nosso canal →
          </Text>
        </Box> */}
      </Container>
    </Box>
  )
}
