import type { StationResponsible, TableHeader } from '@/types'

export const header: TableHeader<StationResponsible> = [
	{
		title: '#',
		value: 'id'
	},
	{
		title: 'CPF',
		value: 'cpf'
	},
	{
		title: 'Nome',
		value: 'name'
	},
	{
		title: 'Email',
		value: 'email'
	},
	{
		title: 'Cargo',
		value: 'position'
	},
	{
		title: 'Qdte de Postos',
		value: 'quantity_station'
	}
] as const
