import { createToaster, Toaster as ChakraToaster, Toast } from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'top',
  duration: 4000,
})

export const Toaster = () => (
  <ChakraToaster toaster={toaster}>
    {(toast) => <Toast.Root key={toast.id}>{toast.title}</Toast.Root>}
  </ChakraToaster>
)
