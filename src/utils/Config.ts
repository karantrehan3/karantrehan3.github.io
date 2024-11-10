import * as configData from "../../config/default.json";

class Config {
  private config: any;

  constructor() {
    this.config = configData;
  }

  get(key: string): any {
    return key.split(".").reduce((o, i) => (o ? o[i] : undefined), this.config);
  }
}

export default new Config();
