const SET_PARTNERS = 'SET_PARTNERS'
const ADD_PARTNER = 'ADD_PARTNER'

const initialState = {
    partners: []
}

const partnersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PARTNERS:
            return {
                partners: [...new Set(action.partners)]
            }

        case ADD_PARTNER:
            if(state.partners.indexOf(action.partner) === -1){
                return {
                    partners: [...state.partners, action.partner]
                }
            }
            return state
        default:
            return state
    }
}

export const setPartners = partners => ({type: SET_PARTNERS, partners})
export const addPartner = partner => ({type: ADD_PARTNER, partner})


export default partnersReducer