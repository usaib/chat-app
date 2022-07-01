import axios from 'axios';
import {BASE_URL} from '../../App';

const create = async params => {
  console.log('In service call', params);
  return axios.post(
    BASE_URL + '/room/create',
    {
      ...params,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export {create};
