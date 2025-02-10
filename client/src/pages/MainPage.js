import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function MainPage() {
    const [date, setDate] = useState("");
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [amountInSourceCurrency, setAmountInSourceCurrency] = useState("");
    const [amountInTargetCurrency, setAmountInTargetCurrency] = useState("");
    const [currencyNames, setCurrencyNames] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/convert", {
                params: { date, sourceCurrency, targetCurrency, amountInSourceCurrency },
            });
            setAmountInTargetCurrency(response.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        const getCurrencyNames = async () => {
            try {
                const response = await axios.get("http://localhost:5000/getAllCurrencies");
                setCurrencyNames(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        getCurrencyNames();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 text-white bg-gray-900">
            <motion.h1 
                className="mb-4 text-4xl font-bold text-center text-green-500"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Convert Your Currencies Today
            </motion.h1>
            <p className="max-w-lg mb-6 text-center text-gray-400">
                Instantly convert currencies with real-time rates and an easy-to-use interface.
            </p>

            <motion.div 
                className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-gray-300">Date</span>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                            className="block w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500" required />
                    </label>

                    <label className="block">
                        <span className="text-gray-300">Source Currency</span>
                        <select value={sourceCurrency} onChange={(e) => setSourceCurrency(e.target.value)}
                            className="block w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500" required>
                            <option value="">Select currency</option>
                            {Object.keys(currencyNames).map((currency) => (
                                <option key={currency} value={currency}>{currencyNames[currency]}</option>
                            ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-gray-300">Target Currency</span>
                        <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}
                            className="block w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500" required>
                            <option value="">Select currency</option>
                            {Object.keys(currencyNames).map((currency) => (
                                <option key={currency} value={currency}>{currencyNames[currency]}</option>
                            ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-gray-300">Amount in source currency</span>
                        <input type="number" value={amountInSourceCurrency} onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                            className="block w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500" required />
                    </label>

                    <button type="submit" className="w-full py-2 font-bold text-white transition-transform transform bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105">
                        {loading ? "Converting..." : "Get Target Currency"}
                    </button>
                </form>
            </motion.div>

            {!loading && amountInTargetCurrency && (
                <motion.div 
                    className="w-full max-w-md p-4 mt-6 text-center bg-gray-800 rounded-lg shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-lg">
                        {amountInSourceCurrency} {currencyNames[sourceCurrency]} = 
                        <span className="font-bold text-green-500"> {amountInTargetCurrency} </span>
                        {currencyNames[targetCurrency]}
                    </p>
                </motion.div>
            )}
        </div>
    );
}
