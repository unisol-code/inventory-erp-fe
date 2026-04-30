const Table = ({ columns = [], data = [], actions = [], onActionClick }) => {
  return (
    <div className="w-full h-full overflow-auto">
      <table className="border-collapse w-full overflow-y-scroll">
        <thead
          style={{
            height: "30px", // Height for the entire <thead>
          }}
        >
          <tr>
            {columns?.map((column, i) => (
              <th
                key={i}
                align={column?.align || "left"}
                style={{
                  minWidth: column?.minWidth || "120px",
                  minHeight: column?.minHeight || "60px",
                  fontWeight: 500,
                  color: "#949494",
                  fontSize: "12px",
                  position: "sticky",
                  top: "0",
                  zIndex: 10,
                  backgroundColor: "#F7F7F7",
                }}
              >
                {column?.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => {
            return (
              <tr tabIndex={-1} key={index}>
                {columns?.map((column, j) => (
                  <td
                    key={j}
                    align={column.align || "left"}
                    className="text-xs"
                    style={{
                      paddingTop: "5px",
                      paddingBottom: "5px",
                      height: column?.minHeight || "60px",
                    }}
                  >
                    {row[column?.key]}{" "}
                  </td>
                ))}

                {actions?.length > 0 && (
                  <td>
                    <div className="flex justify-center items-center gap-2 ">
                      {actions?.map((action, k) => (
                        <button
                          key={k}
                          className="w-full py-1 px-1 text-[#358EAB] rounded-md border-2 border-[#358EAB] hover:text-[#173e4b]"
                          onClick={() => onActionClick(action?.key, row)}
                        >
                          {action?.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <Pagination
      currentPage={employee?.data?.pagination?.currentPage}
      totalPages={employee?.data?.pagination?.totalPages}
      onPageChange={onPageChange}
      onItemsPerPageChange={onItemsPerPageChange}
      /> */}
    </div>
  );
};

export default Table;
