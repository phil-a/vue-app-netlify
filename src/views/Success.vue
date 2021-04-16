<template>
  <section class="section-background">
    <v-row justify="center" class="pa-5 fill-height">
      <!-- left side -->
      <v-col
        xs="8"
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
            <v-spacer v-show="$vuetify.breakpoint.xl" style="padding: 200px" />
            <!-- spacer lg only -->
            <v-spacer v-show="$vuetify.breakpoint.lg" style="padding: 150px" />
          </v-col>
        </v-row>
      </v-col>
      <!-- right side -->
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
            class="d-flex align-content-sm-start align-content-md-start align-content-lg-center align-content-xl-center flex-wrap"
          >
            <!-- icon -->
            <v-row justify="center" class="hidden-sm-and-down">
              <v-img
                src="@/assets/icon-OK.webp"
                max-height="150"
                max-width="150"
                class="mb-16"
              />
            </v-row>

            <!-- card -->
            <div class="form-box">
              <!-- horizontal lines -->
              <v-row justify="end">
                <hr style="width: 100px; border: 2px solid #ed8023" />
              </v-row>
              <v-spacer class="mt-7" />
              <v-row justify="end">
                <hr
                  style="
                    width: 200px;
                    border: 2px solid #ed8023;
                    margin-right: 30px;
                  "
                />
              </v-row>
              <v-spacer class="mb-10" />

              <!-- form icon -->
              <v-row justify="center">
                <v-img
                  src="@/assets/icon-FORM.webp"
                  max-height="100"
                  max-width="70"
                  class=""
                />
              </v-row>
              <v-spacer class="mb-10" />

              <!-- text -->
              <v-row justify="center">
                <div class="text-h4 font-weight-medium">Thanks ;)</div>
              </v-row>
              <v-spacer class="mb-5" />
              <v-row justify="center">
                <div class="text-h5 font-weight-light">
                  Your message has been sent.
                </div>
              </v-row>
              <v-spacer class="mb-10" />

              <!-- button -->
              <v-row justify="center">
                <v-btn
                  class="text-capitalize form-button white--text"
                  color="#ED8023"
                  width="130"
                  @click="goBack()"
                  depressed
                >
                  Back
                </v-btn>
              </v-row>
              <v-spacer class="mb-10" />
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

@Component
export default class Success extends Vue {
  goBack() {
    this.$router.push("/");
  }
}
</script>

<style scoped>
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
    max-width: 170px;
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
