import { InfluxDB, Point } from '@influxdata/influxdb-client'

/** Environment variables **/
const url = 'http://localhost:8086'
const token = 'w_nws6RutgD5v0d4YlIlbkE80JkdgG3faLwIEZX6iCQCc0A3KfOnqRgnEsMBu3_Cq-c_NF_Lo8szyFIRSF6CUw==' 
const org = 'Demo'
const bucket = 'Electrical Parameters'

const influxDB = new InfluxDB({ url, token })

const writeApi = influxDB.getWriteApi(org, bucket)

writeApi.useDefaultTags({ region: 'west' })

function myFunction() {
    const point1 = new Point('Voltage')
      .tag('sensor_id', 'VL01')
      .floatField('value', Math.random() * 220)
    console.log(` ${point1}`)
    
    writeApi.writePoint(point1)
    
    
    const point2 = new Point('Current')
      .tag('sensor_id', 'CT01')
      .floatField('value', Math.random() * 5)
    console.log(` ${point2}`)
    
    writeApi.writePoint(point2)

    const point3 = new Point('Frequency')
      .tag('sensor_id', 'FR01')
      .floatField('value', Math.random() * 50)
    console.log(` ${point3}`)
    
    writeApi.writePoint(point3)

    const point4 = new Point('Phase')
      .tag('sensor_id', 'PH01')
      .floatField('value', Math.random() * 20)
    console.log(` ${point4}`)
    
    writeApi.writePoint(point4)

    const point5 = new Point('ROCOF')
      .tag('sensor_id', 'RF01')
      .floatField('value', Math.random() * 10)
    console.log(` ${point5}`)
    
    writeApi.writePoint(point5)
    
  }
  
const IntervalId = setInterval(myFunction, 1000)

// writeApi.close().then(() => {
//   console.log('WRITE FINISHED')
// })