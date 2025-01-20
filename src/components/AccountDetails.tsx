import { RiCloseLine } from "react-icons/ri";
import { IoCopy } from "react-icons/io5";
import logo from "../assets/logo2.png";
import AccountIcon from "../assets/Account icon.png";

interface AccountDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  // walletAddress: string;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({
  isOpen,
  onClose,
}: AccountDetailsProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed text-sm inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
      <div className=" w-[90%] md:w-[400px] p-6 rounded flex flex-col items-center gap-9">
        <RiCloseLine
          className="cursor-pointer text-xl  bg-[#D9D9D9] rounded-full mr-[auto]"
          onClick={onClose}
        />
        <div className="flex gap-3 items-center rounded-lg justify-between bg-[#363636] p-2 font-poppins">
          <img
            src={AccountIcon}
            alt="homeicon"
            className="w-8 h-8 rounded-full "
          />

          <div className="text-white mr-24">
            <p>Account 1</p>
            <p className="text-[13px]">0xfdk2....dds323</p>
          </div>
        </div>
        <div className="">
          <img src={logo} alt="" className="h-[150px] w-[150px]" />
        </div>

        <div className="relative">
          <textarea className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
          <IoCopy className="absolute top-1 left-[190px] text-xl cursor-pointer text-violet-500" />
        </div>
        <button className="text-violet-500 border border-border rounded-full p-3 px-11 hover:bg-[#363636]">
          Show private key
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
