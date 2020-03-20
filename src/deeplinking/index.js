import { Linking } from 'expo'
import * as RootNavigation from '../RootNavigation'
import store from '../store'
import { changeStoreState } from '../store'

const initDeepLinking = () => {
  Linking.getInitialURL()
    .then(url => {
      const { queryParams: { recoveryHash } } = Linking.parse(url)
      if (recoveryHash) {
        store.dispatch(changeStoreState('CHANGE_AUTH_STATE', { recoveryLinkSent: true }))
        return RootNavigation.navigate('Password Recovery', { recoveryHash })
      }
    })
    .catch(err => {
      console.warn('Deeplinking error', err)
    })

  Linking.addListener('url', async ({ url }) => {
    const { queryParams: { recoveryHash } } = await Linking.parse(url)
    if (recoveryHash) {
      store.dispatch(changeStoreState('CHANGE_AUTH_STATE', { recoveryLinkSent: true }))
      return RootNavigation.navigate('Password Recovery', { recoveryHash })
    }
  })
}

export default initDeepLinking
