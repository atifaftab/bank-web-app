import { useContext, useEffect } from "react";
import AuthContext from "../../context/auth-context";

import useHttp from "../../hooks/use-http";
import { getBalance, getTracHistory, getUserName } from "../../services/auth";
import Layout from "../../components/layout/Layout";

const HomePage = () => {
  const authCtx = useContext(AuthContext);

  const {
    sendRequest,
    status,
    data: balance,
    error,
  } = useHttp(getBalance, true);
  const {
    sendRequest: tracHistorySendRequest,
    status: tracHistoryStatus,
    data: tracHistoryData,
    error: tracHistoryerror,
  } = useHttp(getTracHistory, true);

  const {
    sendRequest: userNameSendRequest,
    status: userNameStatus,
    data: userNameData,
    error: userNameerror,
  } = useHttp(getUserName, true);

  useEffect(() => {
    sendRequest(authCtx.userSessionId);
    tracHistorySendRequest(authCtx.userSessionId);
    userNameSendRequest(authCtx.userSessionId);
  }, [
    authCtx.userSessionId,
    sendRequest,
    tracHistorySendRequest,
    userNameSendRequest,
  ]);

  let balanceData;

  if (status === "completed") {
    balanceData = (
      <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
        {`AED ${balance}`}
      </h2>
    );
  }

  let userNames;
  if (
    userNameStatus === "completed" &&
    userNameData &&
    userNameData.length > 0
  ) {
    userNames = (
      <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
        {`${userNameData}`}
      </h2>
    );
  }

  if (userNameerror) {
    userNames = <div className="centered focused">{userNameerror}</div>;
  }

  if (error) {
    balanceData = <div className="centered focused">{error}</div>;
  }
  if (status === "pending") {
    balanceData = <p className="centered">loading.</p>;
  }

  let content;

  if (
    tracHistoryStatus === "completed" &&
    tracHistoryData &&
    tracHistoryData.length > 0
  ) {
    content = (
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              Transaction History
            </h2>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">
                    S.NO
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Data
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Transaction Type
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Balance
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {tracHistoryData.map((data, i) => {
                  return (
                    <tr key={data.id}>
                      <td className="px-4 py-3">{i + 1}</td>
                      <td className="px-4 py-3">{data.updatedDate}</td>
                      <td className="px-4 py-3">{data.type}</td>
                      <td className="px-4 py-3">{data.balance}</td>
                      <td className="px-4 py-3 text-lg text-gray-900">
                        {data.amount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
  if (
    tracHistoryStatus === "completed" &&
    (!tracHistoryData || tracHistoryData.length === 0)
  ) {
    content = <p className="centered">Found no transaction.</p>;
  }
  if (tracHistoryerror) {
    content = <div className="centered focused">{tracHistoryerror}</div>;
  }
  if (tracHistoryStatus === "pending") {
    content = <p className="centered">loading.</p>;
  }

  return (
    <Layout>
      <section className="text-gray-600  body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="  lg:w-2/3 w-full mx-auto overflow-auto">
            <div className="bg-gray-100 rounded-2xl py-10 px-12 w-1/2">
              {userNames}
              <p className="leading-relaxed mb-2">Balance</p>
              {balanceData}
            </div>
          </div>
        </div>
      </section>
      {content}
    </Layout>
  );
};

export default HomePage;
