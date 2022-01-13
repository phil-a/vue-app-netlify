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
        class="d-flex align-xs-start align-sm-start align-md-start"
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
              
                <h3 class="h3 mt-8 mb-4">Event Information</h3>

                  <!-- Event Description -->
                  <v-textarea
                    name="eventDescription"
                    v-model="eventDescription"
                    label="Event Description"
                    hint="Please provide a short description of your event."
                    persistent-hint
                    autocomplete="off1"
                    :rules="[rules.required, rules.max255]"
                    color="#0067A0"
                    outlined
                    dense
                    class="mb-8"
                  />

                  <!-- Event Footprint -->
                  <v-text-field
                    name="eventFootprint"
                    v-model="eventFootprint"
                    label="Event Footprint"
                    autocomplete="off1"
                    :rules="[rules.required, rules.alphabeticOnly, rules.max60]"
                    color="#0067A0"
                    outlined
                    dense
                  />

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
                    v-model="eventStartMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="eventStartTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="eventStartTime"
                        label="Event Start Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="eventStartMenu"
                      v-model="eventStartTime"
                      full-width
                      @click:minute="$refs.menu.save(eventStartTime)"
                    ></v-time-picker>
                  </v-menu>

                  <!-- End time -->
                  <v-menu
                    ref="menu2"
                    v-model="eventEndMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="eventEndTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                    class="mb-8"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="eventEndTime"
                        label="Event End Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="eventEndMenu"
                      v-model="eventEndTime"
                      full-width
                      @click:minute="$refs.menu2.save(eventEndTime)"
                    ></v-time-picker>
                  </v-menu>

                  <!-- Activation Hours -->
                  <div class="mt-8">
                    <label>
                      <span>Activation Hours</span>
                    </label>
                    <v-slider
                      v-model="hoursPerClub"
                      label="Hours per Club"
                      thumb-color="#0067A0"
                      thumb-label="always"
                      min="1"
                      max="8"
                      step="1"
                      ticks="always"
                      tick-size="4"
                    ></v-slider>
                  </div>

                  <!-- Club Count -->
                  <div>
                    <label>
                      <span>Club Count</span>
                    </label>

                    <v-slider
                      v-model="storeCount"
                      label="Number of Clubs"
                      thumb-color="#0067A0"
                      thumb-label="always"
                    ></v-slider>
                  </div>

                  <!-- Activation Goal -->
                  <v-select
                    v-model="activationGoal"
                    :items="activationGoalSelections"
                    label="Activation Goal"
                    hint="Please select an activation goal"
                    class="mt-2 mb-4"
                  >
                  </v-select>

                  <!-- Sales Lift Product -->
                  <v-text-field
                    v-if="activationGoal == 'Sales Lift'"
                    name="salesLiftProduct"
                    v-model="salesLiftProduct"
                    label="Sales Lift Product(s)"
                    hint="If you selected 'Sales Lift' above, please list the product(s) below"
                    persistent-hint
                    autocomplete="off1"
                    :rules="[rules.required, rules.max100]"
                    color="#0067A0"
                    outlined
                    dense
                    class="mb-8"
                  />

                  <!-- file upload -->
                  <label>
                    <span>Rendering to show reality:</span>
                      <v-file-input
                      show-size
                      counter
                      label="File input"
                    ></v-file-input>
                  </label>

                <v-divider class="my-16"></v-divider>

                <h3 class="h3 mt-8 mb-4">Contact Information</h3>

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

                  <!-- Client Phone -->
                  <v-text-field
                    name="requesterPhone"
                    v-model="requesterPhone"
                    label="Your Phone"
                    autocomplete="off1"
                    :rules="[rules.required, rules.max100]"
                    color="#0067A0"
                    outlined
                    dense
                  />

                  <!-- Contact types -->
                  <v-select
                    :items="contactTypeSelections"
                    label="Contact Type"
                    hint="Please select an Contact type"
                  >
                  </v-select>

                  <!-- Suppliers -->

                  <v-textarea
                    name="supplierNames"
                    v-model="supplierNames"
                    label="Participating Suppliers"
                    hint="List all suppliers that will be participating"
                    persistent-hint
                    autocomplete="off1"
                    :rules="[rules.required, rules.max255]"
                    color="#0067A0"
                    outlined
                    dense
                  />

                  <!-- Member Communication -->
                  <v-select
                    :items="memberCommunicationSelections"
                    label="Member Communication Plan"
                    hint="Please select member communication plan"
                  >
                  </v-select>

                  <!-- Event types -->
                  <v-select
                    :items="eventTypeSelections"
                    label="Location of the event"
                    hint="Please select location of the event"
                  >
                  </v-select>


                <v-divider class="my-16"></v-divider>

                <h3 class="h3 mt-8 mb-4">Additional Details</h3>

                  <!-- COVID Protocols -->
                  <v-textarea
                    name="covidProtocol"
                    v-model="covidProtocol"
                    label="COVID Protocol"
                    hint="Please provide a short description of COVID Protocols."
                    persistent-hint
                    autocomplete="off1"
                    :rules="[rules.required, rules.max255]"
                    color="#0067A0"
                    outlined
                    dense
                  />

                  <!-- Capturing Data -->
                  <v-container fluid>
                    <v-radio-group
                      v-model="captureDataRadios"
                      mandatory
                      column
                    >
                    <template v-slot:label>
                      <div>Are you capturing data from attendee/member? If yes, detailed screenshots of the entire process for collection will need to be included with the Privacy Review Template if event moves to Event Intake</div>
                    </template>

                      <v-radio
                        label="Yes"
                        value="yes"
                      ></v-radio>
                      <v-radio
                        label="No"
                        value="no"
                      ></v-radio>
                    </v-radio-group>
                  </v-container>

                  <!-- Photo Use -->
                  <v-container fluid>
                    <v-radio-group
                      v-model="photoUseRadios"
                      mandatory
                      column
                    >
                    <template v-slot:label>
                      <div>Are you planning on leveraging photos/video from the event outside of your organization? If yes, a Photo Release form will be shared or required photo release sign will need to be created if event moves to Event Intake</div>
                    </template>

                      <v-radio
                        label="Yes"
                        value="yes"
                      ></v-radio>
                      <v-radio
                        label="No"
                        value="no"
                      ></v-radio>
                    </v-radio-group>
                  </v-container>

                  <!-- Sampling Food -->
                  <v-container fluid>
                    <v-radio-group
                      v-model="samplingFoodRadios"
                      mandatory
                      column
                    >
                    <template v-slot:label>
                      <div>Are you going to be sampling food?</div>
                    </template>

                      <v-radio
                        label="Yes"
                        value="yes"
                      ></v-radio>
                      <v-radio
                        label="No"
                        value="no"
                      ></v-radio>
                    </v-radio-group>
                  </v-container>

                  <!-- Sampling Food UPC -->
                  <v-text-field
                    name="samplingFoodUPC"
                    v-if="samplingFoodRadios == 'yes'"
                    v-model="samplingFoodUPC"
                    label="Sampling UPCs"
                    autocomplete="off1"
                    hint="If answered 'yes' above, please provide UPCs for food samples"
                    persistent-hint
                    :rules="[rules.max100]"
                    color="#0067A0"
                    outlined
                    dense
                  />

                  <!-- Sampling Adult Beverages -->
                  <v-container fluid>
                    <v-radio-group
                      v-model="samplingAdultBeveragesRadios"
                      mandatory
                      column
                    >
                    <template v-slot:label>
                      <div>Are you going to be sampling adult beverages?</div>
                    </template>

                      <v-radio
                        label="Yes"
                        value="yes"
                      ></v-radio>
                      <v-radio
                        label="No"
                        value="no"
                      ></v-radio>
                    </v-radio-group>
                  </v-container>

                  <!-- Sampling Adult Beverages -->
                  <v-container fluid>
                    <v-radio-group
                      v-model="samsMediaRadios"
                      mandatory
                      column
                    >
                    <template v-slot:label>
                      <div>Will this program be supported by Sam’s Club Media?</div>
                    </template>

                      <v-radio
                        label="Yes"
                        value="yes"
                      ></v-radio>
                      <v-radio
                        label="No"
                        value="no"
                      ></v-radio>
                    </v-radio-group>
                  </v-container>

                  <!-- Sweepstakes -->
                  <v-container fluid>
                    <v-radio-group
                      v-model="sweepstakesRadios"
                      mandatory
                      column
                    >
                    <template v-slot:label>
                      <div>Will there be a giveaway or sweepstakes included in the experience?</div>
                    </template>

                      <v-radio
                        label="Yes"
                        value="yes"
                      ></v-radio>
                      <v-radio
                        label="No"
                        value="no"
                      ></v-radio>
                    </v-radio-group>
                  </v-container>

                  <!-- Sweepstakes Details -->
          
                  <v-text-field
                    name="sweepstakesDetails"
                    class="mb-8"
                    v-model="sweepstakesDetails"
                    v-if="sweepstakesRadios == 'yes'"
                    label="Sweepstakes Details"
                    autocomplete="off1"
                    hint="If answered 'yes' above, please include details"
                    persistent-hint
                    :rules="[rules.max100]"
                    color="#0067A0"
                    outlined
                    dense
                  />

                  <!-- Event Description -->
                  <v-textarea
                    name="supplierQuestion"
                    v-model="supplierQuestion"
                    label="Supplier Question"
                    hint="You may add up to 1 supplier specific question to the NPS survey. Please note, the question should be product driven."
                    persistent-hint
                    autocomplete="off1"
                    :rules="[rules.max255]"
                    color="#0067A0"
                    outlined
                    dense
                  />

                  <!-- Confirm approval -->
                  <!-- <v-container fluid>
                    <v-checkbox v-model="approvalCheckbox">
                      <template v-slot:label>
                        <div>
                          I confirm that I have <strong>approval from a business owner</strong> to execute this event. This may include a merchant or services leader.
                        </div>
                      </template>
                    </v-checkbox>
                  </v-container> -->
                                
                <v-row justify="center">
                  <v-btn
                    type="submit"
                    class="text-capitalize form-button white--text mt-10"
                    color="#0067A0"
                    width="160"
                  >
                    Send
                  </v-btn>
                </v-row>
              </v-form>
            </div>

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
      eventStartTime: false,
      eventEndTime: false,
      captureDataRadios: false,
      photoUseRadios: false,
      samplingFoodRadios: false,
      samplingAdultBeveragesRadios: false,
      sweepstakesRadios: false,
      samsMediaRadios: false,
      approvalCheckbox: false,
      activationGoal: "",
     }
  }

  valid = true;
  lazy = false;
  captureDataRadios = false;
  photoUseRadios = false;
  samplingFoodRadios = false;
  sweepstakesRadios = false;
  samplingAdultBeveragesRadios = false;
  samsMediaRadios = false;
  approvalCheckbox = false;
  eventFootprint = "";
  requesterName = "";
  requesterEmail = "";
  requesterPhone = "";
  supplierNames = "";
  menuStartDate = "";
  menuEndDate = "";
  eventStartDate = "";
  eventEndDate = "";
  eventDescription = "";
  eventStartTime = "";
  eventEndTime = "";
  eventStartMenu = "";
  eventEndMenu = "";
  covidProtocol = "";
  sweepstakesDetails = "";
  salesLiftProduct = "";
  samplingFoodUPC = "";
  supplierQuestion = "";
  menu = "";
  menu2 = "";
  storeCount = "";
  hoursPerClub = "";
  file = null;
  activationGoal = "";

  eventTypeSelections=['Parking Lot', 'In Club', 'Sidewalk']
  activationGoalSelections=['Brand Awareness', 'Driving an Experience', 'Sales Lift']
  contactTypeSelections=['Supplier Contact', 'Execution Agency']
  memberCommunicationSelections=['Signage', 'Email', 'Local Social', 'Brand Social Channels']
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
        eventFootprint: this.eventFootprint,
        requesterName: this.requesterName,
        requesterEmail: this.requesterEmail,
        requesterPhone: this.requesterPhone,
        supplierNames: this.supplierNames,
        eventStartDate: this.eventStartDate,
        eventEndDate: this.eventEndDate,
        eventDescription: this.eventDescription,
        covidProtocol: this.covidProtocol,
        sweepstakesDetails: this.sweepstakesDetails,
        samplingFoodUPC: this.samplingFoodUPC,
        salesLiftProduct: this.salesLiftProduct,
        supplierQuestion: this.supplierQuestion
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
    this.eventFootprint = "";
    this.requesterName = "";
    this.requesterEmail = "";
    this.requesterPhone = "";
    this.eventDescription = "";
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

@media (max-width: 1263px) {
  .logo-size {
    position: relative;
  }
}

@media (min-width: 1264px) {
  .logo-size {
    position: fixed;
  }
}
</style>
