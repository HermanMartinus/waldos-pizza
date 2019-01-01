import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { selectSize } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    selectSizeDispatch: size => {
      dispatch(selectSize(size))
    }
  }
}

const Pizza = ({ sizes, selectSizeDispatch }) => (
  <div>
    <h2>Base size:</h2>
    <div className="content">
      {sizes.map(size => {
        return (
          <button className="ui button primary"
            onClick={() => selectSizeDispatch(size)}
            key={size.name}
          >
            {size.name}
          </button>
        )
      })}
    </div>
  </div>
)

// Add proptype validation

export default connect(null, mapDispatchToProps)(Pizza)
