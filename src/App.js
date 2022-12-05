import React, { useEffect } from 'react'
import { KeyringProvider, useKeyring } from '@w3ui/react-keyring'
import { UploaderProvider } from '@w3ui/react-uploader'
import ContentPage from './ContentPage'
import { accessServiceConnection, accessServicePrincipal, uploadServiceConnection, uploadServicePrincipal } from './StagingService'

function App () {
  return (
    <KeyringProvider servicePrincipal={accessServicePrincipal} connection={accessServiceConnection}>
      <UploaderProvider servicePrincipal={uploadServicePrincipal} connection={uploadServiceConnection}>
        <AgentLoader>
          <ContentPage></ContentPage>
        </AgentLoader>
      </UploaderProvider>
    </KeyringProvider>
  )
}

function AgentLoader ({ children }) {
  const [, { loadAgent }] = useKeyring()
  // eslint-disable-next-line
  useEffect(() => { loadAgent() }, []) // load agent - once.
  return children
}

export default App
