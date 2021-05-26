import {ReturnActionsType} from "../types";

const initialState = {
    partners: [] as string[]
}

type PartnersActionsType = ReturnActionsType<typeof actions>

const partnersReducer = (state = initialState, action: PartnersActionsType) => {
    switch (action.type) {
        case "SET_PARTNERS":
            return {
                partners: [...new Set(action.partners)]
            }

        case "ADD_PARTNER":
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


const actions = {
    setPartners: (partners: string[]) => ({type: "SET_PARTNERS", partners} as const),
    addPartner: (partner: string) => ({type: "ADD_PARTNER", partner} as const)
}

export const {addPartner, setPartners} = actions

export default partnersReducer