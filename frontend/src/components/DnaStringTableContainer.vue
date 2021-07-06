<template>
  <table class="table mt-5">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Content</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entry, i) in dnaStringList" :key="i">
        <th scope="row">{{ ++i }}</th>
        <td>{{ entry.content }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { DnaStructureDto } from "@/models";

@Component({})
export default class Home extends Vue {
  @State dnaStringList!: Array<DnaStructureDto>;
}
</script>

<style></style>
