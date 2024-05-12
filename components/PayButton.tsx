"use client"
import { useConnect, useAccount, useWriteContract } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { mainnet, sepolia } from 'viem/chains'
import { useState } from 'react'
import Web3 from 'web3'
export const PayButton = ({ price }: {price: number})=> {
    const { connectAsync } = useConnect()
    const { writeContractAsync } = useWriteContract()
    const [started, setStarted] = useState(false)
    const [errors, setErrors] = useState()
    const [completed, setCompleted] = useState(false)
    console.log(price);
    console.log(mainnet.id);
    const handlePayment = async () => {
    try{
        setStarted(true)
        const data = await writeContractAsync({
            chainId: mainnet.id,
            address: '*',
            functionName: 'transfer',
            abi:[
              {
                "constant": false,
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "dst",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "wad",
                    "type": "uint256"
                  }
                ],
                "name": "transfer",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              },
             
            ],
            args: [
              '*',
              BigInt(10)
            ],
          })
        setCompleted(true)

    } catch (error) {
        console.log(error)
        setStarted(false)
        setErrors("Payment failed. Please try again.")
    }
    }
    return (
        <>
        {!completed && (
            <button 
            disabled={started}
            className='mt-5 px-4 py-2 border-transparent text-sm font-medium rounded-md text'
            onClick={handlePayment}
            >
                {started ? 'Confirming...' : `Pay Now`}
            </button>
        )}
        {completed && <p className='text-stone-800 mt-2 bg-green-200 rounded-md text-sm py-2 px-4'> Thank you for your payment </p>}
        {errors && <p className='text-stone-800 mt-2 bg-red-200 rounded-md text-sm py-2 px-4'>{errors}</p>}
        </>
    )
}