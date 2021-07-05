import axios from 'axios'
import {SERVER_URL} from '../constants'

const instance = axios.create({
	baseURL: `${SERVER_URL}/api/limits`
})

const limitsApi = {
	getAll: () => {
		return instance.get('')
	},
	add: ({...rest}) => {
		return instance.post('', {...rest})
	},
	delete: limitId => {
		return instance.delete(`?limitId=${limitId}`)
	},
	update: values => {
		return instance.put('', {...values})
	}
}

export default limitsApi