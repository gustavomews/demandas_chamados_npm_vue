<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col" v-for="header, key in headers" :key="key">{{ header.title }}</th>
                <th v-for="button, key in buttons" :key="key">{{ button.title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr :class="d.status_codename ? '' + d.status_codename : ''" v-for="d, keyd in data" :key="keyd">
                <td :class="'align-middle'" v-for="header, key in headers" :key="key">
                    <span v-if="key == 'id'"><b>{{ d[key] }}</b></span>
                    <span v-else-if="header.type == 'text'">{{ d[key] }}</span>
                    <span v-else-if="header.type == 'badge'" :class="'badge bg-' + d.status_codename">{{ d[key] }}</span>
                    <span v-else-if="header.type == 'datetime'">{{ d[key] | formatDateTime }}</span>
                </td>
                <td :class="'align-middle'" v-for="button, key in buttons" :key="key">
                    <router-link :to="button.url + d[button.col]"><a :class="'btn btn-' + d.status_codename">{{ button.title
                    }}</a></router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'TableComponent',
    props: ['headers', 'data', 'buttons'],
    mounted() {
    }
}
</script>

<style></style>