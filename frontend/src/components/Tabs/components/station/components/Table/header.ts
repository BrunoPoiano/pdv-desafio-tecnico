import type { Station, TableHeader } from '@/types'

export const header: TableHeader<Station> = [
	{ title: '#', value: 'id' },
	{ title: 'CNPJ', value: 'cnpj' },
	{ title: 'Nome', value: 'legal_name' },
	{ title: 'Nome Fantasia', value: 'trade_name' },
	{ title: 'Responsavel', value: 'responsible' },
	{ title: 'Bandeira', value: 'brand' },
	{ title: 'Inauguracao', value: 'inauguration_date' },
	{ title: 'Qtde Bicos', value: 'nozzle_count' },
	{ title: 'Qtde Pistas', value: 'lane_count' },
	{ title: 'Status', value: 'status' },
	{ title: 'Combustiveis', value: 'fuels' },
	{ title: 'Observacoes', value: 'notes' },
	{ title: 'Endereço', value: 'address' }
] as const
