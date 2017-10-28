import { config } from '../config';

export class Logger {
  private static _log(value: any) {
    let res;
    if (value.length === 1) {
      res = value[0];
    } else {
      res = value;
    }
    return res
  }

  static debug(...value: any[]): void {
    if (config.env.development) {
      console.debug('[debug]', this._log(value));
    }
  }

  static log(...value: any[]): void {
    if (config.env.development) {
      console.debug('[log]', this._log(value));
    }
  }

  static info(...value: any[]): void {
    if (config.env.development) {
      console.info('[info]', this._log(value));
    }
  }

  static warn(...value: any[]): void {
    if (config.env.development) {
      console.warn('[warn]', this._log(value));
    }
  }

  static error(...value: any[]): void {
    if (config.env.development) {
      console.error('[error]', this._log(value));
    }
  }
}
