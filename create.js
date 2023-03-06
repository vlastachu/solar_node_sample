import {
  Identities,
  Transactions,
  Utils,
  Managers,
} from '@solar-network/crypto';
import { Connection } from "@solar-network/client";

Managers.configManager.setFromPreset("testnet");
Managers.configManager.setHeight(1000000);

const passphrase = 'key board drug fill put correct zip unzip'

// Throughout this document, the keys object used is:
const keys = Identities.Keys.fromPassphrase(passphrase);

// Throughout this document, the recipientId variable used is:
const recipientId = Identities.Address.fromPassphrase(passphrase);

// Throughout this document, the senderPublicKey variable used is:
const senderPublicKey = Identities.PublicKey.fromPassphrase(passphrase);
console.log({ keys, recipientId, senderPublicKey })
