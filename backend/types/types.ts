import { StationStatusList } from '../constants/station'

export type StationStatus = (typeof StationStatusList)[number]

export type StationResponsible = {
	id: number
	cpf: string
	name: string
	email: string | null
	position: string | null
}

export type StationAddress = {
	id: number
	street: string
	number: string | null
	complement: string | null
	neighborhood: string
	city: string
	state: string
	zip_code: string
}

export type Station = {
	id: number
	cnpj: string
	legal_name: string
	trade_name: string | null
	brand: string
	address_id: number
	responsible_person_id: number
	inauguration_date: Date | null
	nozzle_count: number | null
	lane_count: number | null
	status: StationStatus
	notes: string | null
}

export type StationFuel = {
	station_id: number
	fuel_id: number
}
