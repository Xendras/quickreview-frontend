import React from 'react'
import { InlineMath, BlockMath } from 'react-katex'
import { Modal, Button } from 'semantic-ui-react'

  class ErrorModal extends React.Component {
    render() {
      const state = this.props.store.getState()
      return (
        <Modal open={state.errorModal}>
          <Modal.Content>
            {state.error}
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => this.props.store.dispatch({ type: 'CLEAR_ERROR' })}>Close</Button>
          </Modal.Actions>
        </Modal>
      )
    }
  }

export default ErrorModal