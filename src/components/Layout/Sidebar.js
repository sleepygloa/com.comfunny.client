import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  Build as BuildIcon,
  Code as CodeIcon,
  LocalShipping as ShippingIcon,
  Storage as StorageIcon,
  ShoppingCart as CartIcon,
  Article as ArticleIcon,
  ExpandLess,
  ExpandMore,
  Groups as GroupsIcon,
  History as HistoryIcon,
  Gavel as GavelIcon,
  Map as MapIcon,
  Contacts as ContactsIcon,
  ViewModule as ViewModuleIcon,
  Inventory as InventoryIcon
} from "@mui/icons-material";

const menuItems = [
  {
    id: "dashboard",
    label: "대시보드",
    icon: <DashboardIcon />,
    path: "/"
  },
  // {
  //   id: "company",
  //   label: "회사소개",
  //   icon: <BusinessIcon />,
  //   children: [
  //     {
  //       id: "company-overview",
  //       label: "회사개요",
  //       path: "/company/overview"
  //     },
  //     {
  //       id: "company-history",
  //       label: "회사연혁",
  //       icon: <HistoryIcon />,
  //       path: "/company/history"
  //     },
  //     {
  //       id: "company-vision",
  //       label: "비전 및 미션",
  //       path: "/company/vision"
  //     },
  //     {
  //       id: "company-organization",
  //       label: "조직도",
  //       path: "/company/organization"
  //     },
  //     {
  //       id: "company-location",
  //       label: "오시는 길",
  //       icon: <MapIcon />,
  //       path: "/company/location"
  //     }
  //   ]
  // },
  // {
  //   id: "business",
  //   label: "주력사업",
  //   icon: <BuildIcon />,
  //   children: [
  //     {
  //       id: "business-logistics",
  //       label: "물류 시스템",
  //       path: "/business/logistics"
  //     },
  //     {
  //       id: "business-consulting",
  //       label: "물류 컨설팅",
  //       path: "/business/consulting"
  //     },
  //     {
  //       id: "business-development",
  //       label: "시스템 개발",
  //       path: "/business/development"
  //     },
  //     {
  //       id: "business-maintenance",
  //       label: "유지보수 서비스",
  //       path: "/business/maintenance"
  //     },
  //     {
  //       id: "business-partner",
  //       label: "파트너쉽",
  //       path: "/business/partnership"
  //     }
  //   ]
  // },
  // {
  //   id: "solution",
  //   label: "솔루션",
  //   icon: <ViewModuleIcon />,
  //   children: [
      {
        id: "solution-wms",
        label: "",
        icon: <StorageIcon />,
        children: [
          {
            id: "system",
            label: "시스템 관리",
            icon: <CodeIcon />,
            children: [
              { id: "sys-code", label: "코드 관리", path: "/wms/sys/code" }
            ]
          },
          {
            id: "standard-data",
            label: "기준 정보 관리",
            icon: <StorageIcon />,
            children: [
              { id: "sd-biz", label: "사업장 관리", path: "/wms/sd/biz" },
              { id: "sd-client", label: "고객사 관리", path: "/wms/sd/client" },
              { id: "sd-dc", label: "물류센터 관리", path: "/wms/sd/dc" },
              { id: "sd-area", label: "구역 관리", path: "/wms/sd/area" },
              { id: "sd-zone", label: "존 관리", path: "/wms/sd/zone" },
              { id: "sd-loc", label: "로케이션 관리", path: "/wms/sd/loc" },
              { id: "sd-store", label: "매장 관리", path: "/wms/sd/store" },
              { id: "sd-supplier", label: "공급사 관리", path: "/wms/sd/supplier" },
              { id: "sd-item", label: "품목 관리", path: "/wms/sd/item" },
              { id: "sd-item-class", label: "품목 분류 관리", path: "/wms/sd/itemClass" },
              { id: "sd-item-uom", label: "품목 단위 관리", path: "/wms/sd/itemUom" },
              { id: "sd-3d-loc", label: "3D 로케이션", path: "/wms/vr/3dLoc" }
            ]
          },
          {
            id: "inbound",
            label: "입고 관리",
            icon: <ShippingIcon />,
            children: [
              { id: "ib-plan", label: "입고 계획", path: "/wms/ib/inboundPlan" },
              { id: "ib-exam", label: "입고 검수", path: "/wms/ib/inboundExam" },
              { id: "ib-putw", label: "입고 적치", path: "/wms/ib/inboundPutw" },
              { id: "ib-inq", label: "입고 조회", path: "/wms/ib/inboundInq" }
            ]
          },
          {
            id: "stock",
            label: "재고 관리",
            icon: <InventoryIcon />,
            children: [
              { id: "st-by-item", label: "품목별 재고 조회", path: "/wms/st/stockInqueryByItem" },
              { id: "st-by-loc", label: "로케이션별 재고 조회", path: "/wms/st/stockInqueryByLoc" },
              { id: "st-move", label: "재고 이동", path: "/wms/st/stockMove" }
            ]
          },
          {
            id: "outbound",
            label: "출고 관리",
            icon: <CartIcon />,
            children: [
              { id: "ob-plan", label: "출고 계획", path: "/wms/ob/outboundPlan" },
              { id: "ob-allot", label: "출고 할당", path: "/wms/ob/outboundAllot" },
              { id: "ob-picking", label: "출고 피킹", path: "/wms/ob/outboundPicking" }
            ]
          }
        ]
      },
      {
        id: "solution-blog",
        label: "블로그",
        icon: <ArticleIcon />,
        children: [
          { id: "blog-excel-file", label: "엑셀 파일 -> JSON", path: "/blog/excel/excelfiletojson" },
          { id: "blog-excel-data", label: "엑셀 데이터 -> JSON", path: "/blog/excel/exceldatatojson" },
          { id: "blog-str-arr", label: "문자열 배열 변환", path: "/blog/excel/strarrchangestr" },
          { id: "blog-youtube", label: "유튜브 다운로더", path: "/blog/youtubeDownloader" }
        ]
      }
    // ]
  // },
  // {
  //   id: "contact",
  //   label: "고객센터",
  //   icon: <ContactsIcon />,
  //   path: "/contact"
  // }
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const handleMenuClick = (menuId) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  // Check if the current location matches a menu item path
  const isSelected = (path) => {
    return location.pathname === path;
  };

  // Find parent menu of current path to auto expand
  React.useEffect(() => {
    const currentPath = location.pathname;
    
    const expandParentMenus = (items, path) => {
      for (const item of items) {
        if (item.path === path) {
          return true;
        }
        
        if (item.children) {
          if (expandParentMenus(item.children, path)) {
            setOpenMenus(prev => ({...prev, [item.id]: true}));
            return true;
          }
        }
      }
      
      return false;
    };
    
    expandParentMenus(menuItems, currentPath);
  }, [location.pathname]);

  // Recursive function to render menu items
  const renderMenuItem = (item) => {
    // If item has children, render a collapsible menu
    if (item.children) {
      return (
        <React.Fragment key={item.id}>
          <ListItemButton onClick={() => handleMenuClick(item.id)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
            {openMenus[item.id] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMenus[item.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map(child => (
                <React.Fragment key={child.id}>
                  {child.children ? (
                    // Nested submenu
                    <>
                      <ListItemButton 
                        sx={{ pl: item.path ? 4 : 6 }} 
                        onClick={() => handleMenuClick(child.id)}
                      >
                        <ListItemIcon>{child.icon || item.icon}</ListItemIcon>
                        <ListItemText primary={child.label} />
                        {openMenus[child.id] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={openMenus[child.id]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {child.children.map(grandchild => renderMenuItem({...grandchild, level: 3}))}
                        </List>
                      </Collapse>
                    </>
                  ) : (
                    // Normal child item
                    <ListItemButton
                      sx={{ pl: item.level === 3 ? 8 : 4 }}
                      onClick={() => handleNavigate(child.path)}
                      selected={isSelected(child.path)}
                    >
                      <ListItemIcon>
                        {child.icon || item.icon}
                      </ListItemIcon>
                      <ListItemText primary={child.label} />
                    </ListItemButton>
                  )}
                </React.Fragment>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    } else {
      // If item doesn't have children, render a simple menu item
      return (
        <ListItemButton
          key={item.id}
          onClick={() => handleNavigate(item.path)}
          selected={isSelected(item.path)}
          sx={{ pl: item.level === 3 ? 8 : 2 }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      );
    }
  };

  return (
    <List component="nav" sx={{ width: '100%' }}>
      {menuItems.map(item => (
        <React.Fragment key={item.id}>
          {renderMenuItem(item)}
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}