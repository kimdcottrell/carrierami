import axios from "axios";
export async function handler(event) {
  const value = process.env.MY_IMPORTANT_VARIABLE;
  axios({
    method: 'post',
    url: `https://us12.api.mailchimp.com/3.0/ping`,
    // data: {
    //   email_address: $this.email,
    //   status: 'subscribed'
    // },
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
      let subscribe_request_message = `Error ${error.response.status}: ${error.response.data.title}`
      return {
        body: JSON.stringify({
          message: subscribe_request_message,
        }),
        statusCode: error.response.status,
      };
    } else if (error.request) {
      console.log("The request was made but no response was received. error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js")
      return {
        body: JSON.stringify({
          message: error.request,
        }),
        statusCode: 416,
      };
    } else {
      return {
        body: JSON.stringify({
          message: error.message,
        }),
        statusCode: 417,
      };
    }
  });
}
