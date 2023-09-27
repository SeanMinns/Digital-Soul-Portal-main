import axios from 'axios';

export async function getEndPoint(req, config) {
  // get request

  const response = await axios.get(req, config).catch(error => {
    return Promise.reject(error);
  });

  // Return empty array to avoid mapping error
  if (response != null) {
    return response;
  }
  return [];
}

export async function postEndPoint(req, formData, config) {
  // post request
  const response = await axios.post(req, formData, config).catch(error => {

    return Promise.reject(error);
  });
  // Return empty array to avoid mapping error
  if (response != null) {
    return response;
  }
  return [];
}