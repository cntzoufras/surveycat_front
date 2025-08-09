import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colorBackground } from '@/utils/palette';


const Loading = ({
 loading, fullScreen, label, minHeight, 
}) => (
  fullScreen ? (
    <Load loading={loading} className={loading ? '' : 'loaded'}>
      <LoadIconWrap>
        <LoadIcon>
          <path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
        </LoadIcon>
        {label && <LoadLabel>{label}</LoadLabel>}
      </LoadIconWrap>
    </Load>
  ) : (
    <InlineLoad loading={loading} style={{ minHeight }}>
      <LoadIconWrap>
        <LoadIcon>
          <path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
        </LoadIcon>
        {label && <LoadLabel>{label}</LoadLabel>}
      </LoadIconWrap>
    </InlineLoad>
  )
);

Loading.propTypes = {
  loading: PropTypes.bool,
  fullScreen: PropTypes.bool,
  label: PropTypes.string,
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Loading.defaultProps = {
  loading: false,
  fullScreen: true,
  label: undefined,
  minHeight: '50vh',
};

export default Loading;

// region STYLES

const Load = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => !['loading'].includes(prop) && defaultValidatorFn(prop),
})`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  position: fixed;
  background: ${colorBackground};
  z-index: 1000;
  ${props => !props.loading && 'animation: ease loaded 0.5s'};

  & + div {
    height: 100vh;
    overflow: hidden;
  }

  @keyframes loaded {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const InlineLoad = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => !['loading'].includes(prop) && defaultValidatorFn(prop),
})`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: transparent;
`;

const LoadIconWrap = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadIcon = styled.svg`
  animation: linear load 2s infinite;
  margin: auto;
  width: 32px;
  height: 32px;

  @keyframes load {
    from {
      transform: rotate(0deg) scale(2);
    }
    to {
      transform: rotate(360deg) scale(2);
    }
  }
`;

const LoadLabel = styled.div`
  margin-top: 8px;
  font-size: 0.9rem;
  /* Default for dark mode */
  color: ${({ theme }) => (theme && theme.palette && theme.palette.mode === 'light'
    ? 'rgb(100, 103, 119)'
    : 'rgba(255, 255, 255, 0.7)')};
  padding-top: 6px; /* extra separation from spinner */

  /* Fallback if no theme provided: adapt to OS preference */
  @media (prefers-color-scheme: light) {
    color: rgb(100, 103, 119);
  }
`;

//
