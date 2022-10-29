import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import MetaMaskOnboarding from '@metamask/onboarding';
import { connectWallet, connectWalletError } from '@/redux/actions/walletActions';

const MetaMaskConnectButton = ({ history, children }) => {
  const onboarding = React.useRef();
  const [isDisabled, setDisabled] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setDisabled(false);
      }
    }
  }, [accounts]);

  const onClick = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
     try {
      const acc = await window.ethereum.request({ method: 'eth_requestAccounts' });
      dispatch(connectWallet(acc[0]));
      setAccounts(acc);
      history.push('/online_marketing_dashboard');
     } catch (e) {
      dispatch(connectWalletError(e.message));
     }
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return (
    <EmptyButton
      type="button"
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </EmptyButton>
  );
};

MetaMaskConnectButton.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default withRouter(MetaMaskConnectButton);

export const EmptyButton = styled.button`
  padding: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  outline: none;
  text-align: left;
  width: auto;
`;
