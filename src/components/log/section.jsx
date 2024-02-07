import { useContext, useCallback, useEffect, useState } from "react";
import { LogsContext } from "../../context/LogContext";
import { API_URL, formatDate } from "../../utils/utils";
import PopoverComponent from "./actions";
import Modal from "./modal";
import Spinner from "../Spinner";

export default function SectionLogs() {
  const { state, dispatch } = useContext(LogsContext);
  const [isFetching, setIsFetching] = useState(false);
  const { logsData, showModal } = state;

  const fetchData = useCallback(async () => {
    try {
      setIsFetching(true);
      const url = `${API_URL}?action=getLogCalculator`;
      const response = await fetch(url);
      const resJson = await response.json();
      dispatch({
        type: "SET_LOGS",
        payload: resJson.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }, [dispatch, setIsFetching]);

  useEffect(() => {
    if (logsData.length) return;
    fetchData();
  }, [fetchData, logsData.length]);

  return (
    <>
      <h2 className="font-bold text-lg text-white mb-6">History Logs</h2>
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <section className="rounded-xl w-full px-32">
            {logsData?.length > 1 ? (
              <table className="border-collapse table-fixed w-full text-md">
                <thead>
                  <tr>
                    {logsData[0].map((data, index) => {
                      const isActionsColumn = index === 4;
                      return (
                        <th
                          key={`result-${data}`}
                          className="font-normal border-b dark:border-slate-600 p-4 pt-0 pb-3 text-white text-left"
                        >
                          {isActionsColumn ? "" : data}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="dark:bg-slate-800">
                  {logsData?.slice(1)?.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                      {row.map((cell, cellIndex) => {
                        const isValueField = cellIndex === 4;
                        if (isValueField) {
                          const values = JSON.parse(cell || "{}");
                          const hasValues = Boolean(values?.length);
                          return (
                            <td
                              key={`cell-${rowIndex}-${cellIndex}`}
                              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-400"
                            >
                              {hasValues ? (
                                <PopoverComponent row={values} />
                              ) : (
                                ""
                              )}
                            </td>
                          );
                        }
                        return (
                          <td
                            key={`cell-${rowIndex}-${cellIndex}`}
                            className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-400"
                          >
                            {cellIndex === 0 ? formatDate(cell) : cell}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="shadow-sm my-2 rounded-xl">
                Sorry, currently there are no logs
              </div>
            )}
          </section>
          {showModal && <Modal />}
        </>
      )}
    </>
  );
}
