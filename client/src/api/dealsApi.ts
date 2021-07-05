import axios from 'axios'
import {ResponseImportDealsEconomy} from '../types'
import {SERVER_URL} from '../constants'

const instance = axios.create({
	baseURL: `${SERVER_URL}/api/deals`
})

const dealsApi = {
	getDeals: () => {
		return instance.get('')
	},
	add: (values: any) => {
		return instance.post('', {...values})
	},
	delete: (dealId: number) => {
		return instance.delete(`?dealId=${dealId}`)
	},
	update: (values: any) => {
		return instance.put('', {...values})
	},
	importEconomy: (values: any) => {
		return instance.post<ResponseImportDealsEconomy>('importEconomy', values)
	},
	deleteFile: () => {
		return instance.delete('deleteFile')
	},
	checkFile: () => {
	return instance.get('checkFile')
},
}

export default dealsApi