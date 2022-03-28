<!--<template>
  <div class="bg-light p-5 rounded">
    
    <button type="button" class="btn btn-primary" @click="goToSearchPage()">
      Search
    </button>
    <br />

    <v-date-picker is-expanded :attributes="attributes" @dayclick="dayClick" />
  </div>
</template>-->

<template>
  <div>
    <div class="bg-light p-5 rounded">
      <!-- <vc-calendar /> -->
      <button type="button" class="btn btn-primary" @click="goToSearchPage()">
        Search
      </button>
      <br />

      <v-date-picker
        is-expanded
        :attributes="attributes"
        @dayclick="dayClick"
      />
    </div>

    <div class="row mt-4">
      <div class="col-md-6">
        <h1>Upcoming events</h1>
        <table v-if="upcomingEvents.length > 0" class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Project Name</th>
              <th scope="col">Project Manager</th>
              <th scope="col">Report Date</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(chunk, rowIndex) in upcomingEvents"
              :key="`row-${rowIndex}`"
            >
              <td>{{ chunk.project_name }}</td>
              <td>{{ chunk.project_manager }}</td>
              <td>{{ chunk.report_date }}</td>
              <td>{{ chunk.project_start_date }}</td>
              <td>{{ chunk.project_end_date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <h1>Managers</h1>
        <div class="row">
          <div
            class="card col-md-3"
            v-for="(chunk, rowIndex) in managers"
            :key="`row-${rowIndex}`"
          >
            <img class="card-img-top" :src="mangerImage" alt="Card image cap" />
            <div class="card-body">
              <p class="card-text">
                {{ chunk.project_manager }}
              </p>
            </div>
          </div>
          <!-- <div class="card col-md-3">
            <img class="card-img-top" :src="mangerImage" alt="Card image cap" />
            <div class="card-body">
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div class="card col-md-3">
            <img class="card-img-top" :src="mangerImage" alt="Card image cap" />
            <div class="card-body">
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div class="card col-md-3">
            <img class="card-img-top" :src="mangerImage" alt="Card image cap" />
            <div class="card-body">
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>

  <!--<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>-->
</template>


<script>
// @ is an alias to /src
// const date = new Date();
// const year = date.getFullYear();
// const month = date.getMonth();
import axios from "axios";
export default {
  name: "Home",
  data: function () {
    return {
      selectedDate: null,
      upcomingEvents: [],
      events: [],
      mangerImage: require("../assets/manager.jpg"),
      managers: [],
    };
  },
  computed: {
    dates() {
      return this.events.map((day) => day.date);
    },
    attributes() {
      return this.dates.map((date) => ({
        highlight: true,
        dates: date,
      }));
    },
  },

  methods: {
    goToSearchPage() {
      this.$router.push("/search");
    },
    goToAddEventPage() {
      this.$router.push("/addevent/" + 0);
    },
    dayClick(day) {
      // this.events.push({
      //   id: day.id,
      //   date: day.date,
      // });

      const idx = this.events.findIndex((d) => d.id === day.id);
      if (idx >= 0) {
        // got to edit event
        this.$router.push(
          `/addupdateevent/${day.id}/1/${this.events[idx]._id}`
        );
      } else {
        //add event
        this.$router.push(`/addupdateevent/${day.id}/0/0`);
        // this.events.push({
        //   id: day.id,
        //   date: day.date,
        // });
      }
    },
  },
  async mounted() {
    try {
      this.events = [];
      let res = await axios.get("http://localhost:3000/event/getmany");
      res.data.forEach((e) => {
        console.log(e);
        this.events.push({
          id: e.report_date,
          _id: e._id,
          date: new Date(e.report_date),
        });
      });
    } catch (e) {
      this.events = [];
      console.error(e);
      alert("something went wrong");
    }

    this.upcomingEvents = [];
    try {
      let result = await axios.get(
        "http://localhost:3000/event/upcoming/events"
      );
      this.upcomingEvents = result.data;
    } catch (ex) {
      this.upcomingEvents = [];
    }

    this.managers = [];
    try {
      let result = await axios.get("http://localhost:3000/event/manager/top4");
      this.managers = result.data;
    } catch (ex) {
      this.managers = [];
    }
  },

  components: {},
};
</script>
