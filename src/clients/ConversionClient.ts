import axios, { AxiosInstance } from 'axios';

export interface Conversion {
  id: string;
  state: 'PENDING' | 'COMPLETED' | 'ERROR';
  inputFile: {
    name: string;
    format: string;
  };
  outputFile: {
    name: string;
    format: string;
  };
  createdAt: string;
  completedAt: string | null;
}

class ConversionClient {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.CONVERSION_API_URL,
    });
  }

  async createConversion(fileName: string, outputFormat: string) {
    const inputFileFormat = fileName.split('.').pop() || 'unknown';

    const response = await this.api.post<Conversion>('/conversions', {
      inputFile: {
        name: fileName,
        format: inputFileFormat,
      },
      outputFile: {
        format: outputFormat,
      },
    });

    const conversion = response.data;
    return conversion;
  }

  async getConversionById(conversionId: string) {
    const response = await this.api.get<Conversion>(
      `/conversions/${conversionId}`
    );
    const conversion = response.data;
    return conversion;
  }
}

export default ConversionClient;
