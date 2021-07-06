<template>
  <v-container class="content">
    <v-form fill-height v-model="valid">
      <v-row align="center" justify="center">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="dnaString"
            :rules="nameRules"
            label="Enter DNA String"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="2" md="2">
          <v-text-field
            type="number"
            min="0"
            v-model="searchDistance"
            label="Fuzzysearch distance"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="2" md="2">
          <v-btn
            block
            depressed
            elevation="2"
            rounded
            color="success"
            sm
            :disabled="!valid"
            @click="save()"
            >Save</v-btn
          >
        </v-col>

        <v-col cols="2" md="2">
          <v-btn
            block
            depressed
            elevation="2"
            rounded
            color="success"
            sm
            :disabled="!valid"
            @click="search()"
            >SEARCH</v-btn
          >
        </v-col>

        <v-col cols="2" md="2">
          <v-btn
            block
            depressed
            elevation="2"
            rounded
            color="red"
            sm
            @click="clear()"
            >CLEAR</v-btn
          >
        </v-col>
      </v-row>
    </v-form>

    <DnaStringTableContainer />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DnaStringTableContainer from "./DnaStringTableContainer.vue";
import DataHandler from "../services/DataHandler";
import { store } from "@/store";

@Component({
  components: {
    DnaStringTableContainer,
  },
})
export default class Home extends Vue {
  dnaString = "";
  searchDistance = 0;
  valid = false;
  public dataHandler = new DataHandler();

  nameRules = [
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    (v: string) => !!v || "Name is required",
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    (v: string) =>
      v.toUpperCase().match(/(?![ACTG])./g) == null ||
      "DNA string can only contain ACTG characters",
  ];

  mounted(): void {
    this.loadDisplayList();
  }

  public save(): void {
    DataHandler.postDnaStringsToDatabase(this.dnaString.toUpperCase()).then((_response) => this.loadDisplayList())
      .catch((error) => alert(error.response.data));
  }

  public search(): void {
    DataHandler.getAllDnaStringsbySearchParameters(this.dnaString.toUpperCase(), this.searchDistance)
      .then((response: any) => store.commit("updateDnaStringList", response.data))
      .catch((error) => alert(error.response.data));
  }

  public clear(): void {
    this.loadDisplayList();
    this.dnaString = "";
    this.searchDistance = 0;
  }

  private loadDisplayList(): void {
    DataHandler.getAllDnaStringsFromDatabase()
      .then((response: any) => store.commit("updateDnaStringList", response.data))
      .catch((error) => alert(error.response.data));
  }
}
</script>

<style scoped></style>
