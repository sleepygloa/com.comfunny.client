import React, { createContext, useContext, useState, useEffect } from 'react';
import { client } from '../contraints';

// Context 생성
export const CommonDataContext = createContext();
export const useCommonData = () => useContext(CommonDataContext);

export const CmmnCdProvider = ({ children }) => {
    const [isLoadingComplFlag, setIsLoadingComplFlag] = useState(false); //로딩완료여부
    const [cmmnCdData, setCmmnCdData] = useState([]); //공통코드 전체 조회
    const [gbClientCdCmb, setGbClientCdCmb] = useState([]); //고객사코드 콤보
    const [gbDcCdCmb, setGbDcCdCmb] = useState([]); //물류센터코드 콤보

    useEffect(() => {
        if(isLoadingComplFlag) return;
        // 이미 데이터가 존재하면 API 호출을 하지 않음
        if(cmmnCdData.length == 0) {
            const func = async () => {
                await client.post(`/wms/sys/common/selectCodeByGroupCodeAllList`, null, {})
                .then(res => {
                    setCmmnCdData(res.data); // API 응답으로 상태 업데이트
                }).catch(error => { 
                  console.log('error = '+error); 
                })
            }
            func();
        }

        if(gbDcCdCmb.length == 0){
            // 물류센터코드 콤보 조회
            const funcFnSearchDc = async () => {
                await client.post(`/wms/sys/common/selectDcList`, null, {})
                .then(res => {
                    setGbDcCdCmb(res.data); // API 응답으로 상태 업데이트
                }).catch(error => { 
                console.log('error = '+error); 
                })
            }
            funcFnSearchDc();
        }

        if(gbClientCdCmb.length == 0){
            // 고객사코드 콤보 조회
            const funcFnSearchClient = async () => {
                await client.post(`/wms/sys/common/selectClientList`, null, {})
                .then(res => {
                    setGbClientCdCmb(res.data); // API 응답으로 상태 업데이트
                }).catch(error => { 
                console.log('error = '+error); 
                })
            }
            funcFnSearchClient();
        }

        setIsLoadingComplFlag(true);
    }, [cmmnCdData, gbDcCdCmb, gbClientCdCmb, isLoadingComplFlag]);

    // 특정 그룹 코드에 해당하는 데이터만 반환하는 함수
    const getCodesByGroupCode = (groupCode) => {
        return cmmnCdData.filter(code => code.codeGrpCd === groupCode);
    };
    
    // 특정 그룹 코드에 해당하는 데이터만 반환하는 함수
    const getCodesCmbByGroupCode = (groupCode) => {
        const filterData = cmmnCdData.filter(code => code.codeGrpCd === groupCode);
        const cmbList = [];
        filterData.map((code) => {
            cmbList.push({value: code.codeCd, label: code.codeNm+'['+code.codeCd+']'})
        })
        return cmbList;
    };

    //글로벌 변수를 콤보박스형태로 조회 
    const getCmbOfGlobalData = (flag, grpCd) => {
        const cmbList = [];

        if(flag == "DC_CD"){
            gbDcCdCmb.map((code) => {
                cmbList.push({value: code.dcCd, label: code.dcNm+'['+code.dcCd+']'})
            })
        }
        if(flag == "CLIENT_CD"){
            gbClientCdCmb.map((code) => {
                cmbList.push({value: code.clientCd, label: code.clientNm+'['+code.clientCd+']'})
            })
        }
        if(flag == "CMMN_CD"){
            const filterData = cmmnCdData.filter(code => code.codeGrpCd === grpCd);
            filterData.map((code) => {
                cmbList.push({value: code.codeCd, label: code.codeNm+'['+code.codeCd+']'})
            })
        }
        return cmbList;
    }

    return (
        <CommonDataContext.Provider value={{ cmmnCdData, setCmmnCdData, getCodesByGroupCode, getCodesCmbByGroupCode, getCmbOfGlobalData }}>
            {children}
        </CommonDataContext.Provider>
    );
};

export default CommonDataContext;
