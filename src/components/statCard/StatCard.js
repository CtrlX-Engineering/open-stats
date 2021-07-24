import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./StatCard.css";

function StatCard(props) {
  return (
    <Card className="app-statCard" variant="outlined">
        <CardContent className="statCard-content">
            <Typography className="statCard-title">{props.title}</Typography>

            <h2 className="statCard-cases">{props.cases}</h2>

            <Typography className="statCard-total">{props.total}</Typography>
        </CardContent>
    </Card>
  );
}

export default StatCard;
