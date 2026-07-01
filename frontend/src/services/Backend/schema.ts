import z from 'zod'

export const BackendHealthSchema = z.object({
	message: z.string().trim().default(''),
	app: z.string().trim().default(''),
	node: z.string().trim().default('')
})
