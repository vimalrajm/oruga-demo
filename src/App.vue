<template>
   <o-table
   :data="tableData"
   customRowKey="id"
   :sticky-header="true"
   :backendFiltering="true"
    >
    <o-table-column
        v-for="column in columns"
        v-bind="column"
        #default="{ row }"
        :key="column.field">
        {{ row[column.field]}}
    </o-table-column>
  </o-table>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import _ from 'lodash';
import uuid from 'uuid/v4';

export default defineComponent({
  setup() {
    const data = ref([
      {

        first_name: 'Jesse',
        last_name: 'Simmons',
        date: '2016-10-15 13:43:27',
        gender: 'Male',
      },
      {

        first_name: 'John',
        last_name: 'Jacobs',
        date: '2016-12-15 06:00:53',
        gender: 'Male',
      },
      {

        first_name: 'Tina',
        last_name: 'Gilbert',
        date: '2016-04-26 06:26:28',
        gender: 'Female',
      },
      {

        first_name: 'Clarence',
        last_name: 'Flores',
        date: '2016-04-10 10:28:46',
        gender: 'Male',
      },
      {

        first_name: 'Anne',
        last_name: 'Lee',
        date: '2016-12-06 14:38:38',
        gender: 'Female',
      },
      {

        first_name: 'Jesse',
        last_name: 'Simmons',
        date: '2016-10-15 13:43:27',
        gender: 'Male',
      },
      {

        first_name: 'John',
        last_name: 'Jacobs',
        date: '2016-12-15 06:00:53',
        gender: 'Male',
      },
      {

        first_name: 'Tina',
        last_name: 'Gilbert',
        date: '2016-04-26 06:26:28',
        gender: 'Female',
      },
      {

        first_name: 'Clarence',
        last_name: 'Flores',
        date: '2016-04-10 10:28:46',
        gender: 'Male',
      },
      {

        first_name: 'Anne',
        last_name: 'Lee',
        date: '2016-12-06 14:38:38',
        gender: 'Female',
      },
      {

        first_name: 'Jesse',
        last_name: 'Simmons',
        date: '2016-10-15 13:43:27',
        gender: 'Male',
      },
      {

        first_name: 'John',
        last_name: 'Jacobs',
        date: '2016-12-15 06:00:53',
        gender: 'Male',
      },
      {

        first_name: 'Tina',
        last_name: 'Gilbert',
        date: '2016-04-26 06:26:28',
        gender: 'Female',
      },
      {

        first_name: 'Clarence',
        last_name: 'Flores',
        date: '2016-04-10 10:28:46',
        gender: 'Male',
      },
      {

        first_name: 'Anne',
        last_name: 'Lee',
        date: '2016-12-06 14:38:38',
        gender: 'Female',
      },
    ]);

    const columns = ref([
      {
        field: 'id',
        label: 'ID',
        width: '40',
        numeric: true,
      },
      {
        field: 'first_name',
        label: 'First Name',
      },
      {
        field: 'last_name',
        label: 'Last Name',
      },
      {
        field: 'date',
        label: 'Date',
        position: 'centered',
      },
      {
        field: 'gender',
        label: 'Gender',
        tdAttrs: () => ({ class: 'bg-red' }),
        sticky: true,
      },
    ]);

    const state = reactive({
      mfTableElem: {},
      tableData: [],
    });

    const triggerFunction = _.debounce(async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          data.value.forEach((d) => {
            const newObj = _.cloneDeep(d);
            state.tableData.push({ ...newObj, id: uuid() });
          });
          resolve();
        }, 2000);
      });
    }, { leading: true });

    onMounted(() => {
      data.value.forEach((d) => {
        const newObj = d;
        state.tableData.push({ ...newObj, id: uuid() });
      });
      [state.mfTableElem] = document.getElementsByClassName('o-table__wrapper');
      console.log('state.....', state.mfTableElem);
      state.mfTableElem.addEventListener('scroll', async (event) => {
        const {
          clientHeight,
          scrollTop,
          scrollHeight,
        } = event.target;
        // console.log('?????????????', { clientHeight, scrollTop, scrollHeight });
        if ((clientHeight + scrollTop) > (scrollHeight - 96)) {
          await triggerFunction();
        }
      });
    });

    const getColumns = computed(() => columns.value);

    return {
      data,
      columns,
      ...toRefs(state),
      getColumns,
    };
  },
});
</script>

<style lang="scss">
td {
  height: 32px;
  padding: 8px;
}
.o-table__wrapper {
  max-height: 500px;
  overflow: scroll !important;
}
.bg-red {
  background-color: red;
}
</style>
