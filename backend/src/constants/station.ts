export const StationStatusList = ['ativo', 'inativo', 'em_implantacao'] as const

export const CheckStationStatus = (
	item: string
): item is (typeof StationStatusList)[number] => {
	return StationStatusList.includes(item as (typeof StationStatusList)[number])
}
