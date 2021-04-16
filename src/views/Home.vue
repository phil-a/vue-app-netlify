<template>
  <section class="section-background">
    <v-row justify="center" class="pa-5 fill-height">
      <!-- logo toucan -->
      <v-col
        xs="10"
        sm="10"
        md="6"
        lg="6"
        xl="6"
        class="d-flex align-xs-end align-sm-end align-md-end align-lg-center align-xl-center"
      >
        <v-row justify="center">
          <v-col>
            <!-- logo toucan -->
            <v-row justify="center">
              <v-img src="@/assets/logo.png" class="mt-10 logo-size" />
            </v-row>

            <!-- spacer xl only -->
            <v-spacer v-show="$vuetify.breakpoint.xl" style="padding: 300px" />
            <!-- spacer lg only -->
            <v-spacer v-show="$vuetify.breakpoint.lg" style="padding: 150px" />
          </v-col>
        </v-row>
      </v-col>
      <!-- contact form -->
      <v-col
        xs="8"
        sm="10"
        md="10"
        lg="5"
        xl="5"
        class="d-flex align-xs-start align-sm-start align-md-start align-lg-center align-xl-center"
      >
        <v-row class="fill-height">
          <v-col
            class="d-flex align-content-sm-start align-content-md-space-between align-content-lg-center align-content-xl-space-between flex-wrap"
          >
            <!-- empty div -->
            <div style="height: 10px; width: 100%" class="hidden-sm-only"></div>
            <!-- form box -->
            <div class="form-box">
              <div class="text-h2 yellow--text text--darken-3 text-center">
                Get in Touch!
              </div>
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
                <v-text-field
                  name="fullName"
                  v-model="fullName"
                  label="Your Full Name:"
                  autocomplete="off1"
                  :rules="[rules.required, rules.alphabeticOnly, rules.max60]"
                  color="#F79D20"
                  outlined
                  dense
                />

                <!-- Company Name -->
                <v-text-field
                  name="companyName"
                  v-model="companyName"
                  label="Your Company:"
                  autocomplete="off1"
                  :rules="[rules.required, rules.max100]"
                  color="#F79D20"
                  outlined
                  dense
                />

                <!-- Client Email -->
                <v-text-field
                  name="clientMail"
                  v-model="clientMail"
                  label="Your email:"
                  autocomplete="off1"
                  :rules="[rules.required, rules.email, rules.max100]"
                  color="#F79D20"
                  outlined
                  dense
                />

                <!-- Mail Text -->
                <v-textarea
                  name="mailBody"
                  v-model="mailBody"
                  label="Tell us what you need:"
                  autocomplete="off1"
                  :rules="[rules.required, rules.max255]"
                  color="#F79D20"
                  outlined
                  dense
                />

                <v-row justify="center">
                  <v-btn
                    type="submit"
                    class="text-capitalize form-button white--text"
                    color="#ED8023"
                    width="130"
                    depressed
                  >
                    Send
                  </v-btn>
                </v-row>
              </v-form>
            </div>
            <!-- anteater -->
            <v-row
              justify="center"
              class="mt-15 hidden-lg-only hidden-sm-and-down"
            >
              <v-col align-self="end">
                <!-- spacer md only -->
                <v-spacer
                  v-show="$vuetify.breakpoint.md"
                  style="padding: 100px"
                />
                <!-- anteater -->
                <v-row justify="center">
                  <v-img
                    src="@/assets/anteater.webp"
                    max-height="390"
                    max-width="500"
                    class="mt-10"
                  />
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <!-- empty column - only lg, xl -->
      <v-col lg="1" xl="1" class="hidden-md-and-down"> </v-col>
    </v-row>
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

<style scoped type="scss">
::v-deep .v-text-field--outlined .v-label {
  color: #f9a825;
}
.v-text-field--outlined >>> fieldset {
  border-color: #d8d8d8;
  border-radius: 10px;
}
.form-box {
  width: 100%;
  background-color: white;
  border: 2px solid #ed8023;
  border-radius: 17px;
  box-shadow: 20px 20px #ed8023;
  padding: 60px 60px 40px 60px;
  height: min-content;
}
.form-button {
  border-radius: 10px;
  border: 2px solid #fda63f;
  height: 35px;
}

@media (max-width: 599px) {
  .section-background {
    background-color: #ed8023;
    background-size: cover;
    height: 120vh;
    width: 100%;
  }
  .logo-size {
    max-height: 90px;
    max-width: 150px;
  }
}
@media (min-width: 600px) {
  .section-background {
    background-image: url("../assets/contact-background.webp");
    background-size: cover;
    height: 102vh;
    width: 100%;
  }

  .logo-size {
    max-height: 390px;
    max-width: 500px;
  }
}
</style>
