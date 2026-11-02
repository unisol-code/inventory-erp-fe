import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useTheme } from "../../hooks/theme/useTheme";

const Horizontal3DBarGraph = () => {
  const chartRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    const primary = theme?.primaryColor || "#4FA8E5";
    const accent = theme?.accentColor || "#1C5CD6";
    const backgroundColor = theme?.backgroundColor || "#F3F8FC";
    const textColor = theme?.tableText || "#334155";

    root._fill = am5.color(primary);
    root._stroke = am5.color(primary);

    const setBg = (target) => {
      if (target && target.set) {
        target.set("fill", am5.color(backgroundColor));
      } else if (target && target.fill !== undefined) {
        target.fill = am5.color(backgroundColor);
      }
    };
    setBg(root.background);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
      })
    );

    const data = [
      { month: "Jan", percentage: 23.5 },
      { month: "Feb", percentage: 26.2 },
      { month: "Mar", percentage: 30.1 },
      { month: "Apr", percentage: 29.5 },
      { month: "May", percentage: 24.6 },
      { month: "Jun", percentage: 24.6 },
    ];

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 20,
        }),
        categoryField: "month",
      })
    );
    xAxis.data.setAll(data);

    if (xAxis.labels && xAxis.labels.template) {
      xAxis.labels.template.setAll({
        fill: am5.color(textColor),
      });
    }
    if (xAxis.axisFill) {
      xAxis.axisFill.setAll({
        fill: am5.color(backgroundColor),
        fillOpacity: 0,
      });
    }
    xAxis.grid?.clear();

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    if (yAxis.labels && yAxis.labels.template) {
      yAxis.labels.template.setAll({
        fill: am5.color(textColor),
      });
    }
    yAxis.grid?.clear();

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Percentage",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "percentage",
        categoryXField: "month",
      })
    );

    series.columns.template.setAll({
      fillOpacity: 0.9,
      strokeOpacity: 0,
      tooltipText: "{categoryX}: {valueY}",
      templateField: "column",
      fill: am5.color(primary),
      stroke: am5.color(accent),
    });

    series.columns.template.states.create("hover", {
      shadowColor: am5.color(0x000000),
      shadowOffsetX: 5,
      shadowOffsetY: 5,
      shadowBlur: 5,
    });

    series.columns.template.adapters.add("fill", (fill, target) => {
      const colors = [
        primary,
        accent,
        theme?.secondaryColor || "#89CFF0",
        theme?.highlightColor || "#DCEEFF",
        theme?.infoColor || "#1769AA",
      ];
      const idx = series.columns.indexOf(target);
      return am5.color(colors[idx % colors.length]);
    });

    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [theme]);

  return (
    <div
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
