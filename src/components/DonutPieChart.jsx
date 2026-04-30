import { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import useDashboard from "../hooks/dashboard/useDashboard";

const PieChart = () => {
  const { fetchWarehousePercentages, warehousePercentages } = useDashboard();

  useEffect(() => {
    fetchWarehousePercentages();
  }, []);

  console.log("warehousePercentages ", warehousePercentages);

  useEffect(() => {
    if (
      !warehousePercentages?.data ||
      warehousePercentages?.data.length === 0
    ) {
      console.warn("No data available for the chart");
      return;
    }
    // Create root element
    const root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        //layout: root.verticalLayout,
        layout: root.horizontalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // Create series
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
      })
    );

    series.labels.template.setAll({
      text: "{valuePercentTotal.formatNumber('0.0')}%",
      visible: false,
    });

    const warehouseData = warehousePercentages?.data?.map((item) => ({
      category: item?.warehouseID || "Unknown",
      value: item?.percentage || 0,
    }));

    series.data.setAll(warehouseData);

    series.slices.template.setAll({
      tooltipText: "{category}: {valuePercentTotal.formatNumber('0.0')}%",
    });

    series.slices.template.states.create("hover", {
      scale: 1.2, // Increase size by 20% on hover
    });

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        layout: root.verticalLayout, // Vertical alignment of legend items
      })
    );

    // Customize legend items
    legend.labels.template.setAll({
      text: "{category}",
      fontSize: "9px", // Decrease font size of labels
      fill: am5.color(0x555555), // Adjust text color (optional)
    });

    legend.markers.template.setAll({
      width: 7, // Decrease marker size
      height: 7,
      fill: (dataItem) => dataItem.dataContext.color,
    });

    legend.data.setAll(series.dataItems);

    // Play initial series animation
    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div
      id="chartdiv"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></div>
  );
};

export default PieChart;
