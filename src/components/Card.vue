<template>
    <div class="container">
        <div :class="'col-' + col">
            <div class="card mb-3">
                <div class="card-header" v-if="title">
                    <i v-if="icon" :class="icon"></i>
                    {{ title }}
                </div>

                <div class="card-body">
                    <slot name="body"></slot>
                </div>

                <div class="card-footer" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardComponent',
    props: ['col', 'title', 'icon']
}
</script>

<style></style>