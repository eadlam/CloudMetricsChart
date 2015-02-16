AWS.config.update({
  accessKeyId: '[accessKeyId]', 
  secretAccessKey: '[secretAccessKey]'
});
AWS.config.region = 'us-east-1';


function Metrics(service, type){
  this.data = [];
  this.connection = new AWS.CloudWatch();
  this.params = {
    Period: 60,
    Namespace: 'AWS/' + service,
    MetricName: type,
    Statistics: [ 'SampleCount', 'Average', 'Sum', 'Minimum', 'Maximum']
  };
};

Metrics.prototype.load = function(endTime, minutes, callback){

  var self = this;

  self.data = [];

  self.params.EndTime = endTime;
  self.params.StartTime = new Date(endTime - (minutes * 60000));

  self.connection.getMetricStatistics(self.params, function(err, data) {
    console.log(self.params.MetricName, data);
    if (err){
      console.log(err, err.stack); // an error occurred
      callback(err, err.stack);
    } else{
      self.data = data.Datapoints;
      self.data.sort(function(a, b){
        var d1 = new Date(a.Timestamp);
        var d2 = new Date(b.Timestamp);
        return d1-d2; // d2-d1 for descending order
      });
      callback("ok");
    }
  });
};

Metrics.prototype.setDimensions = function(dimensions){
  this.params.Dimensions = dimensions;
};

Metrics.prototype.getTableData = function(header){
  var tableData = [header];
  for(i in this.data){
    var row = [];
    for(h in header){
      var fieldName = header[h];
      row.push(this.data[i][fieldName]);
    }
    tableData.push(row);
  }
  return tableData;

};

