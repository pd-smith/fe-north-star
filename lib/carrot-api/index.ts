import Helpers from "../../utils/Helpers";
import { fetchWrapper } from "../FetchWrapper/FetchWrapper";
import { HttpErrors } from "../../utils/HttpErrors";

const CarrotClient = function (baseUrl) {
  this.baseUrl = baseUrl;
};

CarrotClient.prototype = {
  apiV2PostJson: async function (path, payload) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify(payload);
    const response = await fetchWrapper(`${this.baseUrl}/api/v2/${path}`, {
      credentials: "include",
      body,
      headers,
      method: "POST",
    });

    try {
      return JSON.parse(await response.text());
    } catch {
      return null;
    }
  },

  apiV2RequestWithRedirect: async function (request) {
    let response;
    try {
      response = await request();
    } catch (error) {
      if (error.name === HttpErrors.UNAUTHORIZED) {
        await Helpers.browserRedirect(
          `${window.location.pathname}?errorCode=${CarrotErrorCodes.NOT_AUTHENTICATED}`
        );
        return;
      }
      throw error;
    }
    return response;
  },

  apiV2JsonWithRedirect: async function (path, method, payload = null) {
    return this.apiV2RequestWithRedirect(async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const body = payload ? JSON.stringify(payload) : null;

      return fetchWrapper(`${this.baseUrl}/api/v2/${path}`, {
        method,
        headers,
        body,
        credentials: "include",
      });
    });
  },

  apiV2GetJson: async function (path) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const response = await fetchWrapper(`${this.baseUrl}/api/v2/${path}`, {
      method: "GET",
      headers,
      credentials: "include",
    });

    const responseText = await response.text();
    return JSON.parse(responseText);
  },

  getEmployee: async function (employeeId) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const response = await fetchWrapper(
      `${this.baseUrl}/api/v2/employee/${employeeId}`,
      {
        method: "GET",
        headers,
        credentials: "include",
      }
    );
    const responseText = await response.text();
    return JSON.parse(responseText);
  },
  getCompany: async function (companyId) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const response = await fetchWrapper(
      `${this.baseUrl}/api/v2/company/${companyId}`,
      {
        method: "GET",
        headers,
        credentials: "include",
      }
    );
    const responseText = await response.text();
    return JSON.parse(responseText);
  },
  updateEmployee: async function ({ employeeId, firstName, lastName }) {
    return this.apiV2JsonWithRedirect(`employee/${employeeId}`, "POST", {
      firstName,
      lastName,
    });
  },
};

export default CarrotClient;
