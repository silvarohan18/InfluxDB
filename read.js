import { InfluxDB, Point } from '@influxdata/influxdb-client';

const url = 'http://localhost:8086';
const token = 'w_nws6RutgD5v0d4YlIlbkE80JkdgG3faLwIEZX6iCQCc0A3KfOnqRgnEsMBu3_Cq-c_NF_Lo8szyFIRSF6CUw==';
const org = 'Demo';
const bucket = 'Electrical Parameters';

const influxDB = new InfluxDB({ url, token })
const queryApi = new influxDB.getQueryAPI(org)
queryApi.useDefaultTags({ region: 'west' })

const fluxQuery = `from(bucket:${bucket}) |> range(start: 0) |> filter(fn: (r) => r._measurement == "Voltage")`;

const myQuery = async () => {
  for await (const { values, tableMeta } of queryApi.queryRows(fluxQuery)) {
    const o = tableMeta.toObject(values);
    console.log(
      `${o._time} ${o._measurement} in (${o.sensor_id}): ${o._field}=${o._value} ${o.region}=${o.west}`
    );
  }
};

myQuery();

