import { Transform } from 'node:stream'
import { getStreamedCsvJson } from '../../../database/queries/station/csv/get/getStream'

export async function generateCsv() {
	let headerSent = false
	const headers = [
		'cnpj',
		'nome_posto',
		'nome_fantasia',
		'bandeira',
		'logradouro',
		'numero',
		'complemento',
		'bairro',
		'municipio',
		'uf',
		'cep',
		'cpf_responsavel',
		'nome_responsavel',
		'email_responsavel',
		'cargo_responsavel',
		'combustiveis',
		'status',
		'data_inauguracao',
		'numero_bicos',
		'numero_pistas',
		'observacoes'
	] as const

	const passthrough = new Transform({
		readableObjectMode: false,
		writableObjectMode: true,
		transform(row: Record<string, unknown>, _, callback) {
			if (!headerSent) {
				this.push(headers.join(';') + '\n')
				headerSent = true
			}

			const line = headers.map((h) => escapeCsv(row[h])).join(';')
			this.push(line + '\n')
			callback()
		}
	})

	getStreamedCsvJson((row) => passthrough.write(row))
		.then(() => passthrough.end())
		.catch((err) => passthrough.destroy(err))

	return passthrough
}

function escapeCsv(value: unknown): string {
	if (value == null) return ''

	const str = String(value)

	if (/[";,\n\r]/.test(str)) {
		return `"${str.replace(/"/g, '""')}"`
	}

	return str
}
