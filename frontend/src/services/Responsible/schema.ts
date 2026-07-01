import z from 'zod'

import { formatCPF } from '@/utilities/formatters'

export const ResponsibleSchema = z.object({
	id: z.coerce.number(),
	cpf: z
		.string()
		.trim()
		.transform((v) => formatCPF(v)),
	name: z.string().trim(),
	email: z.string().trim().nullable(),
	position: z.string().trim().nullable(),
	quantity_station: z.string().trim().default('0')
})
