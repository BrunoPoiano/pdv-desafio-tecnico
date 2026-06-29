export const CSV_STATION_SELECT = `
  SELECT    stations.cnpj                                             AS cnpj,
            stations.legal_name                                       AS nome_posto,
            stations.trade_name                                       AS nome_fantasia,
            stations.brand                                            AS bandeira,
            st_add.street                                             AS logradouro,
            st_add.number                                             AS numero,
            st_add.complement                                         AS complemento,
            st_add.neighborhood                                       AS bairro,
            st_add.city                                               AS municipio,
            st_add.state                                              AS uf,
            st_add.zip_code                                           AS cep,
            st_resp.cpf                                               AS cpf_responsavel,
            st_resp.NAME                                              AS nome_responsavel,
            st_resp.email                                             AS email_responsavel,
            st_resp.position                                          AS cargo_responsavel,
            string_agg(DISTINCT fuels.NAME, ', ' order BY fuels.NAME) AS combustiveis,
            stations.status                                           AS status,
            to_char(stations.inauguration_date, 'DD/MM/YYYY')         AS data_inauguracao ,
            stations.nozzle_count                                     AS numero_bicos ,
            stations.lane_count                                       AS numero_pistas,
            stations.notes                                            AS observacoes
  FROM      station_responsible st_resp
  JOIN      stations
  ON        st_resp.id = stations.responsible_person_id
  JOIN      station_address st_add
  ON        stations.address_id = st_add.id
  LEFT JOIN station_fuels st_fuel
  ON        st_fuel.station_id = stations.id
  LEFT JOIN fuels
  ON        st_fuel.fuel_id = fuels.id
  GROUP BY  stations.id,
            stations.cnpj,
            stations.legal_name,
            stations.trade_name,
            stations.brand,
            st_add.street,
            st_add.number,
            st_add.complement,
            st_add.neighborhood,
            st_add.city,
            st_add.state,
            st_add.zip_code,
            st_resp.cpf,
            st_resp.NAME,
            st_resp.email,
            st_resp.position,
            stations.status,
            stations.inauguration_date,
            stations.nozzle_count,
            stations.lane_count,
            stations.notes;
`
