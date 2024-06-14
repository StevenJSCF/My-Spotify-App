import { useState } from "react";
import Artist from "../components/Artist";
import Sidebar from "../components/layout/Sidebar";

export default function Home() {


  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-emerald-400 to-emerald-900">
      {/* <h1>Spotify Artist Info</h1>
      <Artist /> */}

      <Sidebar />
      
    </div>
  );
}
