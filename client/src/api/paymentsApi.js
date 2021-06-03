import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:5001/api/payments'
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