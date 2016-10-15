import React from 'react';


class Modal extends React.Component {
  openModal() {
    $(this.refs.modal).modal();
  }

  render() {
    return (
      <div className="modal"
           tabIndex="-1"
           data-backdrop="static"
           ref="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{border: 0}}>
              <button type="button"
                      className="close"
                      style={{margin: '5px 15px 0 0'}}
                      data-dismiss="modal">
                      &times;
              </button>
            </div>
            <div className="modal-body"
                 style={{paddingTop: 0, margin: 25}}>
              <div className="row content">
                {this.props.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
