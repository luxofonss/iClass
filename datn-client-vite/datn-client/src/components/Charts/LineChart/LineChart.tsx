/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArcElement, Colors, Legend, Title, Tooltip } from "chart.js";
import Chart from "chart.js/auto";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styles from "./LineChart.module.scss";

Chart.register(ArcElement, Colors, Tooltip, Title, Legend);

export default function LineChart({
	title,
	data,
}: {
	title: string;
	data: any;
}) {
	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [
			{
				label: "Label",
				data: [],
				backgroundColor: "#ffc107",
			},
		],
	});
	const cx = classNames.bind(styles);

	useEffect(() => {
		if (data) {
			setChartData(data);
		}
	}, [data]);

	const options: any = {
		plugins: {
			tooltip: {
				callbacks: {
					label: function (e: any) {
						const totalValue = e?.dataset?.data?.reduce(
							(accumulator: number, currentValue: number) =>
								accumulator + currentValue,
							0
						);
						const percentage = (
							(e?.parsed / totalValue) *
							100
						).toFixed(1);
						const label = `${e?.formattedValue} (${percentage}%)`;
						return label;
					},
				},
			},
			colors: {
				enabled: true,
			},
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: title,
			},
		},
		responsive: true,
	};

	return (
		<div className={cx("wrapper")}>
			{data && <Line data={chartData} options={options} />}
		</div>
	);
}
