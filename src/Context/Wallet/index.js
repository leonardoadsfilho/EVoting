import { createContext } from "react"

const WalletContext = createContext({
    wallet: {
        address: '',
        balance: null,
    },
    setWallet: () => {}
})

export default WalletContext