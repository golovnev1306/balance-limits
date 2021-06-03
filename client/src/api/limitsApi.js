import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:5001/api/limits'
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