<template>
  <section>
    <section
      class="contact-us-section"
      :style="{
        backgroundImage:
          'url(' + require('@/assets/contact-background.webp') + ')',
      }"
    >
      <v-row justify="center" class="py-0 fill-height">
        <v-col cols="4" align-self="start">
          <v-img
            src="@/assets/logo.png"
            contain
            height="150"
            width="350"
            class="mt-10"
          />
        </v-col>
        <v-col cols="4" align-self="center">
          <v-card class="pa-10 mt-10">
            <div class="text-h2 yellow--text text--darken-3">Get in Touch!</div>
            <v-spacer class="pt-5" />
            <v-form
              name="contact-us-form"
              ref="form"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              v-model="valid"
              :lazy-validation="lazy"
              @submit.prevent="handleSubmit"
            >
              <!-- hidden input for netlify -->
              <input type="hidden" name="form-name" value="contact-us-form" />

              <!-- Client Full Name -->
              <div class="label-contact-us">Your Full Name:</div>
              <v-text-field
                name="fullName"
                v-model="fullName"
                autocomplete="off1"
                :rules="[rules.required, rules.alphabeticOnly, rules.max60]"
                color="#F79D20"
                outlined
                dense
              />

              <!-- Company Name -->
              <div class="label-contact-us">Your Company:</div>
              <v-text-field
                name="companyName"
                v-model="companyName"
                autocomplete="off1"
                :rules="[rules.required, rules.max100]"
                color="#F79D20"
                outlined
                dense
              />

              <!-- Client Email -->
              <div class="label-contact-us">Your email:</div>
              <v-text-field
                name="clientMail"
                v-model="clientMail"
                autocomplete="off1"
                :rules="[rules.required, rules.email, rules.max100]"
                color="#F79D20"
                outlined
                dense
              />

              <!-- Mail Text -->
              <div class="label-contact-us">Tell us what you need:</div>
              <v-textarea
                name="mailBody"
                v-model="mailBody"
                autocomplete="off1"
                :rules="[rules.required, rules.max255]"
                color="#F79D20"
                outlined
                dense
              />

              <v-btn
                type="submit"
                class="text-capitalize"
                color="#ED8023"
                width="130"
                style="border-radius: 20px; height: 35px; color: white"
              >
                Send
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="4"> </v-col>
      </v-row>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios, { AxiosRequestConfig } from "axios";
import { Rules } from "@/assets/rules";

@Component
export default class Home extends Vue {
  valid = true;
  lazy = false;
  fullName = "";
  companyName = "";
  clientMail = "";
  mailBody = "";
  // rules
  rules = {
    required: Rules.required,
    alphabeticOnly: Rules.alphabeticOnly,
    max60: Rules.max60,
    max100: Rules.max100,
    max255: Rules.max255,
    email: Rules.email,
  };

  /**
   * Submit form for Netlify
   */
  async handleSubmit() {
    // if form is valid
    if (this.validateForm()) {
      let client = {
        fullName: this.fullName,
        companyName: this.companyName,
        clientMail: this.clientMail,
        mailBody: this.mailBody,
      };

      const axiosConfig: AxiosRequestConfig = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      axios
        .post(
          "/",
          this.encode({
            "form-name": "contact-us-form",
            ...client,
          }),
          axiosConfig
        )
        .then(() => {
          this.$router.push("success");
        })
        .catch(() => {
          this.$router.push("fail");
        });
      this.cleanForm();
    }
  }
  encode(data: any) {
    return Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
  }

  validateForm() {
    let formIsNotValid = !(this.$refs.form as Vue & {
      validate: () => boolean;
    }).validate();
    if (formIsNotValid) {
      return false;
    } else {
      return true;
    }
  }

  cleanForm() {
    (this.$refs.form as Vue & {
      reset: () => boolean;
    }).reset();
    this.fullName = "";
    this.companyName = "";
    this.clientMail = "";
    this.mailBody = "";
  }
}
</script>

<style scoped>
.contact-us-section {
  background-size: cover;
  height: 101vh;
  width: 100%;
}
</style>
