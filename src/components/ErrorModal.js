import React from 'react'
import { InlineMath, BlockMath } from 'react-katex'
import { Modal, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { clearError } from '../reducers/errorReducer'

class ErrorModal extends React.Component {
  render() {
    return (
      <Modal open={this.props.errorModal}>
        <Modal.Content>
          {this.props.error}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.props.clearError()}>Close</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errorModal: state.errors.errorModal,
    error: state.errors.error
  }
}

const mapDispatchToProps = {
  clearError
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal)