import type { SanitizedPermissions, TypedUser } from '../../index.js'
import type { PayloadRequest } from '../../types/index.js'

import { killTransaction } from '../../utilities/killTransaction.js'
import { executeAuthStrategies } from '../executeAuthStrategies.js'
import { getAccessResults } from '../getAccessResults.js'

export type AuthArgs = {
  /**
   * Specify if it's possible for auth strategies to set headers within this operation.
   */
  canSetHeaders?: boolean
  fallbackLocale?: string
  headers: Request['headers']
  locale?: string
  req?: Omit<PayloadRequest, 'user'>
}

export type AuthResult = {
  permissions: SanitizedPermissions
  responseHeaders?: Headers
  user: null | TypedUser
}

export const auth = async (args: Required<AuthArgs>): Promise<AuthResult> => {
  const { canSetHeaders, fallbackLocale: fallbackLocaleArg, headers, locale: localeArg } = args
  const req = args.req as PayloadRequest
  const { payload } = req

  try {
    const { responseHeaders, user } = await executeAuthStrategies({
      canSetHeaders,
      fallbackLocale: (fallbackLocaleArg ?? req.fallbackLocale) as string | undefined,
      headers,
      locale: (localeArg ?? req.locale) as string | undefined,
      payload,
    })

    req.user = user
    req.responseHeaders = responseHeaders

    const permissions = await getAccessResults({
      req,
    })

    return {
      permissions,
      responseHeaders,
      user,
    }
  } catch (error: unknown) {
    await killTransaction(req)
    throw error
  }
}
