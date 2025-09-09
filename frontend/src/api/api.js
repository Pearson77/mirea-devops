import client from "@/api/client.js";

export const api = {
    sendData: async (data) => {
        await client.post(`/send-data`, data);
        localStorage.setItem("gender", data?.gender || 'М');
    },

    downloadData: async () => {
        return await client.get("/download-excel", {
            responseType: "blob",
        });
    }
}
