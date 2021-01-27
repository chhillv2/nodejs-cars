import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
});

export const averageListingprice = {
  list: async () => {
    const response01 = await api.get("/averageListingprice", {
    });
    return [...response01.data];
  },
};

export const distributionMake = {
  list: async () => {
    const response01 = await api.get("/distributionMake", {
    });
    return [...response01.data];
  },

};
export const mostContactedlisting = {
  list: async () => {
    const response01 = await api.get("/mostContactedlisting", {
    });
    return [...response01.data];
  },
};
export const topfivepermonth = {
  list: async () => {
    const response01 = await api.get("/topfivepermonth", {
    });
    console.log("top gfckdjbcbcsjbj");
    
    return [...response01.data];
  },
};
