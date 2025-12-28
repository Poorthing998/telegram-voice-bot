import axios from "axios";
import { config } from "./config.js";

// Check USDT TRC20 payment on TRON network
export async function checkPayment(fromAddress) {
  try {
    const response = await axios.get(
      `https://api.trongrid.io/v1/accounts/${config.TRON_WALLET}/transactions/trc20`,
      {
        params: {
          only_confirmed: true,
          limit: 50,
          contract_address: config.USDT_CONTRACT
        }
      }
    );

    const transactions = response.data.data || [];
    
    // Look for payment from user's address
    for (const tx of transactions) {
      if (
        tx.from.toLowerCase() === fromAddress.toLowerCase() &&
        tx.to.toLowerCase() === config.TRON_WALLET.toLowerCase() &&
        parseFloat(tx.value) / 1e6 >= config.PAYMENT_AMOUNT
      ) {
        return {
          found: true,
          txId: tx.transaction_id,
          amount: parseFloat(tx.value) / 1e6
        };
      }
    }

    return { found: false };
  } catch (err) {
    console.error("TRON API error:", err.message);
    return { found: false, error: err.message };
  }
}
