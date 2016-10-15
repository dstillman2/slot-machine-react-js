import React from 'react';


class Element extends React.Component {
  render() {
    return (
      <div data-id={this.props.id}
           ref={c => this.element = c}
           className="element text-center"
           style={{ backgroundColor: this.props.backgroundColor,
                    color: this.props.color }}>
        {this.props.name}
      </div>
    );
  }
}

export default Element;
