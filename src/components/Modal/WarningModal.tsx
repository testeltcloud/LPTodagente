import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { Dialog } from '@chakra-ui/react'
import { AlertTriangle } from 'lucide-react'

interface WarningModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WarningModal({ isOpen, onClose }: WarningModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} size="md">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Body>
            <VStack gap={4} align="center" py={6}>
              <Box color="orange.500">
                <AlertTriangle size={64} />
              </Box>

              <Text fontSize="xl" fontWeight="700" color="#2e4392" textAlign="center">
                Atenção
              </Text>

              <Text fontSize="md" color="gray.700" textAlign="center">
                É necessário aceitar os Termos de Uso e Política de Privacidade para continuar com a contratação do plano.
              </Text>

              <Button
                onClick={onClose}
                bg="#2e4392"
                color="white"
                w="100%"
                mt={4}
                _hover={{
                  bg: '#1e3382',
                }}
              >
                Entendi
              </Button>
            </VStack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
