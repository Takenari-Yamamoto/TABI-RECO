<template>
  <v-list
    id="side_list"
    rounded
    class="blue-grey lighten-5"
  >
    <v-list-item-group
      v-model="selectedItem"
      color="primary"
      active-class="border"
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.link"
        class="white"
        @click="create(item.text) "
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.text" />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
import axios from 'axios';

export default {
  data: () => ({
    selectedItem: 0,
    items: [
      { text: 'My Page', icon: 'mdi-account'},
      { text: 'Create', icon: 'mdi-pencil' },
      { text: 'List', icon: 'mdi-book-open-variant', link: '/list'},
      { text: 'Recommendation', icon: 'mdi-thumb-up-outline', link: '/recommendation'},
      { text: 'Support', icon: 'mdi-help-circle-outline', link: '/support' },
    ],
  }),
  methods: {
    create(text) {
      if (text === "Create") {
        const dictation = {
          content: '',
          title: 'no title',
        };
        axios
          .post('/api/dictation', dictation)
          .then(res => {
          this.$router.push('/Dictation/'+ res.data.id);
          });
      } 
    }
  }
};
</script>

<style>

.border {
  border: 3px dashed;
}

</style>