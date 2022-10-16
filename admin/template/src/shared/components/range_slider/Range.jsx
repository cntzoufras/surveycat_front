import React from 'react';
import Slider from 'rc-slider';
import PropTypes from 'prop-types';

import 'rc-slider/assets/index.css';
import { SliderMax, SliderMin, SliderWrap } from '@/shared/components/range_slider/SliderElements';

const { createSliderWithTooltip } = Slider;
const RCRange = createSliderWithTooltip(Slider.Range);

const Range = ({
  marks, value, min, max, tipFormatter,
}) => (
  <SliderWrap>
    <SliderMin>
      <p>{tipFormatter ? tipFormatter(min) : min}</p>
    </SliderMin>
    <SliderMax>
      <p>{tipFormatter ? tipFormatter(max) : max}</p>
    </SliderMax>
    <RCRange
      min={min}
      max={max}
      defaultValue={value}
      tipFormatter={tipFormatter}
      marks={marks}
      tipProps={{ visible: true }}
    />
  </SliderWrap>
);

Range.propTypes = {
  marks: PropTypes.shape(),
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  tipFormatter: PropTypes.func,
};

Range.defaultProps = {
  marks: {},
  tipFormatter: value => value,
};

export default Range;
