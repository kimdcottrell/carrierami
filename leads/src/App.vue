<script>
import axios from 'axios';

export default {
  data() {
    return {
        email: '',
        subscribe_request_status: '',
    };
  },
  computed: {
    checkEmail() {
      return String(this.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    },
  },
  methods: {
    cleanEmail() {
      this.email = trim(this.email);
    },    
    submitForm() {
        if (this.checkEmail) {
            window.console.log('email is valid');

            // the closures below needs the correct context of `this`
            var $this = this;
            axios({
              method: 'post',
              url: `/.netlify/functions/subscription_request`,
              data: {
                email_address: $this.email,
              }
            }).then(function (response) {
              $this.subscribe_request_status = 'success';
              console.log(response)
            }).catch(function (error) {
              $this.subscribe_request_status = 'error-api-response';
              if (error.response) {
                console.log("The request was made and the server responded with a status code that falls out of the range of 2xx")
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                $this.subscribe_request_message = error.response.data.message
              } else if (error.request) {
                $this.subscribe_request_message = "The request was made but no response was received. error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js"
              } else {
                $this.subscribe_request_message = "Something happened in setting up the request that triggered an Error"
              }
              console.log(error.config);
            });
          
        } else {
            this.subscribe_request_status = 'error-invalid-email';
            window.console.log('email is invalid');
        }
    }
  }
}

</script>

<template>
  <div class="flex place-content-center h-screen">
    <section class="rounded bg-cher-100 p-10 sm:w-5/5 md:w-4/5 lg:w-3/5 md:m-auto text-center">
      <h1>
        Carrier Ami
      </h1>
      <p>Sick of algorithms feeding you news that you don't care about?<br/>
        Tired of losing track of the story? <br />
        Carrier Ami is here to help. </p>
      <p>Query for only the topics you care about. <br />
        Get short, grouped summaries on recent events about that topic.</p>
      <h3>Join the waitlist to get early access to the beta!</h3>
      <div v-if="subscribe_request_status === 'success'" ref="success_alert" class="alert bg-teal-600" role="alert">
        <svg class="fill-current mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" zoomAndPan="magnify" viewBox="0 0 30 30" height="20" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="id1"><path d="M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 " clip-rule="nonzero" fill="white"></path></clipPath></defs><g clip-path="url(#id1)"><path fill="white" d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 " fill-opacity="1" fill-rule="nonzero"></path></g></svg>
        <span>Thanks for joining the waitlist for our beta!</span>
      </div>
      <div v-else-if="subscribe_request_status === 'error-invalid-email'" ref="error_alert" class="alert bg-red-700" role="alert">
        <svg class="fill-current text-white mr-2 pt-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"> <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" fill="white"></path> </svg>
        <span>Your email did not pass initial validation. Please double check your entered email for typos.</span>
      </div>
      <div v-else-if="subscribe_request_status === 'error-api-response'" ref="error_alert" class="alert bg-red-700" role="alert">
        <svg class="fill-current text-white mr-2 pt-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"> <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" fill="white"></path> </svg>
        <span>{{ subscribe_request_message }}</span>
      </div>
      <form v-if="subscribe_request_status !== 'success'" ref="email_form" class="mt-10">
        <input v-model="email" @keyUp.enter="cleanEmail()" type="email" name="email" required placeholder="email" class="form-input inline-block pb-2 px-4 py-3 mb-4 rounded sm:w-4/5 md:w-3/5" />
        <br />
        <button id="join-button" type="submit" @click.prevent="submitForm()">
          <a href="#" class="animated-button">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Join the waitlist
          </a>
        </button>
      </form>
      <footer>
        <span class="text-xs text-cher-900">For business inquiries, please email <a href="mailto: me@kimdcottrell.com">me@kimdcottrell.com</a></span>
      </footer>
    </section>
  </div>
</template>
