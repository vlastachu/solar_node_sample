import {
  Identities,
  Transactions,
  Utils,
  Managers,
} from '@solar-network/crypto';
import { Connection } from '@solar-network/client';
import axios, { Axios } from 'axios';

const firstWallet = {
  keys: {
    publicKey:
      '02eedc7529650f78a4e03ef4899e61baf4ac367e6c51467634666fd3ab251184e9',
    privateKey:
      '3a2a3951bf000e8963a598991c2c6bb45a9e99a61b65756715a51388e46c3ad5',
    compressed: true,
  },
  recipientId: 'DGsd5T2XDppnXnJbeyhCC9kVQMaY5mi6vw',
  senderPublicKey:
    '02eedc7529650f78a4e03ef4899e61baf4ac367e6c51467634666fd3ab251184e9',
    passphrase: 'key board drug fill put correct zip unzip',
};

const secondWallet = {
  keys: {
    publicKey:
      '03d0d39ead671162525eb5ae3e90b9815d73edc76585207fddb20c0cd2e23983d4',
    privateKey:
      'c72f58764eecdbbc941d54eb8874647573d7815a0aa90ccc3c9a37a263effa6d',
    compressed: true,
  },
  recipientId: 'D8ipEGeJBLNmQ9tneHt3PSbJNruTKYUyPs',
  senderPublicKey:
    '03d0d39ead671162525eb5ae3e90b9815d73edc76585207fddb20c0cd2e23983d4',
  passphrase: 'key board drug fill put correct zip zip'
};


const SOLAR_API_SERVER = 'https://tapi.solar.org/api';


// Configure our API client
const client = new Connection(SOLAR_API_SERVER);

(async () => {

  // Get current height
  const height = (await client.api("blockchain").blockchain()).body.data.block.height;

  // Set the chain's presets and height
  Managers.configManager.setFromPreset("testnet");
  Managers.configManager.setHeight(1000000);


  // Step 1: Retrieve the incremental nonce of the sender wallet
  const senderWallet = await client.api("wallets").get(firstWallet.recipientId);
  const senderNonce = Utils.BigNumber.make(senderWallet.body.data.nonce).plus(1);

  // Step 2: Create the transaction
  const transaction = Transactions.BuilderFactory.transfer()
      .nonce(senderNonce.toFixed())
      .fee("30000000")
      .addTransfer(secondWallet.recipientId, "100000000")
      .memo("Hello World") // Memo is optional
      .sign(firstWallet.passphrase);

  // Step 4: Broadcast the transaction
  // const broadcastResponse = await client.api("transactions").create({ transactions: [transaction.build().toJson()] });
  const axiosC = axios.create({
    baseURL: SOLAR_API_SERVER,
  });
  const { data : broadcastResponse } = await axiosC.post('transactions', {
    transactions: [transaction.build().toJson()],
  });

  // Step 5: Log the response
  console.log(JSON.stringify({ broadcastResponse ,request: transaction.build().toJson()}, null, 4))
})();