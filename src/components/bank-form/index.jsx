import { useReducer, useState } from "react"


const initialState = {
    accountBalance: 1000,
    transectionHistory: [],
    message: ""
}

function bankReducer(state, action) {
    const transactionType = action.type
    switch (transactionType) {
        case "withdraw":
            if (state.accountBalance < action.payload) {
                return {
                    ...state,
                    message: `insuficent balance`
                }
            }
            return {
                ...state,
                accountBalance: state.accountBalance - action.payload,
                transectionHistory: [...state.transectionHistory, { type: "withdraw", amount: action.payload }],
                message: `withdrawl amount is $${action.payload} and new Amount is $${state.accountBalance - action.payload}`
            }
        case "deposit":
            return {
                ...state,
                accountBalance: state.accountBalance + action.payload,
                transectionHistory: [...state.transectionHistory, { type: "deposit", amount: action.payload }],
                message: `Deposited $${action.payload} and new balance is $${state.accountBalance + action.payload}`
            }
        default:
            return state

    }
}

export default function BankFormApp() {
    const [paymentType, setPaymentType] = useState("")
    const [amount, setAmount] = useState("")
    const [state, dispatch] = useReducer(bankReducer, initialState)

    console.log(state)
    function handleSelect(e) {
        setPaymentType(e.target.value)
    }

    function handleAmountInput(e) {
        setAmount(e.target.value)
    }

    function handleTransaction(e) {
        e.preventDefault()
        const parsedAmount = parseFloat(amount)
        if (paymentType === "deposit" && parsedAmount > 0) {
            dispatch({ type: "deposit", payload: parsedAmount })
        } else if (paymentType === "withdraw" && parsedAmount > 0) {
            dispatch({ type: "withdraw", payload: parsedAmount })
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-xl md:text-3xl font-bold mb-6">Transaction App
                using UseReducer</h1>
            <div className="bg-white p-8 rounded-md shadow-md w-96">
                <form className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Transaction Type</span>
                        <select
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            onChange={handleSelect}

                        >
                            <option value={""} >Select option..</option>
                            <option value="withdraw">Withdraw</option>
                            <option value="deposit">Deposit</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Amount</span>
                        <input
                            onInput={handleAmountInput}
                            value={amount}
                            type="number"
                            placeholder="Enter amount"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </label>

                    <button
                        onClick={handleTransaction}
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
                <div className="mt-2 text-blue-700 text-sm ">
                    current balance : ${state.accountBalance}
                </div>
                <div className="mt-2 text-green-700 text-sm ">
                    {state.message}
                </div>
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Transaction History</h2>
                    <ul className="list-disc mt-2 space-y-2 pl-4 text-gray-600">
                        {state.transectionHistory.length > 0
                            ?
                            state.transectionHistory.map((tx, index) => <li key={index}> {tx.type} :   ${tx.amount}</li>) : <li>No transactions yet</li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )

}