import axios from 'axios'
import {SERVER_URL} from '../constants'

const instance = axios.create({
	baseURL: `${SERVER_URL}/api/payments`
})

const paymentsApi = {
	get: () => {
		return instance.get('')
	},
	add: values => {
		return instance.post('', values)
	},
	delete: dealId => {
		return instance.delete(`?paymentId=${dealId}`)
	},
	update: values => {
		return instance.put('', values)
	},
	import: values => {
		return instance.post('/import', values)
	},
}

export default paymentsApi