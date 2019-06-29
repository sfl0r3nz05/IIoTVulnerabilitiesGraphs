// Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    
    chart.exporting.menu = new am4core.ExportMenu();

    // Add data
    chart.data = datos;

    chart.events.on("beforedatavalidated", function(ev) {
        chart.data.sort(function(a, b) {
            return (new Date(b.id)) - (new Date(a.id));
        });
    });

    
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    

    let title = chart.titles.create();
    title.text = "CVSSv3 ("+texto+") (Qualitative)";
    title.fontSize = 22;
    title.marginBottom = 20;

    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.opacity = 0;
    categoryAxis.renderer.minGridDistance = 10;

    categoryAxis.renderer.grid.template.location = 0;
    


    var categoryAxis2 = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis2.dataFields.category = "Total";
    categoryAxis2.renderer.grid.template.opacity = 0;
    categoryAxis2.renderer.minGridDistance = 10;

    categoryAxis2.renderer.grid.template.location = 0;
    categoryAxis2.renderer.opposite = true;

    //categoryAxis2.fontSize = 10;

    categoryAxis2.forceShowField = "forceShow";


    
    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.grid.template.opacity = 0;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
    valueAxis.renderer.ticks.template.length = 10;
    valueAxis.renderer.line.strokeOpacity = 0.5;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.minGridDistance = 100;

    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    

    valueAxis.renderer.labels.template.adapter.add("text", function(text) {
        return text + "%";
    })



    // Create series
    function createSeries(field, name) {
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.valueXShow = "totalPercent";
      series.dataFields.categoryY = "name";
      series.stacked = true;
      series.name = name;

      if      (field == "Low")      { series.fill = am4core.color("#52BE80"); series.stroke = am4core.color("#52BE80");}
      else if (field == "Medium")   { series.fill = am4core.color("#5499C7"); series.stroke = am4core.color("#5499C7"); }
      else if (field == "High")     { series.fill = am4core.color("#DC7633"); series.stroke = am4core.color("#DC7633"); }
      else if (field == "Critical") { series.fill = am4core.color("#CD6155"); series.stroke = am4core.color("#CD6155"); }

      var labelBullet = series.bullets.push(new am4charts.LabelBullet());
      
      labelBullet.locationX = 0.5;
      labelBullet.label.text = "{valueX}";
      labelBullet.label.fill = am4core.color("#fff");
     
    }
    
    createSeries("Low", "Low");
    createSeries("Medium", "Medium");
    createSeries("High", "High");
    createSeries("Critical", "Critical");

    /*categoryAxis.renderer.labels.template.adapter.add("text", function(text) {
        return text + " (" +"{extra}" +")";
    })*/