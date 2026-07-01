export const IMPORT_BATH_SIZE = Number(process.env.IMPORT_BATH_SIZE) || 100
export const EXPORT_BATH_SIZE = Number(process.env.EXPORT_BATH_SIZE) || 100

export const csvHeader = [
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
