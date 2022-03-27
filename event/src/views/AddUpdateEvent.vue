<template>
  <div>
    <h1>{{ getTitle() }}</h1>
    <form>
      <div class="form-group">
        <label for="projectName">Project Name</label>
        <input
          v-model="project_name"
          type="text"
          class="form-control"
          id="projectName"
        />
      </div>
      <div class="form-group">
        <label for="projectManager">Project Manager</label>
        <input
          type="text"
          v-model="project_manager"
          class="form-control"
          id="projectManager"
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect2">Project Start Date</label>
        <v-date-picker
          class="inline-block h-full form-control"
          v-model="project_start_date"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <input
              class="bg-white border px-2 py-1 rounded"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </v-date-picker>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect2">Project End Date</label>
        <v-date-picker
          class="inline-block h-full form-control"
          v-model="project_end_date"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <input
              class="bg-white border px-2 py-1 rounded"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </v-date-picker>
      </div>
      <button type="button" @click="save()" class="btn btn-primary">
        Save
      </button>
      <button type="button" @click="close()" class="btn btn-danger">
        Close
      </button>
      <button
        v-if="isUpdate == 1"
        type="button"
        @click="goToMileStone()"
        class="btn btn-success"
      >
        MileStones
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import { getdateString } from "./helper";
export default {
  name: "AddUpdateEvent",
  data: function () {
    return {
      project_name: "",
      project_manager: "",
      report_date: "",
      project_start_date: "",
      project_end_date: "",
      milestones: [],
      isUpdate: this.$route.params.isupdate,
    };
  },
  async mounted() {
    console.log(this.$route.params.isupdate);
    this.report_date = this.$route.params.eventdate;
    if (this.$route.params.isupdate == 1) {
      try {
        this.events = [];
        let res = await axios.get(
          `http://localhost:3000/event/${this.$route.params.id}`
        );
        let data = res.data;
        this.project_start_date = data.project_start_date;
        this.project_end_date = data.project_end_date;
        this.project_name = data.project_name;
        this.project_manager = data.project_manager;
        this.report_date = data.report_date;
        this.milestones = data.milestones;
        console.log(res.data);
      } catch (e) {
        this.events = [];
        console.error(e);
        alert("something went wrong");
      }
    } else {
      //save data
    }
  },

  methods: {
    async reloadMileStone() {
      try {
        this.events = [];
        let res = await axios.get(
          `http://localhost:3000/event/${this.$route.params.id}`
        );
        let data = res.data;
        this.milestones = data.milestones;
        console.log(res.data);
      } catch (e) {
        this.events = [];
        console.error(e);
        alert("something went wrong");
      }
    },
    async save() {
      console.log("project_start_date", this.project_start_date);

      if (
        this.project_manager == "" ||
        this.project_name == "" ||
        !this.project_start_date ||
        !this.project_end_date
      ) {
        alert("All field required");
      } else if (this.project_start_date > this.project_end_date) {
        alert("Project start date cannot be greater than end date ");
      } else {
        try {
          if (this.$route.params.isupdate == 1) {
            await this.reloadMileStone();
            let a = {
              project_name: this.project_name,
              project_manager: this.project_manager,
              report_date: getdateString(this.report_date),
              project_start_date: getdateString(this.project_start_date),
              project_end_date: getdateString(this.project_end_date),
              milestones: this.milestones,
            };
            console.log("manager", a);
            await axios.put(
              "http://localhost:3000/event/" + this.$route.params.id,
              a
            );
          } else {
            console.log("manager", this.project_manager);
            await axios.post("http://localhost:3000/event", {
              project_name: this.project_name,
              project_manager: this.project_manager,
              report_date: getdateString(this.report_date),
              project_start_date: getdateString(this.project_start_date),
              project_end_date: getdateString(this.project_end_date),
            });
          }
          this.$router.go(-1);
        } catch (e) {
          console.error(e);
          alert("something went wrong");
        }
      }
      // try {
      //     await axios.post(
      //       "http://localhost:3000/event/" + this.$route.params.id,
      //       {
      //         project_manager: this.project_manager,
      //         report_date: this.report_date,
      //         project_start_date: this.project_start_date,
      //         project_end_date: this.project_start_date,
      //       }
      //     );
      //     this.$router.go(-1);
      //   } catch (e) {
      //     console.error(e);
      //     alert("something went wrong");
      //   }
      // }
    },
    goToMileStone() {
      this.$router.push(`/milestone/${this.$route.params.id}`);
    },
    close() {
      this.$router.go(-1);
    },

    getTitle() {
      if (this.$route.params.isupdate == 1) {
        return "Update Event";
      } else {
        return "Add Event";
      }
    },
  },
};
</script>