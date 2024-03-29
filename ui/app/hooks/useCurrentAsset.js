import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { getTokens } from '../ducks/metamask/metamask'
import { ASSET_ROUTE } from '../helpers/constants/routes'

/**
 * Returns a token object for the asset that is currently being viewed.
 * Will return the ETH_SWAPS_TOKEN_OBJECT when the user is viewing either
 * the primary, unfiltered, activity list or the ETH asset page.
 * @returns {import('./useTokenDisplayValue').Token}
 */
export function useCurrentAsset () {
  // To determine which primary currency to display for swaps transactions we need to be aware
  // of which asset, if any, we are viewing at present
  const match = useRouteMatch({ path: `${ASSET_ROUTE}/:asset`, exact: true, strict: true })
  const tokenAddress = match?.params?.asset
  const knownTokens = useSelector(getTokens)
  const token = tokenAddress && knownTokens.find(
    ({ address }) => address === tokenAddress,
  )

  return token ?? ETH_SWAPS_TOKEN_OBJECT
}
