import { z } from 'zod'
import {
	CheckStationStatus,
	StationStatusList
} from '../../../constants/station'

const digitsCheck = (length: number) =>
	z
		.string()
		.trim()
		.transform((v) => v.replace(/\D/g, ''))
		.refine((v) => v.length === length, {
			message: `Deve conter ${length} digitos`
		})

const nullableInt = z.preprocess(
	(v) => (v === '' ? null : v),
	z.coerce.number().int().nullable()
)

const nullableDate = z.preprocess((value) => {
	if (value === '' || value == null) {
		return null
	}
	return value
}, z.coerce.date().nullable())

export const UploadStationCsvSchema = z.object({
	cnpj: digitsCheck(14),
	nome_posto: z.string().trim(),
	nome_fantasia: z.string().trim().nullable().or(z.literal('')),
	bandeira: z
		.string()
		.trim()
		.transform((v) => v.toLowerCase()),
	combustiveis: z.string().transform((v) => [
		...new Set(
			v
				.split(',')
				.map((f) => f.trim().toLowerCase())
				.filter(Boolean)
		)
	]),
	status: z
		.string()
		.trim()
		.transform((v) => v.toLowerCase())
		.refine((v) => CheckStationStatus(v), {
			message: `Status deve ser: ${StationStatusList.join('ou ')}`
		}),

	data_inauguracao: nullableDate,
	numero_bicos: nullableInt,
	numero_pistas: nullableInt,
	observacoes: z.string().default('').nullable(),

	logradouro: z.string().trim(),
	numero: z.string().trim().nullable().or(z.literal('')),
	complemento: z.string().trim().nullable().default(''),
	bairro: z.string().trim(),
	municipio: z.string().trim(),
	uf: z
		.string()
		.trim()
		.transform((v) => v.toUpperCase())
		.refine((v) => v.length === 2, {
			message: `Deve conter 2 digitos`
		}),
	cep: digitsCheck(8),

	cpf_responsavel: digitsCheck(11),
	nome_responsavel: z.string().trim(),
	email_responsavel: z.email().nullable().or(z.literal('')),
	cargo_responsavel: z.string().trim().nullable().or(z.literal(''))
})
