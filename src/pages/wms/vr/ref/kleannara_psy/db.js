var areaDB = ["A", "B"];
var zoneDB = ["A1", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"];
var locDB = [];
var stokDB = [
    { area: "A", zone: "A1", loc: "A1-01-01", LOT: 999, PLTID: 999001, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-01", LOT: 999, PLTID: 999002, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-01", LOT: 999, PLTID: 999003, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-01", LOT: 999, PLTID: 999004, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-01", LOT: 999, PLTID: 999005, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-02", LOT: 999, PLTID: 999006, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-02", LOT: 999, PLTID: 999007, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-02", LOT: 999, PLTID: 999008, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-02", LOT: 999, PLTID: 999009, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-02", LOT: 999, PLTID: 999010, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-03", LOT: 999, PLTID: 999011, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-03", LOT: 999, PLTID: 999012, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-03", LOT: 999, PLTID: 999013, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-03", LOT: 999, PLTID: 999014, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-03", LOT: 999, PLTID: 999015, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-04", LOT: 999, PLTID: 999016, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-04", LOT: 999, PLTID: 999017, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-04", LOT: 999, PLTID: 999018, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-04", LOT: 999, PLTID: 999019, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-04", LOT: 999, PLTID: 999020, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-05", LOT: 999, PLTID: 999021, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-05", LOT: 999, PLTID: 999022, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-05", LOT: 999, PLTID: 999023, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-05", LOT: 999, PLTID: 999024, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-05", LOT: 999, PLTID: 999025, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-06", LOT: 999, PLTID: 999026, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-06", LOT: 999, PLTID: 999027, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-06", LOT: 999, PLTID: 999028, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-06", LOT: 999, PLTID: 999029, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-06", LOT: 999, PLTID: 999030, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-07", LOT: 999, PLTID: 999031, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-07", LOT: 999, PLTID: 999032, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-07", LOT: 999, PLTID: 999033, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-07", LOT: 999, PLTID: 999034, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-07", LOT: 999, PLTID: 999035, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-08", LOT: 999, PLTID: 999036, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-08", LOT: 999, PLTID: 999037, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-08", LOT: 999, PLTID: 999038, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-08", LOT: 999, PLTID: 999039, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-08", LOT: 999, PLTID: 999040, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-09", LOT: 999, PLTID: 999041, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-09", LOT: 999, PLTID: 999042, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-09", LOT: 999, PLTID: 999043, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-09", LOT: 999, PLTID: 999044, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-09", LOT: 999, PLTID: 999045, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-10", LOT: 999, PLTID: 999046, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-10", LOT: 999, PLTID: 999047, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-10", LOT: 999, PLTID: 999048, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-10", LOT: 999, PLTID: 999049, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-10", LOT: 999, PLTID: 999050, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-11", LOT: 999, PLTID: 999051, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-11", LOT: 999, PLTID: 999052, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-11", LOT: 999, PLTID: 999053, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-11", LOT: 999, PLTID: 999054, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-11", LOT: 999, PLTID: 999055, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-12", LOT: 999, PLTID: 999056, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-12", LOT: 999, PLTID: 999057, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-12", LOT: 999, PLTID: 999058, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-12", LOT: 999, PLTID: 999059, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-12", LOT: 999, PLTID: 999060, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-13", LOT: 999, PLTID: 999061, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-13", LOT: 999, PLTID: 999062, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-13", LOT: 999, PLTID: 999063, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-13", LOT: 999, PLTID: 999064, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-13", LOT: 999, PLTID: 999065, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-14", LOT: 999, PLTID: 999066, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-14", LOT: 999, PLTID: 999067, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-14", LOT: 999, PLTID: 999068, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-14", LOT: 999, PLTID: 999069, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-14", LOT: 999, PLTID: 999070, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-15", LOT: 999, PLTID: 999071, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-15", LOT: 999, PLTID: 999072, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-15", LOT: 999, PLTID: 999073, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-15", LOT: 999, PLTID: 999074, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-15", LOT: 999, PLTID: 999075, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-16", LOT: 999, PLTID: 999076, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-16", LOT: 999, PLTID: 999077, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-16", LOT: 999, PLTID: 999078, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-16", LOT: 999, PLTID: 999079, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-16", LOT: 999, PLTID: 999080, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-17", LOT: 999, PLTID: 999081, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-17", LOT: 999, PLTID: 999082, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-17", LOT: 999, PLTID: 999083, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-17", LOT: 999, PLTID: 999084, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-17", LOT: 999, PLTID: 999085, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-18", LOT: 999, PLTID: 999086, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-18", LOT: 999, PLTID: 999087, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-18", LOT: 999, PLTID: 999088, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-18", LOT: 999, PLTID: 999089, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-18", LOT: 999, PLTID: 999090, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-19", LOT: 999, PLTID: 999091, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-19", LOT: 999, PLTID: 999092, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-19", LOT: 999, PLTID: 999093, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-19", LOT: 999, PLTID: 999094, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-19", LOT: 999, PLTID: 999095, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-20", LOT: 999, PLTID: 999096, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-20", LOT: 999, PLTID: 999097, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-20", LOT: 999, PLTID: 999098, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-20", LOT: 999, PLTID: 999099, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-20", LOT: 999, PLTID: 999100, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-21", LOT: 999, PLTID: 999101, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-21", LOT: 999, PLTID: 999102, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-21", LOT: 999, PLTID: 999103, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-21", LOT: 999, PLTID: 999104, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-21", LOT: 999, PLTID: 999105, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-22", LOT: 999, PLTID: 999106, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-22", LOT: 999, PLTID: 999107, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-22", LOT: 999, PLTID: 999108, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-22", LOT: 999, PLTID: 999109, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-22", LOT: 999, PLTID: 999110, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-23", LOT: 999, PLTID: 999111, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-23", LOT: 999, PLTID: 999112, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-23", LOT: 999, PLTID: 999113, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-23", LOT: 999, PLTID: 999114, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-23", LOT: 999, PLTID: 999115, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-24", LOT: 999, PLTID: 999116, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-24", LOT: 999, PLTID: 999117, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-24", LOT: 999, PLTID: 999118, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-24", LOT: 999, PLTID: 999119, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-24", LOT: 999, PLTID: 999120, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-25", LOT: 999, PLTID: 999121, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-25", LOT: 999, PLTID: 999122, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-25", LOT: 999, PLTID: 999123, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-25", LOT: 999, PLTID: 999124, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-25", LOT: 999, PLTID: 999125, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-26", LOT: 999, PLTID: 999126, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-26", LOT: 999, PLTID: 999127, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-26", LOT: 999, PLTID: 999128, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-26", LOT: 999, PLTID: 999129, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-26", LOT: 999, PLTID: 999130, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-27", LOT: 999, PLTID: 999131, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-27", LOT: 999, PLTID: 999132, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-27", LOT: 999, PLTID: 999133, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-27", LOT: 999, PLTID: 999134, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-27", LOT: 999, PLTID: 999135, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-28", LOT: 999, PLTID: 999136, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-28", LOT: 999, PLTID: 999137, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-28", LOT: 999, PLTID: 999138, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-28", LOT: 999, PLTID: 999139, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-28", LOT: 999, PLTID: 999140, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-29", LOT: 999, PLTID: 999141, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-29", LOT: 999, PLTID: 999142, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-29", LOT: 999, PLTID: 999143, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-29", LOT: 999, PLTID: 999144, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-29", LOT: 999, PLTID: 999145, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-30", LOT: 999, PLTID: 999146, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-30", LOT: 999, PLTID: 999147, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-30", LOT: 999, PLTID: 999148, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-30", LOT: 999, PLTID: 999149, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-30", LOT: 999, PLTID: 999150, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-31", LOT: 999, PLTID: 999151, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-31", LOT: 999, PLTID: 999152, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-31", LOT: 999, PLTID: 999153, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-31", LOT: 999, PLTID: 999154, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-31", LOT: 999, PLTID: 999155, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-32", LOT: 999, PLTID: 999156, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-32", LOT: 999, PLTID: 999157, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-32", LOT: 999, PLTID: 999158, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-32", LOT: 999, PLTID: 999159, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-32", LOT: 999, PLTID: 999160, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-33", LOT: 999, PLTID: 999161, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-33", LOT: 999, PLTID: 999162, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-33", LOT: 999, PLTID: 999163, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-33", LOT: 999, PLTID: 999164, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-33", LOT: 999, PLTID: 999165, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-34", LOT: 999, PLTID: 999166, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-34", LOT: 999, PLTID: 999167, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-34", LOT: 999, PLTID: 999168, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-34", LOT: 999, PLTID: 999169, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-34", LOT: 999, PLTID: 999170, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-35", LOT: 999, PLTID: 999171, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-35", LOT: 999, PLTID: 999172, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-35", LOT: 999, PLTID: 999173, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-35", LOT: 999, PLTID: 999174, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-35", LOT: 999, PLTID: 999175, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-36", LOT: 999, PLTID: 999176, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-36", LOT: 999, PLTID: 999177, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-36", LOT: 999, PLTID: 999178, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-36", LOT: 999, PLTID: 999179, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-36", LOT: 999, PLTID: 999180, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-37", LOT: 999, PLTID: 999181, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-37", LOT: 999, PLTID: 999182, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-37", LOT: 999, PLTID: 999183, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-37", LOT: 999, PLTID: 999184, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-37", LOT: 999, PLTID: 999185, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-38", LOT: 999, PLTID: 999186, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-38", LOT: 999, PLTID: 999187, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-38", LOT: 999, PLTID: 999188, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-38", LOT: 999, PLTID: 999189, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-01-38", LOT: 999, PLTID: 999190, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-01", LOT: 999, PLTID: 999001, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-01", LOT: 999, PLTID: 999002, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-01", LOT: 999, PLTID: 999003, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-01", LOT: 999, PLTID: 999004, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-01", LOT: 999, PLTID: 999005, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-02", LOT: 999, PLTID: 999006, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-02", LOT: 999, PLTID: 999007, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-02", LOT: 999, PLTID: 999008, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-02", LOT: 999, PLTID: 999009, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-02", LOT: 999, PLTID: 999010, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-03", LOT: 999, PLTID: 999011, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-03", LOT: 999, PLTID: 999012, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-03", LOT: 999, PLTID: 999013, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-03", LOT: 999, PLTID: 999014, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-03", LOT: 999, PLTID: 999015, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-04", LOT: 999, PLTID: 999016, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-04", LOT: 999, PLTID: 999017, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-04", LOT: 999, PLTID: 999018, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-04", LOT: 999, PLTID: 999019, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-04", LOT: 999, PLTID: 999020, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-05", LOT: 999, PLTID: 999021, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-05", LOT: 999, PLTID: 999022, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-05", LOT: 999, PLTID: 999023, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-05", LOT: 999, PLTID: 999024, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-05", LOT: 999, PLTID: 999025, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-06", LOT: 999, PLTID: 999026, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-06", LOT: 999, PLTID: 999027, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-06", LOT: 999, PLTID: 999028, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-06", LOT: 999, PLTID: 999029, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-06", LOT: 999, PLTID: 999030, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-07", LOT: 999, PLTID: 999031, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-07", LOT: 999, PLTID: 999032, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-07", LOT: 999, PLTID: 999033, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-07", LOT: 999, PLTID: 999034, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-07", LOT: 999, PLTID: 999035, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-08", LOT: 999, PLTID: 999036, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-08", LOT: 999, PLTID: 999037, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-08", LOT: 999, PLTID: 999038, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-08", LOT: 999, PLTID: 999039, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-08", LOT: 999, PLTID: 999040, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-09", LOT: 999, PLTID: 999041, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-09", LOT: 999, PLTID: 999042, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-09", LOT: 999, PLTID: 999043, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-09", LOT: 999, PLTID: 999044, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-09", LOT: 999, PLTID: 999045, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-10", LOT: 999, PLTID: 999046, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-10", LOT: 999, PLTID: 999047, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-10", LOT: 999, PLTID: 999048, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-10", LOT: 999, PLTID: 999049, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-10", LOT: 999, PLTID: 999050, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-11", LOT: 999, PLTID: 999051, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-11", LOT: 999, PLTID: 999052, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-11", LOT: 999, PLTID: 999053, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-11", LOT: 999, PLTID: 999054, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-11", LOT: 999, PLTID: 999055, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-12", LOT: 999, PLTID: 999056, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-12", LOT: 999, PLTID: 999057, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-12", LOT: 999, PLTID: 999058, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-12", LOT: 999, PLTID: 999059, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-12", LOT: 999, PLTID: 999060, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-13", LOT: 999, PLTID: 999061, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-13", LOT: 999, PLTID: 999062, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-13", LOT: 999, PLTID: 999063, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-13", LOT: 999, PLTID: 999064, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-13", LOT: 999, PLTID: 999065, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-14", LOT: 999, PLTID: 999066, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-14", LOT: 999, PLTID: 999067, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-14", LOT: 999, PLTID: 999068, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-14", LOT: 999, PLTID: 999069, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-14", LOT: 999, PLTID: 999070, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-15", LOT: 999, PLTID: 999071, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-15", LOT: 999, PLTID: 999072, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-15", LOT: 999, PLTID: 999073, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-15", LOT: 999, PLTID: 999074, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-15", LOT: 999, PLTID: 999075, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-16", LOT: 999, PLTID: 999076, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-16", LOT: 999, PLTID: 999077, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-16", LOT: 999, PLTID: 999078, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-16", LOT: 999, PLTID: 999079, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-16", LOT: 999, PLTID: 999080, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-17", LOT: 999, PLTID: 999081, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-17", LOT: 999, PLTID: 999082, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-17", LOT: 999, PLTID: 999083, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-17", LOT: 999, PLTID: 999084, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-17", LOT: 999, PLTID: 999085, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-18", LOT: 999, PLTID: 999086, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-18", LOT: 999, PLTID: 999087, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-18", LOT: 999, PLTID: 999088, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-18", LOT: 999, PLTID: 999089, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-18", LOT: 999, PLTID: 999090, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-19", LOT: 999, PLTID: 999091, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-19", LOT: 999, PLTID: 999092, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-19", LOT: 999, PLTID: 999093, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-19", LOT: 999, PLTID: 999094, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-19", LOT: 999, PLTID: 999095, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-20", LOT: 999, PLTID: 999096, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-20", LOT: 999, PLTID: 999097, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-20", LOT: 999, PLTID: 999098, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-20", LOT: 999, PLTID: 999099, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-20", LOT: 999, PLTID: 999100, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-21", LOT: 999, PLTID: 999101, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-21", LOT: 999, PLTID: 999102, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-21", LOT: 999, PLTID: 999103, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-21", LOT: 999, PLTID: 999104, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-21", LOT: 999, PLTID: 999105, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-22", LOT: 999, PLTID: 999106, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-22", LOT: 999, PLTID: 999107, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-22", LOT: 999, PLTID: 999108, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-22", LOT: 999, PLTID: 999109, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-22", LOT: 999, PLTID: 999110, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-23", LOT: 999, PLTID: 999111, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-23", LOT: 999, PLTID: 999112, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-23", LOT: 999, PLTID: 999113, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-23", LOT: 999, PLTID: 999114, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-23", LOT: 999, PLTID: 999115, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-24", LOT: 999, PLTID: 999116, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-24", LOT: 999, PLTID: 999117, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-24", LOT: 999, PLTID: 999118, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-24", LOT: 999, PLTID: 999119, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-24", LOT: 999, PLTID: 999120, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-25", LOT: 999, PLTID: 999121, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-25", LOT: 999, PLTID: 999122, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-25", LOT: 999, PLTID: 999123, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-25", LOT: 999, PLTID: 999124, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-25", LOT: 999, PLTID: 999125, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-26", LOT: 999, PLTID: 999126, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-26", LOT: 999, PLTID: 999127, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-26", LOT: 999, PLTID: 999128, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-26", LOT: 999, PLTID: 999129, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-26", LOT: 999, PLTID: 999130, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-27", LOT: 999, PLTID: 999131, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-27", LOT: 999, PLTID: 999132, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-27", LOT: 999, PLTID: 999133, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-27", LOT: 999, PLTID: 999134, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-27", LOT: 999, PLTID: 999135, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-28", LOT: 999, PLTID: 999136, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-28", LOT: 999, PLTID: 999137, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-28", LOT: 999, PLTID: 999138, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-28", LOT: 999, PLTID: 999139, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-28", LOT: 999, PLTID: 999140, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-29", LOT: 999, PLTID: 999141, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-29", LOT: 999, PLTID: 999142, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-29", LOT: 999, PLTID: 999143, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-29", LOT: 999, PLTID: 999144, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-29", LOT: 999, PLTID: 999145, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-30", LOT: 999, PLTID: 999146, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-30", LOT: 999, PLTID: 999147, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-30", LOT: 999, PLTID: 999148, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-30", LOT: 999, PLTID: 999149, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-30", LOT: 999, PLTID: 999150, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-31", LOT: 999, PLTID: 999151, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-31", LOT: 999, PLTID: 999152, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-31", LOT: 999, PLTID: 999153, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-31", LOT: 999, PLTID: 999154, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-31", LOT: 999, PLTID: 999155, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-32", LOT: 999, PLTID: 999156, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-32", LOT: 999, PLTID: 999157, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-32", LOT: 999, PLTID: 999158, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-32", LOT: 999, PLTID: 999159, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-32", LOT: 999, PLTID: 999160, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-33", LOT: 999, PLTID: 999161, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-33", LOT: 999, PLTID: 999162, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-33", LOT: 999, PLTID: 999163, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-33", LOT: 999, PLTID: 999164, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-33", LOT: 999, PLTID: 999165, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-34", LOT: 999, PLTID: 999166, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-34", LOT: 999, PLTID: 999167, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-34", LOT: 999, PLTID: 999168, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-34", LOT: 999, PLTID: 999169, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-34", LOT: 999, PLTID: 999170, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-35", LOT: 999, PLTID: 999171, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-35", LOT: 999, PLTID: 999172, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-35", LOT: 999, PLTID: 999173, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-35", LOT: 999, PLTID: 999174, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-35", LOT: 999, PLTID: 999175, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-36", LOT: 999, PLTID: 999176, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-36", LOT: 999, PLTID: 999177, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-36", LOT: 999, PLTID: 999178, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-36", LOT: 999, PLTID: 999179, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-36", LOT: 999, PLTID: 999180, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-37", LOT: 999, PLTID: 999181, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-37", LOT: 999, PLTID: 999182, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-37", LOT: 999, PLTID: 999183, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-37", LOT: 999, PLTID: 999184, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-37", LOT: 999, PLTID: 999185, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-38", LOT: 999, PLTID: 999186, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-38", LOT: 999, PLTID: 999187, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-38", LOT: 999, PLTID: 999188, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-38", LOT: 999, PLTID: 999189, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-02-38", LOT: 999, PLTID: 999190, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },

    { area: "A", zone: "A1", loc: "A1-03-01", LOT: 999, PLTID: 999001, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-01", LOT: 999, PLTID: 999002, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-01", LOT: 999, PLTID: 999003, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-01", LOT: 999, PLTID: 999004, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-01", LOT: 999, PLTID: 999005, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-02", LOT: 999, PLTID: 999006, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-02", LOT: 999, PLTID: 999007, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-02", LOT: 999, PLTID: 999008, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-02", LOT: 999, PLTID: 999009, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-02", LOT: 999, PLTID: 999010, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-03", LOT: 999, PLTID: 999011, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-03", LOT: 999, PLTID: 999012, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-03", LOT: 999, PLTID: 999013, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-03", LOT: 999, PLTID: 999014, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-03", LOT: 999, PLTID: 999015, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-04", LOT: 999, PLTID: 999016, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-04", LOT: 999, PLTID: 999017, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-04", LOT: 999, PLTID: 999018, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-04", LOT: 999, PLTID: 999019, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-04", LOT: 999, PLTID: 999020, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-05", LOT: 999, PLTID: 999021, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-05", LOT: 999, PLTID: 999022, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-05", LOT: 999, PLTID: 999023, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-05", LOT: 999, PLTID: 999024, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-05", LOT: 999, PLTID: 999025, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-06", LOT: 999, PLTID: 999026, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-06", LOT: 999, PLTID: 999027, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-06", LOT: 999, PLTID: 999028, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-06", LOT: 999, PLTID: 999029, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-06", LOT: 999, PLTID: 999030, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-07", LOT: 999, PLTID: 999031, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-07", LOT: 999, PLTID: 999032, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-07", LOT: 999, PLTID: 999033, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-07", LOT: 999, PLTID: 999034, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-07", LOT: 999, PLTID: 999035, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-08", LOT: 999, PLTID: 999036, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-08", LOT: 999, PLTID: 999037, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-08", LOT: 999, PLTID: 999038, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-08", LOT: 999, PLTID: 999039, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-08", LOT: 999, PLTID: 999040, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-09", LOT: 999, PLTID: 999041, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-09", LOT: 999, PLTID: 999042, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-09", LOT: 999, PLTID: 999043, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-09", LOT: 999, PLTID: 999044, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-09", LOT: 999, PLTID: 999045, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-10", LOT: 999, PLTID: 999046, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-10", LOT: 999, PLTID: 999047, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-10", LOT: 999, PLTID: 999048, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-10", LOT: 999, PLTID: 999049, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-10", LOT: 999, PLTID: 999050, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-11", LOT: 999, PLTID: 999051, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-11", LOT: 999, PLTID: 999052, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-11", LOT: 999, PLTID: 999053, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-11", LOT: 999, PLTID: 999054, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-11", LOT: 999, PLTID: 999055, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-12", LOT: 999, PLTID: 999056, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-12", LOT: 999, PLTID: 999057, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-12", LOT: 999, PLTID: 999058, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-12", LOT: 999, PLTID: 999059, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-12", LOT: 999, PLTID: 999060, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-13", LOT: 999, PLTID: 999061, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-13", LOT: 999, PLTID: 999062, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-13", LOT: 999, PLTID: 999063, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-13", LOT: 999, PLTID: 999064, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-13", LOT: 999, PLTID: 999065, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-14", LOT: 999, PLTID: 999066, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-14", LOT: 999, PLTID: 999067, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-14", LOT: 999, PLTID: 999068, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-14", LOT: 999, PLTID: 999069, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-14", LOT: 999, PLTID: 999070, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-15", LOT: 999, PLTID: 999071, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-15", LOT: 999, PLTID: 999072, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-15", LOT: 999, PLTID: 999073, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-15", LOT: 999, PLTID: 999074, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-15", LOT: 999, PLTID: 999075, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-16", LOT: 999, PLTID: 999076, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-16", LOT: 999, PLTID: 999077, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-16", LOT: 999, PLTID: 999078, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-16", LOT: 999, PLTID: 999079, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-16", LOT: 999, PLTID: 999080, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-17", LOT: 999, PLTID: 999081, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-17", LOT: 999, PLTID: 999082, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-17", LOT: 999, PLTID: 999083, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-17", LOT: 999, PLTID: 999084, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-17", LOT: 999, PLTID: 999085, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-18", LOT: 999, PLTID: 999086, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-18", LOT: 999, PLTID: 999087, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-18", LOT: 999, PLTID: 999088, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-18", LOT: 999, PLTID: 999089, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-18", LOT: 999, PLTID: 999090, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-19", LOT: 999, PLTID: 999091, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-19", LOT: 999, PLTID: 999092, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-19", LOT: 999, PLTID: 999093, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-19", LOT: 999, PLTID: 999094, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-19", LOT: 999, PLTID: 999095, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-20", LOT: 999, PLTID: 999096, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-20", LOT: 999, PLTID: 999097, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-20", LOT: 999, PLTID: 999098, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-20", LOT: 999, PLTID: 999099, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-20", LOT: 999, PLTID: 999100, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-21", LOT: 999, PLTID: 999101, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-21", LOT: 999, PLTID: 999102, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-21", LOT: 999, PLTID: 999103, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-21", LOT: 999, PLTID: 999104, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-21", LOT: 999, PLTID: 999105, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-22", LOT: 999, PLTID: 999106, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-22", LOT: 999, PLTID: 999107, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-22", LOT: 999, PLTID: 999108, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-22", LOT: 999, PLTID: 999109, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-22", LOT: 999, PLTID: 999110, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-23", LOT: 999, PLTID: 999111, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-23", LOT: 999, PLTID: 999112, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-23", LOT: 999, PLTID: 999113, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-23", LOT: 999, PLTID: 999114, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-23", LOT: 999, PLTID: 999115, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-24", LOT: 999, PLTID: 999116, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-24", LOT: 999, PLTID: 999117, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-24", LOT: 999, PLTID: 999118, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-24", LOT: 999, PLTID: 999119, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-24", LOT: 999, PLTID: 999120, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-25", LOT: 999, PLTID: 999121, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-25", LOT: 999, PLTID: 999122, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-25", LOT: 999, PLTID: 999123, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-25", LOT: 999, PLTID: 999124, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-25", LOT: 999, PLTID: 999125, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-26", LOT: 999, PLTID: 999126, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-26", LOT: 999, PLTID: 999127, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-26", LOT: 999, PLTID: 999128, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-26", LOT: 999, PLTID: 999129, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-26", LOT: 999, PLTID: 999130, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-27", LOT: 999, PLTID: 999131, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-27", LOT: 999, PLTID: 999132, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-27", LOT: 999, PLTID: 999133, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-27", LOT: 999, PLTID: 999134, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-27", LOT: 999, PLTID: 999135, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-28", LOT: 999, PLTID: 999136, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-28", LOT: 999, PLTID: 999137, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-28", LOT: 999, PLTID: 999138, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-28", LOT: 999, PLTID: 999139, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-28", LOT: 999, PLTID: 999140, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-29", LOT: 999, PLTID: 999141, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-29", LOT: 999, PLTID: 999142, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-29", LOT: 999, PLTID: 999143, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-29", LOT: 999, PLTID: 999144, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-29", LOT: 999, PLTID: 999145, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-30", LOT: 999, PLTID: 999146, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-30", LOT: 999, PLTID: 999147, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-30", LOT: 999, PLTID: 999148, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-30", LOT: 999, PLTID: 999149, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-30", LOT: 999, PLTID: 999150, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-31", LOT: 999, PLTID: 999151, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-31", LOT: 999, PLTID: 999152, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-31", LOT: 999, PLTID: 999153, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-31", LOT: 999, PLTID: 999154, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-31", LOT: 999, PLTID: 999155, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-32", LOT: 999, PLTID: 999156, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-32", LOT: 999, PLTID: 999157, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-32", LOT: 999, PLTID: 999158, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-32", LOT: 999, PLTID: 999159, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-32", LOT: 999, PLTID: 999160, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-33", LOT: 999, PLTID: 999161, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-33", LOT: 999, PLTID: 999162, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-33", LOT: 999, PLTID: 999163, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-33", LOT: 999, PLTID: 999164, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-33", LOT: 999, PLTID: 999165, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-34", LOT: 999, PLTID: 999166, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-34", LOT: 999, PLTID: 999167, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-34", LOT: 999, PLTID: 999168, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-34", LOT: 999, PLTID: 999169, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-34", LOT: 999, PLTID: 999170, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-35", LOT: 999, PLTID: 999171, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-35", LOT: 999, PLTID: 999172, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-35", LOT: 999, PLTID: 999173, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-35", LOT: 999, PLTID: 999174, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-35", LOT: 999, PLTID: 999175, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-36", LOT: 999, PLTID: 999176, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-36", LOT: 999, PLTID: 999177, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-36", LOT: 999, PLTID: 999178, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-36", LOT: 999, PLTID: 999179, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-36", LOT: 999, PLTID: 999180, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-37", LOT: 999, PLTID: 999181, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-37", LOT: 999, PLTID: 999182, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-37", LOT: 999, PLTID: 999183, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-37", LOT: 999, PLTID: 999184, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-37", LOT: 999, PLTID: 999185, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-38", LOT: 999, PLTID: 999186, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-38", LOT: 999, PLTID: 999187, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-38", LOT: 999, PLTID: 999188, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-38", LOT: 999, PLTID: 999189, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-03-38", LOT: 999, PLTID: 999190, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },

    { area: "A", zone: "A1", loc: "A1-04-01", LOT: 999, PLTID: 999001, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-01", LOT: 999, PLTID: 999002, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-01", LOT: 999, PLTID: 999003, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-01", LOT: 999, PLTID: 999004, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-01", LOT: 999, PLTID: 999005, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-02", LOT: 999, PLTID: 999006, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-02", LOT: 999, PLTID: 999007, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-02", LOT: 999, PLTID: 999008, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-02", LOT: 999, PLTID: 999009, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-02", LOT: 999, PLTID: 999010, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-03", LOT: 999, PLTID: 999011, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-03", LOT: 999, PLTID: 999012, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-03", LOT: 999, PLTID: 999013, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-03", LOT: 999, PLTID: 999014, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-03", LOT: 999, PLTID: 999015, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-04", LOT: 999, PLTID: 999016, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-04", LOT: 999, PLTID: 999017, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-04", LOT: 999, PLTID: 999018, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-04", LOT: 999, PLTID: 999019, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-04", LOT: 999, PLTID: 999020, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-05", LOT: 999, PLTID: 999021, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-05", LOT: 999, PLTID: 999022, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-05", LOT: 999, PLTID: 999023, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-05", LOT: 999, PLTID: 999024, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-05", LOT: 999, PLTID: 999025, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-06", LOT: 999, PLTID: 999026, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-06", LOT: 999, PLTID: 999027, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-06", LOT: 999, PLTID: 999028, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-06", LOT: 999, PLTID: 999029, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-06", LOT: 999, PLTID: 999030, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-07", LOT: 999, PLTID: 999031, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-07", LOT: 999, PLTID: 999032, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-07", LOT: 999, PLTID: 999033, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-07", LOT: 999, PLTID: 999034, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-07", LOT: 999, PLTID: 999035, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-08", LOT: 999, PLTID: 999036, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-08", LOT: 999, PLTID: 999037, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-08", LOT: 999, PLTID: 999038, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-08", LOT: 999, PLTID: 999039, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-08", LOT: 999, PLTID: 999040, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-09", LOT: 999, PLTID: 999041, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-09", LOT: 999, PLTID: 999042, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-09", LOT: 999, PLTID: 999043, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-09", LOT: 999, PLTID: 999044, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-09", LOT: 999, PLTID: 999045, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-10", LOT: 999, PLTID: 999046, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-10", LOT: 999, PLTID: 999047, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-10", LOT: 999, PLTID: 999048, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-10", LOT: 999, PLTID: 999049, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-10", LOT: 999, PLTID: 999050, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-11", LOT: 999, PLTID: 999051, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-11", LOT: 999, PLTID: 999052, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-11", LOT: 999, PLTID: 999053, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-11", LOT: 999, PLTID: 999054, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-11", LOT: 999, PLTID: 999055, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-12", LOT: 999, PLTID: 999056, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-12", LOT: 999, PLTID: 999057, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-12", LOT: 999, PLTID: 999058, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-12", LOT: 999, PLTID: 999059, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-12", LOT: 999, PLTID: 999060, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-13", LOT: 999, PLTID: 999061, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-13", LOT: 999, PLTID: 999062, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-13", LOT: 999, PLTID: 999063, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-13", LOT: 999, PLTID: 999064, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-13", LOT: 999, PLTID: 999065, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-14", LOT: 999, PLTID: 999066, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-14", LOT: 999, PLTID: 999067, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-14", LOT: 999, PLTID: 999068, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-14", LOT: 999, PLTID: 999069, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-14", LOT: 999, PLTID: 999070, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-15", LOT: 999, PLTID: 999071, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-15", LOT: 999, PLTID: 999072, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-15", LOT: 999, PLTID: 999073, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-15", LOT: 999, PLTID: 999074, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-15", LOT: 999, PLTID: 999075, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-16", LOT: 999, PLTID: 999076, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-16", LOT: 999, PLTID: 999077, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-16", LOT: 999, PLTID: 999078, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-16", LOT: 999, PLTID: 999079, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-16", LOT: 999, PLTID: 999080, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-17", LOT: 999, PLTID: 999081, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-17", LOT: 999, PLTID: 999082, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-17", LOT: 999, PLTID: 999083, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-17", LOT: 999, PLTID: 999084, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-17", LOT: 999, PLTID: 999085, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-18", LOT: 999, PLTID: 999086, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-18", LOT: 999, PLTID: 999087, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-18", LOT: 999, PLTID: 999088, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-18", LOT: 999, PLTID: 999089, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-18", LOT: 999, PLTID: 999090, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-19", LOT: 999, PLTID: 999091, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-19", LOT: 999, PLTID: 999092, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-19", LOT: 999, PLTID: 999093, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-19", LOT: 999, PLTID: 999094, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-19", LOT: 999, PLTID: 999095, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-20", LOT: 999, PLTID: 999096, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-20", LOT: 999, PLTID: 999097, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-20", LOT: 999, PLTID: 999098, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-20", LOT: 999, PLTID: 999099, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-20", LOT: 999, PLTID: 999100, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-21", LOT: 999, PLTID: 999101, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-21", LOT: 999, PLTID: 999102, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-21", LOT: 999, PLTID: 999103, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-21", LOT: 999, PLTID: 999104, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-21", LOT: 999, PLTID: 999105, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-22", LOT: 999, PLTID: 999106, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-22", LOT: 999, PLTID: 999107, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-22", LOT: 999, PLTID: 999108, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-22", LOT: 999, PLTID: 999109, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-22", LOT: 999, PLTID: 999110, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-23", LOT: 999, PLTID: 999111, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-23", LOT: 999, PLTID: 999112, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-23", LOT: 999, PLTID: 999113, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-23", LOT: 999, PLTID: 999114, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-23", LOT: 999, PLTID: 999115, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-24", LOT: 999, PLTID: 999116, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-24", LOT: 999, PLTID: 999117, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-24", LOT: 999, PLTID: 999118, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-24", LOT: 999, PLTID: 999119, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-24", LOT: 999, PLTID: 999120, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-25", LOT: 999, PLTID: 999121, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-25", LOT: 999, PLTID: 999122, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-25", LOT: 999, PLTID: 999123, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-25", LOT: 999, PLTID: 999124, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-25", LOT: 999, PLTID: 999125, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-26", LOT: 999, PLTID: 999126, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-26", LOT: 999, PLTID: 999127, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-26", LOT: 999, PLTID: 999128, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-26", LOT: 999, PLTID: 999129, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-26", LOT: 999, PLTID: 999130, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-27", LOT: 999, PLTID: 999131, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-27", LOT: 999, PLTID: 999132, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-27", LOT: 999, PLTID: 999133, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-27", LOT: 999, PLTID: 999134, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-27", LOT: 999, PLTID: 999135, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-28", LOT: 999, PLTID: 999136, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-28", LOT: 999, PLTID: 999137, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-28", LOT: 999, PLTID: 999138, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-28", LOT: 999, PLTID: 999139, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-28", LOT: 999, PLTID: 999140, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-29", LOT: 999, PLTID: 999141, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-29", LOT: 999, PLTID: 999142, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-29", LOT: 999, PLTID: 999143, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-29", LOT: 999, PLTID: 999144, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-29", LOT: 999, PLTID: 999145, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-30", LOT: 999, PLTID: 999146, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-30", LOT: 999, PLTID: 999147, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-30", LOT: 999, PLTID: 999148, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-30", LOT: 999, PLTID: 999149, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-30", LOT: 999, PLTID: 999150, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-31", LOT: 999, PLTID: 999151, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-31", LOT: 999, PLTID: 999152, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-31", LOT: 999, PLTID: 999153, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-31", LOT: 999, PLTID: 999154, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-31", LOT: 999, PLTID: 999155, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-32", LOT: 999, PLTID: 999156, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-32", LOT: 999, PLTID: 999157, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-32", LOT: 999, PLTID: 999158, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-32", LOT: 999, PLTID: 999159, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-32", LOT: 999, PLTID: 999160, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-33", LOT: 999, PLTID: 999161, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-33", LOT: 999, PLTID: 999162, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-33", LOT: 999, PLTID: 999163, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-33", LOT: 999, PLTID: 999164, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-33", LOT: 999, PLTID: 999165, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-34", LOT: 999, PLTID: 999166, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-34", LOT: 999, PLTID: 999167, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-34", LOT: 999, PLTID: 999168, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-34", LOT: 999, PLTID: 999169, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-34", LOT: 999, PLTID: 999170, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-35", LOT: 999, PLTID: 999171, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-35", LOT: 999, PLTID: 999172, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-35", LOT: 999, PLTID: 999173, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-35", LOT: 999, PLTID: 999174, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-35", LOT: 999, PLTID: 999175, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-36", LOT: 999, PLTID: 999176, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-36", LOT: 999, PLTID: 999177, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-36", LOT: 999, PLTID: 999178, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-36", LOT: 999, PLTID: 999179, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-36", LOT: 999, PLTID: 999180, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-37", LOT: 999, PLTID: 999181, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-37", LOT: 999, PLTID: 999182, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-37", LOT: 999, PLTID: 999183, SKU: "2.66t", height: 190, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-37", LOT: 999, PLTID: 999184, SKU: "5.32t", height: 190, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-37", LOT: 999, PLTID: 999185, SKU: "0.76t", height: 54.5, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-38", LOT: 999, PLTID: 999186, SKU: "1.53t", height: 54.5, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-38", LOT: 999, PLTID: 999187, SKU: "1.24t", height: 88.9, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-38", LOT: 999, PLTID: 999188, SKU: "2.49t", height: 88.9, radius: 105, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-38", LOT: 999, PLTID: 999189, SKU: "2.38t", height: 170, radius: 75, stokqty: 1 },
    { area: "A", zone: "A1", loc: "A1-04-38", LOT: 999, PLTID: 999190, SKU: "4.76t", height: 170, radius: 105, stokqty: 1 },
];
// var MakeStokQtyDB = function () {
//     var rollTypeArr = ["0.76t", "1.53t", "1.24t", "2.49t", "2.38t", "4.76t", "2.66t", "5.32t"];
//     var randomNum = Math.floor(Math.random() * 8);
//     var rollTypes = rollTypeArr[randomNum];
//     this.rollType = function () {
//         return rollTypes;
//     };
//     var stokQty;
//     switch (rollTypes) {
//         case "0.76t":
//         case "1.53t":
//             stokQty = Math.floor(Math.random() * 19) + 1;
//             break;
//         case "1.24t":
//         case "2.49t":
//             stokQty = Math.floor(Math.random() * 12) + 1;
//             break;
//         case "2.38t":
//         case "4.76t":
//             stokQty = Math.floor(Math.random() * 6) + 1;
//             break;
//         case "2.66t":
//         case "5.32t":
//             stokQty = Math.floor(Math.random() * 5) + 1;
//             break;
//     }
//     this.stokQty = function () {
//         return stokQty;
//     };
// };
/*
1-A=65, 2-B=66, 3-C=67, 4-D=68, 5-E=69, 
6-F=70, 7-G=71, 8-H=72, 9-I=73, 10-J=74
11-K=75, 12-L=76 13-M=77, 14-N=78
*/
// var makeStokDB = (function () {
//     var ASCII = 64;
//     var locObj = {};
//     for (var a = 1; a <= 14; a++) {
//         ASCII += 1;

//         switch (ASCII) {
//             case 65: //A
//             case 66: //B
//             case 67: //C
//             case 68: //D
//             case 69: //E
//             case 70: //F
//             case 71: //G
//                 for (var g = 1; g <= 38; g++) {
//                     var makeStokQtyDB = new MakeStokQtyDB();
//                     locObj = {
//                         zone: String.fromCharCode(ASCII),
//                         loc: String.fromCharCode(ASCII) + "-" + ("0" + String(g)).slice(-2),
//                         rollType: makeStokQtyDB.rollType(),
//                         stokQty: makeStokQtyDB.stokQty(),
//                     };
//                     stokDB.push(locObj);
//                 }
//                 break;
//             case 72: //H
//                 for (var h = 1; h <= 7; h++) {
//                     var makeStokQtyDB = new MakeStokQtyDB();
//                     locObj = {
//                         zone: String.fromCharCode(ASCII),
//                         loc: String.fromCharCode(ASCII) + "-" + ("0" + String(h)).slice(-2),
//                         rollType: makeStokQtyDB.rollType(),
//                         stokQty: makeStokQtyDB.stokQty(),
//                     };
//                     stokDB.push(locObj);
//                 }
//                 break;
//             case 73: //I
//                 for (var i = 1; i <= 6; i++) {
//                     var makeStokQtyDB = new MakeStokQtyDB();
//                     locObj = {
//                         zone: String.fromCharCode(ASCII),
//                         loc: String.fromCharCode(ASCII) + "-" + ("0" + String(i)).slice(-2),
//                         rollType: makeStokQtyDB.rollType(),
//                         stokQty: makeStokQtyDB.stokQty(),
//                     };
//                     stokDB.push(locObj);
//                 }
//                 break;
//             case 74: //J
//                 for (var j = 1; j <= 15; j++) {
//                     var makeStokQtyDB = new MakeStokQtyDB();
//                     locObj = {
//                         zone: String.fromCharCode(ASCII),
//                         loc: String.fromCharCode(ASCII) + "-" + ("0" + String(j)).slice(-2),
//                         rollType: makeStokQtyDB.rollType(),
//                         stokQty: makeStokQtyDB.stokQty(),
//                     };
//                     stokDB.push(locObj);
//                 }
//                 break;

//             case 75: //K
//                 for (var k = 1; k <= 6; k++) {
//                     var makeStokQtyDB = new MakeStokQtyDB();
//                     locObj = {
//                         zone: String.fromCharCode(ASCII),
//                         loc: String.fromCharCode(ASCII) + "-" + ("0" + String(k)).slice(-2),
//                         rollType: makeStokQtyDB.rollType(),
//                         stokQty: makeStokQtyDB.stokQty(),
//                     };
//                     stokDB.push(locObj);
//                 }
//                 break;

//             case 76: //L
//                 for (var l = 1; l <= 15; l++) {
//                     var makeStokQtyDB = new MakeStokQtyDB();
//                     locObj = {
//                         zone: String.fromCharCode(ASCII),
//                         loc: String.fromCharCode(ASCII) + "-" + ("0" + String(l)).slice(-2),
//                         rollType: makeStokQtyDB.rollType(),
//                         stokQty: makeStokQtyDB.stokQty(),
//                     };
//                     stokDB.push(locObj);
//                 }
//                 break;

//             case 77: //M
//                 for (var m = 1; m <= 7; m++) {
//                     var makeStokQtyDB = new MakeStokQtyDB();
//                     locObj = {
//                         zone: String.fromCharCode(ASCII),
//                         loc: String.fromCharCode(ASCII) + "-" + ("0" + String(m)).slice(-2),
//                         rollType: makeStokQtyDB.rollType(),
//                         stokQty: makeStokQtyDB.stokQty(),
//                     };
//                     stokDB.push(locObj);
//                 }
//                 break;
//             case 78: //N
//                 for (var n = 1; n <= 15; n++) {
//                     var makeStokQtyDB = new MakeStokQtyDB();
//                     locObj = {
//                         zone: String.fromCharCode(ASCII),
//                         loc: String.fromCharCode(ASCII) + "-" + ("0" + String(n)).slice(-2),
//                         rollType: makeStokQtyDB.rollType(),
//                         stokQty: makeStokQtyDB.stokQty(),
//                     };
//                     stokDB.push(locObj);
//                 }
//                 break;
//         }
//     }
// })();

var makeLocDB = (function () {
    var locObj = {};
    for (var i = 1; i <= 7; i++) {
        for (var j = 1; j <= 38; j++) {
            locObj = {
                area: "A",
                zone: "A1",
                loc: "A1" + "-" + ("0" + String(i)).slice(-2) + "-" + ("0" + String(j)).slice(-2),
            };
            locDB.push(locObj);
        }
    }
    for (var j = 1; j <= 38; j++) {
        if (j <= 7 || (j >= 13 && j <= 18) || (j >= 24 && j <= 38)) {
            locObj = {
                area: "A",
                zone: "A1",
                loc: "A1" + "-" + "08" + "-" + ("0" + String(j)).slice(-2),
            };
            locDB.push(locObj);
        }
    }
    for (var i = 1; i <= 38; i++) {
        if (i <= 6 || (i >= 24 && i <= 38)) {
            locObj = {
                area: "A",
                zone: "A1",
                loc: "A1" + "-" + "09" + "-" + ("0" + String(i)).slice(-2),
            };
            locDB.push(locObj);
        }
    }
    for (var i = 1; i <= 38; i++) {
        if (i <= 7 || (i >= 24 && i <= 38)) {
            locObj = {
                area: "A",
                zone: "A1",
                loc: "A1" + "-" + "10" + "-" + ("0" + String(i)).slice(-2),
            };
            locDB.push(locObj);
        }
    }
    for (var j = 1; j <= 5; j++) {
        locObj = {
            area: "B",
            zone: "B1",
            loc: "B1" + "-" + ("0" + String(i)).slice(-2) + "-" + ("0" + String(j)).slice(-2),
        };
        locDB.push(locObj);
    }

    for (var j = 6; j <= 9; j++) {
        locObj = {
            area: "B",
            zone: "B2",
            loc: "B2" + "-" + ("0" + String(i)).slice(-2) + "-" + ("0" + String(j)).slice(-2),
        };
        locDB.push(locObj);
    }

    for (var j = 10; j <= 13; j++) {
        locObj = {
            area: "B",
            zone: "B3",
            loc: "B3" + "-" + ("0" + String(i)).slice(-2) + "-" + ("0" + String(j)).slice(-2),
        };
        locDB.push(locObj);
    }

    for (var j = 14; j <= 17; j++) {
        locObj = {
            area: "B",
            zone: "B4",
            loc: "B4" + "-" + ("0" + String(i)).slice(-2) + "-" + ("0" + String(j)).slice(-2),
        };
        locDB.push(locObj);
    }

    for (var j = 18; j <= 22; j++) {
        locObj = {
            area: "B",
            zone: "B5",
            loc: "B5" + "-" + ("0" + String(i)).slice(-2) + "-" + ("0" + String(j)).slice(-2),
        };
        locDB.push(locObj);
    }

    for (var j = 23; j <= 27; j++) {
        locObj = {
            area: "B",
            zone: "B6",
            loc: "B6" + "-" + ("0" + String(i)).slice(-2) + "-" + ("0" + String(j)).slice(-2),
        };
        locDB.push(locObj);
    }

    for (var j = 28; j <= 32; j++) {
        locObj = {
            area: "B",
            zone: "B7",
            loc: "B7" + "-" + ("0" + String(i)).slice(-2) + "-" + ("0" + String(j)).slice(-2),
        };
        locDB.push(locObj);
    }
    for (var j = 33; j <= 37; j++) {
        locObj = {
            area: "B",
            zone: "B8",
            loc: "B8" + "-" + ("0" + String(i)).slice(-2) + "-" + ("0" + String(j)).slice(-2),
        };
        locDB.push(locObj);
    }
    for (var j = 38; j <= 42; j++) {
        locObj = {
            area: "B",
            zone: "B9",
            loc: "B9" + "-" + ("0" + String(i)).slice(-2) + "-" + ("0" + String(j)).slice(-2),
        };
        locDB.push(locObj);
    }
})();
