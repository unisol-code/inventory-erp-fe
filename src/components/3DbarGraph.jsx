import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useTheme } from "../hooks/theme/useTheme";
const Horizontal3DBarGraph = () => {
  const chartRef = useRef(null);
  const { theme } = useTheme();
  useEffect(() => {
    // Create root element
    const root = am5.Root.new(chartRef.current);

    // Apply theme
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
      })
    );

    // Add data
    const data = [
      { month: "Jan", percentage: 23.5 },
      { month: "Feb", percentage: 26.2 },
      { month: "Mar", percentage: 30.1 },
      { month: "Apr", percentage: 29.5 },
      { month: "May", percentage: 24.6 },
      { month: "Jun", percentage: 24.6 },
    ];

    // Create X-axis (CategoryAxis for Years)
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 20,
        }),
        categoryField: "month",
      })
    );
    xAxis.data.setAll(data);

    // Create Y-axis (ValueAxis for percentage)
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Percentage",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "percentage",
        categoryXField: "month",
      })
    );

    // Mimic 3D effects
    series.columns.template.setAll({
      fillOpacity: 0.9,
      strokeOpacity: 0.3,
      tooltipText: "{categoryX}: {valueY}",
      templateField: "column",
    });

    // Add shadows to mimic depth
    series.columns.template.states.create("hover", {
      shadowColor: am5.color(0x000000),
      shadowOffsetX: 5,
      shadowOffsetY: 5,
      shadowBlur: 5,
    });

    // Assign colors
    series.columns.template.adapters.add("fill", (fill, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });
    series.columns.template.adapters.add("stroke", (stroke, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    // Add data to series
    series.data.setAll(data);

    // Animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    // Cleanup on unmount
    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div
      className="bg-[#F7F7F7] rounded-xl"
      ref={chartRef}
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    />
  );
};

export default Horizontal3DBarGraph;
