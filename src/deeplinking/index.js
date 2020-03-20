import { Linking } from 'expo'
import * as RootNavigation from '../RootNavigation'
import store from '../store'
import { changeStoreState } from '../store'

const initDeepLinking = () => {

  Linking.addListener('url', async ({ url }) => {
    const { queryParams: { recoveryHash } = {} } = await Linking.parse(url)
    if (recoveryHash) {
      store.dispatch(changeStoreState('CHANGE_AUTH_STATE', { recoveryLinkSent: true }))
      return RootNavigation.navigate('Password Recovery', { recoveryHash })
    }
  })
}

export default initDeepLinking
