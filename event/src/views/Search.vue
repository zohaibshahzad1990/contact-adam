<template>
  <div>
    <form class="form-inline">
      <label class="sr-only" for="inlineFormInputName2"></label>
      <input
        type="text"
        class="form-control mb-2 mr-sm-2"
        id="inlineFormInputName2"
        v-model="search"
      />

      <button type="submit" class="btn btn-primary m-2" @click="searchClick">
        Search
      </button>
      <button type="button" @click="close()" class="btn btn-danger m-2">
        Close
      </button>
    </form>

    <table v-if="searchResults.length > 0" class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Project Name</th>
          <th scope="col">Project Manager</th>
          <th scope="col">Report Date</th>
          <th scope="col">Start Date</th>
          <th scope="col">End Date</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(chunk, rowIndex) in searchResults" :key="`row-${rowIndex}`">
          <td>{{ chunk.project_name }}</td>
          <td>{{ chunk.project_manager }}</td>
          <td>{{ chunk.report_date }}</td>
          <td>{{ chunk.project_start_date }}</td>
          <td>{{ chunk.project_end_date }}</td>
          <td>
            <button
              type="button"
              @click="updateEvent(chunk.report_date, chunk._id)"
              class="m-2 btn btn-primary"
            >
              Edit
            </button>
            <button
              type="button"
              @click="deleterow(chunk._id)"
              class="btn btn-primary"
            >
              Deleted
            </button>
            <!-- <button
              type="button"
              @click="goToMileStone(chunk._id)"
              class="btn btn-primary m-2"
            >
              MileStone
            </button> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Search",
  data: function () {
    return {
      searchResults: [],
      search: "",
    };
  },
  mounted() {},
  methods: {
    async searchClick() {
      this.searchResults = [];
      try {
        let result = await axios.get(
          "http://localhost:3000/event/search/" + this.search
        );
        this.searchResults = result.data;
      } catch (ex) {
        this.searchResults = [];
      }
    },
    updateEvent(day, id) {
      this.$router.push(`/addupdateevent/${day}/1/${id}`);
    },
    async deleterow(id) {
      try {
        await axios.delete("http://localhost:3000/event/" + id);
        await this.searchClick();
      } catch (ex) {
        this.searchResult = [];
      }
    },
    goToMileStone(id) {
      this.$router.push(`/milestone/${id}`);
    },
    close() {
      this.$router.go(-1);
    },
  },
};
</script>