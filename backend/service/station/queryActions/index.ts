import { getCsvJson } from "../../../database/queries/station/csv/get/get";
import { saveStationCsv } from "../../../database/queries/station/csv/insert";
import { listStations } from "../../../database/queries/station/list";
import { FixedStationCsvData } from "../../../types/station/csv";

export async function saveStationCsvData(csv: FixedStationCsvData[]) {
  await saveStationCsv(csv);
}

export async function getParsedCsvData() {
  return await getCsvJson();
}
