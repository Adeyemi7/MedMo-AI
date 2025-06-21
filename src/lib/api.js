import axios from "axios";

const API_BASE_URL = process.env.CURACEL_GROW_URL;
const BEARER_TOKEN = process.env.CURACEL_GROW_TOKEN;

class ApiService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(`Making request to: ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );
  }

  async getProducts(page = 1, pageSize = 15) {
    let allProducts = [];
    let currentPage = page;
    let totalPages = 1;

    do {
      try {
        const { data: responseData } = await this.axiosInstance.get(
          "/products",
          {
            params: { page: currentPage, per_page: pageSize },
          }
        );

        if (responseData.meta && responseData.meta.last_page) {
          totalPages = responseData.meta.last_page;
        } else if (responseData.meta && responseData.meta.total) {
          totalPages = Math.ceil(responseData.meta.total / pageSize);
        } else {
          totalPages = currentPage;
        }

        allProducts = [...allProducts, ...responseData.data];
        currentPage++;
      } catch (error) {
        console.error("Failed to fetch products:", error);
        break;
      }
    } while (currentPage <= totalPages);

    return allProducts;
  }
}

export const apiService = new ApiService();
