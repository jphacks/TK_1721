import { config } from '../config';

export var save: Function = (uri, name) => {
  let link = document.createElement('a');
  link.download = name;
  link.href = `${config.http.HOST}/${uri}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
