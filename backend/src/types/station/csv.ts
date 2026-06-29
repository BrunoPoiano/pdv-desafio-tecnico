import z from 'zod'
import { UploadStationCsvSchema } from '../../service/station/csv/schema'
import { StationAddress, StationResponsible, Station } from '../types'

export type UploadStationCsv = z.infer<typeof UploadStationCsvSchema>

export type FixedStationCsvData = {
	responsiblePerson: Omit<StationResponsible, 'id'>
	stations: {
		address: Omit<StationAddress, 'id'>
		station: Omit<Station, 'id' | 'address_id' | 'responsible_person_id'>
		fuel: string[]
	}[]
}
