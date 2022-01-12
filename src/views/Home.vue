<template>
  <section class="section-background">
    <v-row justify="center" class="pa-5 fill-height">
      <!-- logo sams -->
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
            <!-- logo sam's -->
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
              <div class="text-h4 blue--text text--darken-3 text-center">
                Event Submission
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

                <!-- Program Name -->
                <v-text-field
                  name="programName"
                  v-model="programName"
                  label="Your Program Name"
                  autocomplete="off1"
                  :rules="[rules.required, rules.alphabeticOnly, rules.max60]"
                  color="#0067A0"
                  outlined
                  dense
                />

                <!-- Company Name -->
                <v-text-field
                  name="requesterCompanyName"
                  v-model="requesterCompanyName"
                  label="Your Company Name"
                  autocomplete="off1"
                  :rules="[rules.required, rules.max100]"
                  color="#0067A0"
                  outlined
                  dense
                />

                <!-- Name -->
                <v-text-field
                  name="requesterName"
                  v-model="requesterName"
                  label="Your Name"
                  autocomplete="off1"
                  :rules="[rules.required, rules.max100]"
                  color="#0067A0"
                  outlined
                  dense
                />

                <!-- Client Email -->
                <v-text-field
                  name="requesterEmail"
                  v-model="requesterEmail"
                  label="Your Email"
                  autocomplete="off1"
                  :rules="[rules.required, rules.email, rules.max100]"
                  color="#0067A0"
                  outlined
                  dense
                />

                <!-- Event types -->
                <v-select
                  :items="eventTypeSelections"
                  label="Event Type"
                  hint="Please select an event type"
                >
                </v-select>

              <!-- Start date -->
              <v-menu
                      ref="menuStartDate"
                      v-model="menuStartDate"
                      :close-on-content-click="true"
                      :return-value.sync="menuStartDate"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="eventStartDate"
                          label="Event Start Date"
                          prepend-icon="mdi-calendar"
                          hint="Note: Should be at least 6 weeks from submission date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="eventStartDate"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menuStartDate = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menuStartDate.save(menuStartDate)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>

                  <!-- End Date -->
                  <v-menu
                      ref="menuEndDate"
                      v-model="menuEndDate"
                      :close-on-content-click="true"
                      :return-value.sync="menuEndDate"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="eventEndDate"
                          label="Event End Date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="eventEndDate"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menuEndDate = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menuEndDate.save(menuEndDate)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>

                    <!-- Start time -->
                    <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="eventTime"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="eventTime"
                          label="Event Time"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="eventTime"
                        full-width
                        @click:minute="$refs.menu.save(eventTime)"
                      ></v-time-picker>
                    </v-menu>

                    <!-- Target Markets -->
                    <v-text-field
                      name="targetMarkets"
                      v-model="targetMarkets"
                      label="Target Markets"
                      autocomplete="off1"
                      :rules="[rules.required, rules.max100]"
                      color="#0067A0"
                      outlined
                      dense
                    />

                    <!-- Store Count -->
                    <label>
                    <span>Store Count</span>
                    </label>

                  <v-slider
                    v-model="storeCount"
                    label="Number of Stores"
                    thumb-color="#0067A0"
                    thumb-label="always"
                  ></v-slider>

                <!-- Event Overview -->
                <v-textarea
                  name="eventOverview"
                  v-model="eventOverview"
                  label="Event Overview"
                  hint="Please provide a short description of your event."
                  persistent-hint
                  autocomplete="off1"
                  :rules="[rules.required, rules.max255]"
                  color="#0067A0"
                  outlined
                  dense
                />

                <!-- Target Category -->
                <v-textarea
                  name="targetCategory"
                  v-model="targetCategory"
                  label="Target Category"
                  hint="Which categories are you targetting for supplier integration?"
                  persistent-hint
                  autocomplete="off1"
                  :rules="[rules.required, rules.max255]"
                  color="#0067A0"
                  outlined
                  dense
                />

                <!-- Target Category -->
                <v-textarea
                  name="targetSuppliers"
                  v-model="targetSuppliers"
                  label="Target Suppliers"
                  hint="Please provide details if you have specific suppliers confirmed."
                  persistent-hint
                  autocomplete="off1"
                  :rules="[rules.required, rules.max255]"
                  color="#0067A0"
                  outlined
                  dense
                />

                <!-- Additional Marketing -->
                <v-textarea
                  name="additionalMarketing"
                  v-model="additionalMarketing"
                  label="Additional Marketing"
                  hint="Please provide marketing/promotional tactics: website, social promotion, influencers, etc."
                  persistent-hint
                  autocomplete="off1"
                  :rules="[rules.required, rules.max255]"
                  color="#0067A0"
                  outlined
                  dense
                />

              <!-- Confirm approval -->
              <v-container fluid>
                <v-checkbox v-model="checkbox">
                  <template v-slot:label>
                    <div>
                      I confirm that I have <strong>approval from a business owner</strong> to execute this event. This may include a merchant or services leader.
                    </div>
                  </template>
                </v-checkbox>
              </v-container>


                <!-- file upload -->
                <label>
                  <span>Add file:</span>
                    <v-file-input
                    show-size
                    counter
                    multiple
                    label="File input"
                  ></v-file-input>
                </label>

                <v-row justify="center">
                  <v-btn
                    type="submit"
                    class="text-capitalize form-button white--text"
                    color="#0067A0"
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

  data = () => {
    return {
      eventStartDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      eventEndDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menuStartDate: false,
      menuEndDate: false,
      eventTime: null,
      menu2: false,

     }
  }

  valid = true;
  lazy = false;
  programName = "";
  requesterCompanyName = "";
  requesterName = "";
  requesterEmail = "";
  menuStartDate = "";
  menuEndDate = "";
  eventStartDate = "";
  eventEndDate = "";
  eventOverview = "";
  targetCategory = "";
  targetSuppliers = "";
  additionalMarketing = "";
  eventTime = "";
  menu2 = "";
  storeCount = "";
  targetMarkets = "";
  file = null;

  eventTypeSelections=['Parking Lot', 'In Store', 'Sidewalk', 'Food Truck']
  dateFormatted = "";
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
        programName: this.programName,
        requesterCompanyName: this.requesterCompanyName,
        requesterName: this.requesterName,
        requesterEmail: this.requesterEmail,
        eventStartDate: this.eventStartDate,
        eventEndDate: this.eventEndDate,
        eventOverview: this.eventOverview,
        targetMarkets: this.targetMarkets,
        targetCategory: this.targetCategory,
        targetSuppliers: this.targetSuppliers,
        additionalMarketing: this.additionalMarketing
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
    this.programName = "";
    this.requesterCompanyName = "";
    this.requesterName = "";
    this.requesterEmail = "";
    this.eventOverview = "";
    this.targetMarkets = "";
    this.targetCategory = "";
    this.targetSuppliers = "";
    this.additionalMarketing = "";
  }
}
</script>

<style scoped type="scss">
::v-deep .v-text-field--outlined .v-label {
  color: #0067A0;
}
.v-text-field--outlined >>> fieldset {
  border-color: #d8d8d8;
  border-radius: 10px;
}
.section-background {
  background-image: url("../assets/background.jpg");
  background-size: cover;
  min-height: 100%;
  height: auto;
  width: 100%;
}
.form-box {
  width: 100%;
  background-color: white;
  border: 3px solid #0067A0;
  border-radius: 17px;
  box-shadow: 20px 20px #0067A0;
  padding: 60px 60px 40px 60px;
  height: min-content;
}
.form-button {
  border-radius: 10px;
  border: 2px solid #0067A0;
  height: 35px;
}

@media (max-width: 599px) {
  .logo-size {
    max-height: 90px;
    max-width: 150px;
  }
}
@media (min-width: 600px) {
  .logo-size {
    max-height: 390px;
    max-width: 500px;
  }
}
</style>
