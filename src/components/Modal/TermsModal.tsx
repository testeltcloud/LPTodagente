import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { Dialog } from '@chakra-ui/react'
import { Check, X } from 'lucide-react'

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
  isProcessing: boolean
}

export default function TermsModal({ isOpen, onClose, onAccept, isProcessing }: TermsModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} size="lg">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxH="90vh">
          <Dialog.Header>
            <Text fontSize="xl" fontWeight="700" color="#2e4392">
              Termos de Uso e Política de Privacidade
            </Text>
          </Dialog.Header>

          <Dialog.CloseTrigger asChild position="absolute" top={4} right={4}>
            <Button variant="ghost" size="sm" disabled={isProcessing}>
              <X size={20} />
            </Button>
          </Dialog.CloseTrigger>

          <Dialog.Body overflowY="auto">
            <VStack gap={4} align="stretch">
              <Box>
                <Text fontSize="md" fontWeight="600" mb={2}>
                  1. Aceitação dos Termos
                </Text>
                <Text fontSize="sm" color="gray.700">
                  Ao utilizar nossos serviços, você concorda em cumprir e estar vinculado aos seguintes termos e condições.
                </Text>
              </Box>

              <Box>
                <Text fontSize="md" fontWeight="600" mb={2}>
                  2. Uso do Serviço
                </Text>
                <Text fontSize="sm" color="gray.700">
                  Nossos serviços de telemedicina são fornecidos por profissionais de saúde licenciados. Você concorda em fornecer informações precisas e completas.
                </Text>
              </Box>

              <Box>
                <Text fontSize="md" fontWeight="600" mb={2}>
                  3. Privacidade e Proteção de Dados
                </Text>
                <Text fontSize="sm" color="gray.700">
                  Seus dados pessoais e de saúde são tratados com confidencialidade e em conformidade com o RGPD (Regulamento Geral de Proteção de Dados).
                </Text>
              </Box>

              <Box>
                <Text fontSize="md" fontWeight="600" mb={2}>
                  4. Responsabilidades
                </Text>
                <Text fontSize="sm" color="gray.700">
                  Você é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta.
                </Text>
              </Box>

              <Box>
                <Text fontSize="md" fontWeight="600" mb={2}>
                  5. Cancelamento
                </Text>
                <Text fontSize="sm" color="gray.700">
                  Você pode cancelar seu plano a qualquer momento, sujeito aos termos de fidelidade acordados.
                </Text>
              </Box>

              <Box bg="blue.50" p={4} borderRadius="md" mt={4}>
                <Text fontSize="sm" fontWeight="600" color="#2e4392">
                  Ao clicar em "Aceitar e Continuar", você confirma que leu e concorda com nossos Termos de Uso e Política de Privacidade.
                </Text>
              </Box>
            </VStack>
          </Dialog.Body>

          <Dialog.Footer gap={3}>
            <Button
              onClick={onClose}
              variant="outline"
              colorScheme="gray"
              disabled={isProcessing}
            >
              Rejeitar
            </Button>
            <Button
              onClick={onAccept}
              bg="#2e4392"
              color="white"
              loading={isProcessing}
              disabled={isProcessing}
              _hover={{
                bg: '#1e3382',
              }}
            >
              <Check size={16} style={{ marginRight: '8px' }} />
              Aceitar e Continuar
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
