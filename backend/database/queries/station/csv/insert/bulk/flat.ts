import { FixedStationCsvData } from '../../../../../../types/station/csv'
import { generateAddressKey } from './address'
import { AddressRow, ResponsibleRow, Stations } from './types'

export default function flatItems(csvData: Array<FixedStationCsvData>) {
	const fuels = new Set<string>()
	const responsible = new Map<string, ResponsibleRow>()
	const addresses = new Map<string, AddressRow>()
	const stations: Array<Stations> = []

	for (const item of csvData) {
		responsible.set(item.responsiblePerson.cpf, item.responsiblePerson)

		for (const st of item.stations) {
			const addrKey = generateAddressKey(st.address)

			addresses.set(addrKey, st.address)

			stations.push({
				station: st.station,
				addressKey: addrKey,
				responsibleCpf: item.responsiblePerson.cpf,
				fuels: st.fuel
			})

			for (const f of st.fuel) {
				fuels.add(f)
			}
		}
	}

	return {
		fuels: [...fuels],
		responsible: [...responsible.values()],
		addresses: [...addresses.entries()],
		stations
	}
}
