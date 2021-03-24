import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://192.168.1.65:5001/api/deals'
})

const dealsApi = {
	getDeals: () => {
		return instance.get('')
	},
	add: values => {
		return instance.post('', {...values})
	},
	delete: dealId => {
		return instance.delete(`?dealId=${dealId}`)
	},
	update: values => {
		return instance.put('', {...values})
	}
}

export default dealsApi