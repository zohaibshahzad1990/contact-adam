<template>
  <div class="bg-light p-5 rounded">
    <!-- <vc-calendar /> -->
    <button type="button" class="btn btn-primary" @click="goToSearchPage()">
      Search
    </button>
    <br />

    <v-date-picker is-expanded :attributes="attributes" @dayclick="dayClick" />
  </div>
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
      events: [],
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
  },

  components: {},
};
</script>
