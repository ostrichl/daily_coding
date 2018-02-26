export default (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENR':
            return state - 1
        default:
            return state
    }
}