import { useContext, useCallback, useEffect, useState } from "react";
import { LogsContext } from "../../context/LogContext";
import { API_URL, formatDate } from "../../utils/utils";
import PopoverComponent from "./actions";
import Modal from "./modal";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function SectionLogs() {
  const { user } = useContext(UserContext);
  const { state, dispatch } = useContext(LogsContext);
  const [isFetching, setIsFetching] = useState(false);
  const { logsData, showModal } = state;
  const { admin: isAdmin } = user;
  const navigate = useNavigate();

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
    if (isAdmin) return;
    navigate(-1);
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (logsData.length) return;
    fetchData();
  }, [fetchData, logsData.length]);

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <section className="w-full">
            {logsData?.length > 1 ? (
              <table className="border-collapse table-auto w-full text-md">
                <thead>
                  <tr>
                    {logsData[0].map((data, index) => {
                      const isActionsColumn = index === 4;
                      return (
                        <th
                          key={`result-${data}`}
                          className="font-normal border-b border-slate-600 p-4 pt-0 pb-3 text-white text-left"
                        >
                          {isActionsColumn ? "" : data}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="bg-slate-800">
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
                              className="border-b border-slate-600 p-4 text-white text-center"
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
                            className="border-b border-slate-600 p-4 text-white"
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
