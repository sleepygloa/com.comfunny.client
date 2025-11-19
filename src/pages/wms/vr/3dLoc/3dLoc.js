import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../../../components/PageTitle/PageTitle.js";
import { client } from "../../../../contraints.js";

export default function Loc3d(props) {
  const menuTitle = '3D 로케이션';

  return (
    <>
      <PageTitle title={"3D 재고조회"} />
      <iframe src="/pages/stock/loc3d/loc3d.html" style={{ width: '100%', height: '750px', border: 'none' }}></iframe>
    </>
  );
}
