import moment from "moment";
import { reportErrorMessage } from "./ErrorReporting";

export const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.substring(1);

export default {
  handleInputChange(event) {
    const target = event.target;
    const value =
      target.type === "checkbox"
        ? target.checked
        : target.type === "file"
        ? target.files
        : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  },
  handleInputChangeFieldsDeprecated(event) {
    const target = event.target;
    const value =
      target.type === "checkbox"
        ? target.checked
        : target.type === "file"
        ? target.files
        : target.value;
    const name = target.name;

    const fields = this.state.fields;
    fields[name].value = value;
    this.setState({ fields });
  },
  handleInputChangeFields(event) {
    const target = event.target;
    const value =
      target.type === "checkbox"
        ? target.checked
        : target.type === "file"
        ? target.files
        : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  },
  convertToCurrencyString(number, currencySymbol, numDigits = 2) {
    return (
      currencySymbol +
      (number / 100).toLocaleString("en-US", {
        minimumFractionDigits: numDigits,
        maximumFractionDigits: numDigits,
      })
    );
  },
  formatDate(momentArgs, formatString = "MMM DD, YYYY") {
    const date = moment(momentArgs);

    // The default format string creates: Mar 26, 2018
    return date.format(formatString);
  },
  getFromMapOrReportAndDefault(object, key, defaultKey) {
    let value;
    if (!object.hasOwnProperty(key)) {
      reportErrorMessage(
        `Object does not contain key: '${key}'. Using default key: '${defaultKey}'`
      );
      value = object[defaultKey];
    } else {
      value = object[key];
    }
    return value;
  },
  async browserRedirect(path) {
    window.location.href = path;
    //We're redirecting so we don't want any more JS code to execute, so we'll sleep 10 seconds
    await sleep(10000);
  },
  chunk(array, chunkSize) {
    const result = [];

    for (let i = 0, j = array.length; i < j; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
    }

    return result;
  },
  formatCreditCardNumber(number) {
    const NumbersPerGroup = 4;
    const chunks = this.chunk(number.split(""), NumbersPerGroup);
    const stringChunks = chunks.map((c) => c.join(""));
    return stringChunks.join(" ");
  },
};
