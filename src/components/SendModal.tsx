import React, { useState } from "react";
import { getPrivateKey, sendEther } from "../utils/utils";
import { RiCloseLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import AccountIcon from "../assets/Account icon.png";

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

const SendModal: React.FC<SendModalProps> = ({
  isOpen,
  onClose,
  walletAddress,
}) => {
  console.log(walletAddress, "walletAddress"); //for now we are just testing with one walletAddress, we have to use this to store privatekeys
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!recipient || !amount) {
      setMessage("Recipient address and amount are required.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const selectedNetwork =
        localStorage.getItem("selectedNetwork") ?? "mainnet";
      console.log(selectedNetwork, "selectednet");
      const networks: { [key: string]: { rpcUrl: string; chainId: number } } = {
        // mainnet: {
        //   rpcUrl: "https://mainnet.infura.io/v3/1cef973dff844ba09dea342050cd5967",
        //   chainId: 1,
        // },
        sepolia: {
          rpcUrl:
            "https://sepolia.infura.io/v3/1cef973dff844ba09dea342050cd5967",
          chainId: 11155111,
        },
        // Add other networks here...
      };
      const network = networks[selectedNetwork as keyof typeof networks];
      console.log(network, "network");
      if (!network) throw new Error("Network configuration missing!");

      const providerUrl = network.rpcUrl;
      const chainId = network.chainId;

      // Retrieve the encrypted private key from storage and decrypt it
      const privateKey = await getPrivateKey();

      const transaction = await sendEther(
        privateKey, // Replace with private key in backend for security
        recipient,
        amount,
        chainId,
        providerUrl
      );
      setMessage(`Transaction successful! Hash: ${transaction.hash}`);
    } catch (error) {
      setMessage("Failed to send transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className=" w-[90%] md:w-[400px] p-6 rounded shadow-md">
        <div className="flex items-center mb-4">
          <RiCloseLine
            className="cursor-pointer text-xl  bg-[#D9D9D9] rounded-full mr-3"
            onClick={onClose}
          />
          <h2 className="text-xl  text-white font-bold">Send</h2>
        </div>
        <div className="">
          <h2>From</h2>
          <div className="flex justify-between bg-[#363636] p-2">
            <img
              src={AccountIcon}
              alt="homeicon"
              className="w-10 h-10 rounded-full "
            />

            <div className="text-white">
              <p>Account 1</p>
              <p>0xfdkda823dsddsdd323</p>
            </div>
            <IoIosArrowDown className="font-bold text-base text-white ml-2" />
          </div>
        </div>
        <div>
          <h2>To</h2>
          <div>
            <input
              type="text"
              placeholder="Enter public address (0x) or domain name"
              className="bg-transparent border p-3 rounded-md border-border"
            />
          </div>
        </div>
        

        
        {message && <p className="text-red-500 text-sm">{message}</p>}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendModal;
