import { useState, useCallback, useEffect, useMemo } from 'react'
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Input,
  Image,
  Flex,
} from '@chakra-ui/react'
import { Dialog } from '@chakra-ui/react'
import { Check, Lock, X } from 'lucide-react'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import type { ClinicPlan } from '../types/plan.types'
import { checkUserExists, CreateUser, createSession } from '../services/authService'
import { toaster } from '../components/ui/toaster'
import TermsModal from './Modal/TermsModal'
import WarningModal from './Modal/WarningModal'
import axios from 'axios'
import { getAffiliateCodeFromURL, getSavedAffiliateCode, saveAffiliateCode, checkAffiliateCode, type AffiliateCodeResponse } from '../services/affiliateCode.service'

interface FormData {
  fullName: string
  nif: string
  phone: string
  email: string
}

interface FormErrors {
  fullName?: string
  nif?: string
  phone?: string
  email?: string
}

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan: ClinicPlan | null
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Validação de NIF português
const validateNIF = (nif: string): boolean => {
  if (nif.length !== 9 || !/^\d+$/.test(nif)) return false

  const checkDigit = parseInt(nif.charAt(8))
  let sum = 0

  for (let i = 0; i < 8; i++) {
    sum += parseInt(nif.charAt(i)) * (9 - i)
  }

  const mod = sum % 11
  const expectedCheckDigit = mod < 2 ? 0 : 11 - mod

  return checkDigit === expectedCheckDigit
}

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY ;

