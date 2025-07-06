import { defineStore } from 'pinia';
import { FetchServiceRequests } from '@/api/serviceRequest';

export const useServiceRequestStore = defineStore('serviceRequests', {
  state: () => ({
    requests: [],
    loading: false,
  }),
  actions: {
    async fetchRequests() {
      if (this.requests.length > 0) {
        return;
      }
      
      this.loading = true;
      try {
        const response = await FetchServiceRequests();
        if (response && response.responseCode === '00') {
          this.requests = response.serviceRequests;
        }
      } finally {
        this.loading = false;
      }
    },
    setRequests(requests) {
      this.requests = requests;
    },
    hasData() {
      return this.requests.length > 0;
    },
    hasStatusData(status, serviceLiterals) {
      if (status === 'all') {
        return this.requests.length > 0;
      }
      const idx = serviceLiterals.indexOf(status);
      return this.requests.some(req => req.serviceStatus === idx);
    }
  },
  getters: {
    getByStatus: (state) => (status, serviceLiterals) => {
      if (status === 'all') {
        return state.requests;
      }
      
      const idx = serviceLiterals.indexOf(status);
      return state.requests.filter(req => req.serviceStatus === idx);
    },
  },
}); 