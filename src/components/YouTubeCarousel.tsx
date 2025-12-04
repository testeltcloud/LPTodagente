import { Box, Container, Heading } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// @ts-expect-error - Swiper CSS imports
import 'swiper/css'
// @ts-expect-error - Swiper CSS imports
import 'swiper/css/navigation'
// @ts-expect-error - Swiper CSS imports
import 'swiper/css/pagination'

export default function YouTubeCarousel() {
  const videos = [
    { id: '1', embedId: 'dQw4w9WgXcQ', title: 'Vídeo 1' },
    { id: '2', embedId: 'dQw4w9WgXcQ', title: 'Vídeo 2' },
    { id: '3', embedId: 'dQw4w9WgXcQ', title: 'Vídeo 3' },
  ]

  return (
    <Box bg="#f5f5f5" py="120px">
      <Container maxW="1400px" px={{ base: 4, md: 6, lg: 8 }}>
        <Heading
          as="h2"
          fontSize={{ base: '1.75rem', md: '2.5rem' }}
          fontWeight="700"
          color="#2e4392"
          textAlign="center"
          mb={10}
        >
          Depoimentos
        </Heading>

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
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id}>
              <Box
                position="relative"
                paddingBottom="56.25%"
                height={0}
                overflow="hidden"
                borderRadius="15px"
                boxShadow="0 4px 20px rgba(0,0,0,0.1)"
              >
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  )
}
