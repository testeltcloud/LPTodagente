// Mock de códigos de afiliados
const mockAffiliateCodes = [
  // Códigos COM cupom de desconto
  { code: 'AFILIADO001', hasCoupon: true,  },
  { code: 'AFILIADO002', hasCoupon: true,  },
  { code: 'DESCONTO10', hasCoupon: true,  },
  { code: 'PROMO2024', hasCoupon: true,  },
  { code: 'PARCEIRO01', hasCoupon: true,  },

  // Códigos SEM cupom de desconto
  { code: 'AFILIADO003', hasCoupon: false,  },
  { code: 'AFILIADO004', hasCoupon: false,  },
  { code: 'PARCEIRO02', hasCoupon: false,  },
  { code: 'INDICACAO01', hasCoupon: false,  },
]

export interface AffiliateCodeResponse {
  message: string
  data: {
    hasCoupon: boolean
    affiliateCode: string
    // affiliateName?: string
  }
}

/**
 * Verifica se um código de afiliado existe e se possui cupom de desconto
 * @param code - Código do afiliado
 * @returns Informações sobre o código de afiliado
 */
export async function checkAffiliateCode(code: string): Promise<AffiliateCodeResponse> {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 500))

  const upperCode = code.toUpperCase()
  const affiliate = mockAffiliateCodes.find(a => a.code === upperCode)

  if (!affiliate) {
    return {
      message: 'Código de afiliado inválido',
      data: {
        hasCoupon: false,
        affiliateCode: code
      }
    }
  }

  if (affiliate.hasCoupon) {
    return {
      message: 'Afiliado possui cupom de descontos',
      data: {
        hasCoupon: true,
        affiliateCode: affiliate.code,
        // affiliateName: affiliate.name
      }
    }
  }

  return {
    message: 'Afiliado não possui cupom de descontos',
    data: {
      hasCoupon: false,
      affiliateCode: affiliate.code,
      // affiliateName: affiliate.name
    }
  }
}

/**
 * Extrai o código de afiliado da URL
 * @returns Código de afiliado ou null
 */
export function getAffiliateCodeFromURL(): string | null {
  if (typeof window === 'undefined') return null

  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('code')
}

/**
 * Salva o código de afiliado no localStorage
 * @param code - Código do afiliado
 */
export function saveAffiliateCode(code: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('affiliateCode', code)
}

/**
 * Recupera o código de afiliado do localStorage
 * @returns Código de afiliado ou null
 */
export function getSavedAffiliateCode(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('affiliateCode')
}

/**
 * Remove o código de afiliado do localStorage
 */
export function clearAffiliateCode(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('affiliateCode')
}
