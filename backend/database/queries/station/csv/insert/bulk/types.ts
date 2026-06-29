import { FixedStationCsvData } from '../../../../../../types/station/csv'

export type ResponsibleRow = FixedStationCsvData['responsiblePerson']
export type AddressRow = FixedStationCsvData['stations'][number]['address']
export type StationRow = FixedStationCsvData['stations'][number]['station']
export type Stations = {
	station: StationRow
	addressKey: string
	responsibleCpf: string
	fuels: string[]
}
