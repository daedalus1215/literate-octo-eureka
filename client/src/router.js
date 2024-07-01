import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/coach-list/CoachesList.vue';
import CoachRegistration from './pages/coaches/coach-registration/CoachRegistration.vue'

import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';

// Tell it the type of routes we want to support.
export const router = createRouter({
    // History tells the router how to handle the history 
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id',
            component: CoachDetail,
            props: true,
            children: [
                { path: 'contact', component: ContactCoach }
            ]
        },
        { path: '/register', component: CoachRegistration },
        { path: '/requests', component: RequestsReceived },
        { path: '/:notFound(.*)', component: NotFound }
    ],
    linkActiveClass: 'active',
    scrollBehavior(to, from, savedPosition) {
        // Called by the vue router, whenever our page changes. It receives 3 arguments: to, from, and savedPosition.
        // console.log('to', to);
        // console.log('from', from,);
        // console.log('savedPosition', savedPosition);
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0 }
    }
});

/**
 * Built in function, it is called by the vue router when we are navigating from our route to another.
 * It receives 3 arguments, 
 * to = , 
 * from = , 
 * next = we call this to confirm, or cancel the navigation action. We can deny a user, if they are not authenticated.
 */
router.beforeEach((to, from, next) => {
    // next(false) // cancel our navigation
    console.log('Can determine if we have auth from the meta, ', to.meta.needsAuth)
    next(); // just behave normally
});

/**
 * Example of always forcing users to team-members route. 
 * We do need to check if we are heading there first. Otherwise we will cause an infinite loop.
 */
// router.beforeEach((to, from, next) => {
//     if (to.name === 'team-members') {
//         next();
//     }else {
//         next({name: 'team-members', params: {teamId: 't2'}})
//     }
// });


/**
 * Cannot deny a navigation here, because routing has already happened. But could send analytic data to the BE here.
 */
router.afterEach(() => {
    console.log('global after each')
});
