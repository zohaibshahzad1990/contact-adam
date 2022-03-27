<template>
  <div>
    <h1>{{ getTitle() }}</h1>
    <form class="form-inline">
      <label class="sr-only" for="projectName">Task Name</label>
      <input
        v-model="task_name"
        type="text"
        class="form-control mb-2 mr-sm-2"
        id="projectName"
      />

      <label for="projectManager">Task Status </label>
      <select class="form-control mb-2 mr-sm-2" v-model="task_status">
        <option value="Completed">Completed</option>
        <option value="Started">Started</option>
        <option value="Not Completed">Not Completed</option>
      </select>

      <label for="exampleFormControlSelect2">Assign To</label>
      <select class="form-control mb-2 mr-sm-2" v-model="assign_to">
        <option
          v-for="(chunk, rowIndex) in assignToList"
          :key="`row-${rowIndex}`"
          :value="chunk"
        >
          {{ chunk }}
        </option>
      </select>

      <label for="exampleFormControlSelect2">Deadline</label>
      <v-date-picker
        class="inline-block h-full form-control mb-2 mr-sm-2"
        v-model="deadline"
      >
        <template v-slot="{ inputValue, inputEvents }">
          <input
            class="bg-white border px-2 py-1 rounded"
            :value="inputValue"
            v-on="inputEvents"
          />
        </template>
      </v-date-picker>
      <button
        type="button"
        @click="saveMileStone()"
        class="btn btn-primary m-2"
      >
        Save
      </button>
      <button type="button" @click="save()" class="btn btn-primary">
        Save All
      </button>
      <button type="button" @click="close()" class="btn btn-danger m-2">
        Close
      </button>
    </form>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Task Name</th>
          <th scope="col">Status</th>
          <th scope="col">Assign To</th>
          <th scope="col">Deadline</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(chunk, rowIndex) in mileStones" :key="`row-${rowIndex}`">
          <td>{{ chunk.task_name }}</td>
          <td>{{ chunk.task_status }}</td>
          <td>{{ chunk.assign_to }}</td>
          <td>{{ chunk.deadline }}</td>
          <td>
            <button
              type="button"
              @click="updateRow(rowIndex)"
              class="m-2 btn btn-primary"
            >
              Edit
            </button>
            <button
              type="button"
              @click="deleteRow(rowIndex)"
              class="btn btn-primary"
            >
              Deleted
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import { getdateString } from "./helper";
export default {
  name: "MileStone",
  data: function () {
    return {
      task_name: "",
      assign_to: "",
      rowIndex: -1,
      task_status: "",
      deadline: "",
      eventId: "",
      mileStones: [],
      assignToList: [],
      project_name: "",
      project_manager: "",
      report_date: "",
      project_start_date: "",
      project_end_date: "",
    };
  },
  async mounted() {
    console.log(this.$route.params.isupdate);

    this.eventId = this.$route.params.id;
    this.mileStones = [];
    if (this.eventId != "0") {
      // call api to fill data
      let res = await axios.get(
        `http://localhost:3000/event/${this.$route.params.id}`
      );
      let data = res.data;
      if (data.milestones && data.milestones.length > 0) {
        this.mileStones = data.milestones;
      }
      this.project_start_date = data.project_start_date;
      this.project_end_date = data.project_end_date;
      this.project_name = data.project_name;
      this.project_manager = data.project_manager;
      this.report_date = data.report_date;

      let resuser = await axios.get(`http://localhost:3000/user/getmany`);
      let userData = resuser.data;
      this.assignToList = [];
      userData.forEach((element) => {
        this.assignToList.push(element.username);
      });
    }
  },
  methods: {
    saveMileStone() {
      if (this.taskName == "" || this.taskStatus == "" || !this.deadline) {
        alert("All field required");
      } else {
        if (this.rowIndex == -1) {
          this.mileStones.push({
            task_name: this.task_name,
            assign_to: this.assign_to,
            task_status: this.task_status,
            deadline: getdateString(this.deadline),
          });
          this.clearAllFields();
        } else {
          Vue.set(this.mileStones, this.rowIndex, {
            task_name: this.task_name,
            assign_to: this.assign_to,
            task_status: this.task_status,
            deadline: getdateString(this.deadline),
          });
          this.rowIndex = -1;
          this.clearAllFields();
        }
      }
    },
    clearAllFields() {
      this.task_name = "";
      this.assign_to = "";
      this.task_status = "";
      this.deadline = "";
    },
    async save() {
      console.log(this.mileStones);
      if (this.mileStones.length == 0) {
        return;
      } else {
        try {
          await axios.put(
            "http://localhost:3000/event/" + this.$route.params.id,
            {
              project_name: this.project_name,
              project_manager: this.project_manager,
              report_date: this.report_date,
              project_start_date: this.project_start_date,
              project_end_date: this.project_start_date,
              milestones: this.mileStones,
            }
          );
          alert("saved!");
        } catch (e) {
          console.error(e);
          alert("something went wrong");
        }
      }
    },
    updateRow(index) {
      this.rowIndex = index;
      this.task_name = this.mileStones[index].task_name;
      this.assign_to = this.mileStones[index].assign_to;
      this.task_status = this.mileStones[index].task_status;
      this.deadline = this.mileStones[index].deadline;
    },
    deleteRow(index) {
      this.mileStones.splice(index, 1);
    },
    close() {
      this.$router.go(-1);
    },

    getTitle() {
      if (this.eventId != "0") {
        return "MileStone";
      } else {
        return "Add MileStone";
      }
    },
  },
};
</script>