import React, { useContext, useCallback, useEffect } from "react";
import { URL_LOGS, formatDate } from "../utils/utils";
import PopoverComponent from "../components/log/actions";
import { LogsContext } from "../context/LogContext";
import Modal from "../components/log/modal";
import { LoadingContext } from "../context/LoadingContext";
import Spinner from "../components/Spinner";

export const LogsPage = () => {
  const { loading, setLoading } = useContext(LoadingContext);
  const { state, dispatch } = useContext(LogsContext);
  const { logsData, showModal } = state;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const url = `${URL_LOGS}?action=getLogs`;
      const response = await fetch(url, {
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });
      const resJson = await response.json();
      dispatch({
        type: "SET_LOGS",
        payload: resJson.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, setLoading]);

  useEffect(() => {
    if (logsData.length) return;
    fetchData();
  }, [fetchData, logsData.length]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h2 className="font-bold text-lg text-white mb-6">History Logs</h2>
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
                          {hasValues ? <PopoverComponent row={values} /> : ""}
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
  );
};
