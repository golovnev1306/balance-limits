import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://192.168.1.65:5001/api/payments'
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