<template>
    <ul class="pagination float-right">
        <li v-for="l, key in links" :key="key" :class="l.active ? 'page-item active' : 'page-item'"
            @click="functionPaginate(l)">
            <a class="page-link" v-html="l.label"></a>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'PaginationComponent',
    props: ['links', 'functionPaginate']
}
</script>

<style></style>