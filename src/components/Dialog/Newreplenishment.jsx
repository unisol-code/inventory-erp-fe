const Newreplenishment = ({ isvisible, onClose, children }) => {
  if (!isvisible) return null;

  const handleclose = (e) => {
    if (e.target.id === "wrapper") onclose();
  };

  return (
    <>
      <div
        onClick={handleclose}
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        id="wrapper"
      >
        <div className="w-[500px] rounded-lg  mb-32 flex flex-col">
          <button
            onClick={() => onClose()}
            className="text-black text-3xl  absolute top-[118px] right-[520px] place-self-end"
          >
            x
          </button>
          <div className="bg-white p-2 rounded">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Newreplenishment;
