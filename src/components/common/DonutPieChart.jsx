import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import useDashboard from "../../hooks/dashboard/useDashboard";
import { useTheme } from "../../hooks/theme/useTheme";

const PieChart = () => {
  const { theme } = useTheme();
  const chartRef = useRef(null);
  const { fetchWarehousePercentages, warehousePercentages } = useDashboard();

  useEffect(() => {
    fetchWarehousePercentages();
  }, []);

  useEffect(() => {
    if (
      !warehousePercentages?.data ||
      warehousePercentages?.data.length === 0
    ) {
      return;
    }

    if (!chartRef.current) return;

    const primary = theme?.primaryColor || "#4FA8E5";
    const accent = theme?.accentColor || "#1C5CD6";
    const backgroundColor = theme?.backgroundColor || "#F3F8FC";
    const textColor = theme?.tableText || "#334155";
    const mutedText = theme?.tableMutedText || "#64748B";

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.horizontalLayout,
        innerRadius: am5.percent(50),
      })
    );
    const setBg = (target) => {
      if (target && target.set) {
        target.set("fill", am5.color(backgroundColor));
      } else if (target && target.fill !== undefined) {
        target.fill = am5.color(backgroundColor);
      }
    };
    setBg(root.background);

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
        colors: am5.ColorSet.new(root, {
          colors: [
            am5.color(primary),
            am5.color(accent),
            am5.color(theme?.secondaryColor || "#89CFF0"),
            am5.color(theme?.highlightColor || "#DCEEFF"),
            am5.color(theme?.infoColor || "#1769AA"),
          ],
        }),
      })
    );

    series.labels?.template?.setAll({
      text: "{valuePercentTotal.formatNumber('0.0')}%",
      visible: false,
      fill: am5.color(textColor),
    });

    const warehouseData = warehousePercentages?.data?.map((item) => ({
      category: item?.warehouseID || "Unknown",
      value: item?.percentage || 0,
    }));

    series.data.setAll(warehouseData);

    series.slices?.template?.setAll({
      tooltipText: "{category}: {valuePercentTotal.formatNumber('0.0')}%",
    });

    series.slices?.template?.states?.create("hover", {
      scale: 1.2,
      shadowColor: am5.color(0x000000),
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowBlur: 3,
    });

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        layout: root.verticalLayout,
      })
    );

    legend.labels?.template?.setAll({
      text: "{category}",
      fontSize: "9px",
      fill: am5.color(mutedText),
    });

    legend.markers?.template?.setAll({
      width: 7,
      height: 7,
    });

    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [warehousePercentages, theme]);

  return (
    <div
      ref={chartRef}
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
