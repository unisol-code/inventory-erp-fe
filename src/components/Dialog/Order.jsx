import { TiTick } from "react-icons/ti";

const Order = ({ onClose, onSec }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <button
          onClick={() => {
            onClose(false);
            onSec(false);
          }}
          className="text-white text-xl absolute top-[94px] right-[510px]"
        >
          x
        </button>
        <div className="w-[500px] h-[370px] bg-white rounded-lg  mb-32 flex flex-col">
          <div className="bg-slate-400  w-[500px] h-[80px]">
            <p className="text-black px-5 py-6 text-2xl">
              <b>Order Placed</b>
            </p>
          </div>
          <div className="text-center  py-16 text-2xl">
            <p>Order Placed Succesfully!</p>
          </div>
          <div className="ps-56 absolute  bottom-96">
            <TiTick size={50} color="blue" />
          </div>
          <div className="text-lg ps-24">
            <p>The Order has been Placed successfully</p>
          </div>
          <div className="ps-4 ms-52 rounded-lg my-5 py-2.5 text-white w-[80px] bg-gray-300 ">
            <button disabled>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