export default function PurchaseModal({ isOpen, onClose, selectedPlan }: PurchaseModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    nif: '',
    phone: '',
    email: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [validationStates, setValidationStates] = useState({
    isCheckingNif: false,
    isCheckingEmail: false,
    nifChecked: false,
    emailChecked: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastValidatedEmail, setLastValidatedEmail] = useState('')

const [showTermsModal, setShowTermsModal] = useState(false);
const [showWarningModal, setShowWarningModal] = useState(false);
const [termsAccepted, setTermsAccepted] = useState(false);
const [userIpAddress, setUserIpAddress] = useState<string>('');
const [isSuccessCheck, setIsSuccessCheck] = useState(false);
const [termsWereAccepted, setTermsWereAccepted] = useState(false);

  // Estados para código de afiliado
  const [affiliateData, setAffiliateData] = useState<AffiliateCodeResponse | null>(null);
  const [isCheckingAffiliate, setIsCheckingAffiliate] = useState(false);

  const handleFullNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, fullName: value }))

    const nameParts = value.trim().split(/\s+/).filter(part => part.length > 0)

    if (value.trim() === '') {
      setErrors((prev) => ({ ...prev, fullName: undefined }))
    } else if (nameParts.length < 2) {
      setErrors((prev) => ({ ...prev, fullName: 'Digite nome e sobrenome' }))
    } else if (nameParts.some(part => part.length < 2)) {
      setErrors((prev) => ({ ...prev, fullName: 'Digite nome e sobrenome' }))
    } else {
      setErrors((prev) => ({ ...prev, fullName: undefined }))
    }
  }, [])

  const handleNifChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 9)
    setFormData((prev) => ({ ...prev, nif: value }))
    setValidationStates((prev) => ({ ...prev, nifChecked: false }))

    if (value.length === 9) {
      const isValidNif = validateNIF(value)
      if (!isValidNif) {
        setErrors((prev) => ({ ...prev, nif: 'NIF inválido' }))
      } else {
        setErrors((prev) => ({ ...prev, nif: undefined }))
      }
    } else if (value.length > 0) {
      setErrors((prev) => ({ ...prev, nif: 'NIF deve conter 9 dígitos' }))
    } else {
      setErrors((prev) => ({ ...prev, nif: undefined }))
    }
  }, [])
  const validateNifAvailability = useCallback(async () => {
    if (!formData.nif.trim()) {
      setValidationStates((prev) => ({ ...prev, nifChecked: false }))
      return
    }

    if (formData.nif.length !== 9 || !validateNIF(formData.nif)) {
      setValidationStates((prev) => ({ ...prev, nifChecked: false }))
      return
    }

    setValidationStates((prev) => ({ ...prev, isCheckingNif: true }))

    try {
      await checkUserExists({ nif: formData.nif })
      setErrors((prev) => ({ ...prev, nif: undefined }))
      setValidationStates((prev) => ({ ...prev, nifChecked: true }))
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } }
      const msg = error?.response?.data?.message || 'NIF já cadastrado'
      setErrors((prev) => ({ ...prev, nif: msg }))
      setValidationStates((prev) => ({ ...prev, nifChecked: false }))
    } finally {
      setValidationStates((prev) => ({ ...prev, isCheckingNif: false }))
    }
  }, [formData.nif])
  const handlePhoneChange = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }))
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }))
    }
  }, [errors.phone])

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, email: value }))
    setValidationStates((prev) => ({ ...prev, emailChecked: false }))

    if (value.trim() === '') {
      setErrors((prev) => ({ ...prev, email: undefined }))
    } else if (!EMAIL_REGEX.test(value)) {
      setErrors((prev) => ({ ...prev, email: 'Formato de email inválido' }))
    } else {
      setErrors((prev) => ({ ...prev, email: undefined }))
    }
  }, [])
  const validateEmailAvailability = useCallback(async () => {
  if (!formData.email.trim()) {
    setValidationStates((prev) => ({ ...prev, emailChecked: false }))
    return
  }

  if (!EMAIL_REGEX.test(formData.email)) {
    setErrors((prev) => ({ ...prev, email: 'Formato de email inválido' }))
    setValidationStates((prev) => ({ ...prev, emailChecked: false }))
    return
  }

  setValidationStates((prev) => ({ ...prev, isCheckingEmail: true }))

  try {
    await checkUserExists({ email: formData.email })
    setErrors((prev) => ({ ...prev, email: undefined }))
    setValidationStates((prev) => ({ ...prev, emailChecked: true }))
    setLastValidatedEmail(formData.email)
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } }
    const msg = error?.response?.data?.message || 'Email já cadastrado'
    setErrors((prev) => ({ ...prev, email: msg }))
    setValidationStates((prev) => ({ ...prev, emailChecked: false }))
  } finally {
    setValidationStates((prev) => ({ ...prev, isCheckingEmail: false }))
  }
}, [formData.email])

  // Verifica código de afiliado quando o modal abre
  useEffect(() => {
    if (!isOpen) return

    const checkAffiliate = async () => {
      // Primeiro verifica se há código na URL
      const urlCode = getAffiliateCodeFromURL()

      if (urlCode) {
        // Salva o código no localStorage
        saveAffiliateCode(urlCode)
        setIsCheckingAffiliate(true)

        try {
          const response = await checkAffiliateCode(urlCode)
          setAffiliateData(response)

          if (response.data.hasCoupon) {
            toaster.create({
              title: 'Cupom de Desconto Aplicado!',
              description: `Código de afiliado ${response.data.affiliateCode} possui desconto.`,
              type: 'success',
              duration: 5000,
            })
          }
        } catch (error) {
          console.error('Erro ao verificar código de afiliado:', error)
        } finally {
          setIsCheckingAffiliate(false)
        }
        return
      }

      // Se não houver código na URL, verifica no localStorage
      const savedCode = getSavedAffiliateCode()
      if (savedCode) {
        setIsCheckingAffiliate(true)

        try {
          const response = await checkAffiliateCode(savedCode)
          setAffiliateData(response)
        } catch (error) {
          console.error('Erro ao verificar código de afiliado salvo:', error)
        } finally {
          setIsCheckingAffiliate(false)
        }
      }
    }

    checkAffiliate()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const commonExtensions = ['.com', '.br', '.pt', '.org', '.net', '.gov', '.edu', '.co', '.uk', '.io']

    const endsWithCommonExtension = commonExtensions.some(ext => formData.email.endsWith(ext))

    if (endsWithCommonExtension && EMAIL_REGEX.test(formData.email) && !validationStates.emailChecked && !validationStates.isCheckingEmail && !errors.email && !isSubmitting) {
      const timer = setTimeout(() => {
        validateEmailAvailability()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen, formData.email, validationStates.emailChecked, validationStates.isCheckingEmail, validateEmailAvailability, errors.email, isSubmitting])

  const validateFields = useCallback((): boolean => {
    const newErrors: FormErrors = {}
    const { fullName, nif, phone, email } = formData


    const nameParts = fullName.trim().split(/\s+/).filter(part => part.length > 0)
    if (!fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório'
    } else if (nameParts.length < 2) {
      newErrors.fullName = 'Digite nome e sobrenome'
    } else if (nameParts.some(part => part.length < 2)) {
      newErrors.fullName = 'Nome e sobrenome devem ter pelo menos 2 caracteres'
    }

    if (!nif.trim()) {
      newErrors.nif = 'NIF é obrigatório'
    } else if (nif.length !== 9) {
      newErrors.nif = 'NIF deve ter 9 dígitos'
    } else if (!validateNIF(nif)) {
      newErrors.nif = 'NIF inválido'
    }

    const phoneNumber = parsePhoneNumberFromString(`+${phone}`)
    if (!phone.trim()) {
      newErrors.phone = 'Telemóvel é obrigatório'
    } else if (!phoneNumber || !phoneNumber.isValid()) {
      newErrors.phone = 'Número inválido'
    }

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = 'Email inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])


  const isFormValid = useMemo(() => {
    return (
      !validationStates.isCheckingNif &&
      !validationStates.isCheckingEmail &&
      validationStates.nifChecked &&
      validationStates.emailChecked &&
      !errors.fullName &&
      !errors.nif &&
      !errors.phone &&
      !errors.email &&
      formData.fullName.trim() &&
      formData.nif.trim() &&
      formData.phone.trim() &&
      formData.email.trim()
    )
  }, [validationStates, errors, formData])

 const handleSubmit = useCallback(async () => {
  if (!validateFields()) {
    toaster.create({
      title: 'Erro',
      description: 'Preencha todos os campos corretamente',
      type: 'error',
    })
    return
  }

  if (!validationStates.nifChecked || !validationStates.emailChecked) {
    toaster.create({
      title: 'Aguarde',
      description: 'Validando NIF e Email...',
      type: 'info',
    })
    return
  }

  if (!termsAccepted || !userIpAddress) {
    setShowTermsModal(true);
    return;
  }

  setIsSubmitting(true)

  try {
    const userData = {
      name: formData.fullName.trim(),
      nif: formData.nif,
      email: formData.email.trim(),
      phone: formData.phone.replace(/\D/g, ''),
      plan_id: Number(selectedPlan?.plan?.id) || 0,
      dataTerms: {
        ipAddress: userIpAddress,
        acceptedTerms: true
      }
    }

    toaster.create({
      title: 'Processando',
      description: 'Redirecionando para pagamento...',
      type: 'success',
    })

    await CreateUser(userData)

  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } }
    const errorMessage = error?.response?.data?.message || 'Erro ao processar'
    toaster.create({
      title: 'Erro',
      description: errorMessage,
      type: 'error',
    })
    setIsSubmitting(false)
  }
}, [formData, validateFields, validationStates, selectedPlan, termsAccepted, userIpAddress])

const handleAcceptTerms = useCallback(async () => {
  setIsSubmitting(true);
  setIsSuccessCheck(false);

  try {
    const { data } = await axios.get('https://api.ipify.org/?format=json');

    const ipAddress = data?.ip || '';

    const userData = {
      name: formData.fullName.trim(),
      nif: formData.nif,
      email: formData.email.trim(),
      phone: formData.phone.replace(/\D/g, ''),
      plan_id: Number(selectedPlan?.plan?.id) || 0,
      dataTerms: {
        ipAddress: ipAddress,
        acceptedTerms: true
      }
    }

    const response = await CreateUser(userData)

    if (response?.data?.order) {
      const { holderId, idOrder } = response.data.order;

      if (!holderId || !idOrder) {
        throw new Error('ID do pedido ou usuário não foi retornado');
      }

      setUserIpAddress(ipAddress);
      setTermsAccepted(true);
      setIsSuccessCheck(true);

      toaster.create({
        title: 'Usuário criado!',
        description: 'Redirecionando para pagamento...',
        type: 'success',
      });

      setTimeout(async () => {
        try {
          const externalId = selectedPlan?.plan?.external_id || '';

          if (!externalId) {
            throw new Error('ID do plano (external_id) não encontrado. Verifique a configuração do plano.');
          }

          const session = await createSession({
            plan: externalId,
            holderId: holderId.toString(),
            idOrder: idOrder.toString(),
            ...(affiliateData?.data?.affiliateCode && {
              affiliateCode: affiliateData.data.affiliateCode
            })
          });

          if (session?.data?.sessionId) {
            const checkoutUrl = session.data.url || `https://checkout.stripe.com/c/pay/${session.data.sessionId}`;
            window.open(checkoutUrl, '_blank');
            onClose();
          } else {
            throw new Error('Sessão Stripe não retornou sessionId');
          }
        } catch (stripeError) {
          console.error('Erro no processo de pagamento:', stripeError);

          const error = stripeError as { response?: { data?: { error?: string; message?: string } }; message?: string }
          const errorMsg = error?.response?.data?.error ||
                          error?.response?.data?.message ||
                          error?.message ||
                          'Erro ao processar pagamento';

          toaster.create({
            title: 'Erro ao criar sessão de pagamento',
            description: errorMsg,
            type: 'error',
            duration: 5000,
          });

          setIsSubmitting(false);
          setIsSuccessCheck(false);
          setTermsAccepted(false);
          setUserIpAddress('');
          setTermsWereAccepted(false);
          setShowTermsModal(false);
        }
      }, 1000);

      setTermsWereAccepted(true);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Erro ao limpar dados salvos:', error);
      }
      setShowTermsModal(false);
    } else {
      throw new Error('Erro ao criar usuário. Resposta inválida.');
    }

  } catch (error) {
    console.error('Erro ao processar:', error);
    const err = error as { response?: { data?: { message?: string } }; message?: string }
    const errorMessage = err?.response?.data?.message || err?.message || 'Erro ao processar cadastro'

    toaster.create({
      title: 'Erro',
      description: errorMessage,
      type: 'error',
    });

    setIsSubmitting(false);
    setIsSuccessCheck(false);
    setTermsAccepted(false);
    setUserIpAddress('');
    setTermsWereAccepted(false);
    setShowTermsModal(false);
  }
}, [formData, selectedPlan, onClose, affiliateData]);

const handleRejectTerms = () => {
  if (!termsWereAccepted) {
    setShowWarningModal(true);
  }
  setShowTermsModal(false);
};

useEffect(() => {
  if (!isOpen) {
    localStorage.removeItem(STORAGE_KEY)

    setFormData({
      fullName: '',
      nif: '',
      phone: '',
      email: ''
    })

    setErrors({})
    setValidationStates({
      isCheckingNif: false,
      isCheckingEmail: false,
      nifChecked: false,
      emailChecked: false,
    })
    setTermsAccepted(false)
    setShowTermsModal(false)
    setShowWarningModal(false)
    setUserIpAddress('')
    setIsSubmitting(false)
    setTermsWereAccepted(false)
    setAffiliateData(null)
    setIsCheckingAffiliate(false)
  }
}, [isOpen])

  if (!selectedPlan) return null

  return (
    <>
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} size="xl">
      <Dialog.Backdrop />
      <Dialog.Positioner
        position="fixed"
        top={{ base: 0, md: '50%' }}
        left={{ base: 0, md: '50%' }}
        right={{ base: 0, md: 'auto' }}
        bottom={{ base: 0, md: 'auto' }}
        transform={{ base: 'none', md: 'translate(-50%, -50%)' }}
        w={{ base: '100vw', md: 'auto' }}
        h={{ base: '100vh', md: 'auto' }}
        zIndex={1400}
        p={0}
        m={0}
        display={{ base: 'block', md: 'flex' }}
        alignItems={{ base: 'flex-start', md: 'center' }}
        justifyContent={{ base: 'flex-start', md: 'center' }}
      >
        <Dialog.Content
          h={{ base: '100vh', md: 'fit-content' }}
          maxH={{ base: '100vh', md: '95vh' }}
          minH={{ base: '100vh', md: 'auto' }}
          w={{ base: '100vw', md: '700px' }}
          maxW={{ base: '100vw', md: '700px' }}
          borderRadius={{ base: 0, md: '12px' }}
          overflowY="hidden"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
        >
          <Dialog.Header
            py={5}
            px={6}
            borderBottom="1px solid"
            borderColor="gray.200"
            flexShrink={0}
          >
            <Flex justify="space-between" align="center" w="100%" gap={4}>
              <Box>
                <Image
                  src="https://api.todagentesaude.com/images/todagente/clinic/clinicLogo1729186149170.png"
                  alt="Logo"
                  h="60px"
                  w="auto"
                />
              </Box>
              <Box textAlign="center" flex="1">
                <Text fontSize="md" fontWeight="700" color="#2e4392" mb={1}>
                  {selectedPlan.plan.description}
                </Text>
                <Text fontSize="2xl" fontWeight="800" color="#2e4392">
                  € {selectedPlan.plan.price.toFixed(2)} /{' '}
                  {selectedPlan.plan.cycle === 'anual' ? 'ano' : 'mês'}
                </Text>
              </Box>
            </Flex>
          </Dialog.Header>

          <Dialog.CloseTrigger asChild position="absolute" top={5} right={5}>
            <Button variant="ghost" size="md" p={2}>
              <X size={24} />
            </Button>
          </Dialog.CloseTrigger>
          <Dialog.Body
            py={6}
            px={6}
            flex="1"
            overflowY="auto"
          >
            <VStack gap={5} align="stretch">
              {/* Código de Afiliado */}
              {affiliateData?.data?.hasCoupon && (
                <Box
                  bg={affiliateData?.data?.hasCoupon ? 'green.50' : 'blue.50'}
                  borderWidth="2px"
                  borderColor={affiliateData?.data?.hasCoupon ? 'green.400' : 'blue.400'}
                  borderRadius="8px"
                  p={4}
                >
                  <HStack gap={3} align="flex-start">
                    {/* <Box
                      as="span"
                      fontSize="2xl"
                      color={affiliateData.data.hasCoupon ? 'green.600' : 'blue.600'}
                    >
                      {affiliateData.data.hasCoupon ? '🎉' : 'ℹ️'}
                    </Box> */}
                    <VStack align="flex-start" gap={1} flex={1}>
                      <Text
                        fontSize="md"
                        fontWeight="700"
                        color={affiliateData.data.hasCoupon ? 'green.700' : 'blue.700'}
                      >
                        {affiliateData.data.hasCoupon
                          ? 'Cupom de Desconto Aplicado!'
                          : 'Código de Afiliado'}
                      </Text>
                      <Text fontSize="sm" color="gray.700">
                        Código: <Text as="span" fontWeight="600">{affiliateData.data.affiliateCode}</Text>
                        {affiliateData.data.affiliateName && (
                          <> • Afiliado: {affiliateData.data.affiliateName}</>
                        )}
                      </Text>
                      {affiliateData.data.hasCoupon && (
                        <Text fontSize="xs" color="green.600" fontWeight="500">
                          O desconto será aplicado automaticamente no pagamento
                        </Text>
                      )}
                    </VStack>
                  </HStack>
                </Box>
              )}

              {/* Loading do código de afiliado */}
              {isCheckingAffiliate && (
                <Box
                  bg="gray.50"
                  borderWidth="2px"
                  borderColor="gray.300"
                  borderRadius="8px"
                  p={4}
                  textAlign="center"
                >
                  <Text fontSize="sm" color="gray.600">
                    Verificando código de afiliado...
                  </Text>
                </Box>
              )}

              <Box>
                <Text fontSize="md" fontWeight="700" mb={2.5} color="gray.700">
                  Nome Completo *
                </Text>
                <Input
                  disabled={isSubmitting}
                  value={formData.fullName}
                  onChange={handleFullNameChange}
                  placeholder="Ex: João Silva"
                  borderWidth="2px"
                  borderStyle="solid"
                  borderColor={errors.fullName ? 'red.500' : 'gray.300'}
                  size="lg"
                  h="50px"
                  fontSize="md"
                  borderRadius="8px"
                  px={4}
                  _focus={{
                    borderColor: '#2e4392',
                    borderWidth: '2px',
                    boxShadow: '0 0 0 1px #2e4392',
                  }}
                  _hover={{
                    borderColor: errors.fullName ? 'red.600' : 'gray.400',
                  }}
                />
                {errors.fullName && (
                  <Text color="red.500" fontSize="sm" mt={2}>
                    {errors.fullName}
                  </Text>
                )}
              </Box>

              <Box>
                <Text fontSize="md" fontWeight="700" mb={2.5} color="gray.700">
                  NIF (9 dígitos) *
                </Text>
                <Input
                  value={formData.nif}
                  onChange={handleNifChange}
                  disabled={isSubmitting}
                  onBlur={() => {
                    if (formData.nif.length === 9 && validateNIF(formData.nif)) {
                      validateNifAvailability()
                    }
                  }}
                  maxLength={9}
                  placeholder="123456789"
                  borderWidth="2px"
                  borderStyle="solid"
                  borderColor={errors.nif ? 'red.500' : 'gray.300'}
                  size="lg"
                  h="50px"
                  fontSize="md"
                  borderRadius="8px"
                  px={4}
                  _focus={{
                    borderColor: '#2e4392',
                    borderWidth: '2px',
                    boxShadow: '0 0 0 1px #2e4392',
                  }}
                  _hover={{
                    borderColor: errors.nif ? 'red.600' : 'gray.400',
                  }}
                />
                {validationStates.isCheckingNif ? (
                  <Text color="blue.500" fontSize="sm" mt={2}>
                    Verificando NIF...
                  </Text>
                ) : errors.nif ? (
                  <Text color="red.500" fontSize="sm" mt={2}>
                    {errors.nif}
                  </Text>
                ) : validationStates.nifChecked ? (
                  <HStack gap={2} mt={2}>
                    <Check size={16} color="green" />
                    <Text color="green.500" fontSize="sm" fontWeight="600">
                      NIF válido e disponível
                    </Text>
                  </HStack>
                ) : null}
              </Box>

              <Box>
                <Text fontSize="md" fontWeight="700" mb={2.5} color="gray.700">
                  Telemóvel *
                </Text>
                <PhoneInput
                  country="pt"
                  value={formData.phone}
                  disabled={isSubmitting}
                  onChange={handlePhoneChange}
                  preferredCountries={['pt', 'br', 'es']}
                  enableSearch
                  inputStyle={{
                    width: '100%',
                    height: '50px',
                    fontSize: '16px',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: errors.phone ? '#E53E3E' : '#CBD5E0',
                    borderRadius: '8px',
                    // paddingLeft: '16px',
                    paddingRight: '16px',
                  }}
                  buttonStyle={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: errors.phone ? '#E53E3E' : '#CBD5E0',
                    borderRadius: '8px 0 0 8px',
                  }}
                />
                {errors.phone && (
                  <Text color="red.500" fontSize="sm" mt={2}>
                    {errors.phone}
                  </Text>
                )}
              </Box>

              <Box>
                <Text fontSize="md" fontWeight="700" mb={2.5} color="gray.700">
                  Email *
                </Text>
                <Input
                    type="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    disabled={isSubmitting}
                    onBlur={() => {
                      if (formData.email !== lastValidatedEmail) {
                        validateEmailAvailability()
                      }
                    }}
                    placeholder="seu@email.com"
                    borderWidth="2px"
                    borderStyle="solid"
                    borderColor={errors.email ? 'red.500' : 'gray.300'}
                    size="lg"
                    h="50px"
                    fontSize="md"
                    borderRadius="8px"
                    px={4}
                    _focus={{
                      borderColor: '#2e4392',
                      borderWidth: '2px',
                      boxShadow: '0 0 0 1px #2e4392',
                    }}
                    _hover={{
                      borderColor: errors.email ? 'red.600' : 'gray.400',
                    }}
                  />
                {validationStates.isCheckingEmail ? (
                  <Text color="blue.500" fontSize="sm" mt={2}>
                    Verificando Email...
                  </Text>
                ) : errors.email ? (
                  <Text color="red.500" fontSize="sm" mt={2}>
                    {errors.email}
                  </Text>
                ) : validationStates.emailChecked ? (
                  <HStack gap={2} mt={2}>
                    <Check size={16} color="green" />
                    <Text color="green.500" fontSize="sm" fontWeight="600">
                      Email disponível
                    </Text>
                  </HStack>
                ) : null}
              </Box>
            </VStack>
          </Dialog.Body>

          <Dialog.Footer
            flexDirection="column"
            gap={3}
            py={{ base: 3, md: 5 }}
            pb={{ base: 'calc(1rem + env(safe-area-inset-bottom))', md: 5 }}
            px={6}
            borderTop="1px solid"
            borderColor="gray.200"
            flexShrink={0}
          >
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              loading={isSubmitting}
              bg="#2e4392"
              color="white"
              w="100%"
              h="56px"
              fontSize="lg"
              fontWeight="700"
              borderRadius="12px"
              _hover={{
                bg: '#1e3382',
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              _disabled={{
                bg: 'gray.400',
                cursor: 'not-allowed',
              }}
              transition="all 0.2s"
            >
              {isSuccessCheck ? '✓ Validado com Sucesso!' : isSubmitting ? 'Processando...' : 'Prosseguir para Pagamento'}
            </Button>

            <HStack gap={2} justify="center" py={2}>
              <Lock size={16} color="#666" />
              <Text fontSize="sm" color="gray.600" fontWeight="500">
                Pagamento Seguro - Todagente Telemedicina
              </Text>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
    <TermsModal
      isOpen={showTermsModal}
      onClose={handleRejectTerms}
      onAccept={handleAcceptTerms}
      isProcessing={isSubmitting}
    />

    <WarningModal
      isOpen={showWarningModal}
      onClose={() => setShowWarningModal(false)}
    />
    </>
  )
}
