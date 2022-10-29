import React from 'react';
import MetaMaskConnectButton from '@/shared/components/wallet/metaMaskConnectButton';
import metaMaskLogo from '@/shared/img/metaMaskLogo.svg';
import { AccountSocialButtonMetaMask } from '@/shared/components/account/AccountElements';

const MetaMaskAuthBtn = () => (
  <MetaMaskConnectButton>
    <AccountSocialButtonMetaMask>
      <img src={metaMaskLogo} alt="icon" />
    </AccountSocialButtonMetaMask>
  </MetaMaskConnectButton>
);

export default MetaMaskAuthBtn;
