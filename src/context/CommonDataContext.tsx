import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { client } from '../constraints';

// --- 타입 정의 (인터페이스) ---

// 공통 코드 데이터 타입
interface CmmnCdItem {
    codeGrpCd: string;
    codeCd: string;
    codeNm: string;
    [key: string]: any; // 기타 속성 허용
}

// 고객사 코드 데이터 타입
interface ClientItem {
    clientCd: string;
    clientNm: string;
    [key: string]: any;
}

// 물류센터 코드 데이터 타입
interface DcItem {
    dcCd: string;
    dcNm: string;
    [key: string]: any;
}

// 콤보박스 아이템 타입
interface ComboItem {
    value: string;
    label: string;
}

// Context가 제공할 데이터와 함수의 타입 정의
interface CommonDataContextType {
    cmmnCdData: CmmnCdItem[];
    setCmmnCdData: React.Dispatch<React.SetStateAction<CmmnCdItem[]>>;
    getCodesByGroupCode: (groupCode: string) => CmmnCdItem[];
    getCodesCmbByGroupCode: (groupCode: string) => ComboItem[];
    getCmbOfGlobalData: (flag: string, grpCd?: string) => ComboItem[];
}

// Provider의 Props 타입 정의 (children 에러 해결)
interface CmmnCdProviderProps {
    children: ReactNode;
}

// --- Context 생성 ---

// 초기값을 null로 설정하고 제네릭 타입을 지정하여 createContext 에러 해결
export const CommonDataContext = createContext<CommonDataContextType | null>(null);

// Custom Hook: Context를 쉽게 사용하기 위함
export const useCommonData = () => {
    const context = useContext(CommonDataContext);
    if (!context) {
        throw new Error('useCommonData must be used within a CmmnCdProvider');
    }
    return context;
};

// --- Provider 컴포넌트 ---

export const CmmnCdProvider: React.FC<CmmnCdProviderProps> = ({ children }) => {
    const [isLoadingComplFlag, setIsLoadingComplFlag] = useState<boolean>(false);
    const [cmmnCdData, setCmmnCdData] = useState<CmmnCdItem[]>([]);
    const [gbClientCdCmb, setGbClientCdCmb] = useState<ClientItem[]>([]);
    const [gbDcCdCmb, setGbDcCdCmb] = useState<DcItem[]>([]);

    useEffect(() => {
        if (isLoadingComplFlag) return;

        const fetchData = async () => {
            try {
                // 공통 코드 조회
                if (cmmnCdData.length === 0) {
                    const res = await client.post(`/wms/sys/common/selectCodeByGroupCodeAllList`, null, {});
                    setCmmnCdData(res.data);
                }

                // 물류센터 코드 조회
                if (gbDcCdCmb.length === 0) {
                    const res = await client.post(`/wms/sys/common/selectDcList`, null, {});
                    setGbDcCdCmb(res.data);
                }

                // 고객사 코드 조회
                if (gbClientCdCmb.length === 0) {
                    const res = await client.post(`/wms/sys/common/selectClientList`, null, {});
                    setGbClientCdCmb(res.data);
                }
            } catch (error) {
                console.log('error = ' + error);
            } finally {
                setIsLoadingComplFlag(true);
            }
        };

        fetchData();
    }, [cmmnCdData, gbDcCdCmb, gbClientCdCmb, isLoadingComplFlag]);

    // 특정 그룹 코드에 해당하는 데이터만 반환하는 함수
    const getCodesByGroupCode = (groupCode: string): CmmnCdItem[] => {
        return cmmnCdData.filter(code => code.codeGrpCd === groupCode);
    };

    // 특정 그룹 코드에 해당하는 데이터를 콤보박스 형태로 반환
    const getCodesCmbByGroupCode = (groupCode: string): ComboItem[] => {
        const filterData = cmmnCdData.filter(code => code.codeGrpCd === groupCode);
        return filterData.map((code) => ({
            value: code.codeCd,
            label: `${code.codeNm}[${code.codeCd}]`
        }));
    };

    // 글로벌 변수를 콤보박스 형태로 조회
    const getCmbOfGlobalData = (flag: string, grpCd?: string): ComboItem[] => {
        let cmbList: ComboItem[] = [];

        if (flag === "DC_CD") {
            cmbList = gbDcCdCmb.map((code) => ({
                value: code.dcCd,
                label: `${code.dcNm}[${code.dcCd}]`
            }));
        } else if (flag === "CLIENT_CD") {
            cmbList = gbClientCdCmb.map((code) => ({
                value: code.clientCd,
                label: `${code.clientNm}[${code.clientCd}]`
            }));
        } else if (flag === "CMMN_CD" && grpCd) {
            const filterData = cmmnCdData.filter(code => code.codeGrpCd === grpCd);
            cmbList = filterData.map((code) => ({
                value: code.codeCd,
                label: `${code.codeNm}[${code.codeCd}]`
            }));
        }
        return cmbList;
    };

    return (
        <CommonDataContext.Provider value={{
            cmmnCdData,
            setCmmnCdData,
            getCodesByGroupCode,
            getCodesCmbByGroupCode,
            getCmbOfGlobalData
        }}>
            {children}
        </CommonDataContext.Provider>
    );
};

export default CommonDataContext;