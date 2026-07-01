import { z } from 'zod'

import { formatarCEP, formatCNPJ } from '@/utilities/formatters'

const nullableInt = z.preprocess(
	(v) => (v === '' ? null : v),
	z.coerce.number().int().nullable()
)

const nullableDate = z.preprocess((value) => {
	if (!value || value === '') {
		return null
	}

	if (typeof value === 'string') {
		return new Date(value).toLocaleString('pt-br', {
			month: '2-digit',
			year: 'numeric',
			day: '2-digit'
		})
	}

	return value
}, z.coerce.string().nullable())

export const AddressSchema = z.object({
	street: z.string().trim(),
	number: z.string().trim(),
	complement: z.string().trim(),
	neighborhood: z.string().trim(),
	city: z.string().trim(),
	state: z.string().trim(),
	zip_code: z
		.string()
		.trim()
		.transform((v) => formatarCEP(v))
})

export const StationSchema = z.object({
	id: z.string().trim(),
	cnpj: z
		.string()
		.trim()
		.transform((v) => formatCNPJ(v)),
	legal_name: z.string().trim(),
	trade_name: z.string().trim().nullable().or(z.literal('')),
	inauguration_date: nullableDate,
	nozzle_count: nullableInt,
	lane_count: nullableInt,
	brand: z.string().trim().default(''),
	fuels: z.string().trim().default(''),
	status: z.string().trim(),
	responsible: z.string().trim().default(''),

	notes: z.string().default('').nullable(),
	address: AddressSchema
})

const ErrosReturn = z.object({
	linha: z.string().trim(),
	erros: z.array(z.string().trim())
})

export const InsertSchema = z.object({
	massage: z.string().trim(),
	erros: z.array(ErrosReturn)
})
