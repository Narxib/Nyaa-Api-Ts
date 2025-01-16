import { Handler } from "worktop";
import * as Scrapers from "./scrapers";
import { Constants } from "./constants";
import * as Utils from "./utils";

const baseUrl = Constants.NyaaAltUrl;

export class Handlers {
  static Ping: Handler = function (_, res) {
    res.send(200, "Nyaa API v2 //  ALIIIIIIVE LOCALLYYY");
  };

  static GetInfoFromID: Handler = async function (req, res) {
    try {
      const id = req.params.id;
      const searchUrl = baseUrl + "/view/" + id;
      console.log(">>>>>>>>>>>>>>>>>>>>>", searchUrl)
      res.send(200, `URL :  ${searchUrl}`)
      await Scrapers.fileInfoScraper(res, searchUrl);
    } catch (error) {
      res.send(404, "Not Found ID ROUTE");
    }
  };

  static GetUserUploads: Handler = async function (req, res) {
    try {
      const username = req.params.username;
      const queryParams = Utils.getSearchParameters(req);

      const searchUrl = `${baseUrl}/user/${username}?q=${queryParams.query.trim()}&p=${queryParams.page
        }&s=${queryParams.sort}&o=${queryParams.order}&f=${queryParams.filter}`;
      res.send(200, `URL :  ${searchUrl}`)
      await Scrapers.scrapeNyaa(res, searchUrl);
    } catch (error) {
      res.send(404, "this is mine");
    }
  };

  static GetCategoryTorrents: Handler = async function (req, res) {
    try {
      const cat = req.params.category;
      const subCat = req.params.subcategory;

      const category = Utils.getCategoryID(cat, subCat);
      const queryParams = Utils.getSearchParameters(req);

      const searchUrl = `${baseUrl}/?f=0&${category}&q=${queryParams.query}`;
      console.log(">>>>>>>>>>>>>>>>>>>>>", searchUrl)
      await Scrapers.scrapeNyaa(res, searchUrl);
    } catch (error) {
      res.send(404, `Not Found you are here`);
    }
  };
}
