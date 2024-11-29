<template>
  <RightList :list="list" />
</template>

<script>
import RightList from "./RightList.vue";
export default {
  data() {
    return {
      list: [
        { name: "list1", selected: false, children: [] },
        {
          name: "list2",
          selected: false,
          children: [
            { name: "list2-1", selected: false, children: [] },
            { name: "list2-2", selected: false, children: [] },
            {
              name: "list2-3",
              selected: false,
              children: [
                { name: "list2-3-1", selected: false, children: [] },
                { name: "list2-3-2", selected: false, children: [] },
                { name: "list2-3-3", selected: false, children: [] },
                { name: "list2-3-4", selected: false, children: [] },
              ],
            },
            { name: "list2-4", selected: false, children: [] },
          ],
        },
        { name: "list3", selected: true, children: [] },
        { name: "list4", selected: false, children: [] },
      ],
    };
  },
  components: {
    RightList,
  },
};
</script>

<style>
</style>