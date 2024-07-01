<template>
    <section>
        <CoachFilter @change-filter="setFilters" />
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline">Refresh</base-button>
                <base-button to="/register">Register as Coach</base-button>
            </div>
            <ul v-if="hasCoaches">
                <CoachItem v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id" :first-name="coach.firstName"
                    :last-name="coach.lastName" :rate="coach.hourlyRate" :areas="coach.areas" />
            </ul>
            <h3 v-else>No Coaches Found</h3>
        </base-card>
    </section>
</template>

<script>
import CoachItem from './CoachItem.vue';
import CoachFilter from './filters/CoachFilter.vue';

export default {
    components: {
        CoachItem,
        CoachFilter
    },
    data() {
        return {
            activeFilters: {
                frontend: true,
                backend: true,
                career: true,
            }
        }
    },
    methods: {
        setFilters(updatedFilters) {
            console.log('setFilters - activeFilters', this.activeFilters)
            console.log('setFilters - updatedFilters', updatedFilters)
            this.activeFilters = updatedFilters;
        }
    },
    computed: {
        filteredCoaches() {
            return this.$store.getters['coaches/coaches']
                .filter(coach =>
                    (this.activeFilters.frontend && coach.areas.includes('frontend'))
                    || (this.activeFilters.backend && coach.areas.includes('backend'))
                    || (this.activeFilters.career && coach.areas.includes('career'))
                );
        },
        hasCoaches() {
            return this.$store.getters['coaches/hasCoaches']
        }
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
    box-sizing: border-box;
}

html {
    font-family: "Roboto", "sans-serif";
}

body {
    margin: 0;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>
