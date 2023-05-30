import { JAVA_SVC } from "../../config";

export async function addUser(userData) {
  const URL = `${JAVA_SVC}auth/register`;

  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  const resData = await data;

  if (!response.ok) {
    let errorMessage;
    if (data && data.error && data.error.message) {
      errorMessage = data.error.message;
    }
    throw new Error(errorMessage);
  }
  return resData;
}

export async function signInUser(userData) {
  const URL = `${JAVA_SVC}auth/authenticate`;

  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  const resData = await data;

  if (!response.ok) {
    let errorMessage;
    if (data && data.error && data.error.message) {
      errorMessage = data.error.message;
    }
    throw new Error(errorMessage);
  }

  return resData;
}

export async function getBalance(token) {
  const URL = `${JAVA_SVC}balance/BalanceById`;

  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  const resData = await data;

  if (!response.ok) {
    let errorMessage;
    if (data && data.error && data.error.message) {
      errorMessage = data.error.message;
    }
    throw new Error(errorMessage);
  }

  return resData;
}

export async function transactionDebit(debitObject) {
  const URL = `${JAVA_SVC}transaction/debit`;

  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      amount: debitObject.amount,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${debitObject.token}`,
    },
  });
  
  const data = await response.json();
  const resData = await data;

  if (!response.ok) {
    let errorMessage;
    if (data && data.error && data.error.message) {
      errorMessage = data.error.message;
    }
    throw new Error(errorMessage);
  }

  return resData;
}

export async function transactionCredit(creditObject) {
  const URL = `${JAVA_SVC}transaction/credit`;

  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      amount: creditObject.amount,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${creditObject.token}`,
    },
  });

  const data = await response.json();
  const resData = await data;

  if (!response.ok) {
    let errorMessage;
    if (data && data.error && data.error.message) {
      errorMessage = data.error.message;
    }
    throw new Error(errorMessage);
  }

  return resData;
}

export async function getTracHistory(token) {
  const URL = `${JAVA_SVC}transaction/transaction`;

  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  const resData = await data;

  if (!response.ok) {
    let errorMessage;
    if (data && data.error && data.error.message) {
      errorMessage = data.error.message;
    }
    throw new Error(errorMessage);
  }

  return resData;
}


export async function getUserName(token) {
  const URL = `${JAVA_SVC}customer/userName`;

  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.text();

  if (!response.ok) {
    let errorMessage;
    if (data && data.error && data.error.message) {
      errorMessage = data.error.message;
    }
    throw new Error(errorMessage);
  }

  return data;
}
