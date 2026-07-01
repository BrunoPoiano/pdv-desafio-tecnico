export function formatCNPJ(cnpj: string) {
	const newCnpj = cnpj.replace(/\D/g, '')

	if (newCnpj.length !== 14) {
		return newCnpj
	}
	return newCnpj.replace(
		/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
		'$1.$2.$3/$4-$5'
	)
}

export function formatCPF(cpf: string) {
	const newCpf = cpf.replace(/\D/g, '')

	return newCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export function formatarCEP(cep: string) {
	const newCep = cep.replace(/\D/g, '')

	if (newCep.length !== 8) {
		return cep
	}

	return newCep.replace(/^(\d{5})(\d{3})/, '$1-$2')
}
