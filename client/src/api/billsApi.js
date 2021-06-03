import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:5001/api/bills'
})

const billsApi = {
	getDealsByLimit: idLimit => {
		return instance.get(`byDeal/&idLimit=${idLimit}`)
	},
	getBills: () => {
		return instance.get('')
	},
	add: values => {
		return instance.post('', {...values})
	},
	delete: dealId => {
		return instance.delete(`?billId=${dealId}`)
	},
	update: values => {
		return instance.put('', {...values})
	}
}

export default billsApi