import actions from "./actions"
import mutations from "./mutations"


export default {
    namespace: true,
    state() {
        return {
            requests: []
        }
    },
    mutations,
    actions
} 