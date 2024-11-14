import * as localhostConfigData from "../../config/localhost.json";
import * as defaultConfigData from "../../config/default.json";

class Config {
  get(key: string): any {
    const value = this.getValue(key, localhostConfigData);
    if (value !== undefined) {
      return value;
    }
    return this.getValue(key, defaultConfigData);
  }

  private getValue(key: string, config: Record<string, any>): any {
    return key.split(".").reduce((o, i) => (o ? o[i] : undefined), config);
  }
}

export default new Config();
