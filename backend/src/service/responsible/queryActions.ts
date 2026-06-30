import { listStationResponsible } from '../../database/queries/stationResponsible/list'

export async function getListStationResponsible() {
	return await listStationResponsible()
}
