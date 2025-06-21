import axios from "axios";

const API_BASE_URL = process.env.CURACEL_GROW_TOKEN;
const BEARER_TOKEN = process.env.CURACEL_GROW_URL;

class ApiService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });

    // Request interceptor (optional)
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(`Making request to: ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor (optional)
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );
  }

  // This will fetch products with pagination support
  async getProducts(page = 1, pageSize = 15) {
    // Default pageSize to 15 if that's what the API returns
    let allProducts = [];
    let currentPage = page;
    let totalPages = 1; // Initialize totalPages to 1 to ensure at least one request

    do {
      try {
        // Construct the request URL with pagination params
        const { data: responseData } = await this.axiosInstance.get(
          "/products",
          {
            params: { page: currentPage, per_page: pageSize }, // Often APIs use 'per_page' or 'limit'
          }
        );

        // Check if `responseData.meta` exists and contains `last_page` or `total`
        if (responseData.meta && responseData.meta.last_page) {
          totalPages = responseData.meta.last_page;
        } else if (responseData.meta && responseData.meta.total) {
          totalPages = Math.ceil(responseData.meta.total / pageSize);
        } else {
          // If no explicit pagination info, assume single page and break after first fetch
          totalPages = currentPage;
        }

        // Assuming the products are in the 'data' field of the responseData
        allProducts = [...allProducts, ...responseData.data];

        currentPage++; // Increment page number for the next fetch
      } catch (error) {
        console.error("Failed to fetch products:", error);
        break; // If there's an error, stop trying to fetch more pages
      }
    } while (currentPage <= totalPages); // Continue as long as there are more pages

    return allProducts;
  }
}

export const apiService = new ApiService();
