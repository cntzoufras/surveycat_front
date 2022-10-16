import React from 'react';
import Tooltip from 'rc-tooltip';
import RCSlider from 'rc-slider';
import PropTypes from 'prop-types';
import { SliderMax, SliderMin, SliderWrap } from '@/shared/components/range_slider/SliderElements';

import 'rc-slider/assets/index.css';

const { Handle } = RCSlider;

const handle = ({ value, index, ...restProps }) => (
  <Tooltip
    prefixCls="rc-slider-tooltip"
    overlay={value}
    visible
    placement="top"
    key={index}
  >
    <Handle value={value} {...restProps} dragging={undefined} />
  </Tooltip>
);

handle.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

const Slider = ({
  marks, value, min, max, tipFormatter,
}) => (
  <SliderWrap>
    <SliderMin>
      <p>{tipFormatter ? tipFormatter(min) : min}</p>
    </SliderMin>
    <SliderMax>
      <p>{tipFormatter ? tipFormatter(max) : max}</p>
    </SliderMax>
    <RCSlider
      min={min}
      max={max}
      defaultValue={value}
      handle={handle}
      marks={marks}
      tipFormatter={tipFormatter}
    />
  </SliderWrap>
);

Slider.propTypes = {
  marks: PropTypes.shape(),
  value: PropTypes.number,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  tipFormatter: PropTypes.func,
};

Slider.defaultProps = {
  marks: {},
  value: 0,
  tipFormatter: value => value,
};

export default Slider;
