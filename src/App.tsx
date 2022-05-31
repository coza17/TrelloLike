import Trello from "@/pages/Trello";
import React from "react";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <Trello />
      </RecoilRoot>
    </>
  );
}

export default App;
