import { $ZodError } from 'zod/v4/core'
import {
	FixedStationCsvData,
	UploadStationCsv
} from '../../../types/station/csv'
import { UploadStationCsvSchema } from './schema'
import { IMPORT_BATH_SIZE } from './constants'

export function fixCsvData(
	cvData: Array<UploadStationCsv>,
	bachIndex: number,
	added: { value: number },
	errors: Map<string, string[]>
) {
	const users = new Map<string, FixedStationCsvData>()
	let index = 1

	for (const line of cvData) {
		const item = UploadStationCsvSchema.safeParse(line)

		if (item.success) {
			let user = users.get(item.data.cpf_responsavel)

			if (!user) {
				user = {
					responsiblePerson: {
						cpf: item.data.cpf_responsavel,
						name: item.data.nome_responsavel,
						email: item.data.email_responsavel,
						position: item.data.cargo_responsavel
					},
					stations: []
				}
				users.set(item.data.cpf_responsavel, user)
			}

			user.stations.push({
				address: addresses(item.data),
				station: stations(item.data),
				fuel: item.data.combustiveis
			})
			added.value++
		} else {
			const linenumber = (bachIndex * IMPORT_BATH_SIZE + index + 1).toString()
			errors.set(linenumber, FormatIssue(item.error.issues))
		}
		index++
	}

	return [...users.values()]
}

function FormatIssue(issues: $ZodError['issues']) {
	return issues.map((item) => `${String(item.path[0])} - ${item.message}`)
}

function addresses(
	cvData: UploadStationCsv
): FixedStationCsvData['stations'][number]['address'] {
	return {
		street: cvData.logradouro,
		number: cvData.numero,
		complement: cvData.complemento,
		neighborhood: cvData.bairro,
		city: cvData.municipio,
		state: cvData.uf,
		zip_code: cvData.cep
	}
}

function stations(
	cvData: UploadStationCsv
): FixedStationCsvData['stations'][number]['station'] {
	return {
		cnpj: cvData.cnpj,
		legal_name: cvData.nome_posto,
		trade_name: cvData.nome_fantasia,
		brand: cvData.bandeira,
		inauguration_date: cvData.data_inauguracao,
		nozzle_count: cvData.numero_bicos,
		lane_count: cvData.numero_pistas,
		status: cvData.status,
		notes: cvData.observacoes
	}
}
