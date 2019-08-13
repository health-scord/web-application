import * as React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { StatsProps } from "./Stats.d";

const Stats: React.FC<StatsProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const clickHandler = e => onClick(e);
  const stats = [
    {
      image: "",
      label: "Steps improved by 0%",
      percentage: 10
    },
    {
      image: "",
      label: "Sleep improved by 0%",
      percentage: 30
    },
    {
      image: "",
      label: "Sleep improved by 0%",
      percentage: 60
    }
  ];
  return (
    <>
      <section className="stats">
        <div className="statsContain">
          {stats.map((stat, i) => {
            return (
              <div key={i} className="stat">
                <img src={stat.image} alt="" title="" />
                <span className="label">{stat.label}</span>
                <CircularProgressbar value={stat.percentage} text={`${stat.percentage}%`} />;
              </div>
            )
          })}
        </div>
      </section>
    </>
  );
};

export default Stats;
