import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://192.168.1.65:5001/api/limits'
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