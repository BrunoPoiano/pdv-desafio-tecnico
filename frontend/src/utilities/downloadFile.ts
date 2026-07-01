export async function downloadFile(obj: Blob | MediaSource) {
	const url = URL.createObjectURL(obj)

	const a = document.createElement('a')
	a.href = url
	a.download = 'estacoes.csv'
	document.body.append(a)
	a.click()
	a.remove()

	URL.revokeObjectURL(url)
}
