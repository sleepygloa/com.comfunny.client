import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Dashboard from "../pages/dashboard";
import BlogLayout from "../pages/layout/BlogLayout";
import {ExcelFileToJson} from "../pages/blog/ExcelFileToJson";
import {ExcelDataToJson} from "../pages/blog/ExcelDataToJson";
import {StrArrChangeStr} from "../pages/blog/StrArrChangeStr";
import SysCode from "../pages/wms/sys/Code.js";
import SysScheduler from "../pages/wms/sys/Scheduler.js";
import SdBiz from "../pages/wms/sd/Biz.js";
import SdClient from "../pages/wms/sd/Client.js";
import SdDc from "../pages/wms/sd/Dc.js";
import SdArea from "../pages/wms/sd/Area.js";
import SdZone from "../pages/wms/sd/Zone.js";
import SdLoc from "../pages/wms/sd/Loc.js";
import SdStore from "../pages/wms/sd/Store.js";
import SdSupplier from "../pages/wms/sd/Supplier.js";
import SdItem from "../pages/wms/sd/Item.js";
import SdItemClass from "../pages/wms/sd/ItemClass.js";
import SdItemUom from "../pages/wms/sd/ItemUom.js";


import Sd3dLoc from "../pages/wms/vr/3dLoc/3dLoc.js";

//입고
import IbInbound from "../pages/wms/ib/Inbound.js";

//재고
import StStockMove from "../pages/wms/st/StockMove.js";
import StStockInqueryByItem from "../pages/wms/st/StockInqueryByItem.js";

//출고
import ObOutbound from "../pages/wms/ob/Outbound.js";

// context
import { useUserState } from "../context/UserContext";

export default function App() {
  // global
  // var { isAuthenticated } = useUserState();
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={()=><BlogLayout props={<Dashboard />}></BlogLayout>} />
        <Route exact path="/blog/excel/excelfiletojson" render={()=><BlogLayout props={<ExcelFileToJson />}></BlogLayout>} />
        <Route exact path="/blog/excel/exceldatatojson" render={()=><BlogLayout props={<ExcelDataToJson />}></BlogLayout>} />
        <Route exact path="/blog/excel/strarrchangestr" render={()=><BlogLayout props={<StrArrChangeStr />}></BlogLayout>} />



        <Route exact path="/wms/sys/code" render={()=><BlogLayout props={<SysCode />}></BlogLayout>} />
        <Route exact path="/wms/sys/scheduler" render={()=><BlogLayout props={<SysScheduler />}></BlogLayout>} />

        <Route exact path="/wms/sd/biz" render={()=><BlogLayout props={<SdBiz />}></BlogLayout>} />
        <Route exact path="/wms/sd/client" render={()=><BlogLayout props={<SdClient />}></BlogLayout>} />
        <Route exact path="/wms/sd/dc" render={()=><BlogLayout props={<SdDc />}></BlogLayout>} />
        <Route exact path="/wms/sd/area" render={()=><BlogLayout props={<SdArea />}></BlogLayout>} />
        <Route exact path="/wms/sd/zone" render={()=><BlogLayout props={<SdZone />}></BlogLayout>} />
        <Route exact path="/wms/sd/loc" render={()=><BlogLayout props={<SdLoc />}></BlogLayout>} />
        <Route exact path="/wms/sd/store" render={()=><BlogLayout props={<SdStore />}></BlogLayout>} />
        <Route exact path="/wms/sd/supplier" render={()=><BlogLayout props={<SdSupplier />}></BlogLayout>} />
        <Route exact path="/wms/sd/item" render={()=><BlogLayout props={<SdItem />}></BlogLayout>} />
        <Route exact path="/wms/sd/itemClass" render={()=><BlogLayout props={<SdItemClass />}></BlogLayout>} />
        <Route exact path="/wms/sd/itemUom" render={()=><BlogLayout props={<SdItemUom />}></BlogLayout>} />
        <Route exact path="/wms/vr/3dLoc" render={()=><BlogLayout props={<Sd3dLoc />}></BlogLayout>} />

        <Route exact path="/wms/ib/inbound" render={()=><BlogLayout props={<IbInbound />}></BlogLayout>} />

        <Route exact path="/wms/st/stockMove" render={()=><BlogLayout props={<StStockMove />}></BlogLayout>} />
        <Route exact path="/wms/st/stockInqueryByItem" render={()=><BlogLayout props={<StStockInqueryByItem />}></BlogLayout>} />

        <Route exact path="/wms/ob/outbound" render={()=><BlogLayout props={<ObOutbound />}></BlogLayout>} />
        {/* <Route
          exact
          path="/"
          component={(isAuthenticated ? Layout : Login)}
          render={() => (isAuthenticated ? <Redirect to="/app/dashboard" />: <Redirect to="/login" />)}
        />
        <PublicRoute path="/" component={Login}
          render={() => <Redirect to="/login" /> } />
        <PrivateRoute path="/" component={Layout} />
        <PrivateRoute
          path="/"
          component={Layout}
          render={() => <Redirect to="/app/dashboard" />} />

         <Route exact path="/" render={() => <Redirect to="/" />} />
         <Route
           exact
           path="/app"
           render={() => <Redirect to="/app/dashboard" />}
         /> */}
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );

  // #######################################################################

  // function PrivateRoute({ component, ...rest }) {
  //   console.log('private route', isAuthenticated)
  //   return (
  //     <Route
  //       {...rest}
  //       render={props =>
  //         isAuthenticated ? (
  //           React.createElement(component, props)
  //         ) : (
  //           <Redirect
  //             to={{
  //               pathname: "/login",
  //               state: {
  //                 from: props.location,
  //               },
  //             }}
  //           />
  //         )
  //       }
  //     />
  //   );
  // }

  // function PublicRoute({ component, ...rest }) {
  //   console.log('public route', isAuthenticated)
  //   return (
  //     <Route
  //       {...rest}
  //       render={props =>
  //         isAuthenticated ? (
  //           <Redirect
  //             to={{
  //               pathname: "/",
  //             }}
  //           />
  //         ) : (
  //           React.createElement(component, props)
  //         )
  //       }
  //     />
  //   );
  // }
}
