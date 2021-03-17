import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";

export default function Home() {
  return (
    <Base
      title="Home Page"
      description="Welcome to the Weather App"
      className="container"
    >
      <p>
        This is the weather app that shows the weather of different cities
      </p>
    </Base>
  );
}
