import axios from "axios";

<<<<<<< HEAD
const API_BASE_URL = "https://api.playbox.grow.curacel.co/api/v1";
const BEARER_TOKEN = "2825|nUiD3cPL6p1pTb9acrQRHmrvKao1cLrGLDPkonta784e8389";
=======
const API_BASE_URL = process.env.CURACEL_GROW_TOKEN;
const BEARER_TOKEN = process.env.CURACEL_GROW_URL;
>>>>>>> 61488f358e27e6e8b05207df330f7a8c1fcb9d8a

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
<<<<<<< HEAD
    this.axiosInstance.interceptors.request.use((config) => {
      console.log(`Making request to: ${config.url}`);
      return config;
    }, (error) => Promise.reject(error));

    // Response interceptor (optional)
    this.axiosInstance.interceptors.response.use((response) => response, (error) => Promise.reject(error));
  }

  // This will fetch products with pagination support
  async getProducts(page = 1, pageSize = 15) { // Default pageSize to 15 if that's what the API returns
=======
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
>>>>>>> 61488f358e27e6e8b05207df330f7a8c1fcb9d8a
    let allProducts = [];
    let currentPage = page;
    let totalPages = 1; // Initialize totalPages to 1 to ensure at least one request

    do {
      try {
        // Construct the request URL with pagination params
<<<<<<< HEAD
        const { data: responseData } = await this.axiosInstance.get("/products", {
          params: { page: currentPage, per_page: pageSize }, // Often APIs use 'per_page' or 'limit'
        });
=======
        const { data: responseData } = await this.axiosInstance.get(
          "/products",
          {
            params: { page: currentPage, per_page: pageSize }, // Often APIs use 'per_page' or 'limit'
          }
        );
>>>>>>> 61488f358e27e6e8b05207df330f7a8c1fcb9d8a

        // Check if `responseData.meta` exists and contains `last_page` or `total`
        if (responseData.meta && responseData.meta.last_page) {
          totalPages = responseData.meta.last_page;
        } else if (responseData.meta && responseData.meta.total) {
          totalPages = Math.ceil(responseData.meta.total / pageSize);
        } else {
<<<<<<< HEAD
            // If no explicit pagination info, assume single page and break after first fetch
            totalPages = currentPage;
        }


=======
          // If no explicit pagination info, assume single page and break after first fetch
          totalPages = currentPage;
        }

>>>>>>> 61488f358e27e6e8b05207df330f7a8c1fcb9d8a
        // Assuming the products are in the 'data' field of the responseData
        allProducts = [...allProducts, ...responseData.data];

        currentPage++; // Increment page number for the next fetch
<<<<<<< HEAD

=======
>>>>>>> 61488f358e27e6e8b05207df330f7a8c1fcb9d8a
      } catch (error) {
        console.error("Failed to fetch products:", error);
        break; // If there's an error, stop trying to fetch more pages
      }
    } while (currentPage <= totalPages); // Continue as long as there are more pages

    return allProducts;
  }
}

export const apiService = new ApiService();
