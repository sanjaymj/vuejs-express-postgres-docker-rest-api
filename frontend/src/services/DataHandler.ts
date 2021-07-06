import axios from "axios";

export default class DataHandler {
  public static getAllDnaStringsFromDatabase(): Promise<Response> {
    return axios.get(process.env.VUE_APP_URL);
  }

  public static postDnaStringsToDatabase(dnaStringToAdd: string): Promise<Response> {
    const postDnaStringUrl: string = process.env.VUE_APP_URL + "add";
    return axios.post(postDnaStringUrl, {
      content: dnaStringToAdd,
    });
  }

  public static getAllDnaStringsbySearchParameters(dnaString: string, searchDistance: number): Promise<Response> {
    const getDnaStringUrl = process.env.VUE_APP_URL + "search-by-content";
    return axios.get(getDnaStringUrl, {
      params: {
        searchParam: dnaString,
        distance: searchDistance,
      },
    });
  }
}
