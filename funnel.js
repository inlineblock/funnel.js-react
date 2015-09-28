import React, { Component, PropTypes } from "react";

export default class Funnel extends Component {

  constructor () {
    super(...arguments);
  }

  componentDidMount () {
    this.setState({
      height: React.findDOMNode(this).offsetHeight
    });
  }

  render () {
    var size = this.props.data.length;
    var max = this.props.data[0].value;
    return (
      <div className="funnel">
        { this.props.data.map((datum, i) => {
          var prev = this.props.data[i-1];
          return this.renderVisualization(datum, prev, max); 
        }) }
      </div>
    );
  }

  renderVisualization (datum, previous, maxValue) {
    if (!this.state || !this.state.height) {
      return null;
    }
    var originalHeight = this.calculateHeightForDatum(datum, maxValue);
    var height = originalHeight;
    var borderSize = '0';
    if (previous) {
      height = this.calculateHeightForDatum(previous, maxValue);
      borderSize = (height - originalHeight) / 2;
    }
    return (
      <div key={ datum.label } style={ this.renderPieceStyle(height, borderSize) } className="funnel-piece">
        <div className="funnel-piece-label">{ datum.label }</div>
      </div>
    );
  }

  renderPieceStyle (height, borderSize) {
    return {
      height: `${height}px`,
      borderTopWidth: `${borderSize}px`,
      borderBottomWidth: `${borderSize}px`
    };
  }

  calculateHeightForDatum (datum, maxValue) {
    var scale = datum.value / maxValue;
    return scale * this.state.height;
  }

};
Funnel.propTypes = {
  data: PropTypes.array.isRequired
};