Metrics.Test5 = [ { minutes: 1, rps: 1016.9, cents: 2 },
  { minutes: 2, rps: 1077.79, cents: 2 },
  { minutes: 3, rps: 887.3, cents: 1 },
  { minutes: 4, rps: 1072.98, cents: 2 },
  { minutes: 5, rps: 1038.06, cents: 2 },
  { minutes: 6, rps: 1582.4, cents: 3 },
  { minutes: 7, rps: 1291.68, cents: 2 },
  { minutes: 8, rps: 1178.54, cents: 2 },
  { minutes: 9, rps: 1083.25, cents: 2 },
  { minutes: 10, rps: 977.26, cents: 1 },
  { minutes: 11, rps: 937.88, cents: 1 },
  { minutes: 12, rps: 831.91, cents: 1 },
  { minutes: 13, rps: 776.48, cents: 1 },
  { minutes: 14, rps: 2053.42, cents: 6 },
  { minutes: 15, rps: 817.23, cents: 1 },
  { minutes: 16, rps: 2064.64, cents: 6 },
  { minutes: 17, rps: 2126.55, cents: 6 },
  { minutes: 18, rps: 2491.07, cents: 10 },
  { minutes: 19, rps: 1713.09, cents: 3 },
  { minutes: 20, rps: 1975.77, cents: 4 },
  { minutes: 21, rps: 2286.84, cents: 10 },
  { minutes: 22, rps: 2631.69, cents: 10 },
  { minutes: 23, rps: 3108.54, cents: 10 },
  { minutes: 24, rps: 3408.66, cents: 10 },
  { minutes: 25, rps: 3415.94, cents: 10 },
  { minutes: 26, rps: 3460.82, cents: 10 },
  { minutes: 27, rps: 3423.69, cents: 10 },
  { minutes: 28, rps: 3507.51, cents: 10 },
  { minutes: 29, rps: 3422.72, cents: 10 },
  { minutes: 30, rps: 3285.19, cents: 10 },
  { minutes: 31, rps: 1104.3, cents: 2 },
  { minutes: 32, rps: 2095.83, cents: 6 },
  { minutes: 33, rps: 2166.63, cents: 6 },
  { minutes: 34, rps: 1081.67, cents: 2 },
  { minutes: 35, rps: 1323.96, cents: 2 },
  { minutes: 36, rps: 541.98, cents: 1 },
  { minutes: 37, rps: 1251.43, cents: 2 },
  { minutes: 38, rps: 1297.88, cents: 2 },
  { minutes: 39, rps: 1356.93, cents: 2 },
  { minutes: 40, rps: 1898.71, cents: 4 },
  { minutes: 41, rps: 1287.09, cents: 2 },
  { minutes: 42, rps: 1325.61, cents: 2 },
  { minutes: 43, rps: 1338.93, cents: 2 },
  { minutes: 44, rps: 1476.24, cents: 2 },
  { minutes: 45, rps: 1336.8, cents: 2 },
  { minutes: 46, rps: 3698.92, cents: 10 },
  { minutes: 47, rps: 3908.39, cents: 10 },
  { minutes: 48, rps: 3898.15, cents: 10 },
  { minutes: 49, rps: 3789.42, cents: 10 },
  { minutes: 50, rps: 3833.71, cents: 10 },
  { minutes: 51, rps: 3895.92, cents: 10 },
  { minutes: 52, rps: 3776.96, cents: 10 },
  { minutes: 53, rps: 2877.25, cents: 10 },
  { minutes: 54, rps: 3027.85, cents: 10 },
  { minutes: 55, rps: 3599.16, cents: 10 },
  { minutes: 56, rps: 958.43, cents: 1 },
  { minutes: 57, rps: 1169.38, cents: 2 },
  { minutes: 58, rps: 970.96, cents: 1 },
  { minutes: 59, rps: 1124.44, cents: 2 },
  { minutes: 60, rps: 1049.91, cents: 2 },
  { minutes: 61, rps: 1122.34, cents: 2 },
  { minutes: 62, rps: 1070.43, cents: 2 },
  { minutes: 63, rps: 1133.62, cents: 2 },
  { minutes: 64, rps: 954.54, cents: 1 },
  { minutes: 65, rps: 1149.49, cents: 2 },
  { minutes: 66, rps: 1122.18, cents: 2 },
  { minutes: 67, rps: 1220.65, cents: 2 },
  { minutes: 68, rps: 1066.54, cents: 2 },
  { minutes: 69, rps: 1123.48, cents: 2 },
  { minutes: 70, rps: 1156.46, cents: 2 },
  { minutes: 71, rps: 3915.68, cents: 10 },
  { minutes: 72, rps: 3679.88, cents: 10 },
  { minutes: 73, rps: 3757.6, cents: 10 },
  { minutes: 74, rps: 3829.71, cents: 10 },
  { minutes: 75, rps: 3978.07, cents: 10 },
  { minutes: 76, rps: 4068.01, cents: 10 },
  { minutes: 77, rps: 4085.38, cents: 10 },
  { minutes: 78, rps: 4013.81, cents: 10 },
  { minutes: 79, rps: 3885.04, cents: 10 },
  { minutes: 80, rps: 3987.02, cents: 10 },
  { minutes: 81, rps: 3894.35, cents: 10 },
  { minutes: 82, rps: 4073.36, cents: 10 },
  { minutes: 83, rps: 1864.95, cents: 4 },
  { minutes: 84, rps: 1780.29, cents: 4 },
  { minutes: 85, rps: 1806.2, cents: 4 },
  { minutes: 86, rps: 3096.83, cents: 10 },
  { minutes: 87, rps: 3708.93, cents: 10 },
  { minutes: 88, rps: 3651.98, cents: 10 },
  { minutes: 89, rps: 1853.84, cents: 4 },
  { minutes: 90, rps: 2516.5, cents: 10 },
  { minutes: 91, rps: 1843.31, cents: 4 },
  { minutes: 92, rps: 3915.38, cents: 10 },
  { minutes: 93, rps: 3957.45, cents: 10 },
  { minutes: 94, rps: 3839.54, cents: 10 },
  { minutes: 95, rps: 1740.85, cents: 3 },
  { minutes: 96, rps: 1842.54, cents: 4 },
  { minutes: 97, rps: 2039.03, cents: 6 },
  { minutes: 98, rps: 3881.44, cents: 10 },
  { minutes: 99, rps: 3924.38, cents: 10 },
  { minutes: 100, rps: 3928.61, cents: 10 } ]



  Metrics.Prod1 = [ { minutes: 1, rps: 842.39, cents: 1 },
  { minutes: 2, rps: 1400.26, cents: 2 },
  { minutes: 3, rps: 1388.68, cents: 2 },
  { minutes: 4, rps: 1640.2, cents: 3 },
  { minutes: 5, rps: 1559.8, cents: 3 },
  { minutes: 6, rps: 691.96, cents: 1 },
  { minutes: 7, rps: 526.07, cents: 1 },
  { minutes: 8, rps: 481.74, cents: 0 },
  { minutes: 9, rps: 346.92, cents: 0 },
  { minutes: 10, rps: 892.29, cents: 1 },
  { minutes: 11, rps: 844.29, cents: 1 },
  { minutes: 12, rps: 1919.19, cents: 4 },
  { minutes: 13, rps: 690.21, cents: 1 },
  { minutes: 14, rps: 2213.49, cents: 6 },
  { minutes: 15, rps: 2482.74, cents: 10 },
  { minutes: 16, rps: 851.41, cents: 1 },
  { minutes: 17, rps: 2575.1, cents: 10 },
  { minutes: 18, rps: 2495.42, cents: 10 },
  { minutes: 19, rps: 1213.71, cents: 2 },
  { minutes: 20, rps: 1702.15, cents: 3 },
  { minutes: 21, rps: 1798.7, cents: 4 },
  { minutes: 22, rps: 2039.33, cents: 6 },
  { minutes: 23, rps: 2357.45, cents: 10 },
  { minutes: 24, rps: 3116.16, cents: 10 },
  { minutes: 25, rps: 3385.8, cents: 10 },
  { minutes: 26, rps: 3375.13, cents: 10 },
  { minutes: 27, rps: 3440.84, cents: 10 },
  { minutes: 28, rps: 3454.36, cents: 10 },
  { minutes: 29, rps: 3294.59, cents: 10 },
  { minutes: 30, rps: 3312.79, cents: 10 },
  { minutes: 31, rps: 540.18, cents: 1 },
  { minutes: 32, rps: 1739.12, cents: 3 },
  { minutes: 33, rps: 1832.39, cents: 4 },
  { minutes: 34, rps: 538.91, cents: 1 },
  { minutes: 35, rps: 738.05, cents: 1 },
  { minutes: 36, rps: 860.75, cents: 1 },
  { minutes: 37, rps: 751.99, cents: 1 },
  { minutes: 38, rps: 989.02, cents: 1 },
  { minutes: 39, rps: 1050.42, cents: 2 },
  { minutes: 40, rps: 956.01, cents: 1 },
  { minutes: 41, rps: 762.76, cents: 1 },
  { minutes: 42, rps: 890.3, cents: 1 },
  { minutes: 43, rps: 741.11, cents: 1 },
  { minutes: 44, rps: 726.82, cents: 1 },
  { minutes: 45, rps: 761.12, cents: 1 },
  { minutes: 46, rps: 4009.05, cents: 10 },
  { minutes: 47, rps: 3636.93, cents: 10 },
  { minutes: 48, rps: 3479.56, cents: 10 },
  { minutes: 49, rps: 3922.37, cents: 10 },
  { minutes: 50, rps: 3130.93, cents: 10 },
  { minutes: 51, rps: 2869.78, cents: 10 },
  { minutes: 52, rps: 2862.81, cents: 10 },
  { minutes: 53, rps: 3371.23, cents: 10 },
  { minutes: 54, rps: 2837.7, cents: 10 },
  { minutes: 55, rps: 2754.43, cents: 10 },
  { minutes: 56, rps: 2450.91, cents: 10 },
  { minutes: 57, rps: 3674.43, cents: 10 },
  { minutes: 58, rps: 1872.76, cents: 4 },
  { minutes: 59, rps: 1901.33, cents: 4 },
  { minutes: 60, rps: 1938.95, cents: 4 },
  { minutes: 61, rps: 3187.17, cents: 10 },
  { minutes: 62, rps: 3718.72, cents: 10 },
  { minutes: 63, rps: 3286.82, cents: 10 },
  { minutes: 64, rps: 1544.9, cents: 3 },
  { minutes: 65, rps: 1716.79, cents: 3 },
  { minutes: 66, rps: 1731.97, cents: 3 },
  { minutes: 67, rps: 3296.72, cents: 10 },
  { minutes: 68, rps: 3359.65, cents: 10 },
  { minutes: 69, rps: 3421.65, cents: 10 },
  { minutes: 70, rps: 1419.89, cents: 2 },
  { minutes: 71, rps: 1763.34, cents: 4 },
  { minutes: 72, rps: 1517.44, cents: 3 },
  { minutes: 73, rps: 3221.06, cents: 10 },
  { minutes: 74, rps: 3269.42, cents: 10 },
  { minutes: 75, rps: 3257.48, cents: 10 },
  { minutes: 76, rps: 3210.8, cents: 10 },
  { minutes: 77, rps: 3642.36, cents: 10 },
  { minutes: 78, rps: 3680.51, cents: 10 },
  { minutes: 79, rps: 3226.78, cents: 10 },
  { minutes: 80, rps: 3427, cents: 10 },
  { minutes: 81, rps: 2028.08, cents: 6 },
  { minutes: 82, rps: 1622.19, cents: 3 },
  { minutes: 83, rps: 1850.34, cents: 4 },
  { minutes: 84, rps: 1486, cents: 2 },
  { minutes: 85, rps: 1753.52, cents: 4 },
  { minutes: 86, rps: 1477.85, cents: 2 },
  { minutes: 87, rps: 1264.21, cents: 2 },
  { minutes: 88, rps: 1427.48, cents: 2 },
  { minutes: 89, rps: 1523, cents: 3 },
  { minutes: 90, rps: 2078.91, cents: 6 },
  { minutes: 91, rps: 1773.72, cents: 4 },
  { minutes: 92, rps: 2042.37, cents: 6 },
  { minutes: 93, rps: 1792.35, cents: 4 },
  { minutes: 94, rps: 1505.16, cents: 3 },
  { minutes: 95, rps: 2271.73, cents: 10 },
  { minutes: 96, rps: 3490.37, cents: 10 },
  { minutes: 97, rps: 3195.89, cents: 10 },
  { minutes: 98, rps: 3393.06, cents: 10 },
  { minutes: 99, rps: 3671.3, cents: 10 },
  { minutes: 100, rps: 3202.97, cents: 10 } ]

