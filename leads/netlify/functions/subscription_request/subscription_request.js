import axios from 'axios';
import dotenv from 'dotenv';

export async function handler(event, context) {
  dotenv.config();
  

  if (event.httpMethod !== 'POST' && !String(event.body).toLowerCase().includes("email_address")) {
    return {
      body: JSON.stringify({
        message: 'HTTP Method must be POST, must be JSON, and must include email_address in body.',
      }),
      statusCode: 400,
    };
  } 

  const event_body = JSON.parse(event.body);
  
  return axios({
    method: 'post',
    url: `https://us12.api.mailchimp.com/3.0/lists/${process.env.VITE_MAILCHIMP_GENERAL_LIST}/members?skip_merge_validation=true`,
    data: {
      email_address: event_body.email_address,
      status: 'subscribed'
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `api_key ${process.env.MAILCHIMP_API_KEY}`
    }
  }).then(function (response) {
      return {
        body: JSON.stringify({
          message: 'success',
        }),
        statusCode: 200,
      };
  }).catch(function (error) {
    if (error.response) {
      return {
        body: JSON.stringify({
          message: `Error: ${error.response.status}: ${error.response.data.title}`,
        }),
        statusCode: error.response.status,
      };
    } else if (error.request) {
      console.log("The request was made but no response was received. error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js")
      return {
        body: JSON.stringify({
          message: error.request,
        }),
        statusCode: 400,
      };
    } else {
      return {
        body: JSON.stringify({
          message: error.message,
        }),
        statusCode: 400,
      };
    }
  });
}
